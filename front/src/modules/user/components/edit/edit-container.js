import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import * as UserActions from '../../actions/user-actions'

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import { ToastStore } from 'react-toasts'
import { API_DOMAIN } from '../../../../utils/config.js'

import LeftPartRecordContainer from '../record/leftPartRecord-container'
import EditorContainer from './editor-container'
import RightSidebarContainer from './rightSidebar-container'

import '../User.sass'

@connect((store, ownProps) => {
  return {
    id: ownProps.match.params.idRecord,
    full: store.record.full
  };
})
class EditContainer extends React.Component {
  componentDidMount() {
    let time = setInterval(() => {
      if (this.props.full) {
        let record = this.state;
        record.describe = this.props.full.describe;
        record.type = this.props.full.type;
        record.state = this.props.full.state;
        record.language = this.props.full.language;
        record.genre = this.props.full.genre;
        record.img = this.props.full.img;
        record.gift = this.props.full.gift;
        record.text = this.props.full.text;

        clearInterval(time);
        // this.props.dispatch(UserActions.textSave(record.text));

        this.setState({
          title: this.props.full.title,
          userGift: this.props.full.gift,
          collection: this.props.full.section,
          record
        });
      }
    }, 1000);
  }

  constructor(props) {
    super(props);

    this.props.dispatch(RecordActions.findRecordById(this.props.id))

    this.state = {
      title: '',
      titleError: '',
      typeError: '',
      userGift: '',
      collection: '',
      record: {
        describe: '',
        type: [],
        state: 'draft',
        language: '',
        genre: '',
        img: '',
        gift: ''
      }
    }
  }

  handleChangeTitle = e => {
    let err = '';
    if (e.target.value.length <= 0) err = 'The field is rerauired'

    this.setState({
      title: e.target.value,
      titleError: err
    })
  }

  handleChangeRecord = e => {
    let { record } = this.state;
    record[e.target.name] = e.target.value;
      
    this.setState({
      record
    })
  }

  render() {
    return (
      <Container fluid>
        {(this.props.full)? (
        <Row>
          <div class='left' >
            <LeftPartRecordContainer
              title={this.state.title}
              titleError={this.state.titleError}
              handleChangeTitle={this.handleChangeTitle}             
             />
            <EditorContainer />
          </div>
          <div class='right'>
            <RightSidebarContainer
              record={this.state.record}
              handleChangeRecord={this.handleChangeRecord}
             />
          </div>
        </Row>
        ): 'Not Found'}
      </Container>
    )
  }
};

export default EditContainer;
