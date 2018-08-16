import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import * as UserActions from '../../actions/user-actions'
import appHistory from '../../../../utils/app-history'

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import { ToastStore } from 'react-toasts'
import { Redirect } from 'react-router-dom'

import '../User.sass'

@connect((store, ownProps) => {
  return {
    collectionsList: store.record.collectionsList
  };
})
class CollectionEditContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCollection: {
        title: '',
        describe: ''
      }
    }

    this.props.dispatch(RecordActions.findCollectionsById(localStorage.getItem('userId')));
  }

  handleActive = item => {
    let copy = Object.assign({}, item);

    this.setState({
      activeCollection: copy,
      titleError: ''
    })
  }

  handleChange = e => {
    let activeCollection = this.state.activeCollection;
    activeCollection[e.target.name] = e.target.value;

    this.setState({
      activeCollection
    })
  }

  handleUpdate = () => {
    if (this.state.activeCollection.title.length > 0) {
      let newList = [];
      this.props.collectionsList.map(record => {
        if (record._id != this.state.activeCollection._id) {
          newList.push(record);
        } else {
          record.title = this.state.activeCollection.title;
          record.describe = this.state.activeCollection.describe;
          newList.push(record);
        }
      });

      this.props.dispatch(RecordActions.collectionUpdate(this.state.activeCollection, newList))
      
      let activeCollection = this.state.activeCollection;
      activeCollection.title = '';
      activeCollection.describe = '';
      this.setState({ activeCollection });
    } else {
      this.setState({ titleError: 'Title is required' });
    }
  }

  handleCreate = () => {
    if (this.state.activeCollection.title.length > 0){
      this.props.dispatch(UserActions.createCollection(this.state.activeCollection, this.props.collectionsList));

      let activeCollection = this.state.activeCollection;
      activeCollection.title = '';
      activeCollection.describe = '';
      
      this.setState({ 
        activeCollection
      });

    } else {
      this.setState({ titleError: 'Title is required' });
    }
  }

  handleRemove = item => {
    let newList = this.props.collectionsList.filter(record => {
      return record._id != item._id
    });

    this.props.dispatch(RecordActions.setcollectionsList(newList))
    this.props.dispatch(RecordActions.removeCollectionById(item._id))
  }

  render() {
    return (
      <Container fluid>
        {(localStorage.getItem('userId'))? (
          <div>
            {this.props.collectionsList.map(item => {
              return (
                <div key={item._id}>
                  <div onClick={() => this.handleActive(item)}>
                    {item.title}
                    <span onClick={() => this.handleRemove(item)}> remove</span>
                  </div>
                </div>
              )
            })}
            
            <div>
                <div>
                  <TextField
                    label='Title'
                    name='title'
                    value={this.state.activeCollection.title}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <div class='error'>{this.state.titleError}</div>
                  <TextField
                    label='Describe'
                    multiline
                    rowsMax='4'
                    name='describe'
                    value={this.state.activeCollection.describe}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <Button variant="contained" onClick={this.handleUpdate}>
                    Update
                  </Button>
                  <Button variant="contained" onClick={this.handleCreate}>
                    Create
                  </Button>
                </div>
            </div>
          </div>
        ) : (<Redirect to='/login' />) }
      </Container>
    )
  }
};

export default CollectionEditContainer;
