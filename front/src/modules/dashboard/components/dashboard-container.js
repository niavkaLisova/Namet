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
import { setActiveLanguage} from 'react-localize-redux'
import { Translate } from 'react-localize-redux'

import './Style.sass'

import LanguageMenu from './language-menu'

@connect((store, ownProps) => {
  return {
    user: store.user,
    languages: store.locale.languages
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

  render() {
    let self = this;

    return (
      <MuiThemeProvider>
        <div>
        <ToastContainer store={ToastStore}/>

          <div>
            <AppBar
              title={"Намет"}
              iconElementRight={
                <div>
                  <LanguageMenu />
                  
                </div>
              }
              iconElementLeft={
                <div>
                  {(localStorage.getItem('userId'))? (
                  <Button onClick={this.toggleDrawer('left', true)}><Icon>menu</Icon></Button>
                  ): ''}
                </div>
              }
            />
            <div>
              {this.props.children}
            </div>
            
            {(localStorage.getItem('userId'))? (
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
            ): ''}
          </div>
        
        </div>
      </MuiThemeProvider>
    )
  }
};

export default socketConnect(DashboardContainer);
