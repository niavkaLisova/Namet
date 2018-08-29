import Immutable from 'immutable'
import _ from 'lodash';

let init = {
	comments: [],
	info: []
}

function commentReducer(state = init, action) {
	switch (action.type) {
	    case 'SAVE_COMMENTS':
	      return {
	        ...state,
	        comments: action.data
	      }
	      break;
	    case 'PUSH_COMMENT':
	      return {
	        ...state,
	        comments: (state.comments.reverse().concat(action.data)).reverse()
	      }
	      break;
	    case 'SAVE_USER_INFO':
	      return {
	        ...state,
	        info: action.data
	      }
	      break;

	    default: return state;
  	}
}

export default commentReducer;
