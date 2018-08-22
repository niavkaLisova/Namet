import Immutable from 'immutable'
import _ from 'lodash';

let init = {
  collectionsList: [],
  recordsListNC: [],
  recordsList:[],
  recordActive: [],
  topRecords: [],
  searchList: [],
  editList: [],
  full: [],
  wall: []
}

function recordReducer(state = init, action) {
  switch (action.type) {
     case 'SET_COLLECTIONS':
      return {
        ...state,
        collectionsList: action.data    
      }
      break;
    case 'SET_RECORDS':
      return {
        ...state,
        recordsList: action.data    
      }
      break;
    case 'SET_RECORDS_NC':
      return {
        ...state,
        recordsListNC: action.data    
      }
      break;
    case 'RECORD_ACTIVE':
      return {
        ...state,
        recordActive: action.data    
      }
      break;
    case 'TOP_RECORDS':
      return {
        ...state,
        topRecords: action.data    
      }
      break;
    case 'SET_SEARCH':
      return {
        ...state,
        searchList: action.data    
      }
      break;
    case 'SET_EDIT_LIST':
      return {
        ...state,
        editList: action.data 
      }
      break;
    case 'SET_FULL':
      return {
        ...state,
        full: action.data 
      }
      break;
    case 'SET_WALL_RECORD':
      return {
        ...state,
        wall: action.data 
      }
      break;

    default: return state;
  }
}

export default recordReducer;
