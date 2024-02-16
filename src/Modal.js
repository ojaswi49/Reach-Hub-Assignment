import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, game }) => {
  if (!isOpen) return null;
    
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
        <p>Event: {game.Event}</p>
      <p>Site: {game.Site}</p>
      <p>Date: {game.Date}</p>
      <p>White Player: {game.White}</p>
      <p>Black Player: {game.Black}</p>
      <p>Result: {game.Result}</p>
      <p>UTC Date: {game.UTCDate}</p>
        </div>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;