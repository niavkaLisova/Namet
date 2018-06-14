import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Translate } from 'react-localize-redux';

class Login extends React.Component {
  render() {
    const { onChangeEmail, onChangePassword, onLogin } = this.props;
    const { email, password } = this.props;

    return (
      <MuiThemeProvider>
        <div className="limiter">
          <TextField
            name={'email'}
            value={email}
            onChange={onChangeEmail}
            floatingLabelText={<Translate id="email">Email</Translate>}   
            type='email'
          />
          <TextField
            name={'password'}
            value={password}
            onChange={onChangePassword}
            floatingLabelText={<Translate id="password">Password</Translate>}
            type='password'
          />
          <div className="button-holder">
            <RaisedButton
              label={<Translate id="login">login</Translate>}
              primary={true}
              fullWidth={true}
              onClick={onLogin}
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
};

export default Login;
