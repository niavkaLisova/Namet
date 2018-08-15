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
    this.setState({
      activeCollection: item,
      test: 1
    })
  }

  handleChange = e => {
    let activeCollection = this.state.activeCollection;
    activeCollection[e.target.name] = e.target.value;

    this.setState({
      test: e.target.value,
      activeCollection
    })
  }

  handleUpdate = () => {
    console.log('save', this.state.activeCollection);
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
                  </div>
                </div>
              )
            })}
            <div>
              {(this.state.activeCollection && this.state.activeCollection.title.length > 0)? (
                <div>
                  <TextField
                    label='Title'
                    name='title'
                    value={this.state.activeCollection.title}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <TextField
                    label='Describe'
                    name='describe'
                    value={this.state.activeCollection.describe}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <Button variant="contained" onClick={this.handleUpdate}>
                    Update
                  </Button>
                </div>
              ): ''}
            </div>
          </div>
        ) : (<Redirect to='/login' />) }
      </Container>
    )
  }
};

export default CollectionEditContainer;
