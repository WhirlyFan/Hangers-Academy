import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./DeleteMessageModal.css";

const DeleteMessageModalContext = React.createContext();

export function DeleteMessageModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <DeleteMessageModalContext.Provider value={value}>
        {children}
      </DeleteMessageModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function DeleteMessageModal({ onClose, children }) {
  const modalNode = useContext(DeleteMessageModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="delete-message-modal">
      <div id="delete-message-modal-background" onClick={onClose} />
      <div id="delete-message-modal-content">{children}</div>
    </div>,
    modalNode
  );
}
