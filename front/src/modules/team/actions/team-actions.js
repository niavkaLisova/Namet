import request from 'superagent';
import _ from 'lodash';
import appHistory from '../../../utils/app-history'
import * as Config from '../../../utils/config'
import {ToastContainer, ToastStore} from 'react-toasts'

export function findRecordsByTeam(idTeam) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'team/find/recently/idTeam')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          idTeam
        })
        .end((error, response) => {
          dispatch(setRecentlyRecord(response.body));
        });
  }
}

export function findInfoTeam(idTeam) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'team/find/info/idTeam')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          idTeam
        })
        .end((error, response) => {
          dispatch(infoTeam(response.body));
        });
  }
}

export function findAdminTeam(idTeam) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'team/find/admin/idTeam')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          idTeam
        })
        .end((error, response) => {
          dispatch(adminTeam(response.body));
        });
  }
}

export function setRecentlyRecord(data) {
  return {type: 'SET_RECENTLY_RECORD', data};
}

export function setListChat(data) {
  return {type: 'SET_LIST_CHAT', data};
}

export function pushListChat(data) {
  return {type: 'PUSH_LIST_CHAT', data};
}

export function infoTeam(data) {
  return {type: 'SET_INFO_TEAM', data};
}

export function adminTeam(data) {
  return {type: 'SET_ADMIN_TEAM', data};
}
