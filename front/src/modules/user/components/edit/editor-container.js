import React, {Component, PropTypes} from 'react'

import * as UserActions from '../../actions/user-actions'

import RichTextEditor from 'react-rte'
import Button from '@material-ui/core/Button'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
    text: store.user.text,
  };
})
class EditorContainer extends React.Component {
  state = {
    value: RichTextEditor.createValueFromString(this.props.text, 'html')
  }


  onChange = (value) => {
    this.setState({value});
    this.props.dispatch(UserActions.textSave(this.state.value.toString('html')))
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
    return (
      <div>
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange}
          class='editorRecord'
        />
      </div>
    );
  } 
};

export default EditorContainer;
