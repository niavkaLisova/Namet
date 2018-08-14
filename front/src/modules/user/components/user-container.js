import React from 'react';
import { API_DOMAIN } from '../../../utils/config.js'

import * as UserActions from '../actions/user-actions'
import appHistory from '../../../utils/app-history'
import { socketConnect } from 'socket.io-react'

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
    info: store.user.info,
    listFollowers: store.user.listFollowers,
    followingList: store.user.followingList
  };
})
class UserContainer extends React.Component {
  constructor(props) {
    super(props)

    if(!this.props.id) appHistory.push('/user/' + localStorage.getItem('userId'));

    this.state = {
      open: false,
      visible: true
    }

    this.props.dispatch(UserActions.findInfoUser(this.props.id))
    this.props.dispatch(UserActions.followersList(this.props.id));
    this.props.dispatch(UserActions.findInfoFollowing(this.props.id))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id != this.props.id) {
      this.props.dispatch(UserActions.findInfoFollowing(this.props.id))
      this.props.dispatch(UserActions.findInfoUser(this.props.id))
      this.props.dispatch(UserActions.followersList(this.props.id));
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  handleOpenRead = () => {
    appHistory.push('/record/' + this.props.id)
  }

  handleFollow = () => {
    this.setState({ visible: false });
    this.props.dispatch(UserActions.follow(this.props.id));
    this.props.dispatch(UserActions.findInfoFollowing(this.props.id))
    this.props.dispatch(UserActions.followersList(this.props.id));
  }

  handleUnsubscribe = user => {
    console.log('unsubscribe', user);
    let list = [];
    list = this.props.user.following.filter(item => item != user);
    if (!list) list = [];
    this.props.dispatch(UserActions.followingInfo(list))
    console.log('list', list);
    this.props.dispatch(UserActions.unsubscribe(user, list))
    this.props.dispatch(UserActions.findInfoFollowing(this.props.id))
    this.props.dispatch(UserActions.followersList(this.props.id));

  }

  render() {
    const { user } = this.props;
    const info = (this.props.info)? this.props.info: [];

    let list = this.props.listFollowers.find(item => {
      return item._id == localStorage.getItem('userId') 
    });

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
            {this.state.text}
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
          {(localStorage.getItem('userId') == this.props.id)? (
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              create post
            </Button>
          ): (
            <div>
              {(list)? '': (
                <div> 
                  {(this.state.visible)? (
                    <Button variant="outlined" color="primary" onClick={this.handleFollow}>
                      follow
                    </Button>
                  ): ''}
                </div>
              )}
            </div>
          )}
          <Button variant="outlined" color="primary" onClick={this.handleOpenRead}>
            read records
          </Button>
          <div>
            <hr />
            {this.props.followingList.map(follower => {
              return (
                <div key={follower._id}>
                  {follower.name}
                  {(this.props.id == localStorage.getItem('userId'))? (
                    <span onClick={() => this.handleUnsubscribe(follower._id)}> unsubscribe</span>
                  ): ('')}
                </div>
              )
            })}
          </div>
          </Col>
          <Col md={4}>
            Sticky
            followers 
            {this.props.listFollowers.map((item, index) => {
              return <p key={index}>{item.name}</p>
            })}
          </Col>
          <Col md={2}>
            chat
          </Col>
        </Row>
      </Container>
    )
  }
};

export default socketConnect(UserContainer);
