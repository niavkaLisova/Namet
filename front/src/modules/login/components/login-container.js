import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TopMenu from '../../dashboard/components/top-menu'
import * as LoginActions from '../actions/login-actions'
import Login from './login'
import { socketConnect } from 'socket.io-react'

@connect((store, ownProps) => {
  // console.log(store)
    return {
      
    };
})
class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  onLogin() {
    // console.log('login', this.props.socket.id);
    this.props.dispatch(LoginActions.online(this.props.socket.id))
    this.props.dispatch(LoginActions.login(
      this.state.email,
      this.state.password
    ))
    console.log('container');
  }

  refresh() {
    window.location.reload();
  }

  render() {
    return (
      <div>
        <TopMenu></TopMenu>
        <Login
          email={this.state.email}
          password={this.state.password}
          onChangeEmail={this.onChangeEmail.bind(this)}
          onChangePassword={this.onChangePassword.bind(this)}
          onLogin={this.onLogin.bind(this)}
        />
      </div>
    )
  }
};

export default socketConnect(LoginContainer);
