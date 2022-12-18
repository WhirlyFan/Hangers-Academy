import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { ModalProvider } from "./context/Modal";
import { ServerSettingsModalProvider } from "./context/ServerSettingsModal";
import configureStore from "./store";
import { UserSettingsModalProvider } from "./context/UserSettingsModal";
import { DeleteMessageModalProvider } from "./context/DeleteMessageModal";

import * as serverActions from "./store/server";
import * as channelMessagesActions from "./store/channelMessages";
import * as userActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store; //expose store to window in development
  window.getAllServers = serverActions;
  window.channelMessagesActions = channelMessagesActions;
  window.serverActions = serverActions;
  window.userActions = userActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <ServerSettingsModalProvider>
          <UserSettingsModalProvider>
            <DeleteMessageModalProvider>
              <App />
            </DeleteMessageModalProvider>
          </UserSettingsModalProvider>
        </ServerSettingsModalProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
