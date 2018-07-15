import React from 'react'
import appHistory from '../../../../utils/app-history'

import * as AdminActions from '../../actions/admin-actions'
import Admin from '../admin-container'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import '../Admin.sass'

export default class ListTeamContainer extends React.Component {
	render() {
		return (
		  	<List>
		  		List all Team
			</List>
		)
	}
}
 