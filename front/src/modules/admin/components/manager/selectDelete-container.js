import React from 'react'
import { Link } from 'react-router-dom'

import * as AdminActions from '../../actions/admin-actions'
import ModalUser from './ModalUser'
import SelectUserListContainer from './selectUserList-container'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Icon from '@material-ui/core/Icon'
import { connect } from 'react-redux'

import '../Admin.sass'

@connect((store, ownProps) => {
  	return {
    	findUser: store.adminN.findUser
  	};
})
export default class SelectBlockContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			userObj: {},
			visible: false,
			openModal: false,
			day: 7
		}
	}

	handleOpen = () => {
		this.setState({openModal: true});
	};

	handleClose = () => {
		this.setState({openModal: false});
	};

	selectUser = (user) => {
		this.setState({
			userObj: user,
			input: user.nickname
		})
	}

	setUser = () => {
		if(this.state.userObj._id && this.state.userObj.nickname == this.state.input) {
			this.props.dispatch(AdminActions.setUserDelete(this.state.userObj._id, this.state.userObj.email));
		} else {
			consle.log('no')
			if(this.props.findUser.length > 0 && this.state.input.length > 0) {
				this.handleOpen();
			}
		}

		this.setState({
			userObj: '',
			input: '',
			visible: false
		})
	}

	onChangeSelect = (event) => {
		let visible = (event.target.value.length > 0)? true: false;
	 
	    this.setState({
	      input: event.target.value,
	      visible
	    });

	    this.props.dispatch(AdminActions.findUserDelete(event.target.value));
	}

	render() {
		return (
		  	<div>
		  		<ModalUser
			  		open={this.state.openModal}
			  		handleOpen={this.handleOpen}
			  		handleClose={this.handleClose}
			  		findUser={this.props.findUser}
			  		selectUser={this.selectUser}
			  		setUser={this.setUser}
			  		>
		  		</ModalUser>
			    <TextField
		        	label="select user"
		          	placeholder="user"
			        margin="normal"
			        value={this.state.input}
			        onChange={this.onChangeSelect}
		        />

			    <Button variant='contained' onClick={this.setUser}>
			    	<Icon>add</Icon>
			    </Button>
				
				<div class='listJunior'>
				{(this.state.visible) ? (
					<SelectUserListContainer selectUser={this.selectUser} />
					) : ''}
				</div>
			</div>
		)
	}
}