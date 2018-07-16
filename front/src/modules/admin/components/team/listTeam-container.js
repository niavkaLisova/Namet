import React from 'react'
import appHistory from '../../../../utils/app-history'
import { connect } from 'react-redux'
import classNames from 'classnames'

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
    	console.log('change')
    	if(event.target.name == 'color') {
    		console.log('COLLOR', team.color)
    	}
        team[event.target.name] = event.target.value;
        this.setState({ team });
    }

    handleSubmit = () => {
    	this.handleClose();

        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
        console.log('state after submit', this.state);
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
	              			src={'/upload/'+ team.emblem + '.jpg'}
	              			onClick={() => this.props.activeItem(team._id)}
	              		/>
	              		<ListItemText primary={team.name} onClick={() => this.props.activeItem(team._id)} />
	              		<ListItemSecondaryAction onClick={() => this.editItem(team)}>
	              			{(this.props.active == team._id)? (
	              				<Button variant='fab' size='small' aria-label='Edit'>
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
 