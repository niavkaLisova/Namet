import React from 'react';
import ReactDOM from 'react-dom';

import { combineReducers, createStore } from 'redux';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import appHistory from './src/utils/app-history';
import routes from './src/utils/routes';
import configureStore from './src/utils/configureStore';
//import injectTapEventPlugin from 'react-tap-event-plugin';

import Snackbar from './src/modules/notification/components/snackbar'

//injectTapEventPlugin();

const store = configureStore();
ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={appHistory}>
      	<MuiThemeProvider>
        	{routes}
        </MuiThemeProvider>
      </Router>
    </Provider>
    <Provider store={store}>
      <Snackbar />
    </Provider>
  </div>,
  document.getElementById('app')
);
