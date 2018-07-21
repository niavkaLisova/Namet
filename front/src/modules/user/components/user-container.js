import React from 'react';
import { API_DOMAIN } from '../../../utils/config.js'

import * as UserActions from '../actions/user-actions'
import appHistory from '../../../utils/app-history'

import Avatar from '@material-ui/core/Avatar'
import ContentSend from 'material-ui/svg-icons/content/send'
import Subheader from 'material-ui/Subheader'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import UserFormContainer from './user-form-container'

import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import { setActiveLanguage } from 'react-localize-redux'

@connect((store, ownProps) => {
  return {
    user: store.user,
    id: ownProps.match.params.id
  };
})
export default class UserContainer extends React.Component {
  constructor(props) {
    super(props)

    if(!this.props.id) appHistory.push('/user/' + localStorage.getItem('userId'));

  }

  render() {
    const { user } = this.props;

    return (
      <Container fluid>
      <Row>
        <Col md={6}>
         {(this.props.user.avatar != undefined)?(
           <Avatar
            alt={this.props.user.nickname}
            src={API_DOMAIN + 'public/upload/user/' + this.props.user.avatar}
          />
        ): ''}
        <List>
          <ListItem button>
            <ListItemText primary={`Nickname: ${this.props.user.nickname}`} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={`Name: ${this.props.user.name}`} />
          </ListItem>
          {(this.props.user.country)? (
          <ListItem button>
            <ListItemText primary={`Country: ${this.props.user.country}`} />
          </ListItem>
          ): ('')}
          {(this.props.user.city)? (
          <ListItem button>
            <ListItemText primary={`City: ${this.props.user.city}`} />
          </ListItem>
          ): ('')}
          <ListItem button>
            <ListItemText primary={`Gender: ${this.props.user.gender}`} />
          </ListItem>

        </List>
        </Col>
        <Col md={4}>
          Sticky
        </Col>
        <Col md={2}>
          chat
        </Col>
      </Row>
      </Container>
    )
  }
};

