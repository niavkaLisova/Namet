import Immutable from 'immutable'
import update from 'react-addons-update'; // ES6
import _ from 'lodash';

let init = {
  room: '',
  roomId: '',
  between: [],
  messages: [],
  betweenName: [],
  findUser: [],
  limit: 10,
  unread: []
}

function chatReducer(state = init, action) {
  switch (action.type) {
    case 'ROOM_ID_SET':
      return {
        ...state,
        roomId: action.data.roomId,
        between: action.data.between
      }
      break;
    case 'CHAT_UPDATED':
      return {
        ...state,
        room: action.data
      }
      break;
    case 'CHAT_ADD':
      return {
        ...state,
        room: state.room.concat(action.data)
      }
      break;
    case 'MESSAGE_SET':
      return {
        ...state,
        messages: action.data
      }
      break;
    case 'MESSAGE_ADD':
      return {
        ...state,
        messages: state.messages.concat(action.data)
      }
      break;
    case 'BETWEEN_NAME':
      return {
        ...state,
        betweenName: state.betweenName.concat(action.data)
      }
      break;

    case 'BETWEEN_NAME_CLEAN':
      return {
        ...state,
        betweenName: []
      }
      break;
    case 'CHAT_FIND_USER':
      return {
        ...state,
        findUser: action.data
      }
      break;
    case 'LIMIT_SET':
      return {
        ...state,
        limit: state.limit + action.data
      }
      break;
    case 'LIMIT_START':
      return {
        ...state,
        limit: 10
      }
      break;
    case 'UNREAD_SET':
      return update(state, { 
        unread: { 
          [action.data.key]: {$set: action.data.length}  
        }

      });
      break;

    default: return state;
  }
}

export default chatReducer;
