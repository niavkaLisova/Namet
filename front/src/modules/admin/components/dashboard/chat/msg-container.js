import React from 'react'

import { Container, Row, Col } from 'react-grid-system'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'; 
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Icon from '@material-ui/core/Icon'

import '../../Admin.sass'
const ReactIntl = require('react-intl')
const FormattedRelative = ReactIntl.FormattedRelative

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
});

const Message = props => (
  	<Row>
    	<i class={classNames({'active': (props.username) == props.msg.author})}>{props.msg.author}</i>
    	: {props.msg.text}
  	</Row>
);

const MsgContainer = props => {
	const { classes } = props;

	return (
		<div>
			<SnackbarContent
		        className={classes.snackbar}
		        message={
		          <Message msg={props.msg} username={props.username} />
		        }
		        action={<FormattedRelative value={props.msg.time} />}
		      />
        </div>
	)
}

export default withStyles(styles)(MsgContainer);
