import Immutable from 'immutable'
import _ from 'lodash';

let init = {
  collName: ''
}

function recordEditReducer(state = init, action) {
  switch (action.type) {
    case 'SET_COLL_NAME':
      console.log('record edit reducer', action.data)
      return {
        ...state,
        collName: action.data    
      }
      break;

    default: return state;
  }
}

export default recordEditReducer;
