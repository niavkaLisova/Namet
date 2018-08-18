import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import CreateModal from '../record/createModal'

import SearchContainer from './search-container'
import RecentlyContainer from './recently-container'
import ListContainer from './list-container'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  	searchList: store.record.searchList
  };
})
class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  toCreateRecord = () => {
    this.setState({ open: true });
  }
  
  render() {
    return (
      <div>
        <CreateModal
          open={this.state.open}
          handleCloseModal={this.handleCloseModal}
         />
        <p onClick={this.toCreateRecord}>+ Record</p>
      	<SearchContainer id={this.props.id} />
      	{(this.props.searchList.length > 0)? '': (
      		<div>
		      	<RecentlyContainer id={this.props.id} />
		      	<ListContainer id={this.props.id} />
	      	</div>
      	)}
      </div>
    )
  }
};

export default SidebarContainer;
