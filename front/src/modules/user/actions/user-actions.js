import request from 'superagent';
import _ from 'lodash';
import appHistory from '../../../utils/app-history'
import * as Config from '../../../utils/config';
import * as ChatActions from '../../chat/actions/chat-actions'
import * as NotificationActions from '../../notification/actions/notification-actions'
import {ToastContainer, ToastStore} from 'react-toasts'

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

export function findInfoUser(id) {
  return (dispatch) => {
      request
        .get(Config.API_DOMAIN + 'api/users/' + id)
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => { 
          dispatch(userInfo(response.body))
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
          dispatch(settingsUpdated(settings))
          ToastStore.success('Successfully updated');
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
          // console.log('change password', response.body);
          ToastStore.success('Successfully updated');
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
         if(response.body.success) {
          dispatch(emailUpdate(email));
          ToastStore.success(response.body.message);
         } else {
          ToastStore.error(response.body.message);
         }
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
            dispatch(nameUpdate(name));
            ToastStore.success(response.body.message);
            that.setState({
              name
            })
          } else {
            ToastStore.error(response.body.message)
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
          // console.log('change acatar', response.body);
          if(response.body.success) {
            dispatch(avatarUpdate(avatar))
            ToastStore.success(response.body.message);
          } else {
            ToastStore.error(response.body.message);
          }
        });
  }
} 

export function findGift(gift) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/find/gift')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id: localStorage.getItem('userId'),
          gift
        })
        .end((error, response) => {
          dispatch(setGift(response.body))
        });
  }
} 

/** end settings **/
/** record **/

export function createCollection(state) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/create/collection')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          userId: localStorage.getItem('userId'),
          title: state.title,
          describe: state.describe
        })
        .end((error, response) => {
          if (response.body.success) {
            ToastStore.success(response.body.message);
          } else {
            ToastStore.error(response.body.message);
          }
        });
  }
} 

export function removeRecordImg(img) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/remove/record/img')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          img
        })
        .end((error, response) => {
          console.log('img removed');
          // dispatch(listCollections(response.body));
        });
  }
}

export function findCollections(search) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/find/collection')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          userId: localStorage.getItem('userId'),
          search
        })
        .end((error, response) => {
          dispatch(listCollections(response.body));
        });
  }
}

export function saveRecord(record) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/save/record')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          author: localStorage.getItem('userId'),
          record
        })
        .end((error, response) => {
          console.log('save', response.body);
        });
  }
} 

export function saveEditRecord(record) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/save/edit/record')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          author: localStorage.getItem('userId'),
          record
        })
        .end((error, response) => {
          // console.log('save edit', response.body);
          
        });
  }
} 

export function setFile(data) {
  return {type: 'SET_FILE', data};
}

export function listCollections(data) {
  return {type: 'LIST_COLLECTIONS', data};
}

export function listCollectionsId(data) {
  return {type: 'LIST_COLLECTIONS_ID', data};
}

/** end record **/

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

export function settingsUpdated(data) {
  return {type: 'SETTINGS_UPDATE', data};
}

export function emailUpdate(data) {
  return {type: 'EMAIL_UPDATE', data};
}

export function nameUpdate(data) {
  return {type: 'NAME_UPDATE', data};
}

export function userGet(data) {
  return {type: 'USER_GET', data};
}

export function activeSave(data) {
  return {type: 'ACTIVE_SAVE', data};
}

export function avatarUpdate(data) {
  return {type: 'AVATAR_UPDATE', data};
}

export function textSave(data) {
  return {type: 'TEXT_SAVE', data};
}

export function setGift(data) {
  return {type: 'SET_GIFT', data};
}

export function userInfo(data) {
  return {type: 'USER_INFO', data};
}

