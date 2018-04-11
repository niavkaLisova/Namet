import { combineReducers } from 'redux';
import loginReducer from '../modules/login/reducers/login-reducer';
import userReducer from '../modules/user/reducers/user-reducer';
import { localeReducer as locale, initialize  } from 'react-localize-redux';
import notificationReducer from '../modules/notification/reducers/notification-reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  notification: notificationReducer,
  locale: locale
});

export default rootReducer;
