import React from 'react'
import appHistory from '../../../../utils/app-history'
import { connect } from 'react-redux'
import classNames from 'classnames'
import axios, { post } from 'axios';
import { API_DOMAIN } from '../../../../utils/config.js'

import * as AdminActions from '../../actions/admin-actions'
import Admin from '../admin-container'
import ModalTeam from './modalTeam'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

import '../Admin.sass'

@connect((store, ownProps) => {
  return {
  	teams: store.adminN.team
  };
})

export default class ListTeamContainer extends React.Component {
	constructor(props) {
		super(props);
		this.props.dispatch(AdminActions.getAllTeam());

		this.state = {
			open: false,
			team: '',
            submitted: false,
            file: null
		}
	}

	editItem = team => {
		if (team._id == this.props.active) {
			this.setState({ team })
			this.handleClickOpen();
		}
	}

	handleClickOpen = () => {
    	this.setState({ open: true });
  	}

  	handleClose = () => {
    	this.setState({ open: false });
  	}

  	handleChange = event => {
    	const { team } = this.state;
        team[event.target.name] = event.target.value;
        this.setState({ team });
    }

    handleSubmit = () => {
    	this.handleClose();

        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });

        if (this.state.file == null) {
	        this.props.dispatch(AdminActions.editTeam(false, this.state.team));
        } else {
	     	this.fileUpload(this.state.file).then((response)=>{	
	    		this.props.dispatch(AdminActions.editTeam(response.data, this.state.team));
	    		const { team } = this.state;
	    		team.emblem = response.data;
	    		this.setState({ team });
	    	})
        }

       
    }

    handleChangeImage = event => {
		const file = event.target.files[0];;
		this.setState({
			file: file
		});
	}

	handleDeleteTeam = () => {
		this.handleClose();
		let newTeams = this.props.teams.filter(item => item._id != this.state.team._id);
		this.props.dispatch(AdminActions.setTeam(newTeams));
		this.props.dispatch(AdminActions.deleteTeam(this.state.team))
	}

	fileUpload = file =>{
	    const url = API_DOMAIN +'api/upload/team';
	    const formData = new FormData(this);
    	formData.append('file', file);
    	const config = {
        	headers: {
            	'content-type': 'multipart/form-data'
        	}
    	}

    	return  post(url, formData, config)
	}

	render() {
		return (
		  	<List> 
		  		<ModalTeam 
		  			open={this.state.open}
		  			handleClose={this.handleClose}
		  			team={this.state.team}
		  			handleChange={this.handleChange}
		  			handleSubmit={this.handleSubmit}
		  			submitted={this.state.submitted}
		  			handleChangeImage={this.handleChangeImage}
		  			handleDeleteTeam={this.handleDeleteTeam}
		  		 />
		  		{this.props.teams.map(team => (
	            	<ListItem 
	            		key={team._id} 
	            		dense 
	            		button 
	            		class={classNames({'itemActive': (this.props.active) == team._id})}
	            		style={(team._id == this.props.active) ? { borderLeft: `5px solid ${team.color}`, borderRightColor:  team.color } : {}}
	            		>
	              		<Avatar 
	              			alt='team'
	              			src = {API_DOMAIN + 'public/upload/team/' + team.emblem}
	              			onClick={() => this.props.activeItem(team._id)}
	              		/>
	              		<ListItemText primary={team.name} onClick={() => this.props.activeItem(team._id)} />
	              		<ListItemSecondaryAction onClick={() => this.editItem(team)}>
	              			{(this.props.active == team._id)? (
	              				<Button variant="contained" size='small' aria-label='Edit'>
							    	<Icon>edit_icon</Icon>
							    </Button>
	              				): (
	              				<div style={{'backgroundColor': team.color, 'width': 50, 'height': 20}}></div>
	              			)}
	              		</ListItemSecondaryAction>
	            	</ListItem>
	          	))}
	        </List>
		)
	}
}
 