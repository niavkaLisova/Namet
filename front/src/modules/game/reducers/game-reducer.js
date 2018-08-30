import Immutable from 'immutable'
import _ from 'lodash';

let init = {
	gamesAuthor: [],
	gamesAll: [],
	records: []
}

function gameReducer(state = init, action) {
	switch (action.type) {
	    case 'SAVE_GAMES_AUTHOR':
	      return {
	        ...state,
	        gamesAuthor: action.data
	      }
	      break;
	    case 'SAVE_GAMES_ALL':
	      return {
	        ...state,
	        gamesAll: action.data
	      }
	      break;
	    case 'SAVE_RECORDS':
	      return {
	        ...state,
	        records: action.data
	      }
	      break;

	    default: return state;
  	}
}

export default gameReducer;
