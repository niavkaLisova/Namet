import request from 'superagent';
import _ from 'lodash';
import appHistory from '../../../utils/app-history'
import * as UserActions from '../../user/actions/user-actions'
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
          // dispatch(setRecordActive(record));
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

export function findRecentlyRerords(limit) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/record/recently')
        .set('x-access-token', localStorage.getItem('token'))
        .send(
          limit
        )
        .end((error, response) => {
          dispatch(setRecentlyRecord(response.body));
        });
  }
}

export function getTeamByTitle(title, count, cle) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/find/team/id')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          title   
        })
        .end((error, response) => {
          if (response.body.success) {
            if (count != 'udefined') {
              let doc = response.body.doc;
              doc.count = count;

              dispatch(setTeamInfo({key: cle, doc}));
            }
          }
        });
  }
}

export function getTeamById(id) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/find/team/by/id')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          id   
        })
        .end((error, response) => {
          dispatch(myTeamInfo(response.body))
        });
  }
}

export function sendPoint(idRecord, idReceiver, point) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/send/point')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          idRecord,
          idUser: localStorage.getItem('userId'),
          point
        })
        .end((error, response) => {
          if (response.body.success){
            ToastStore.success(point + ' send')
            dispatch(findRecordById(idRecord));
            dispatch(givePoint(idReceiver, point))
          }
        });
  }
}

export function takePoint(idRecord, idReceiver, point) {
  return (dispatch) => {
    request
      .post(Config.API_DOMAIN + 'api/take/point')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        idUser: localStorage.getItem('userId'),
        point
      })
      .end((error, response) => {
        if (response.body.success){
          dispatch(sendPoint(idRecord, idReceiver, point));
          dispatch(UserActions.coinUpdate(response.body.doc))
        }
      });
  }
}

export function givePoint(idUser, point) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/give/point')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          idUser,
          point
        })
        .end((error, response) => {
        });
  }
}

export function adminDecision(record, team) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/admin/decision')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          record,
          team,
          idAdmin: localStorage.getItem('userId')
        })
        .end((error, response) => {
          if (response.body.success) {
            ToastStore.success('You made decision')
          } else {
            ToastStore.error('Error')
          }
        });
  }
}

export function getAdminDecision(team) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'record/admin/get/decision/team')
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          team
        })
        .end((error, response) => {
          dispatch(setAadminDecisionList(response.body));
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

export function setsetTeamInfoRecordActive(data) {
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

export function setRecentlyRecord(data) {
  return {type: 'SET_RECENTLY_RECORD', data};
}

export function setTeamInfo(data) {
  return {type: 'SET_TEAM_INFO', data};
}

export function myTeamInfo(data) {
  return {type: 'SET_MY_TEAM', data};
}

export function myTeamInfoStart(data) {
  return {type: 'SET_START_TEAM', data};
}

export function setAadminDecisionList(data) {
  return {type: 'SET_ADMIN_DECISION', data};
}
