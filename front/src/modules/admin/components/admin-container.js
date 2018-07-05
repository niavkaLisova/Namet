import React from 'react'
import * as AdminActions from '../actions/admin-actions'
import * as UserActions from '../../user/actions/user-actions'
import * as DashboardActions from '../../dashboard/actions/dashboard-actions'
import { connect } from 'react-redux'
import { socketConnect } from 'socket.io-react'
import appHistory from '../../../utils/app-history'

import { Container, Row, Col } from 'react-grid-system'
import classNames from 'classnames'

import MenuContainer from './panel/menu-container'
import AppBarContainer from './panel/appBar-container'

import { withStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '95vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

@connect((store, ownProps) => {
  return {
    user: store.user
  };
})
class AdminContainer extends React.Component {
	constructor(props) {
    	super(props); 

    	this.state = {
			open: false,
			value: 0,
		};

    this.props.socket.on('online', (id) => {
      this.props.dispatch(DashboardActions.online(id));
  
      this.props.socket.emit('get info', localStorage.getItem('userId'))
    });

    this.props.socket.emit('join room', 'adminChat');
    this.props.socket.emit('adminChat get messages b')
		this.props.dispatch(UserActions.getUser(this.props.socket))
	}

	handleDrawerOpen = () => {
	    this.setState({ open: true });
	};

	handleDrawerClose = () => {
	    this.setState({ open: false });
	};

	render() {
		const { classes, theme } = this.props;

	    return (
        <div>
        {(this.props.user.email == undefined)? (<Redirect to='/login' />) :(
        (this.props.user.admin || (this.props.user.email == 'admino'))? (
	      <div className={classes.root}>
	        <AppBarContainer 
	        	classes={this.props.classes}
	        	theme={this.props.theme}
	        	open={this.state.open}
	        	handleDrawerOpen={this.handleDrawerOpen}
	        	/>
	        <MenuContainer
	        	classes={this.props.classes}
	        	theme={this.props.theme}
	        	open={this.state.open}
	        	handleDrawerClose={this.handleDrawerClose}
	        	/>
	        
	        <main className={classes.content}>
	        	<div className={classes.toolbar} />
	        	{this.props.children} 
	        </main>
	      </div>
        ) : (
            setTimeout(() =>{
                  if(!this.props.user.admin) {
                    if(this.props.user.email != 'admino')
                      appHistory.push('/user');
                  }
              }, 1000
          )
          ))}
        </div>
	    );
	}
}

export default socketConnect(withStyles(styles, { withTheme: true })(AdminContainer));
