// Popup.tsx
import React from "react";
import "./Popup.css";

type PopupProps = {
  show: boolean;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <h2 className="text-2xl font-bold">Woohoo! You Won🥳🥳</h2>
        <button
          className="mt-4 bg-blue-600 text-white p-2 rounded-md"
          onClick={onClose}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default Popup;
