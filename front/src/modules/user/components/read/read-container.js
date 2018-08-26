import React from 'react'

import Grid from '@material-ui/core/Grid'
import * as RecordActions from '../../actions/record-actions'
import * as RecordEditActions from '../../actions/recordEdit-actions'

import Parser from 'html-react-parser'
import { API_DOMAIN } from '../../../../utils/config.js'
import { connect } from "react-redux"
import appHistory from '../../../../utils/app-history'

@connect((store, ownProps) => {
  return {
    recordActive: store.record.recordActive
  };
})
class ReadContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleClickOpen = () => {
    appHistory.push('/edit/' + this.props.recordActive._id)
  };

  handleOpenFull = () => {
    let recordActive = this.props.recordActive;
    if (this.props.recordActive.author != localStorage.getItem('userId')) {
      this.props.dispatch(RecordActions.setReview(recordActive._id));
    }
    appHistory.push('/read/' + this.props.recordActive._id);
  }

  render() {
    return (
    <div>
      {(this.props.recordActive.title)? (
      	<div>
	        <h2>{this.props.recordActive.title} <span>{this.props.recordActive.review}</span></h2>
          {(this.props.id == localStorage.getItem('userId'))? (
            <p onClick={this.handleClickOpen}>To Edit</p>
          ): (
            <p>Send Points</p>
          )}
          <p onClick={this.handleOpenFull} >open</p>
          {(this.props.recordActive.img)? (
	        <img
	          class='recordThumbnail'
              alt={this.props.recordActive.title}
              src={API_DOMAIN + 'public/upload/record/' + this.props.recordActive.img}
            />
            ): ''}
	        <div>
	        	{Parser('' + this.props.recordActive.text)}
	        </div>    
    	</div>
    	): ''}
    	<Grid container justify="space-between" spacing={8}>  
    		{(this.props.recordActive.describe)? (
    			<Grid item md={6}>
            Descibe: 
    				{this.props.recordActive.describe}
    			</Grid>
    		): ''}
    		{(this.props.recordActive.genre)? (
    			<Grid item md={2}>
            Genre:
    				{this.props.recordActive.genre}
    			</Grid>
    		): ''}
    		
			<Grid item md={4}>
				<Grid container justify="space-between" spacing={8}> 
					{(this.props.recordActive.language)? (
    					<Grid item md={12}>
                Language:
    						{this.props.recordActive.language}
    					</Grid>
					): ''}
					{(this.props.recordActive.gift)? (
						<Grid item md={12}>
              Gift:
							{this.props.recordActive.gift}
						</Grid>
					): ''}
				</Grid>
			</Grid>
    	</Grid>
    </div>
    )
  }
};

export default ReadContainer;
