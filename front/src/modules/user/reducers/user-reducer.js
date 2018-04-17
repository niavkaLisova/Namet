import Immutable from 'immutable'
import _ from 'lodash';

let init = {
  name: '',
  surname: '',
  email: '',
  online: []
}

function userReducer(state = init, action) {
  switch (action.type) {
    case 'USER_GET':
      return {
        ...state,
        name: action.data.name,
        online: action.data.online,
        surname: action.data.surname,
        email: action.data.email
      }
      break;
    case 'ONLINE_SAVE':
      return {
        ...state,
        online: state.online.concat(action.data)
      }
      break;
    case 'USER_DATA_UPDATED': 
      return actionUserDataUpdated(state, action); 
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
