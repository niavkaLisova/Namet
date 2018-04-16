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
  render() {
    return (
      <div>
        <TopMenu></TopMenu>
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
