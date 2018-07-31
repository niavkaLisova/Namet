import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"

import  ReadContainer from '../read/read-container'
import SidebarContainer from '../read/sidebar-container'

@connect((store, ownProps) => {
  return {
    user: store.user,
    id: ownProps.match.params.id,
  };
})
class RecordContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(RecordActions.findCollectionsById(this.props.id));
    this.props.dispatch(RecordActions.findRecoordswithoutCollections());
    this.props.dispatch(RecordActions.findRecordTop());
  }

  render() {
    
    return (
      <Container fluid>
        <Row>
          <Col md={4}>
            <SidebarContainer />
          </Col>
          <Col md={8}>
            <ReadContainer />
          </Col>
        </Row>
      </Container>
    )
  }
};

export default RecordContainer;
