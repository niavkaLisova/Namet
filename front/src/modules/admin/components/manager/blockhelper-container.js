import React from 'react';

import Tooltip from '@material-ui/core/Tooltip'

const BlockHelperContainer = (props) => {
  let remainder = ''
  let d = new Date();

  const convertMiliseconds = (miliseconds, format) => {
    let days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
    
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));

    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);
    
    switch(format) {
    case 's':
      return total_seconds;
      break;
    case 'm':
      return total_minutes;
      break;
    case 'h':
      return total_hours;
      break;
    case 'd':
      return days;
      break;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
    }
  };

  if(d > props.time) {
    props.endBanned(props.userId)
  } else {
    let difference = props.time - d;
    remainder = convertMiliseconds(difference)
  }

  return (
    <div>
      Time to cancel <Tooltip id="tooltip-fab" title="days">
        <i>{remainder.d}</i>
      </Tooltip> :
      <Tooltip id="tooltip-fab" title="hours">
        <i>{remainder.h}</i>
      </Tooltip>:
      <Tooltip id="tooltip-fab" title="minutes">
        <i>{remainder.m}</i>
      </Tooltip>:
      <Tooltip id="tooltip-fab" title="seconds">
        <i>{remainder.s}</i>
      </Tooltip>
    </div>
  )
}

export default BlockHelperContainer;
