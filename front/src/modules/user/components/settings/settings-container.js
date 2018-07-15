import React from 'react';

import * as UserActions from '../../actions/user-actions'

import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
    user: store.user
  };
})
export default class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  updateUser() {
    this.props.dispatch(UserActions.updateUser(this.props.user));
  }

  onChangeEmail(event) {
    this.props.dispatch(UserActions.userDataUpdated({email: event.target.value}));
  }

  onChangeSurname(event) {
    this.props.dispatch(UserActions.userDataUpdated({surname: event.target.value}));
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h2>Test {localStorage.getItem('userId')}</h2>

      </div>
    )
  }
};

