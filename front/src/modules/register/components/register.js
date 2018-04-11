import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import appHistory from '../../../utils/app-history'
import TopMenu from '../../dashboard/components/top-menu'
import { Translate } from 'react-localize-redux';

class Register extends React.Component {
  render() {
    const { username, password, email } = this.props;
    const { onChangeUsername, onChangePassword, onChangeEmail, onRegister } = this.props;

    return (
      <div>
        <TopMenu></TopMenu>
        <MuiThemeProvider>
          <div className="limiter">
            <TextField
              name={'username'}
              value={username}
              onChange={onChangeUsername}
              floatingLabelText="Username"
              />
            <TextField
              name={'password'}
              value={password}
              onChange={onChangePassword}
              floatingLabelText="Password"
              type="password"
              />
            <TextField
              name={'email'}
              value={email}
              onChange={onChangeEmail}
              floatingLabelText="Email"
              />
            <div className="button-holder">
              <RaisedButton
                label={<Translate id="register">Register</Translate>}
                secondary={true}
                fullWidth={true}
                onClick={onRegister} />
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Register;
