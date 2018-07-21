import Immutable from 'immutable'
import _ from 'lodash';

let init = {
  name: '',
  nickname: '',
  email: '',
  online: [],
  activeRoom: '',
  admin: '',
  country: '',
  city: '',
  birthday: ''
}

function userReducer(state = init, action) {
  switch (action.type) {
    case 'USER_GET':
      return {
        ...state,
        name: action.data.name,
        online: action.data.online,
        nickname: action.data.nickname,
        email: action.data.email,
        activeRoom: action.data.activeRoom,
        admin: action.data.admin,
        avatar: action.data.avatar,
        country: action.data.country,
        city: action.data.city,
        gender: action.data.gender,
        birthday: action.data.birthday
      }
      break;
    case 'AVATAR_UPDATE':
      return {
        ...state,
        avatar: action.data    
      }
      break;
    case 'SETTINGS_UPDATE':
      return {
        ...state,
        city: action.data.city,
        country: action.data.country,
        nickname: action.data.nickname,
        gender: action.data.gender,
        birthday: action.data.data
      }
      break; 
    case 'EMAIL_UPDATE':
      return {
        ...state,
        email: action.data    
      }
      break;
    case 'NAME_UPDATE':
      return {
        ...state,
        name: action.data    
      }
      break;
    case 'ONLINE_SAVE':
      return {
        ...state,
        online: state.online.concat(action.data)
      }
      break;
    case 'ACTIVE_SAVE':
      return {
        ...state,
        activeRoom: action.data    
      }
      break;
    default: return state;
  }
}

function actionUserDataUpdated(state, action) {
  var key = Object.keys(action.user);
  state[key] = action.user[key];

  return _.extend({}, state);
}

export default userReducer;
