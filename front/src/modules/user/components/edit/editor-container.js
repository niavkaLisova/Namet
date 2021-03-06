import React, {Component, PropTypes} from 'react'

import * as UserActions from '../../actions/user-actions'

import RichTextEditor from 'react-rte'
import Button from '@material-ui/core/Button'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  };
})
class EditorContainer extends React.Component {
  componentDidMount() {
    let time = setInterval(() => {
      if (this.props.text) {
        clearInterval(time);

        this.setState({
          value: RichTextEditor.createValueFromString(this.props.text, 'html')
        });
        
        this.props.dispatch(UserActions.textSave(this.state.value.toString('html')));
      }
      
    }, 1000);
  }

  constructor(props){
    super(props);

    this.state = {
      value: RichTextEditor.createValueFromString('', 'html')
    }
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
