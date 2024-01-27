import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import SaveInput from "./SaveInput";
import SaveButton from "./SaveButton";
import Toolbox from "./Toolbox";

interface Square {
  x: number;
  y: number;
  size: number;
  id: string;
}

const Whiteboard: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const squares = useRef<Square[]>([]);
  const squareIdCounter = useRef(0);
  const [saveName, setSaveName] = useState("");
  const [mode, setMode] = useState("create");
  const [selectedSquareId, setSelectedSquareId] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    const deleteSquare = (id: string) => {
      squares.current = squares.current.filter((square) => square.id !== id);
      setSelectedSquareId(null);
      renderSquares();
    };

    svg.on("click", (event: MouseEvent) => {
      if (mode === "create") {
        const coords = d3.pointer(event);
        squares.current.push({
          x: coords[0],
          y: coords[1],
          size: 50,
          id: `square-${squareIdCounter.current++}`,
        });
        renderSquares();
      } else if (mode === "select") {
        setSelectedSquareId(null);
      }
    });

    const renderSquares = () => {
      const groups = svg
        .selectAll<SVGGElement, Square>("g")
        .data(squares.current, (d: Square) => d.id)
        .join("g");

      const resizeDrag = d3
        .drag<SVGCircleElement, Square>()
        .on("drag", function (event, d) {
          const draggedSquare = squares.current.find((sq) => sq.id === d.id);
          if (draggedSquare) {
            draggedSquare.size = Math.max(20, draggedSquare.size + event.dx);
            renderSquares();
          }
        });

      groups
        .selectAll("rect")
        .data((d) => [d])
        .join("rect")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr("width", (d) => d.size)
        .attr("height", (d) => d.size)
        .style("fill", (d) =>
          d.id === selectedSquareId ? "lightblue" : "white"
        )
        .style("stroke", (d) => (d.id === selectedSquareId ? "black" : "gray"))
        .style("stroke-dasharray", (d) =>
          d.id === selectedSquareId ? "4" : "none"
        )
        .on("click", (event, d) => {
          if (mode === "select") {
            setSelectedSquareId(d.id);
            event.stopPropagation();
          }
        });

      // Delete button and resize handle logic
      groups
        .filter((d) => d.id === selectedSquareId)
        .each(function (d) {
          const group = d3.select(this);

          // Resize handle
          group
            .selectAll("circle.resize-handle")
            .data([d]) // Binding the square data to the resize handle
            .join("circle")
            .classed("resize-handle", true) // Adding a class for clarity
            .attr("cx", d.x + d.size)
            .attr("cy", d.y)
            .attr("r", 5) // Resize handle radius
            .style("fill", "blue")
            .call(resizeDrag);

          // Delete button
          group
            .append("text")
            .attr("x", d.x + d.size - 10) // Position the text near the top right
            .attr("y", d.y + 10)
            .text("X")
            .style("cursor", "pointer")
            .style("fill", "red")
            .on("click", () => deleteSquare(d.id));
        });
    };

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Delete" && selectedSquareId) {
        squares.current = squares.current.filter(
          (square) => square.id !== selectedSquareId
        );
        setSelectedSquareId(null);
        renderSquares();
      }
    });

    renderSquares();
    return () => {
      // eslint-disable-next-line no-use-before-define
      window.removeEventListener("keydown", (event: KeyboardEvent) => {});
    };
  }, [selectedSquareId, mode]);

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    if (newMode === "create") {
      setSelectedSquareId(null);
    }
  };

  const handleSave = () => {
    if (saveName) {
      localStorage.setItem(saveName, JSON.stringify(squares.current));
      alert(`Whiteboard saved as "${saveName}"`);
    } else {
      alert("Please enter a name for your whiteboard");
    }
  };

  return (
    <div>
      <Toolbox mode={mode} setMode={handleModeChange} />
      <SaveInput saveName={saveName} setSaveName={setSaveName} />
      <SaveButton onSave={handleSave} />
      <svg ref={svgRef} width={800} height={600}></svg>
    </div>
  );
};

export default Whiteboard;
