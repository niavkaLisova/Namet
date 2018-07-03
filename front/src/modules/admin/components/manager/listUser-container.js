import React from 'react'
import appHistory from '../../../../utils/app-history'

import * as AdminActions from '../../actions/admin-actions'
import Admin from '../admin-container'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

import '../Admin.sass'

class ListUserContainer extends React.Component {
	goUserPage = (id) => {
	    appHistory.push('/user/' + id);
	}

	render() {
		return (
		  	<List class='listJunior'>
			    {this.props.list.map(user => {
				return (
				   	<ListItem key={user._id} dense button>
		            	<Avatar alt='user.name' src='' onClick={() => this.goUserPage(user._id)} />
		             	<ListItemText primary={user.nickname} onClick={this.props.handleToggle(user._id)} />
		              	<ListItemSecondaryAction>
			                <Checkbox
			                  onChange={this.props.handleToggle(user._id)}
			                  checked={this.props.checked.indexOf(user._id) !== -1}
			                />
		              	</ListItemSecondaryAction>
		            </ListItem>
				)
				})}
			</List>
		)
	}
}

export default ListUserContainer