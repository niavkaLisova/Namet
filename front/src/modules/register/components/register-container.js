import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import appHistory from '../../../utils/app-history'
import Register from './register'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as RegisterActions from '../actions/register-actions'

const style = {
  //margin: 12
};

@connect((store, ownProps) => {
  console.log(store)
    return {
      
    };
})
class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  onChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  onRegister() {
    this.props.dispatch(RegisterActions.register(
      this.state.username,
      this.state.password,
      this.state.email
    ))
  }

  render() {
    return (
      <Register
        {...this.state}
        onChangeUsername={this.onChangeUsername.bind(this)}
        onChangePassword={this.onChangePassword.bind(this)}
        onChangeEmail={this.onChangeEmail.bind(this)}
        onRegister={this.onRegister.bind(this)}
      />
    )
  }
}

export default RegisterContainer;