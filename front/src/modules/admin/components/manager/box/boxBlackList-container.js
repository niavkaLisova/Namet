import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import appHistory from '../../../../../utils/app-history'
import { withStyles } from '@material-ui/core/styles';

import * as AdminActions from '../../../actions/admin-actions'
import BlackListContainer from './blackList-container'

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
class BoxBlackListContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			visible: false,
			checked: [],
			findUser: []
		}

		this.props.dispatch(AdminActions.listUserDelete());
	}

	onChangeSelect = (event) => {
		let visible = (event.target.value.length > 0)? true: false;
	    let find = [];

	    this.props.listUser.map(user => {
	    	((user.email.includes(event.target.value))? (
	    		find.push(user)
	    	): false)
	    })

	    this.setState({
	      input: event.target.value,
	      visible: visible,
	      findUser: find
	    });
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
  			console.log('try to remove from black list', item)
  			this.props.dispatch(AdminActions.delFromBlackList(item));
  		})
  	}

	render() {
		const { classes } = this.props;

		return (
		  	<Paper className={classes.root} elevation={1}>
			    <TextField
		        	label="black list"
		          	placeholder="email"
			        margin="normal"
			        value={this.state.input}
			        onChange={this.onChangeSelect}
		        />

				{(this.state.input.length > 0)? (
					<BlackListContainer
						list={this.state.findUser}
						checked={this.state.checked}
						handleToggle={this.handleToggle}
					 /> ): (
					<BlackListContainer
						list={this.props.listUser}
						checked={this.state.checked}
						handleToggle={this.handleToggle}
					 />
				)}

				{((this.state.findUser.length > 0) || (this.props.listUser.length > 0))? (
					<p onClick={this.checkedDelete}>Delete checked</p>
				): ''}
			</Paper>
		)
	}
}

export default (withStyles(styles)(BoxBlackListContainer))