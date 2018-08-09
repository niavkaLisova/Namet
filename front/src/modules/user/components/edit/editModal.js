import React from 'react'
import { connect } from "react-redux"
import axios, { post } from 'axios'

import * as UserActions from '../../actions/user-actions'
import * as RecordEditActions from '../../actions/recordEdit-actions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ContentSend from 'material-ui/svg-icons/content/send'
import Subheader from 'material-ui/Subheader'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import Icon from '@material-ui/core/Icon'

import { ToastStore } from 'react-toasts'
import { API_DOMAIN } from '../../../../utils/config.js'
import { withStyles } from '@material-ui/core/styles'
import LeftPartRecordContainer from '../record/leftPartRecord-container'
import EditorContainer from './editor-container'
import RightPartRecordContainer from '../record/rightPartRecord-container'

import '../User.sass'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@connect((store, ownProps) => {
  return {
    user: store.user.nickname,
    text: store.user.text,
    list: store.user.giftList,
    thumbnail: store.user.thumbnail,
    file: store.user.file,
    listColl: store.user.listColl,
    listCollId: store.user.listCollId,
    recordActive: store.record.recordActive,
    collName: store.recordEdit.collName
  };
})
class EditModal extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.recordActive !== nextProps.recordActive) {
      this.props.dispatch(UserActions.textSave(nextProps.recordActive.text))
 
      this.props.dispatch(RecordEditActions.findCollectionByCollId(nextProps.recordActive.section))
      let record = {
        state: nextProps.recordActive.state,
        gift: nextProps.recordActive.gift,
        describe: nextProps.recordActive.describe,
        language: nextProps.recordActive.language,
        genre: nextProps.recordActive.genre,
        type: nextProps.recordActive.type,
        img: nextProps.recordActive.img
      }
      this.setState({
        title: nextProps.recordActive.title,
        collection: nextProps.recordActive.section,
        record
      })
    }
  }

  constructor(props) {
    super(props)

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

  handleUserGift = item => {
    let { record } = this.state;
    record.gift = item.name;

    this.setState({ userGift: item._id, record: record })
    this.props.dispatch(UserActions.setGift([]));
  }

  handlelistGift = e => {
    let { record } = this.state;
    record.gift = e.target.value;

    this.setState({ record });
    this.props.dispatch(UserActions.findGift(e.target.value));
  }

  handleSave = () => {
    if (this.state.title.length == 0){
      this.setState({ titleError: 'The field is rerauired'})
    } else if (this.state.record.type.length == 0) {
      this.setState({ typeError: 'The field is rerauired' })
    } else {
      // 
      // console.log('save colle', this.state.collection);
      // this.props.handleCloseModal();
      this.handleCreate();
      ToastStore.success('Done');
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

  handleChangeRecordGenre = listGenre => {
    let { record } = this.state;
    record['genre'] = listGenre;
      
    this.setState({
      record
    })
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


  handleCreate = () => {
    let { record } = this.state;
    record.title = this.state.title;
    record.text = this.props.text;
    record.collection = this.props.listCollId;
    record.authorName = this.props.nickname;

    if (!record.collection && this.props.listColl.length > 0 ) {
      record.collection = this.props.listColl[0]._id;
    }

    if (this.props.file) {
      this.fileUpload(this.props.file).then((response)=>{     
        console.log('save', this.state, this.props.text, response.data, this.props.listColl)
        record.img = response.data;

        // this.props.dispatch(UserActions.saveRecord(record));
        // this.props.dispatch(UserActions.setFile(null));
      })
    } else {
      console.log('save without image', this.state, this.props.text, this.props.listColl)
      // record.img = null;
      
      // this.props.dispatch(UserActions.saveRecord(record));
    }

    // this.setState({
    //   title: '',
    //   titleError: '',
    //   typeError: '',
    //   userGift: '',
    //   collection: '',
    //   record: {
    //     describe: '',
    //     type: [],
    //     state: 'draft',
    //     language: '',
    //     genre: '',
    //     img: '',
    //     gift: ''
    //   }
    // })
  }

  handleChangeCollection = e => {
    this.setState({ collection: e.target.value });

    if (e.target.value.lerecordActivength > 0) {
      this.props.dispatch(UserActions.findCollections(e.target.value));
    }
  }

  selectCollections = coll => {
    this.setState({ collection: coll.title });
    this.props.dispatch(UserActions.listCollectionsId(coll._id));
    this.props.dispatch(UserActions.listCollections([]));
  }

  handleChangeGift = e => {
    this.props.dispatch(UserActions.findGift(e.target.value))
  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        fullScreen
        open={this.props.open}
        scroll={'paper'}
        onClose={this.props.handleCloseModal}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.handleCloseModal} aria-label="Close">
              <Icon>clear</Icon>
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Edit
            </Typography>
            <Button color="inherit" onClick={this.handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div class='container'>
          <div class='left' > 
            <LeftPartRecordContainer
              title={this.state.title}
              titleError={this.state.titleError}
              text={this.state.text}
              handleChangeTitle={this.handleChangeTitle}             
             />
             <EditorContainer />
             {console.log('test edit', this.props)}
             <p>collName: {this.props.collName.title}</p>
          </div>
          <div class='right'> 
            <RightPartRecordContainer
              record={this.state.record}
              typeError={this.state.typeError}
              userGift={this.state.userGift}
              handleUserGift={this.handleUserGift}
              handleChangeGift={this.handleChangeGift}
              handleChangeRecord={this.handleChangeRecord}
              handlelistGift={this.handlelistGift}
              list={this.props.list}
              collection={this.state.collection}
              handleChangeCollection={this.handleChangeCollection}
              listColl={this.props.listColl}
              selectCollections={this.selectCollections}
              handleChangeRecordGenre={this.handleChangeRecordGenre}
             />
          </div>
        </div>
      </Dialog>
    )
  }
};

export default withStyles(styles)(EditModal);
