import request from 'superagent';
import _ from 'lodash';
import appHistory from '../../../utils/app-history'
import * as Config from '../../../utils/config'
import {ToastContainer, ToastStore} from 'react-toasts'

export function findCollectionByCollId(id) {
  return (dispatch) => {
    request
      .post(Config.API_DOMAIN + 'record/find/collection/by/collid')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        id,
        myId: localStorage.getItem('userId')
      })
      .end((error, response) => {
        dispatch(setEditColl(response.body))
      });
  }
}

export function setEditColl(data) {
  return {type: 'SET_EDIT_LIST', data};
}
