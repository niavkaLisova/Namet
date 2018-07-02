import request from 'superagent'
import _ from 'lodash'
import appHistory from '../../../utils/app-history'
import * as Config from '../../../utils/config'
import * as NotificationActions from '../../notification/actions/notification-actions'

export function login(email, password) {
  return (dispatch) => {
    NotificationActions.show('Loging in. Please wait.')(dispatch);

    request
      .post(Config.API_DOMAIN + 'api/authenticate')
      .send({
        email: email,
        password: password
      })
      .end((error, response) => {
        if (_.isUndefined(response)) {
          return dispatch(loginFailure('Error: No response'));
        }

        if (error) {
          return dispatch(loginFailure(error));
        }

        const token = response.body.token;
        const userId = response.body.userId;

        if (token && userId) {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);

          dispatch(loginSuccess({userId: userId, token: token}));
          appHistory.replace('/user/' + userId);
          window.location.reload();
        } else {
          NotificationActions.show('Wrong username or password')(dispatch);
          localStorage.removeItem('token');
        }
      });
  }
}

export function emailConfirm(email, id) {
  return (dispatch) => {
    request
      .post(Config.API_DOMAIN + `api/confirm/email/${email}/${id}`)
      .end((error, response) => {
        console.log('email confirmed', response.body)
      });
  }
}

export function loginSuccess(data) {
  return {type: 'LOGGED_SUCCESSFULLY', data};
}

export function loginFailure(error) {
  return {type: 'LOGGED_FAILURE', error};
}

export function online(online) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'api/users/online/' + localStorage.getItem('userId'))
      .set('x-access-token', localStorage.getItem('token'))
      .send({
          'online': online
      })
      .end((error, response) => {
        console.log('fertig')
      })
  }
}
