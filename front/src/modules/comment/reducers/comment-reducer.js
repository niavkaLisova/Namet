import Immutable from 'immutable'
import _ from 'lodash';

let init = {
	comments: [],
	info: {},
	idAnswerer: null,
	answer: {}
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
	      let keys = (Object.keys(state.info));
	      let newInfo = state.info;

		  newInfo[action.data.key] = action.data.doc

	      return Object.assign({}, state, {
	        info: Object.assign({}, newInfo)
	      })
	      break;
	    case 'SET_ID_ANS':
	      return {
	        ...state,
	        idAnswerer: action.data
	      }
	      break;
	    case 'SAVE_ANSWER':
	      let newAnswer= state.answer;

		  newAnswer[action.data.key] = action.data.doc

	      return Object.assign({}, state, {
	        answer: Object.assign({}, newAnswer)
	      })
	      break;

	    default: return state;
  	}
}

export default commentReducer;
