import request from 'superagent';
import _ from 'lodash';
import * as Config from '../../../utils/config';
import * as UserActions from '../../user/actions/user-actions'
import * as NotificationActions from '../../notification/actions/notification-actions'

export function allChat() {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/room/all')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'userId': localStorage.getItem('userId')
        })
        .end((error, response) => {
        	dispatch(chatUpdated(response.body));
        });
  }
}

export function newChat(user, myname, that) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/room/new')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
			    name: user.name + ' VS ' + myname,
          private: true,
 			    between: [user._id, localStorage.getItem('userId')],
          userId: localStorage.getItem('userId')
			  })
        .end((error, response) => {
        	if(response.body.success == false) {
        		return NotificationActions.show('Nie')(dispatch);
          } else {
            dispatch(chatAddRoom(response.body.data));
            if(response.body.socket) {
              that.props.socket.emit('new room', response.body.data, user._id);
            }
          	return NotificationActions.show('Room created')(dispatch);
          }
        });
  }
}

export function sendMessage(obj) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/message/new')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'roomId': obj.id,
          'text': obj.text,
          'author': localStorage.getItem('userId')
        })
        .end((error, response) => {
          obj.that.props.socket.emit('message', {'roomId': obj.id, 'msg': response.body});
          dispatch(messageAdd(response.body));

          obj.node.scrollTo(0, obj.height);  
          obj.that.props.between.map( (uid) => {
            const object = {
              uid, 
              id: obj.roomId, 
              text: obj.text, 
              that: obj.that, 
              createdAt: response.body.createdAt
            }
            dispatch(socketMessage(object));   
          })
        });
  }
}

export function socketMessage(object) {
  return (dispatch) => {
      request
        .get(Config.API_DOMAIN + 'api/users/' + object.uid)
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => {
          const user = response.body;
          if(user.online.length && user.online.length > 0) {
            user.online.map( (id_online) => {
              object.that.props.socket.emit('message global', id_online, {
                'roomId': object.id,
                'text': object.text,
                'author': localStorage.getItem('userId'),
                'createdAt': object.createdAt
              } );
            })
          }
        });
  }
}

export function getMessages(roomId, limit) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/message/all')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'roomId': roomId,
          'user': localStorage.getItem('userId'),
          'limit': limit 
        })
        .end((error, response) => {
          dispatch(messageUpdated(response.body));
        });
  }
}

export function deleteUserFromChatM(msg, len) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/room/delete/user')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          msgId: msg._id,
          user: localStorage.getItem('userId'),
          len
        })
        .end((error, response) => {
          
        });
  }
}

export function deleteUserFromChatAllM(roomId, len) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/room/delete/messages')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          roomId,
          user: localStorage.getItem('userId'),
          len
        })
        .end((error, response) => {
        });
  }
}

export function deleteRoom(roomId, len, socket) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/delete/room')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          roomId,
          user: localStorage.getItem('userId'),
          len
        })
        .end((error, response) => {
          if(response.body.success) {
            dispatch(allChat())
            dispatch(messageUpdated([]));
            dispatch(UserActions.getUser(socket))
          }
        });
  }
}

export function chatNoCreate() {
  return (dispatch) => {
    NotificationActions.show('nie')(dispatch);
  }
}

export function getMessagesRoom(roomId, limit) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/message/room')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'roomId': roomId,
          'user': localStorage.getItem('userId'),
          'limit': limit 
        })
        .end((error, response) => {
          // console.log('get messages', roomId, response.body)
          dispatch(messageUpdated(response.body.message));
        });
  }
}

export function makeRead(messageId) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/message/make/read')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'id':messageId
        })
        .end((error, response) => {
        });
  }
}

export function beetwenUpdated(roomId) {
  return (dispatch) => {
      request
        .get(Config.API_DOMAIN + 'chat/room/' + roomId)
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => {
          dispatch(beetwenNameClean(1));
          response.body.between.map( (user) => {
            dispatch(beetwenNameUpdated(user));
          })

          dispatch(roomIdUpdated({roomId: roomId, between: response.body.between}));
        });
  }
}
export function beetwenNameUpdated(user) {
  return (dispatch) => {   
    request
      .get(Config.API_DOMAIN + 'api/users/' + user)
      .set('x-access-token', localStorage.getItem('token'))
      .end((error, response) => {
        dispatch(betweenName(response.body));
      })
  }
}

export function findUser(search) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/user/find')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'id': localStorage.getItem('userId'),
          'search': search
        })
        .end((error, response) => {
          // console.log('find User', response.body)
          dispatch(chatFindUser(response.body));
        });
  }
}

export function messageRead(id, that) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/message/read')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'id': localStorage.getItem('userId'),
          'roomId': id
        })
        .end((error, response) => {
          that.props.between.map( (uid) => {
            if(uid != localStorage.getItem('userId')) {
              that.props.socket.emit('reload read message b', uid);
            }
          })
        });
  }
}

export function unreadSelect(roomId) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'chat/message/select/unread')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          'id': localStorage.getItem('userId'),
          'roomId': roomId
        })
        .end((error, response) => {
          dispatch(unreadSet({length: response.body.length, key: roomId}));
        });
  }
}

export function getUser(user1, user2, key) {
  return (dispatch) => {
      request
        .get(Config.API_DOMAIN + 'api/users/' + user1)
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => {
          let res1 = response.body;
          request
          .get(Config.API_DOMAIN + 'api/users/' + user2)
          .set('x-access-token', localStorage.getItem('token'))
          .end((error, response) => {
            dispatch(chatName({value: [res1.nickname, response.body.nickname], key: key}));
          });
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

export function betweenName(data) {
  return {type: 'BETWEEN_NAME', data};
}

export function beetwenNameClean() {
  return {type: 'BETWEEN_NAME_CLEAN'};
}

export function chatFindUser(data) {
  return {type: 'CHAT_FIND_USER', data};
}

export function chatAddRoom(data) {
  return {type: 'CHAT_ADD', data};
}

export function limitSet(data) {
  return {type: 'LIMIT_SET', data};
}

export function limitStart() {
  return {type: 'LIMIT_START'};
}

export function unreadSet(data) {
  return {type: 'UNREAD_SET', data};
}

export function chatName(data) {
  return {type: 'CHAT_NAME', data};
}
