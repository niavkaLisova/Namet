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
          dispatch(setFindUser(response.body));
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

export function setFindUser(data) {
  return {type: 'SET_FIND_USER', data};
}

export function setListJunior(data) {
  return {type: 'SET_LIST_JUNIOR', data};
}

