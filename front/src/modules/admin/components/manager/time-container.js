import React from 'react';

export default class TimeContainer extends React.Component {
  render() {
    let d = (new Date(this.props.time)).toDateString();
    return (
      <span>
          {this.props.text} { d }
      </span>
    )
  }
}
