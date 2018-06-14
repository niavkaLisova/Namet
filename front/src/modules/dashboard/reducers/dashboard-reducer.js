import Immutable from 'immutable'
import _ from 'lodash';

let init = {
	unread: ''
}

function dashboardReducer(state = init, action) {
	switch (action.type) {
	    case 'UNREAD_UPDATE':
	      return {
	        ...state,
	        unread: action.data
	      }
	      break;

	    default: return state;
  	}
}

export default dashboardReducer;
