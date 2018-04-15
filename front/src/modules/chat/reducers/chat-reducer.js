import Immutable from 'immutable'
import _ from 'lodash';

let init = {
  room: '',
  roomId: '',
  between: [],
  messages: []
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

    default: return state;
  }
}

export default chatReducer;
