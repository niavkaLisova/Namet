import React from 'react'
import { Link } from 'react-router-dom'

import * as AdminActions from '../../../actions/admin-actions'
import ModalUser from '../modalUser'
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
import { socketConnect } from 'socket.io-react'

import { Container, Row, Col } from 'react-grid-system'

import '../../Admin.sass'

@connect((store, ownProps) => {
  	return {
    	findUser: store.adminN.findUser,
    	user: store.user
  	};
})
class SelectBlockContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			userObj: {},
			visible: false,
			openModal: false,
			day: 7,
			reason: ''
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
			let state = new Date();
  			state.setDate(state.getDate() + this.state.day);

			if(this.props.user.admin) {
				this.props.dispatch(AdminActions.sendReport(
					{type: 'block', discuss: this.state.userObj._id, text: `Blocking user ${this.state.userObj.nickname}. ` + this.state.reason},
					this.props.socket))
			} else {
				this.props.dispatch(AdminActions.setUser(this.state.userObj, state.getTime(), this.props.socket));
			}
		} else {
			if(this.props.findUser.length > 0 && this.state.input.length > 0) {
				this.handleOpen();
			}
		}

		this.setState({
			userObj: '',
			input: '',
			visible: false,
			reason: ''
		})
	}

	onChangeSelect = event => {
		let visible = (event.target.value.length > 0)? true: false;
	 
	    this.setState({
	      input: event.target.value,
	      visible
	    });

	    this.props.dispatch(AdminActions.findUser(event.target.value));
	}

	onChangeReason = event => {
	    this.setState({
	      reason: event.target.value,
	    });
	}

	handleChangeDay = event => {
	    this.setState({ [event.target.name]: event.target.value });
	};

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
		  		<Row>
		  			<Col md={6}>
					    <TextField
				        	label="select user"
				          	placeholder="user"
					        margin="normal"
					        class="textarea"
					        value={this.state.input}
					        onChange={this.onChangeSelect}
				        />
			        </Col>
					
					<Col md={4}>
				        <FormControl class="textarea">
					        <InputLabel htmlFor="day-simple">Days</InputLabel>
					        <Select
					            value={this.state.day}
					            onChange={this.handleChangeDay}
					            inputProps={{
					              name: 'day',
					              id: 'day-simple',
					            }}
					        >
						        <MenuItem value={5}>five</MenuItem>
						        <MenuItem value={7}>seven</MenuItem>
						        <MenuItem value={10}>ten</MenuItem>
					        </Select>
					    </FormControl>
				    </Col>

				    <Col md={2}>
					    <Button variant='contained' onClick={this.setUser}>
					    	<Icon>add</Icon>
					    </Button>
				    </Col>
				</Row>

				{(this.props.user.email == 'admino')? '' :(
				    <Row>
					    <TextField
					    	required
					    	multiline
					    	rowsMax='4'
					    	class="textarea"
				        	label="Describe the reason"
				          	placeholder="reason required"
					        margin="normal"
					        value={this.state.reason}
					        onChange={this.onChangeReason}
				        />
			        </Row>
		        )}
				
				<div class='listJunior'>
				{(this.state.visible) ? (
					<SelectUserListContainer selectUser={this.selectUser} />
					) : ''}
				</div>
			</div>
		)
	}
}

export default socketConnect(SelectBlockContainer)