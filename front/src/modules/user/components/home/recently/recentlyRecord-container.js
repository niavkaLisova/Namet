import React from 'react';
import { API_DOMAIN } from '../../../../../utils/config.js'

import * as UserActions from '../../../actions/user-actions'
import * as RecordActions from '../../../actions/record-actions'
import appHistory from '../../../../../utils/app-history'

import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import Parser from 'html-react-parser'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

@connect((store, ownProps) => {
  return {
    recently: store.record.recently
  };
})
class RecentlyRecordContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(RecordActions.findRecentlyRerords(50));
  }

  goToRecord = record => {
    appHistory.push('/read/' + record._id)
  }

  render() {
    return (
      <div class='recently'>
        <Link to="/recently/records">See More</Link>
        {this.props.recently.slice(0,15).map(record => {
          return (
            <div
              key={record._id}
              onClick={() => this.goToRecord(record)}
              class='pointer'
             >
              <Paper elevation={1}>
                <Typography variant="headline" component="h3">
                 {record.title}
                </Typography>
                <div>
                  {(record.text && record.text.length > 1)? 
                    (
                    <div>
                      {(record.text.length > 65)?
                        ( Parser('' + record.text.slice(0, 65) + '...') )
                        : (Parser('' + record.text.slice(0, 65)))
                      }
                    </div>
                  ): ''}
                </div>
              </Paper>
            </div>
          )
        })}
      </div>
    )
  }
};

export default RecentlyRecordContainer;
