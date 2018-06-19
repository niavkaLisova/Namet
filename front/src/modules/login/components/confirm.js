import React from 'react';

import appHistory from '../../../utils/app-history'
import * as LoginActions from '../actions/login-actions'
import { Translate } from 'react-localize-redux'
import { connect } from 'react-redux'

@connect((store, ownProps) => {
  return {
    id: ownProps.match.params.id,
    email: ownProps.match.params.email
  };
})
class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(LoginActions.emailConfirm(this.props.email, this.props.id));
  }
  render() {
    return (
      <div>
        <div>
          <h1>Your email has been successfully verified</h1>
        </div>
      </div>
    )
  }
}

export default Confirm;
