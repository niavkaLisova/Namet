import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import appHistory from '../../../utils/app-history'
import Register from './register'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import zxcvbn  from 'zxcvbn'
import * as RegisterActions from '../actions/register-actions'

const style = {
  //margin: 12
};

@connect((store, ownProps) => {
  // console.log(store)
  return {
    
  };
})
class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      email: '',
      type: 'password',
      score: 'null'
    };
  }

  showHide(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })  
  }
  
  passwordStrength(e){
    if(e.target.value === ''){
      this.setState({
        score: 'null'
      })
    }
    else{
      var pw = zxcvbn(e.target.value);
      this.setState({
        score: pw.score
      });      
    }
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
    this.passwordStrength(event);
  }

  onChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  onRegister() {
    this.props.dispatch(RegisterActions.register(
      this.state.password,
      this.state.email
    ))
  }

  render() {
    return (
      <Register
        {...this.state}
        onChangePassword={this.onChangePassword.bind(this)}
        onChangeEmail={this.onChangeEmail.bind(this)}
        onRegister={this.onRegister.bind(this)}
        showHide={this.showHide.bind(this)}
        passwordStrength={this.passwordStrength.bind(this)}
        type={this.state.type}
        score={this.state.score}
      />
    )
  }
}

export default RegisterContainer;