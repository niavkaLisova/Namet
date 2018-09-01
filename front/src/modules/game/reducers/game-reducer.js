import Immutable from 'immutable'
import _ from 'lodash';

let init = {
	gamesAuthor: [],
	gamesAll: [],
	game: [],
	records: [],
	recordInfo: {}
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
	    case 'SAVE_GAME_INFO':
	      return {
	        ...state,
	        game: action.data
	      }
	      break;
	    case 'SAVE_RECORDS':
	      return {
	        ...state,
	        records: action.data
	      }
	      break;
	    case 'SAVE_RECORD_INFO':
	      let keys = (Object.keys(state.recordInfo));
	      let newInfo = state.recordInfo;

		  newInfo[action.data.key] = action.data.doc

	      return Object.assign({}, state, {
	        recordInfo: Object.assign({}, newInfo)
	      })
	      break;

	    default: return state;
  	}
}

export default gameReducer;
