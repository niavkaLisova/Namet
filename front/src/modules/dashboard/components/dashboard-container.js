import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import LeftMenu from './left-menu'
import * as UserActions from '../../user/actions/user-actions'
import * as ChatActions from '../../chat/actions/chat-actions'
import appHistory from '../../../utils/app-history'
import * as DashboardActions from '../actions/dashboard-actions'
import * as NotificationActions from '../../notification/actions/notification-actions'
import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'
import Button from '@material-ui/core/Button'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { List, ListItem } from 'material-ui/List'
import Icon from '@material-ui/core/Icon'
import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'

import './Style.sass'

@connect((store, ownProps) => {
  return {
    user: store.user
  };
})
class DashboardContainer extends React.Component {
  componentDidMount() {
    if(localStorage.getItem('userId')) {
      this.props.dispatch(UserActions.getUser(this.props.socket));
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      left: false
    };

    if(localStorage.getItem('userId')) {

      this.props.socket.on('online', (id) => {
        this.props.dispatch(DashboardActions.online(id));
    
        this.props.socket.emit('get info', localStorage.getItem('userId'))
      });

      this.props.socket.on('reload junior', () => {
        this.props.dispatch(UserActions.getUser(this.props.socket));
      })
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  onLogout() {
    // this.props.socket.emit('disconnect', localStorage.getItem('userId'))
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.props.dispatch(NotificationActions.show('Logged out!'));
    appHistory.replace('/');
    window.location.reload();
  }

  render() {
    let self = this;

    return (
      <MuiThemeProvider>
        <div>
        <ToastContainer store={ToastStore}/>
          {(localStorage.getItem('userId'))? (
            <div>
              <AppBar
                title={"Намет"}
                iconElementRight={
                  <FlatButton
                    label={this.props.user.name + " Logout" }
                    secondary={true}
                    onClick={self.onLogout.bind(self)}
                  />
                }
                iconElementLeft={
                  <Button onClick={this.toggleDrawer('left', true)}><Icon>menu</Icon></Button>
                }
              />
              <div>
                {this.props.children}
              </div>
              
              <SwipeableDrawer
                open={this.state.left}
                onClose={this.toggleDrawer('left', false)}
                onOpen={this.toggleDrawer('left', true)}
              >
                <div
                  class='drawer'
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer('left', false)}
                  onKeyDown={this.toggleDrawer('left', false)}
                >
                  <LeftMenu
                  handleToggle={self.handleToggle.bind(self)}
                />
                </div>
              </SwipeableDrawer>
            </div>
          ) : (<Redirect to='/login' />) }
        </div>
      </MuiThemeProvider>
    )
  }
};

export default socketConnect(DashboardContainer);
