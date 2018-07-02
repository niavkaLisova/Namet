import React from 'react'
import * as AdminActions from '../../actions/admin-actions'

import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

class AppBarContainer extends React.Component {
	render() {
		const classes = this.props.classes;
		const theme = this.props.theme;

	    return (
	        <AppBar
	          position="absolute"
	          class={classNames(classes.appBar, this.props.open && classes.appBarShift)}
	        >
	          <Toolbar disableGutters={!this.props.open}>
	            <IconButton
	              color="inherit"
	              aria-label="open drawer"
	              onClick={this.props.handleDrawerOpen}
	              class={classNames(classes.menuButton, this.props.open && classes.hide)}
	            >
	              <Icon>chevron_right</Icon>
	            </IconButton>
	            <Typography variant="title" color="inherit" noWrap>
	              Admin Panel Namet
	            </Typography>
	          </Toolbar>
	        </AppBar> 
	    )      
	}
}

export default AppBarContainer;
