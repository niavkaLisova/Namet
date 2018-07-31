import request from 'superagent';
import _ from 'lodash';
import appHistory from '../../../utils/app-history'
import * as Config from '../../../utils/config'
import {ToastContainer, ToastStore} from 'react-toasts'

export function findRecordsByCollId(id) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/records/collId')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id
        })
        .end((error, response) => {
          dispatch(setRecordsList(response.body));
        });
  }
}

export function findCollectionsById(id) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/collections/id')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id,
          myId: localStorage.getItem('userId')
        })
        .end((error, response) => {
          dispatch(setcollectionsList(response.body));
        });
  }
}

export function findRecoordswithoutCollections() {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/collections/none')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          myId: localStorage.getItem('userId')
        })
        .end((error, response) => {
          dispatch(setRecordsListNC(response.body));
        });
  }
}

export function updateRecordCreatedAt(id) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/update/record/at')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id
        })
        .end((error, response) => {
          dispatch(findRecordTop());
        });
  }
}

export function findRecordTop() {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/records/top')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          author: localStorage.getItem('userId')
        })
        .end((error, response) => {
          dispatch(setTopRecords(response.body));
        });
  }
}

export function searchRecord(search) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/search')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          search,
          author: localStorage.getItem('userId')
        })
        .end((error, response) => {
          dispatch(setSearch(response.body))
        });
  }
}

export function setcollectionsList(data) {
  return {type: 'SET_COLLECTIONS', data};
}

export function setRecordsList(data) {
  return {type: 'SET_RECORDS', data};
}

export function setRecordsListNC(data) {
  return {type: 'SET_RECORDS_NC', data};
}

export function setRecordActive(data) {
  return {type: 'RECORD_ACTIVE', data};
}

export function setTopRecords(data) {
  return {type: 'TOP_RECORDS', data};
}

export function setSearch(data) {
  return {type: 'SET_SEARCH', data};
}

