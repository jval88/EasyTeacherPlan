import React from "react";

interface ToolboxProps {
  mode: string;
  setMode: (mode: string) => void;
}

const Toolbox: React.FC<ToolboxProps> = ({ mode, setMode }) => {
  return (
    <div>
      <button
        onClick={() => setMode("select")}
        style={{ backgroundColor: mode === "select" ? "lightblue" : "white" }}
      >
        Select
      </button>
      <button
        onClick={() => setMode("create")}
        style={{ backgroundColor: mode === "create" ? "lightblue" : "white" }}
      >
        Create
      </button>
    </div>
  );
};

export default Toolbox;
