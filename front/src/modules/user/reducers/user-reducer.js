import Immutable from 'immutable'
import _ from 'lodash';

let init = {
  name: '',
  nickname: '',
  email: '',
  online: [],
  activeRoom: '',
  admin: '',
  country: '',
  city: '',
  birthday: '',
  text: '',
  giftList: [],
  info: [],
  thumbnail: '',
  file: null,
  listColl: [],
  listCollId: '',
  listFollowers: [],
  following:[],
  followingList: [],
  answersOne: [],
  answersTwo: [],
  answersThree: [],
  answers: {},
  topTeam: []
}

function userReducer(state = init, action) {
  switch (action.type) {
    case 'USER_GET':
      return {
        ...state,
        name: action.data.name,
        online: action.data.online,
        nickname: action.data.nickname,
        email: action.data.email,
        activeRoom: action.data.activeRoom,
        admin: action.data.admin,
        avatar: action.data.avatar,
        country: action.data.country,
        city: action.data.city,
        gender: action.data.gender,
        birthday: action.data.birthday,
        following: action.data.following,
        id: action.data._id
      }
      break;
    case 'AVATAR_UPDATE':
      return {
        ...state,
        avatar: action.data    
      }
      break;
    case 'SETTINGS_UPDATE':
      return {
        ...state,
        city: action.data.city,
        country: action.data.country,
        nickname: action.data.nickname,
        gender: action.data.gender,
        birthday: action.data.data
      }
      break; 
    case 'EMAIL_UPDATE':
      return {
        ...state,
        email: action.data    
      }
      break;
    case 'NAME_UPDATE':
      return {
        ...state,
        name: action.data    
      }
      break;
    case 'ONLINE_SAVE':
      return {
        ...state,
        online: state.online.concat(action.data)
      }
      break;
    case 'ACTIVE_SAVE':
      return {
        ...state,
        activeRoom: action.data    
      }
      break;
    case 'TEXT_SAVE':
      return {
        ...state,
        text: action.data    
      }
      break;
    case 'SET_GIFT':
      return {
        ...state,
        giftList: action.data    
      }
      break;
    case 'USER_INFO':
      return {
        ...state,
        info: action.data 
      }
      break;
    case 'SET_FILE':
      return {
        ...state,
        file: action.data  
      }
      break;
    case 'LIST_COLLECTIONS':
      return {
        ...state,
        listColl: action.data  
      }
      break;
    case 'LIST_COLLECTIONS_ID':
      return {
        ...state,
        listCollId: action.data  
      }
      break;
    case 'SET_LIST_FOLLOWERS':
      return {
        ...state,
        listFollowers: action.data  
      }
      break;
    case 'SET_FOLLOWING':
      return {
        ...state,
        following: action.data  
      }
      break;
    case 'INFO_FOLLOWING':
      return {
        ...state,
        followingList: action.data  
      }
      break; 
    case 'ANSWERS_ONE':
      return {
        ...state,
        answersOne: action.data  
      }
      break;
    case 'ANSWERS_TWO':
      return {
        ...state,
        answersTwo: action.data  
      }
      break;
    case 'ANSWERS_THRE':
      return {
        ...state,
        answersThree: action.data  
      }
      break;
    case 'ANSWERS_SAVE':
      return {
        ...state,
        answers: action.data  
      }
      break;
    case 'TOP_TEAM':
      return {
        ...state,
        topTeam: action.data 
      }
      break;

    default: return state;
  }
}

function actionUserDataUpdated(state, action) {
  var key = Object.keys(action.user);
  state[key] = action.user[key];

  return _.extend({}, state);
}

export default userReducer;
