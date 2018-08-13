import React from 'react'
import axios, { post } from 'axios'

import * as RecordActions from '../../actions/record-actions'
import * as UserActions from '../../actions/user-actions'
import appHistory from '../../../../utils/app-history'

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import { ToastStore } from 'react-toasts'
import { API_DOMAIN } from '../../../../utils/config.js'
import { Redirect } from 'react-router-dom'

import LeftPartRecordContainer from '../record/leftPartRecord-container'
import EditorContainer from './editor-container'
import RightSidebarContainer from './rightSidebar-container'

import '../User.sass'

@connect((store, ownProps) => {
  return {
    id: ownProps.match.params.idRecord,
    full: store.record.full,
    list: store.user.giftList,
    user: store.user,
    file: store.user.file,
    text: store.user.text
  };
})
class EditContainer extends React.Component {
  componentDidMount() {
    let time = setInterval(() => {
      if (this.props.full) {
        let record = this.state.record;
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
          record,
          describe: record.describe
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
      record,
      describe: e.target.value
    })
  }

  handlelistGift = e => {
    let { record } = this.state;
    record.gift = e.target.value;

    this.setState({ record, describe: e.target.value });
    this.props.dispatch(UserActions.findGift(e.target.value));
  }

  handleUserGift = item => {
    let { record } = this.state;
    record.gift = item.name;

    this.setState({ userGift: item._id, record: record })
    this.props.dispatch(UserActions.setGift([]));
  }

  handleChangeRecordGenre = listGenre => {
    let { record } = this.state;
    record['genre'] = listGenre;
      
    this.setState({
      record
    })
  }

  handleSave = () => {
    if (this.state.title.length == 0){
      this.setState({ titleError: 'The field is rerauired'})
    } else if (this.state.record.type.length == 0) {
      this.setState({ typeError: 'The field is rerauired' })
    } else {
      this.handleCreate();
      ToastStore.success('Done');
    }
  }

  fileUpload = file => {
    const url = API_DOMAIN + 'api/upload/record';
    const formData = new FormData(this);
    formData.append('file', file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    return  post(url, formData, config)
  }

  handleDeleteRecord = () => {
    console.log('delete',this.props.id);
    if (this.state.record.img) {
      this.props.dispatch(UserActions.removeRecordImg(this.state.record.img))
    }
    this.props.dispatch(RecordActions.removeRecordById(this.props.id));
    appHistory.push('/user/' + localStorage.getItem('userId'));
  }


  handleCreate = () => {
    let { record } = this.state;
    record.title = this.state.title;
    record.text = this.props.text;
    record.authorName = this.props.user.nickname;
    record.id= this.props.id;

    if (this.props.file) {
      if (this.state.record.img) {
        this.props.dispatch(UserActions.removeRecordImg(this.state.record.img))
      }
       
      this.fileUpload(this.props.file).then((response)=>{     
        record.img = response.data;

        this.props.dispatch(UserActions.saveEditRecord(record));
        this.props.dispatch(UserActions.setFile(null));
      })
    } else {
      record.img = record.img;
      
      this.props.dispatch(UserActions.saveEditRecord(record));
    }

    this.props.dispatch(RecordActions.setRecordActive(record));
    
    appHistory.push('/record/' + localStorage.getItem('userId'))
  }

  render() {
    return (
      <Container fluid>
        {(this.props.full.author == localStorage.getItem('userId'))? (
        (this.props.full)? (
        <Row>
          <Col md={8} >
            <LeftPartRecordContainer
              title={this.state.title}
              titleError={this.state.titleError}
              handleChangeTitle={this.handleChangeTitle}             
             />
            <EditorContainer />
          </Col>
          <Col md={4}>
            <RightSidebarContainer
              record={this.state.record}
              describe={this.state.describe}
              list={this.props.list}
              typeError={this.state.typeError}
              handleChangeRecord={this.handleChangeRecord}
              handlelistGift={this.handlelistGift}
              handleUserGift={this.handleUserGift}
              handleChangeRecordGenre={this.handleChangeRecordGenre}
             />
          </Col>
          <p onClick={this.handleSave}>SAVE</p>
          <p onClick={this.handleDeleteRecord}>DELETE</p>
        </Row>
        ): 'Not Found'
        ): (<Redirect to={`/user/${localStorage.getItem('userId')}`} />)}
      </Container>
    )
  }
};

export default EditContainer;
