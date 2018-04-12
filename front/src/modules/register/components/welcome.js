import React from 'react';

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import appHistory from '../../../utils/app-history'
import TopMenu from '../../dashboard/components/top-menu'
import { Translate } from 'react-localize-redux'
import { socketConnect } from 'socket.io-react'

const style = {
  //margin: 12
};

class Welcome extends React.Component {
  sendMessage() {
    this.props.socket.emit('message', 'Hello world!');
  }

  render() {
    return (
      <div>
        <TopMenu></TopMenu>
          <button onClick={this.sendMessage.bind(this)}>
        Send!
    </button>
        <MuiThemeProvider> 
         <RaisedButton
            label={<Translate id="login">login</Translate>}
            primary={true}
            fullWidth={true}
            style={style}
            onClick={() => appHistory.push('/login')} />
        </MuiThemeProvider> 
        <MuiThemeProvider>     
          <RaisedButton
            label={<Translate id="register">Register</Translate>}
            primary={true}
            fullWidth={true}
            style={style}
            onClick={() => appHistory.push('/register')} />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default socketConnect(Welcome);
