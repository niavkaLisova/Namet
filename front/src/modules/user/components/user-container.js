import React from 'react';
import { API_DOMAIN } from '../../../utils/config.js'

import * as UserActions from '../actions/user-actions'
import appHistory from '../../../utils/app-history'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ContentSend from 'material-ui/svg-icons/content/send'
import Subheader from 'material-ui/Subheader'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import UserFormContainer from './user-form-container'
import CreateModal from './record/createModal'

import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import { setActiveLanguage } from 'react-localize-redux'

@connect((store, ownProps) => {
  return {
    user: store.user,
    id: ownProps.match.params.id,
    info: store.user.info
  };
})
export default class UserContainer extends React.Component {
  constructor(props) {
    super(props)

    if(!this.props.id) appHistory.push('/user/' + localStorage.getItem('userId'));

    this.state = {
      open: false
    }

    this.props.dispatch(UserActions.findInfoUser(this.props.id))
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { user } = this.props;
    const info = (this.props.info[0])? this.props.info[0]: {};

    return (
      <Container fluid>
        <CreateModal
          open={this.state.open}
          handleCloseModal={this.handleCloseModal}
         />
        <Row>
          <Col md={6}>
           {(info.avatar != undefined)?(
             <Avatar
              alt={info.nickname}
              src={API_DOMAIN + 'public/upload/user/' + info.avatar}
            />
          ): ''}
          <List>
            <ListItem button>
              <ListItemText primary={`Nickname: ${info.nickname}`} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={`Name: ${info.name}`} />
            </ListItem>
            {(info.country)? (
            <ListItem button>
              <ListItemText primary={`Country: ${info.country}`} />
            </ListItem>
            ): ('')}
            {(info.city)? (
            <ListItem button>
              <ListItemText primary={`City: ${info.city}`} />
            </ListItem>
            ): ('')}
            <ListItem button>
              <ListItemText primary={`Gender: ${info.gender}`} />
            </ListItem>

          </List>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            create post
          </Button>
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

