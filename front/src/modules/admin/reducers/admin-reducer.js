import Immutable from 'immutable'
import _ from 'lodash';

let init = {
	findJunior: [],
	listJunior: [],
	findUser: [],
	listUser: [],
	listChat: [],
	report: []
}

function adminReducer(state = init, action) {
	switch (action.type) {
	    case 'SET_FIND_JUNIOR':
	      return {
	        ...state,
	        findJunior: action.data
	      }
	      break;
	    case 'SET_LIST_JUNIOR':
	      return {
	        ...state,
	        listJunior: action.data
	      }
	      break;
	    case 'SET_FIND_USER':
	      return {
	        ...state,
	        findUser: action.data
	      }
	      break; 
	    case 'SET_LIST_USER':
	      return {
	        ...state,
	        listUser: action.data
	      }
	      break;
	    case 'PUSH_FIND_JUNIOR':
	      return {
	        ...state,
	        listJunior: state.listJunior.concat(action.data)
	      } 
	    case 'PUSH_FIND_USER':
	      return {
	        ...state,
	        listUser: state.listUser.concat(action.data)
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
	    case 'SET_REPORT':
	      return {
	        ...state,
	        report: action.data
	      }
	      break;

	    default: return state;
  	}
}

export default adminReducer;
