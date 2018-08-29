import request from 'superagent';
import _ from 'lodash';
import * as Config from '../../../utils/config';

export function sendComment(text, idRecord) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'comment/send/')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        text,
        author: localStorage.getItem('userId'),
        idRecord
      })
      .end((error, response) => {
        dispatch(pushCommentByRecord(response.body))
      })
  }
}

export function findCommentByRecord(idRecord) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'comment/find/by/id')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        idRecord
      })
      .end((error, response) => {
        if (response.body.success) {
          dispatch(saveCommentByRecord(response.body.doc));
        }
      })
  }
}

export function findUserById(id) {
  return (dispatch) => {   
    request
      .get(Config.API_DOMAIN + 'api/users/' + id)
      .set('x-access-token', localStorage.getItem('token'))
      .end((error, response) => {
        if (!response.body.error) {
          dispatch(saveUserInfo(response.body));
        }
      })
  }
}

export function saveCommentByRecord(data) {
  return {type: 'SAVE_COMMENTS', data}
}

export function pushCommentByRecord(data) {
  return {type: 'PUSH_COMMENT', data}
}

export function saveUserInfo(data) {
  return {type: 'SAVE_USER_INFO', data};
}
