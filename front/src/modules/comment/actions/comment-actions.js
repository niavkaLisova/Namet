import request from 'superagent';
import _ from 'lodash';
import * as Config from '../../../utils/config';
import {ToastContainer, ToastStore} from 'react-toasts'

export function sendComment(text, idRecord, answerer) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'comment/send/')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        text,
        author: localStorage.getItem('userId'),
        idRecord,
        answerer
      })
      .end((error, response) => {
        if (!answerer) {
          dispatch(pushCommentByRecord(response.body));
        } else {
          dispatch(findAnswerByComment(answerer));
        }
      })
  }
}

export function clearComment(comment) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'comment/clear/')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        comment
      })
      .end((error, response) => {
        if (response.body.success) {
          ToastStore.success('Successfully removed');
        } else {
          ToastStore.error('Can not remove');
        }
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

export function findAnswerByComment(idComment) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'comment/find/answer/by/id')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        idComment
      })
      .end((error, response) => {
        if (response.body.success && response.body.doc.length > 0) {
          dispatch(saveAnswer({key: idComment, doc: response.body.doc}))
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
          dispatch(saveUserInfo({key: response.body._id, doc: response.body}));
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

export function setIdAnswerer(data) {
  return {type: 'SET_ID_ANS', data};
}

export function saveAnswer(data) {
  return {type: 'SAVE_ANSWER', data};
}
