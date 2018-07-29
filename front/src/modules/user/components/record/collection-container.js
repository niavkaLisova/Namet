import React from 'react'
import { connect } from "react-redux"

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import NewCollectionModal from './newCollectionModal'

@connect((store, ownProps) => {
  return {
  };
})
class CollectionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  createCollection = () => {
    this.handleClickOpen();
  }

  render() {
    return (
      <div>
        <TextField
          label="Collection"
          onChange={this.props.handleChangeCollection}
          name="collection"
          value={this.props.collection}
         />
        <Button color="inherit" onClick={this.createCollection}>
          Create collection
        </Button>
        <NewCollectionModal
          open={this.state.open}
          handleClose={this.handleClose}
         />
      </div>
    )
  }
};

export default CollectionContainer;
