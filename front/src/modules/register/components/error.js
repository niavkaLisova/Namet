import React from 'react';

import appHistory from '../../../utils/app-history'
import TopMenu from '../../dashboard/components/top-menu'
import { Translate } from 'react-localize-redux'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-grid-system'

@connect((store, ownProps) => {
  console.log(ownProps, 'own')
    return {
      time: ownProps.match.params.time
    };
})
export default class Error extends React.Component {
  render() {
    let d = (new Date(Number(this.props.time))).toDateString();
    return (
      <div>
        <TopMenu></TopMenu>
        <Container>
          <h2>Your account is not available until the date { d }</h2>
        </Container>
      </div>
    )
  }
}
