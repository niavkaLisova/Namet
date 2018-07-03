import request from 'superagent'
import * as Config from '../../../utils/config';
import * as UserActions from '../../user/actions/user-actions'
import * as NotificationActions from '../../notification/actions/notification-actions'

export function findJunior(search) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'admin/junior/find')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'id': localStorage.getItem('userId'),
          'search': search
        })
        .end((error, response) => {
          dispatch(setFindJunior(response.body));
        });
  }
}

export function setJunior(junior, state) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'admin/junior/set')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'id': junior,
          'state': state
        })
        .end((error, response) => {
          dispatch(listJunior());
        });
  }
}

export function listJunior() {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'admin/junior/list')
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => {
          dispatch(setListJunior(response.body));
        });
  }
}

export function findUser(search) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'admin/banned/find')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'id': localStorage.getItem('userId'),
          'search': search
        })
        .end((error, response) => {
          dispatch(setFindUser(response.body));
        });
  }
}

export function listUser() {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'admin/banned/list')
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => {
          dispatch(setListUser(response.body));
        });
  }
}

export function setUser(user, state) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'admin/banned/set')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'id': user,
          'state': state
        })
        .end((error, response) => {
          dispatch(listUser());
        });
  }
}

export function setFindJunior(data) {
  return {type: 'SET_FIND_JUNIOR', data};
}

export function setListJunior(data) {
  return {type: 'SET_LIST_JUNIOR', data};
}

export function setFindUser(data) {
  return {type: 'SET_FIND_USER', data};
}

export function setListUser(data) {
  return {type: 'SET_LIST_USER', data};
}
