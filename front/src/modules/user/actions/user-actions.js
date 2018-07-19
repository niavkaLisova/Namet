import request from 'superagent';
import _ from 'lodash';
import appHistory from '../../../utils/app-history'
import * as Config from '../../../utils/config';
import * as ChatActions from '../../chat/actions/chat-actions'
import * as NotificationActions from '../../notification/actions/notification-actions'

export function getUser(socket) {
  return (dispatch) => {
      request
        .get(Config.API_DOMAIN + 'api/users/' + localStorage.getItem('userId'))
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => { 
          if(response.body.banned.length > 0) {
            let d = new Date();
            let n = d.getTime();
            
            if(!(n > response.body.banned)) {
              appHistory.push('/error/' + localStorage.getItem('userId') + '/' + response.body.banned);
            }
          } else {
            dispatch(userGet(response.body));
            if(response.body.activeRoom != '0') {
              socket.emit('join room', response.body.activeRoom);
              dispatch(ChatActions.beetwenUpdated(response.body.activeRoom));
              dispatch(ChatActions.getMessagesRoom(response.body.activeRoom, 10))
            }
          }
        });
  }
}

export function sendReport(report, socket) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'admin/send/report')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          donor: report.discuss,
          report
        })
        .end((error, response) => {
          console.log('send report user', response.body);
          socket.emit('send report');
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

/** settings **/

export function settingsUpdate(settings) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/users/settings/update/')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          settings,
          id: localStorage.getItem('userId')
        })
        .end((error, response) => {
          console.log('after update', response)
        });
  }
}

export function changePassword(password, newPassword) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/users/update/password')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id: localStorage.getItem('userId'),
          password,
          newPassword
        })
        .end((error, response) => {
          console.log('change password', response.body);
         
        });
  }
} 

export function changeEmail(password, email) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/users/update/email')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id: localStorage.getItem('userId'),
          password,
          email
        })
        .end((error, response) => {
          console.log('change email', response.body);
         
        });
  }
}

export function changeName(name, that) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/users/update/name')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id: localStorage.getItem('userId'),
          name
        })
        .end((error, response) => {
          console.log('change name', response.body);
          if (response.body.success) {
            that.setState({
              name
            })
          } else {
            that.setState({
              name: that.props.user.name
            })
          }
        });
  }
}

export function changeAvatar(avatar, currentlyAvatar) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/users/update/avatar')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id: localStorage.getItem('userId'),
          avatar,
          currentlyAvatar
        })
        .end((error, response) => {
          console.log('change acatar', response.body);
         
        });
  }
} 


/** end settings **/

// export function sendEmail() {
//   return (dispatch) => {
//       request
//         .post(Config.API_DOMAIN + 'api/send/email')
//         .set('x-access-token', localStorage.getItem('token'))
//         .send({
//           'joj': 'joj'
//         })
//         .end((error, response) => {
//           // dispatch(activeSave(activeRoom))
//         });
//   }
// }


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
