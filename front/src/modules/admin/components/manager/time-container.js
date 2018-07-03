import React from 'react';

export default class TimeContainer extends React.Component {
  render() {
    let d = (new Date(Number(this.props.time))).toDateString();
    return (
      <span>
          until { d }
      </span>
    )
  }
}
