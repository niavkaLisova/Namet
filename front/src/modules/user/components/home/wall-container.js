import React from 'react';
import { API_DOMAIN } from '../../../../utils/config.js'

import * as UserActions from '../../actions/user-actions'
import * as RecordActions from '../../actions/record-actions'
import appHistory from '../../../../utils/app-history'
import { socketConnect } from 'socket.io-react'

import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import Parser from 'html-react-parser'

@connect((store, ownProps) => {
  return {
    wall: store.record.wall
  };
})
class WallContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  goToRecord = record => {
    appHistory.push('/read/' + record._id)
  }

  render() {
    return (
      <div>
        {this.props.wall.map(record => {
          return (
            <div key={record._id} onClick={() => this.goToRecord(record)}>
              <hr />
              <h3>{record.title}</h3>
              {(record.text && record.text.length > 1)? 
                (Parser('' + record.text.slice(0, 65))): ''}
              <div>Review: {record.review}</div>
            </div>
          )
        })}
      </div>
    )
  }
};

export default socketConnect(WallContainer);
