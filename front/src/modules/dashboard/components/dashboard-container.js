import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import LeftMenu from './left-menu'
import * as UserActions from '../../user/actions/user-actions'
import appHistory from '../../../utils/app-history'
import * as NotificationActions from '../../notification/actions/notification-actions'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  console.log(store)
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

export default DashboardContainer;
