import React from 'react';

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import appHistory from '../../../utils/app-history'

const style = {
  //margin: 12
};

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider> 
         <RaisedButton
            label="Login if you have account"
            primary={true}
            fullWidth={true}
            style={style}
            onClick={() => appHistory.push('/login')} />
        </MuiThemeProvider> 
        <MuiThemeProvider>     
          <RaisedButton
            label="Register if you don't have"
            secondary={true}
            fullWidth={true}
            style={style}
            onClick={() => appHistory.push('/register')} />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Welcome;
