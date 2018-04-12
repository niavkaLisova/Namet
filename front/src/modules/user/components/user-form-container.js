import React from 'react';

import UserForm from './user-form';
import { Translate } from 'react-localize-redux';

class UserFormContainer extends React.Component {
  render() {
    const placeholders = { name: 'Name', surname: 'Surname', email: 'Email' };
    const labels = { name: 'Set name', surname: 'Set surname', email: 'Set email', button: <Translate id="update">Update</Translate>};

    return (
      <UserForm
        {...this.props}
        placeholders={placeholders}
        labels={labels}
      />
    )
  }
};

export default UserFormContainer;
