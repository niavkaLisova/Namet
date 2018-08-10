import React from 'react'

import Grid from '@material-ui/core/Grid'
import * as RecordActions from '../../actions/record-actions'
import * as RecordEditActions from '../../actions/recordEdit-actions'

import Parser from 'html-react-parser'
import { API_DOMAIN } from '../../../../utils/config.js'
import { connect } from "react-redux"
import appHistory from '../../../../utils/app-history'
import EditModal from '../edit/editModal'

@connect((store, ownProps) => {
  return {
    recordActive: store.record.recordActive,
    topRecords: store.record.topRecords
  };
})
class ReadContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleClickOpenModal = () => {
    this.setState({ open: true });
  };

  handleClickOpen = () => {
    appHistory.push('/edit/' + this.props.recordActive._id)
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  handleOpenFull = () => {
    appHistory.push('/read/' + this.props.recordActive._id);
  }

  render() {
    return (
    <div>
      <EditModal
        open={this.state.open}
        id={this.props.id}
        handleCloseModal={this.handleCloseModal}
       />
      {(this.props.recordActive.title)? (
      	<div>
	        <h2>{this.props.recordActive.title} <span>{this.props.recordActive.review}</span></h2>
          <p onClick={this.handleClickOpenModal}>To Edit Modal</p>
          <p onClick={this.handleClickOpen}>To Edit</p>
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
    				{this.props.recordActive.describe}
    			</Grid>
    		): ''}
    		{(this.props.recordActive.genre)? (
    			<Grid item md={2}>
    				{this.props.recordActive.genre}
    			</Grid>
    		): ''}
    		
			<Grid item md={4}>
				<Grid container justify="space-between" spacing={8}> 
					{(this.props.recordActive.language)? (
    					<Grid item md={12}>
    						{this.props.recordActive.language}
    					</Grid>
					): ''}
					{(this.props.recordActive.gift)? (
						<Grid item md={12}>
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
