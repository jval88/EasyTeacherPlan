import React from "react";

interface SaveInputProps {
  saveName: string;
  setSaveName: (name: string) => void;
}

const SaveInput: React.FC<SaveInputProps> = ({ saveName, setSaveName }) => {
  return (
    <input
      type="text"
      placeholder="Enter whiteboard name"
      value={saveName}
      onChange={(e) => setSaveName(e.target.value)}
    />
  );
};

export default SaveInput;
