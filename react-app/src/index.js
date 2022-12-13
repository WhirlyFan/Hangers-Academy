import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';

import * as serverActions from './store/server';
import * as channelMessagesActions from './store/channelMessages'
import * as userActions from "./store/session"

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
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
