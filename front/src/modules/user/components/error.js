import React from 'react';

import appHistory from '../../../utils/app-history'
import TopMenu from '../../dashboard/components/top-menu'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import { Translate } from 'react-localize-redux'
import { connect } from 'react-redux'
import { socketConnect } from 'socket.io-react'

import * as UserActions from '../actions/user-actions';

import { Container, Row, Col } from 'react-grid-system'

import './User.sass'

@connect((store, ownProps) => {
    return {
      user: store.user,
      id: ownProps.match.params.id,
      time: ownProps.match.params.time
    };
})
class Error extends React.Component {
  constructor(props) {
    super(props);

    this.props.socket.on('reload junior', () => {
      appHistory.push('/user/' + localStorage.getItem('userId'))
    })

    this.state = {
      complaint: '',
      visible: true
    }
  }

  handleChange = event => {
    this.setState({
      complaint: event.target.value
    })
  }

  handleSend = () => {
    // console.log('send to admin', this.props.id, this.state.complaint);
    const report = {
      type: 'complaint',
      text: this.state.complaint,
      discuss: this.props.id,
      time: this.props.time
    }
    this.props.dispatch(UserActions.sendReport(report, this.props.socket))

    this.setState({ 
      complaint: '',
      visible: false
    })
  }

  render() {
    let d = (new Date(Number(this.props.time))).toDateString();
    return (
      <div>
        <TopMenu></TopMenu>
        <Row>
          <Col md={8}>
            <h2>Your account is not available until the date { d }</h2>
          </Col>
          <Col md={4} class={classNames({'displayNo': !this.state.visible})}>
            <p>You can send complaint letter to Admin</p>
            <TextField
              label="Multiline"
              multiline
              rowsMax="4"
              value={this.state.complaint}
              onChange={event => this.handleChange(event)}
              margin="normal"
              class="textarea"
            />
            <Button variant="outlined" color="secondary" onClick={this.handleSend}>
              Send
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default socketConnect(Error);
