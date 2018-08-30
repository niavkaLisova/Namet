import { combineReducers } from 'redux';
import loginReducer from '../modules/login/reducers/login-reducer';
import userReducer from '../modules/user/reducers/user-reducer';
import chatReducer from '../modules/chat/reducers/chat-reducer';
import recordReducer from '../modules/user/reducers/record-reducer';
import recordEditReducer from '../modules/user/reducers/recordEdit-reducer';
import dashboardReducer from '../modules/dashboard/reducers/dashboard-reducer';
import adminReducer from '../modules/admin/reducers/admin-reducer';
import { localeReducer as locale, initialize  } from 'react-localize-redux';
import notificationReducer from '../modules/notification/reducers/notification-reducer'
import teamReducer from '../modules/team/reducers/team-reducer';
import commentReducer from '../modules/comment/reducers/comment-reducer'
import gameReducer from '../modules/game/reducers/game-reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  notification: notificationReducer,
  locale: locale,
  chat: chatReducer,
  dashboard: dashboardReducer,
  adminN: adminReducer,
  record: recordReducer,
  recordEdit: recordEditReducer,
  team: teamReducer,
  comment: commentReducer,
  game: gameReducer
});

export default rootReducer;
