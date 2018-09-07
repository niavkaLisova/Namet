import React from 'react'
import * as UserActions from '../../user/actions/user-actions'
import * as RecordActions from '../../user/actions/record-actions'

import appHistory from '../../../utils/app-history'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'

import CoinInfoContainer from '../../user/components/read/coinInfo-container'

@connect((store, ownProps) => {
  return {
    idUser: ownProps.match.params.idUser,
    info: store.user.info
  };
})
class BudgetContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(UserActions.findInfoUser(this.props.idUser))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.idUser != this.props.idUser){
      this.props.dispatch(UserActions.findInfoUser(this.props.idUser))
    }
  }

  render() {
    let coinArr = Object.assign({}, this.props.info.coin);
    {(coinArr)? delete coinArr.neutral: ''}

    return (
      <div>
        <h2>Budget</h2>
        {(this.props.info.coin) ? (
          <div>
            {(this.props.idUser == localStorage.getItem('userId'))? (
              <div>neutral: {this.props.info.coin.neutral}</div>
            ): ''}
            <CoinInfoContainer coin={coinArr} />
          </div>
        ): 'points'}
      </div>
    )
  }
};

export default BudgetContainer;
