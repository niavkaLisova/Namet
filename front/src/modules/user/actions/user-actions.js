import request from 'superagent';
import _ from 'lodash';
import * as Config from '../../../utils/config';
import * as ChatActions from '../../chat/actions/chat-actions'
import * as NotificationActions from '../../notification/actions/notification-actions'

export function getUser(socket) {
  return (dispatch) => {
      request
        .get(Config.API_DOMAIN + 'api/users/' + localStorage.getItem('userId'))
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => {
          dispatch(userGet(response.body));
          if(response.body.activeRoom != '0') {
            socket.emit('join room', response.body.activeRoom);
            dispatch(ChatActions.beetwenUpdated(response.body.activeRoom));
            dispatch(ChatActions.getMessagesRoom(response.body.activeRoom, 10))
          }
        });
  }
}

export function updateUser(user) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/users/' + localStorage.getItem('userId'))
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          name: user.name,
          email: user.email,
          surname: user.surname
        })
        .end((error, response) => {
          dispatch(userUpdated(response.body));
          return NotificationActions.show('User updated successfully')(dispatch);
        });
  }
}

export function userDataUpdated(user) {
  return (dispatch) => {
    dispatch({
      type: 'USER_DATA_UPDATED',
      user: user
    });
  }
}

export function getUnreadMessages() {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/message/unread')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'user': localStorage.getItem('userId'),
        })
        .end((error, response) => {
          dispatch(unreadUpdate(response.body.length));
        });
  }
}

export function selectActiveRoom(activeRoom) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/users/room/active/' + localStorage.getItem('userId'))
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'active': activeRoom
        })
        .end((error, response) => {
          dispatch(activeSave(activeRoom))
        });
  }
}

export function unreadUpdate(data) {
  return {type: 'UNREAD_UPDATE', data};
}

export function userUpdated(data) {
  return {type: 'USER_UPDATED', data};
}

export function userGet(data) {
  return {type: 'USER_GET', data};
}

export function activeSave(data) {
  return {type: 'ACTIVE_SAVE', data};
}
