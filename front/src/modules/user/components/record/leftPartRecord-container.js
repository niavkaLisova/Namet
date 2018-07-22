import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

class LeftPartRecordContainer extends React.Component {
  render() {
    
    return (
      <div>
        <TextField
          label="Title"
          onChange={this.props.handleChangeTitle}
          name="title"
          value={this.props.title}
         />
        <span class='error'>{this.props.titleError}</span>
      </div>
    )
  }
};

export default LeftPartRecordContainer;
