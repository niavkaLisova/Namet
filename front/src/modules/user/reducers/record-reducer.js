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
  wall: [],
  recently: [],
  teamInfo: [
    {
      key: 'key',
      doc: []
    },
    {
      key: 'cup',
      doc: []
    },
    {
      key: 'heraldus',
      doc: []
    },
    {
      key: 'mark',
      doc: []
    },
    {
      key: 'diamond',
      doc: []
    },
    {
      key: 'butterfly',
      doc: []
    },
    {
      key: 'fireball',
      doc: []
    }
  ],
  myTeam: []
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
    case 'SET_RECENTLY_RECORD':
      return {
        ...state,
        recently: action.data 
      }
      break;
    case 'SET_TEAM_INFO':
      return Object.assign({}, state, {
        teamInfo: state.teamInfo.map((team, index) => {
          if (team.key == action.data.key) {
            let newTeam = {};
            newTeam.doc = action.data.doc;
            return Object.assign({}, team, newTeam)
          } else {
            return team
          }
        })
      })
      break;
    case 'SET_START_TEAM':
      return {
        ...state,
        teamInfo: [] 
      }
      break;
    case 'SET_MY_TEAM':
      return {
        ...state,
        myTeam: action.data 
      }
      break;

    default: return state;
  }
}

export default recordReducer;
