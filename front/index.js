import React from 'react';
import ReactDOM from 'react-dom';

import { combineReducers, createStore } from 'redux';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import appHistory from './src/utils/app-history';
import routes from './src/utils/routes';
import configureStore from './src/utils/configureStore';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
//import injectTapEventPlugin from 'react-tap-event-plugin';

var socket = io('http://localhost:3000');
socket.on('message', msg => console.log(msg));

import Snackbar from './src/modules/notification/components/snackbar'

//injectTapEventPlugin();

const store = configureStore();
ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={appHistory}>
      	<MuiThemeProvider>
          <SocketProvider socket={socket}>
        	 {routes}
          </SocketProvider>
        </MuiThemeProvider>
      </Router>
    </Provider>
    <Provider store={store}>
      <Snackbar />
    </Provider>
  </div>,
  document.getElementById('app')
);
