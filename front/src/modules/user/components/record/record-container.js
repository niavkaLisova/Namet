import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"

import ReadContainer from '../read/read-container'
import ReadActiveContainer from '../read/readActive-container'
import SidebarContainer from '../read/sidebar-container'

@connect((store, ownProps) => {
  return {
    user: store.user,
    id: ownProps.match.params.idUser,
    idRecord: ownProps.match.params.idRecord
  };
})
class RecordContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(RecordActions.findCollectionsById(this.props.id));
  
    if (localStorage.getItem('userId') == this.props.id) {
      this.props.dispatch(RecordActions.findRecordTop(this.props.id));
      this.props.dispatch(RecordActions.findRecoordswithoutCollections(this.props.id));
    } else {
      this.props.dispatch(RecordActions.findRecordTopGuest(this.props.id));
      this.props.dispatch(RecordActions.findRecoordswithoutCollectionsGuest(this.props.id));
    }
  }

  render() {
    
    return (
      <Container fluid>
        <Row>
          <Col md={4}>
            <SidebarContainer id={this.props.id} />
          </Col>
          <Col md={8}>
            <ReadActiveContainer
              idRecord={this.props.idRecord}
              id={this.props.id}
             />
          </Col>
        </Row>
      </Container>
    )
  }
};

export default RecordContainer;
