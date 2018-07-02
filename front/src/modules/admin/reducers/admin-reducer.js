import Immutable from 'immutable'
import _ from 'lodash';

let init = {
	findJunior: [],
	listJunior: []
}

function adminReducer(state = init, action) {
	switch (action.type) {
	    case 'SET_FIND_USER':
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

	    default: return state;
  	}
}

export default adminReducer;
