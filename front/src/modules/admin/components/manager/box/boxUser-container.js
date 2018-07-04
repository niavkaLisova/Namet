import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import appHistory from '../../../../../utils/app-history'
import { withStyles } from '@material-ui/core/styles';

import * as AdminActions from '../../../actions/admin-actions'
import ListUserContainer from './listUser-container'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';

import '../../Admin.sass'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

@connect((store, ownProps) => {
  	return {
  		listUser: store.adminN.listUser
  	};
})
class BoxContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			visible: false,
			checked: [],
			findUser: []
		}

		this.props.dispatch(AdminActions.listUser());
	}

	onChangeSelect = (event) => {
		let visible = (event.target.value.length > 0)? true: false;
	    let find = [];

	    this.props.listUser.map(user => {
	    	((user.nickname.includes(event.target.value))? (
	    		find.push(user)
	    	): false)
	    })

	    this.setState({
	      input: event.target.value,
	      visible: visible,
	      findUser: find
	    });
	}

	goUserPage = (id) => {
	    appHistory.push('/user/' + id);
	}

	handleToggle = value => () => {
	    const { checked } = this.state;
	    const currentIndex = checked.indexOf(value);
	    const newChecked = [...checked];

	    if (currentIndex === -1) {
	      newChecked.push(value);
	    } else {
	      newChecked.splice(currentIndex, 1);
	    }

	    this.setState({
	      checked: newChecked,
	    });
  	};

  	checkedDelete = () => {
  		this.setState({
  			input: ''
  		})

  		this.state.checked.map((item) => {
  			this.props.dispatch(AdminActions.setUser(item, ''));
  		})
  	}

	render() {
		const { classes } = this.props;

		return (
		  	<Paper className={classes.root} elevation={1}>
			    <TextField
		        	label="find banned user"
		          	placeholder="user"
			        margin="normal"
			        value={this.state.input}
			        onChange={this.onChangeSelect.bind(this)}
		        />

				{(this.state.input.length > 0)? (
					<ListUserContainer 
						list={this.state.findUser}
						checked={this.state.checked}
						handleToggle={this.handleToggle}
					>
					</ListUserContainer> ): (
					<ListUserContainer 
						list={this.props.listUser}
						checked={this.state.checked}
						handleToggle={this.handleToggle}
					>
					</ListUserContainer>
				)}

				{((this.state.findUser.length > 0) || (this.props.listUser.length > 0))? (
					<p onClick={this.checkedDelete}>Delete checked</p>
				): ''}
			</Paper>
		)
	}
}

export default (withStyles(styles)(BoxContainer))