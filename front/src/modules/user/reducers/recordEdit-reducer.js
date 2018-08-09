import Immutable from 'immutable'
import _ from 'lodash';

let init = {
  collName: ''
}

function recordReducer(state = init, action) {
  switch (action.type) {
    case 'SET_COLL_NAME':
      return {
        ...state,
        collName: action.data    
      }
      break;

    default: return state;
  }
}

export default recordReducer;
