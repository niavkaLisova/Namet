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

export function findRecordsByCollIdGuest(id, that) {
  return (dispatcrecordIdh) => {
      request
        .post(Config.API_DOMAIN + 'record/find/records/collId/guest')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id
        })
        .end((error, response) => {
          that.dispatch(setRecordsList(response.body))
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

export function findRecoordswithoutCollections(author) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/collections/none')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          myId: author
        })
        .end((error, response) => {
          dispatch(setRecordsListNC(response.body));
        });
  }
}

export function findRecoordswithoutCollectionsGuest(author) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/collections/none/guest')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          myId: author
        })
        .end((error, response) => {
          dispatch(setRecordsListNC(response.body));
        });
  }
}

export function updateRecordCreatedAt(id, author) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/update/record/at')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id
        })
        .end((error, response) => {
          dispatch(findRecordTop(author));
        });
  }
}

export function findRecordTop(author) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/records/top')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          author
        })
        .end((error, response) => {
          dispatch(setTopRecords(response.body));
        });
  }
}

export function findRecordTopGuest(author) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/records/top/guest')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          author
        })
        .end((error, response) => {
          dispatch(setTopRecords(response.body));
        });
  }
}

export function searchRecord(search, author) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/search')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          search,
          author,
        })
        .end((error, response) => {
          dispatch(setSearch(response.body))
        });
  }
}

export function searchRecordGuest(search, author) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/search/guest')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          search,
          author,
        })
        .end((error, response) => {
          dispatch(setSearch(response.body))
        });
  }
}

export function setReview(recordId) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/set/review')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          recordId
        })
        .end((error, response) => {
          let record = response.body.doc;
          record.review = String(Number(record.review) + 1);
          dispatch(setRecordActive(record));
        });
  }
}

export function findRecordById(recordId) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/full/id')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          recordId
        })
        .end((error, response) => {
          dispatch(setFull(response.body));
        });
  }
}

export function removeRecordById(recordId) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/remove/record/id')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          recordId
        })
        .end((error, response) => {
        });
  }
}

export function collectionUpdate(record, newList) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/record/update')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          record
        })
        .end((error, response) => {
          ToastStore.success('updated');
          if (typeof(newlist) != 'undefined') dispatch(setcollectionsList(newlist))
          // dispatch(findCollectionsById(localStorage.getItem('userId')));
        });
  }
}

export function removeCollectionById(collectionId) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/remove/section/id')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          sectionId: collectionId
        })
        .end((error, response) => {
          ToastStore.success('removed');
        });
  }
}

export function findWallRecord(idUser) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/record/wall')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          idUser
        })
        .end((error, response) => {
          dispatch(setWallRecord(response.body));
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

export function setFull(data) {
  return {type: 'SET_FULL', data};
}

export function setWallRecord(data) {
  return {type: 'SET_WALL_RECORD', data};
}
