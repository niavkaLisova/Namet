import React from 'react'
import { socketConnect } from 'socket.io-react'

import * as TeamActions from '../../actions/team-actions'
import appHistory from '../../../../utils/app-history'

import { connect } from "react-redux"
import { API_DOMAIN } from '../../../../utils/config.js'
import Parser from 'html-react-parser'
import Button from '@material-ui/core/Button'

@connect((store, ownProps) => {
    return {
    	recentlyRecord: store.team.recentlyRecord
    };
})
class RecordContainer extends React.Component {
	goToRecord = record => {
    appHistory.push('/read/' + record._id)
  }
  
	render() {
		return (
			<div class='wall'>
				{this.props.recentlyRecord.slice(0, 8).map(record => {
					return (
						<div key={record._id} class='wallRecord'>
							<h3 class='wallHead'>{record.title}</h3>
              {(record.img)? (
                <img
                  class='emblem'
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
}

export default RecordContainer;
