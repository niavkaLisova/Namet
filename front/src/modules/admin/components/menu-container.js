import React from 'react'

import MenuListContainer from './menuList-container'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'

import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import classNames from 'classnames'

@connect((store, ownProps) => {
  return {
    user: store.user
  };
})
class MenuContainer extends React.Component {
  render() {
  	const classes = this.props.classes;
	  const theme = this.props.theme;

    return (
    	<Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
          }}
          open={this.props.open}
        >
          <Container className={classes.toolbar}>
            <Col sm={8}>
              {(this.props.user.email == 'admino') ? 'Admin': 'Junior'}
            </Col>
            <Col sm={4}>
              <IconButton onClick={this.props.handleDrawerClose}>
                {theme.direction === 'rtl' ? (<Icon>chevron_right</Icon>) : (<Icon>chevron_left</Icon>) }
              </IconButton>
            </Col>
          </Container>
          <Divider />
          
          <MenuListContainer />
        </Drawer>
	)
  }
}

export default MenuContainer;