import React from 'react';

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import appHistory from '../../../utils/app-history'
import TopMenu from '../../dashboard/components/top-menu'
import Progress from 'react-progressbar'
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import { Translate } from 'react-localize-redux'

const iconStyles = {
  marginRight: 24,
};

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
              type={this.props.type}
              />

            <span onClick={this.props.showHide}>{this.props.type === 'input' ? 'Hide' : 'Show'}</span>
            <Progress completed={(parseInt(this.props.score))?  (parseInt(this.props.score) * 25) : 0} />
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
