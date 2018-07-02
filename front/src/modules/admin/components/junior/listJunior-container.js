import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import appHistory from '../../../../utils/app-history'
import { withStyles } from '@material-ui/core/styles';

import * as AdminActions from '../../actions/admin-actions'
import Admin from '../admin-container'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';

import '../Admin.sass'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

@connect((store, ownProps) => {
  	return {
  		listJunior: store.adminN.listJunior
  	};
})
class ListJuniorContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			visible: false,
			checked: [],
			findJunior: []
		}

		this.props.dispatch(AdminActions.listJunior());
	}

	onChangeSelect = (event) => {
		let visible = (event.target.value.length > 0)? true: false;
	    let find = [];

	    this.props.listJunior.map(junior => {
	    	((junior.nickname.includes(event.target.value))? (
	    		find.push(junior)
	    	): false)
	    })

	    this.setState({
	      input: event.target.value,
	      visible: visible,
	      findJunior: find
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
  			this.props.dispatch(AdminActions.setJunior(item, false));
  		})
  	}

	render() {
		const { classes } = this.props;

		return (
		  	<Paper className={classes.root} elevation={1}>
			    <TextField
		        	label="find junior"
		          	placeholder="junior"
			        margin="normal"
			        value={this.state.input}
			        onChange={this.onChangeSelect.bind(this)}
		        />

		        {(this.state.input.length > 0)? (
		        	<List class='listJunior'>
					    {this.state.findJunior.map(junior => {
							return (
							   	<ListItem key={junior._id} dense button>
					            	<Avatar alt='junior.name' src='' onClick={() => this.goUserPage(junior._id)} />
					              <ListItemText primary={junior.nickname} onClick={() => this.goUserPage(junior._id)} />
					              <ListItemSecondaryAction>
					                <Checkbox
					                  onChange={this.handleToggle(junior._id)}
					                  checked={this.state.checked.indexOf(junior._id) !== -1}
					                />
					              </ListItemSecondaryAction>
					            </ListItem>
							)
						})}
					</List>
				): (
					<List class='listJunior'>
					    {this.props.listJunior.map(junior => {
							return (
							   	<ListItem key={junior._id} dense button>
					            	<Avatar alt='junior.name' src='' onClick={() => this.goUserPage(junior._id)} />
					              <ListItemText primary={junior.nickname} onClick={() => this.goUserPage(junior._id)} />
					              <ListItemSecondaryAction>
					                <Checkbox
					                  onChange={this.handleToggle(junior._id)}
					                  checked={this.state.checked.indexOf(junior._id) !== -1}
					                />
					              </ListItemSecondaryAction>
					            </ListItem>
							)
						})}
					</List>
				)}
				<p onClick={this.checkedDelete}>Delete checked</p>
			</Paper>
		)
	}
}

export default (withStyles(styles)(ListJuniorContainer))