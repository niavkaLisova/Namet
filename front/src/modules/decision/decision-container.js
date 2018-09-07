import React from 'react'

import { connect } from "react-redux"
import * as RecordActions from '../user/actions/record-actions'

import './Style.sass'

@connect((store, ownProps) => {
  return {
  	admin: store.user.admin,
    email: store.user.email,
    team: store.user.team
  };
})
class DecisionContainer extends React.Component {
	handleAdminDecision = () => {
		this.props.dispatch(RecordActions.adminDecision(
			this.props.record,
			this.props.team
		))
	}

	render() {
		const day = (new Date()).getDate();
		
		return (
			<div>
				{(
          (this.props.admin != 'undefined' && this.props.admin)
          || (this.props.email == 'admino')
          )? (
          	<div>
							{(day > 5)? (
								<div
									class='decisionHover'
									onClick={this.handleAdminDecision}
								 >
									Admin Decision
								</div>
							): ''}	
						</div>

        ): ''}

			</div>
		)
	}
}

export default DecisionContainer;
