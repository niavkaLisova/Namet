import React from 'react';
import { API_DOMAIN } from '../../../../utils/config.js'

import * as UserActions from '../../actions/user-actions'
import * as RecordActions from '../../actions/record-actions'
import appHistory from '../../../../utils/app-history'
import { socketConnect } from 'socket.io-react'

import { Container, Row, Col } from 'react-grid-system'
import Button from '@material-ui/core/Button'
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
      <div class='wall'>
        {this.props.wall.slice(0, 8).map(record => {
          return (
            <div 
              key={record._id} 
              class='wallRecord'
             >
              <h3 class='wallHead'>{record.title}</h3>
              {(record.img)? (
                <img
                  class='wallImg'
                  src={API_DOMAIN + 'public/upload/record/' + record.img}
                  />
                ): ''}
              {(record.text && record.text.length > 1)? 
                (Parser('' + record.text.slice(0, 65))): ''}
              <div class='wallBottom'>
                <p>Review: {record.review}</p>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => this.goToRecord(record)}
                 >
                  Read
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
};

export default socketConnect(WallContainer);
