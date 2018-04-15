import request from 'superagent';
import _ from 'lodash';
import * as Config from '../../../utils/config';
import * as NotificationActions from '../../notification/actions/notification-actions'

export function allChat() {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/room/all')
        .set('x-access-token', localStorage.getItem('token'))
        .send({'userId': localStorage.getItem('userId')})
        .end((error, response) => {
        	dispatch(chatUpdated(response.body));
        });
  }
}

export function newChat(id) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/room/new')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
			name: id + 'vs' + localStorage.getItem('userId'),
        	private: true,
 			between: [id, localStorage.getItem('userId')]
			})
        .end((error, response) => {
        	if(response.body.success == false) {
        		return NotificationActions.show('Niea')(dispatch);
          	} else {
          		// dispatch(userUpdated(response.body));
          		return NotificationActions.show('Room created')(dispatch);
          	}
        });
  }
}

export function sendMessage(id, text, user, that) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/message/new')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'roomId': id,
          'text': text,
          'author': localStorage.getItem('userId'),
          'user': user
        })
        .end((error, response) => {
          console.log(that);
          that.props.socket.emit('message', response.body)
          // if(response.body.user == localStorage.getItem('userId')) {
          //   dispatch(messageAdd(response.body));
          // }
        });
  }
}

export function getMessages(roomId) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/message/all')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'roomId': roomId,
          'user': localStorage.getItem('userId')
        })
        .end((error, response) => {
          // console.log('action', response.body);
          dispatch(messageUpdated(response.body));
        });
  }
}

export function beetwenUpdated(roomId) {
  return (dispatch) => {
      request
        .get(Config.API_DOMAIN + 'chat/room/' + roomId)
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => {
          dispatch(roomIdUpdated({roomId: roomId, between: response.body.between}));
        });
  }
}

export function chatUpdated(data) {
	return {type: 'CHAT_UPDATED', data};
}

export function roomIdUpdated(data) {
  return {type: 'ROOM_ID_SET', data};
}

export function messageUpdated(data) {
  return {type: 'MESSAGE_SET', data};
}

export function messageAdd(data) {
  return {type: 'MESSAGE_ADD', data};
}