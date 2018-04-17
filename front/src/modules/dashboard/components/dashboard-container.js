import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import LeftMenu from './left-menu'
import * as UserActions from '../../user/actions/user-actions'
import appHistory from '../../../utils/app-history'
import * as DashboardActions from '../actions/dashboard-actions'
import * as NotificationActions from '../../notification/actions/notification-actions'
import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'

@connect((store, ownProps) => {
  //console.log('user', store)
    return {
      user: store.user
    };
})
class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(UserActions.getUser());
  }

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.props.socket.on('online', (id) => {
      console.log('socket', id);
      //this.props.dispatch(DashboardActions.onlineSave(id));
      this.props.dispatch(DashboardActions.online(id));
  
      this.props.socket.emit('get info', localStorage.getItem('userId'))
    });

  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  onLogout() {
    localStorage.removeItem('token');
    this.props.dispatch(NotificationActions.show('Logged out!'));
    appHistory.push('/');
  }

  render() {
    let self = this;

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Намет"
            iconElementRight={
              <FlatButton
                label={this.props.user.name + " Logout" }
                secondary={true}
                onClick={self.onLogout.bind(self)}
              />
            }
            onLeftIconButtonClick={self.handleToggle.bind(self)}
          />
          <div>
            {this.props.children}
          </div>
          <LeftMenu
            open={this.state.open}
            handleToggle={self.handleToggle.bind(self)}
          />
        </div>
      </MuiThemeProvider>
    )
  }
};

export default socketConnect(DashboardContainer);
