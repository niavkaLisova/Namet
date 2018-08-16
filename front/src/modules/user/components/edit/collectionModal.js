import React from 'react'
import { connect } from "react-redux"

import appHistory from '../../../../utils/app-history'
import * as UserActions from '../../actions/user-actions'
import * as RecordEditActions from '../../actions/recordEdit-actions'
import * as RecordActions from '../../actions/record-actions'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ToastStore } from 'react-toasts'

import '../User.sass'

@connect((store, ownProps) => {
  return {
    listColl: store.user.listColl
  };
})
class CollectionModal extends React.Component {
  state = {
    open: false,
    collection: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeCollection = e => {
    this.setState({ collection: e.target.value });

    if (e.target.value.length > 0) {
      this.props.dispatch(UserActions.findCollections(e.target.value));
    }
  }

  selectCollections = coll => {
    console.log('select', coll);
    this.setState({ collection: coll.title });
    console.log('state', this.state)
    this.props.dispatch(UserActions.listCollectionsId(coll._id));
    this.props.dispatch(UserActions.listCollections([]));
  }

  render() {
    return (
      <div>
        {(this.state.collection.length > 0)? (this.state.collection): (this.props.title)}
        <Button onClick={this.handleClickOpen}>Select collection</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleCloseColl}
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Select Collection</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                label="Collection"
                onChange={this.handleChangeCollection}
                name="collection"
                value={this.state.collection}
               />
              <div>
                {this.props.listColl.map(collection => {
                  return (
                    <div key={collection._id}>
                      <p onClick={() => this.selectCollections(collection)}>{collection.title}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CollectionModal;