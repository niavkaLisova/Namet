import React from 'react'
import appHistory from '../../../../utils/app-history'

import * as AdminActions from '../../actions/admin-actions'
import Admin from '../admin-container'
import TimeContainer from './time-container'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'

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
					<ExpansionPanel key={user._id}>
				        <ExpansionPanelSummary>
					        <ListItem dense button>
					        	<Avatar alt='user.name' src='' onClick={() => this.goUserPage(user._id)} />
					        	<ListItemText primary={user.nickname} />
					        	<ListItemSecondaryAction>
					                <Checkbox
					                  onChange={this.props.handleToggle(user._id)}
					                  checked={this.props.checked.indexOf(user._id) !== -1}
					                />
		              			</ListItemSecondaryAction>
		              		</ListItem>
				        </ExpansionPanelSummary>
				        <ExpansionPanelDetails>
				        	<Typography>
				            	<TimeContainer time={user.banned} />
				          	</Typography>
					    </ExpansionPanelDetails>
		            </ExpansionPanel>
				)
				})}
			</List>
		)
	}
}

export default ListUserContainer