import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./UserSettingsModal.css";

const UserSettingsModalContext = React.createContext();

export function UserSettingsModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <UserSettingsModalContext.Provider value={value}>
        {children}
      </UserSettingsModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function UserSettingsModal({ onClose, children }) {
  const modalNode = useContext(UserSettingsModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="user-settings-modal">
      <div id="user-settings-modal-background" onClick={onClose} />
      <div id="user-settings-modal-content">{children}</div>
    </div>,
    modalNode
  );
}
