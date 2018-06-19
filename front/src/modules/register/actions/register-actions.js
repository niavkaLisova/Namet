import request from 'superagent'
import _ from 'lodash'
import * as Config from '../../../utils/config'
import * as NotificationActions from '../../notification/actions/notification-actions'
import appHistory from '../../../utils/app-history'

export function register(password, email) {
  return (dispatch) => {
    request
      .post(Config.API_DOMAIN + 'api/register')
      .send({
        password: password,
        email: email
      })
      .end((error, response) => {
        if (_.isUndefined(response)) {
          return dispatch(registerFailure('Error: No response'));
        }

        if (error) {
          return dispatch(registerFailure(error));
        }

        if (response.body.success) {
          NotificationActions.show(response.body.message)(dispatch);
          console.log(response.body.doc.email, response.body.doc._id);
          dispatch(emailConfirm(response.body.doc.email, response.body.doc._id));
          appHistory.push('/login');
        }

        if (!response.body.success) {
          NotificationActions.show(response.body.message)(dispatch);
        }
      });
  }
}

export function emailConfirm(email, id) {
  let subject = 'Confirm Email';
  let text = 'Please confirm your email ' + Config.API_DOMAIN + '#/confirm/' + email + '/' + id;

  return (dispatch) => {
    request
      .post(Config.API_DOMAIN + 'api/email/confirm')
      .send({
        receiver: email,
        subject: subject,
        text: text
      })
      .end((error, response) => {
        console.log('email sended', response.body)
      });
  }
}

export function registerSuccess(data) {
  return {type: 'REGISTER_SUCCESSFULLY', data};
}

export function registerFailure(error) {
  return {type: 'REGISTER_FAILURE', error};
}
