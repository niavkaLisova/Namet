import Immutable from 'immutable'
import _ from 'lodash';

let init = {
	findJunior: [],
	listJunior: [],
	findUser: [],
	listUser: []
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
	    
	      break;

	    default: return state;
  	}
}

export default adminReducer;
