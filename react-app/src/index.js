import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';

import * as serverActions from './store/server';
import * as channelMessagesActions from './store/channelMessages'

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.getAllServers = serverActions;
  window.channelMessagesActions = channelMessagesActions;
  window.store = store; //expose store to window in development 
  window.serverActions = serverActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
