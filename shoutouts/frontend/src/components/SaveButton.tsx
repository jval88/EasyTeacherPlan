// src/SaveButton.tsx
import React from "react";

interface SaveButtonProps {
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  return <button onClick={onSave}>Save Whiteboard</button>;
};

export default SaveButton;
