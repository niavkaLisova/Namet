import request from 'superagent';
import _ from 'lodash';
import * as Config from '../../../utils/config';
import { ToastContainer, ToastStore } from 'react-toasts'

export function createGame(thema) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'game/create/')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        thema,
        author: localStorage.getItem('userId')
      })
      .end((error, response) => {
        console.log('create action after', response.body)
        // dispatch(betweenName(response.body));
      })
  }
}

export function findByAuthor(author) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'game/find/game/by/author')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        author
      })
      .end((error, response) => {
        if (response.body.success) {
          dispatch(saveGamesAuthor(response.body.doc));
        }
      })
  }
}

export function findGameAll() {
  return (dispatch) => {   
    request
      .get(Config.API_DOMAIN + 'game/find/game/all')
      .set('x-access-token', localStorage.getItem('token'))
      .end((error, response) => {
        if (response.body.success) {
          dispatch(saveGamesAll(response.body.doc));
        }
      })
  }
}

export function findRecorWith(search) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'game/find/record/search')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        author: localStorage.getItem('userId'),
        search
      })
      .end((error, response) => {
        if (response.body.success) {
          dispatch(saveRecords(response.body.doc));
        }
      })
  }
}

export function joinGame(idGame, idRecord) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'game/join/record')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        author: localStorage.getItem('userId'),
        idRecord,
        idGame
      })
      .end((error, response) => {
        if (response.body.success) {
          ToastStore.success('Joined')
        } else {
          ToastStore.error('Error')
        }
      })
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
        dispatch(saveRecordInfo({ key:recordId, doc: response.body }))
      })
  }
}

export function vote(idGame, idRecord) {
  return (dispatch) => {   
    request
      .post(Config.API_DOMAIN + 'game/vote/record')
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        idUser: localStorage.getItem('userId'),
        idGame,
        idRecord
      })
      .end((error, response) => {
        if (response.body.success) {
          ToastStore.success('Voted')
        } else {
          ToastStore.error('Error')
        }
      })
  }
}

export function saveGamesAuthor(data) {
  return {type: 'SAVE_GAMES_AUTHOR', data};
}

export function saveGamesAll(data) {
  return {type: 'SAVE_GAMES_ALL', data};
}

export function saveRecords(data) {
  return {type: 'SAVE_RECORDS', data};
}

export function saveRecordInfo(data) {
  return {type: 'SAVE_RECORD_INFO', data};
}
