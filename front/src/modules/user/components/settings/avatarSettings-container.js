import React from 'react'
import { connect } from 'react-redux'
import axios, { post } from 'axios'
import { API_DOMAIN } from '../../../../utils/config.js'
import { ToastStore } from 'react-toasts'


import * as UserActions from '../../actions/user-actions'

import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

@connect((store, ownProps) => {
  return {
  	user: store.user
  };
})
export default class AvatarSettingsContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			file: null
		}
	}

	handleChangeImage = event => {
		const file = event.target.files[0];
		this.setState({file: file})
	}

	fileUpload = file => {
		console.log(API_DOMAIN + 'api/upload/user/');
	    const url = API_DOMAIN + 'api/upload/user/';
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
		if (this.state.file) {
	    	this.fileUpload(this.state.file).then((response)=>{
	    		this.props.dispatch(UserActions.changeAvatar(response.data, this.props.avatar));

	    		this.setState({
	    			file: null
	    		})
	    	})
    	} else {
    		ToastStore.warning('Select photo');
    	}

  	}

	render() {
		
		return (
		  	<div>		
			    <input
				    accept="image/*"
				    id="upload-file"
				    type="file"
					onChange={this.handleChangeImage}
				 />

				<Button variant="contained" component="span" onClick={this.handleCreate}>
          			Upload
        		</Button>
			</div>
		)
	}
}
 