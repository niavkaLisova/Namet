import Immutable from 'immutable'
import _ from 'lodash';

let init = {
	findJunior: []
}

function adminReducer(state = init, action) {
	switch (action.type) {
	    case 'SET_FIND_USER':
	      return {
	        ...state,
	        findJunior: action.data
	      }
	      break;

	    default: return state;
  	}
}

export default adminReducer;
