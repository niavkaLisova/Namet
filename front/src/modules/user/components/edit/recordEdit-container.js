import React from 'react'

import * as RecordEditActions from '../../actions/recordEdit-actions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"

import LeftPartRecordContainer from '../edit/leftPartRecord-container'

@connect((store, ownProps) => {
  return {
    id: ownProps.match.params.id,
  };
})
class RecordEditContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    }
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value })
  }

  render() {
    
    return (
      <Container fluid>
        <Row>
          record Edit
          <LeftPartRecordContainer
            title={this.state.title}
            handleChangeTitle={this.handleChangeTitle}
           />
        </Row>
      </Container>
    )
  }
};

export default RecordEditContainer;
