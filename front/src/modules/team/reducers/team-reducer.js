import Immutable from 'immutable'
import _ from 'lodash';

let init = {
  recentlyRecord: [],
  listChat: [],
  infoTeam: null,
  adminTeam: []
}

function teamReducer(state = init, action) {
  switch (action.type) {
    case 'SET_RECENTLY_RECORD':
      return {
        ...state,
        recentlyRecord: action.data    
      }
      break;
    case 'SET_LIST_CHAT':
      return {
        ...state,
        listChat: action.data 
      }
      break;
    case 'PUSH_LIST_CHAT':
      return {
        ...state,
        listChat: state.listChat.concat(action.data)
      }
      break;
    case 'SET_INFO_TEAM':
      return {
        ...state,
        infoTeam: action.data
      }
      break;
    case 'SET_ADMIN_TEAM':
      return {
        ...state,
        adminTeam: action.data
      }
      break;

    default: return state;
  }
}

export default teamReducer;
