import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./ServerSettingsModal.css";

const ServerSettingsModalContext = React.createContext();

export function ServerSettingsModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ServerSettingsModalContext.Provider value={value}>
        {children}
      </ServerSettingsModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function ServerSettingsModal({ onClose, children }) {
  const modalNode = useContext(ServerSettingsModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="server-settings-modal">
      <div id="server-settings-modal-background" onClick={onClose} />
      <div id="server-settings-modal-content">{children}</div>
    </div>,
    modalNode
  );
}
