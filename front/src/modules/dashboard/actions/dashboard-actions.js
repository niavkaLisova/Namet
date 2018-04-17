import request from 'superagent';
import _ from 'lodash';
import * as Config from '../../../utils/config';
import * as NotificationActions from '../../notification/actions/notification-actions'

export function online(online) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'api/users/online/' + localStorage.getItem('userId'))
      .set('x-access-token', localStorage.getItem('token'))
      .send({
          'online': online
      })
      .end((error, response) => {
        // dispatch(betweenName(response.body));
      })
  }
}

export function onlineSave(data) {
  return {type: 'ONLINE_SAVE', data};
}
