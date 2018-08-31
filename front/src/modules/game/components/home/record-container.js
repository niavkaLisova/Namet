import React from 'react'
import * as UserActions from '../../../user/actions/user-actions'
import * as GameActions from '../../actions/game-actions'

import appHistory from '../../../../utils/app-history'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'

import { Link } from 'react-router-dom'

@connect((store, ownProps) => {
  return {
    recordInfo: store.game.recordInfo
  };
})
class RecordContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.props.dispatch(GameActions.findRecordById(this.props.idRecord))
  }

  handleVote = () => {
    this.props.dispatch(GameActions.vote(this.props.idGame, this.props.idRecord))
  }

  render() {
    const info = this.props.recordInfo[this.props.idRecord];

    return (
      <div>
        {(info)? (
          <div class='recordGame'>
            <p>{info.title}</p>
            <Link to={`/read/` + info._id}>See</Link>
            <p onClick={this.handleVote}>Vote</p>
          </div>
        ): ''}
      </div>
    )
  }
};

export default RecordContainer;
