import React from 'react'

import Grid from '@material-ui/core/Grid'
import * as RecordActions from '../../actions/record-actions'
import * as RecordEditActions from '../../actions/recordEdit-actions'

import Parser from 'html-react-parser'
import { API_DOMAIN } from '../../../../utils/config.js'
import { connect } from "react-redux"
import appHistory from '../../../../utils/app-history'

import PointBoxContainer from './pointBox-container'

@connect((store, ownProps) => {
  return {
    full: store.record.full,
    coin: store.user.coin
  };
})
class ReadActiveContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.props.dispatch(RecordActions.findRecordById(this.props.idRecord));
  }

  handleClickOpen = () => {
    appHistory.push('/edit/' + this.props.full._id)
  };

  handleOpenFull = () => {
    let recordActive = this.props.full;
    if (this.props.full.author != localStorage.getItem('userId')) {
      this.props.dispatch(RecordActions.setReview(recordActive._id));
    }
    appHistory.push('/read/' + this.props.full._id);
  }

  componentDidUpdate(prevProps) {
  if (prevProps.idRecord != this.props.idRecord) {
      this.props.dispatch(RecordActions.findRecordById(this.props.idRecord));
    }
  }

  render() {
    return (
    <div>
      {(this.props.full)? (
        <div>
          <h2>{this.props.full.title} <span>{this.props.full.review}</span></h2>
          {(this.props.id == localStorage.getItem('userId'))? (
            <p onClick={this.handleClickOpen}>To Edit</p>
            ): ('')}
          <p onClick={this.handleOpenFull} >open</p>
          {(this.props.full.img)? (
          <img
            class='recordThumbnail'
              alt={this.props.full.title}
              src={API_DOMAIN + 'public/upload/record/' + this.props.full.img}
            />
            ): ''}
          <div>
            {Parser('' + this.props.full.text)}
          </div>
          <div>
            {(this.props.full && this.props.full.coin)? (
              <PointBoxContainer />
            ): ''}
          </div>
        
          <Grid item md={4}>
            <Grid container justify="space-between" spacing={8}> 
              {(this.props.full.language)? (
                  <Grid item md={12}>
                    Language:
                    {this.props.full.language}
                  </Grid>
              ): ''}
              {(this.props.full.gift)? (
                <Grid item md={12}>
                  Gift:
                  {this.props.full.gift}
                </Grid>
              ): ''}
            </Grid>
        </Grid>
      </div>
      ): ''}

    </div>
    )
  }
};

export default ReadActiveContainer;
