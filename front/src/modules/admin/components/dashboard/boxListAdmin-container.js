import React from 'react'
import { connect } from 'react-redux'

import * as AdminActions from '../../actions/admin-actions'

import Icon from '@material-ui/core/Icon'

@connect((store, ownProps) => {
  	return {
  		listJunior: store.adminN.listJunior
  	};
})
class BoxListAdminContainer extends React.Component {
	constructor(props) {
		super(props);

		this.props.dispatch(AdminActions.listJunior());
	}

	render() {
		return (
		  	<div>
		  		{this.props.listJunior.map(admin => {
		  			return <p key={admin._id}>{admin.nickname}
		  			{(admin.online.length > 0)? (<Icon>fiber_manual_record</Icon>): ''}</p>
		  		})}
		  	</div>
		)
	}
}

export default BoxListAdminContainer