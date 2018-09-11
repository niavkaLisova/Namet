import React from 'react';
import { API_DOMAIN } from '../../../utils/config.js'

import * as UserActions from '../actions/user-actions'
import * as RecordActions from '../actions/record-actions'
import * as ChatActions from '../../chat/actions/chat-actions'
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
import { Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import UserFormContainer from './user-form-container'
import CreateModal from './record/createModal'
import FollowItemContainer from './follow/followItem-container'
import WallContainer from './home/wall-container'
import HomeLeftSidebarContainer from './home/homeLeftSidebar-container'
import UserInfoContainer from './home/userInfo-container'

import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import { setActiveLanguage } from 'react-localize-redux'
import { Translate } from 'react-localize-redux'

@connect((store, ownProps) => {
  return {
    user: store.user,
    id: ownProps.match.params.id,
    info: store.user.info,
    listFollowers: store.user.listFollowers,
    followingList: store.user.followingList,
    team: store.user.team
  };
})
class UserContainer extends React.Component {
  componentDidMount() {
    let timer = setInterval(() => {
      
      if (this.props.info._id){
        clearInterval(timer);

        if (this.props.info._id == localStorage.getItem('userId')) {
          this.props.dispatch(UserActions.checkPoint());
        }
      }
    }, 500)
  }

  constructor(props) {
    super(props)

    if (!this.props.id) appHistory.push('/user/' + localStorage.getItem('userId'));

    this.state = {
      open: false,
      visible: true
    }

    this.props.dispatch(UserActions.findInfoUser(this.props.id))
    this.props.dispatch(UserActions.followersList(this.props.id));
    this.props.dispatch(UserActions.findInfoFollowing(this.props.id))
    if (this.props.id) {
      this.props.dispatch(RecordActions.findWallRecord(this.props.id));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id != this.props.id) {
      this.props.dispatch(UserActions.findInfoFollowing(this.props.id))
      this.props.dispatch(UserActions.findInfoUser(this.props.id))
      this.props.dispatch(UserActions.followersList(this.props.id));
      this.setState({ visible: true })
      this.props.dispatch(RecordActions.findWallRecord(this.props.id));
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

  handleSeeMoreFollow = () => {
    appHistory.push('/follow/' + this.props.id)
  }

  render() {
    const { user } = this.props;

    let list = this.props.listFollowers.find(item => {
      return item._id == localStorage.getItem('userId') 
    });

    return (
      <Container fluid>
        {(this.props.info.error)? (<Redirect to='/' />): (
        <div>
        <CreateModal
          open={this.state.open}
          handleCloseModal={this.handleCloseModal}
         />
        <Row>
          <Col md={6}>
            <UserInfoContainer 
              info={this.props.info}
             />
            
            {(localStorage.getItem('userId') == this.props.id)? (
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              create post
            </Button>
          ): (
            <div>
              {(list)? ''
                : (
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
            <p onClick={this.handleSeeMoreFollow}>See more</p>
            <div class='followBox'>
              {this.props.followingList
                .slice(0, 5)
                .map((follower, index) => {
                return (
                  <FollowItemContainer
                    key={follower._id}
                    follower={follower}
                   />
                )
              })}
            </div>
          </div>
          </Col>
          <Col md={3}>
            <Row>
              <WallContainer idUser={this.props.id} />
            </Row>
          </Col>
          <Col md={3}>
            <HomeLeftSidebarContainer id={this.props.id} />
          </Col>
        </Row>
        </div>
        )}
      </Container>
    )
  }
};

export default socketConnect(UserContainer);
