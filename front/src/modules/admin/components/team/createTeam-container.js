import React from 'react'
import appHistory from '../../../../utils/app-history'
import { connect } from 'react-redux'
import axios, { post } from 'axios'
import { API_DOMAIN } from '../../../../utils/config.js'

import * as AdminActions from '../../actions/admin-actions'
import * as UserActions from '../../../user/actions/user-actions'
import Admin from '../admin-container'

import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { SketchPicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import '../Admin.sass'

@connect((store, ownProps) => {
  return {
  	teams: store.adminN.team
  };
})
export default class CreateTeamContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			r: 34,
			b: 25,
			g: 77,
			a: 100,
			emblem: '',
			file: null
		}
	}

	handleChangeName = event => {
		this.setState({ name: event.target.value })
	}

	handleChangeImage = event => {
		const file = event.target.files[0];
		this.setState({file: file})
	}

	fileUpload = file =>{
	    const url = API_DOMAIN + 'api/upload/team';
	    const formData = new FormData(this);
    	formData.append('file', file);
    	const config = {
        	headers: {
            	'content-type': 'multipart/form-data'
        	}
    	}

    	return  post(url, formData, config)
	}


	handleCreate = (e) => {
    	let inputs = document.getElementsByTagName('input');

    	this.setState({ 
			r: Number(inputs[2].defaultValue),
			g: Number(inputs[3].defaultValue),
			b: Number(inputs[4].defaultValue),
			a: (Number(inputs[5].defaultValue) / 100)
		})

    	this.fileUpload(this.state.file).then((response)=>{
    		const color = `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${this.state.a})`;
    		this.props.dispatch(AdminActions.createTeam(response.data, this.state.name, color));

    		this.setState({ 
    			name: '',
    			file: null
    		})
    	})

  	}

	render() {
		
		return (
		  	<div>
		  		<ValidatorForm
            		ref="form"
            		onSubmit={this.handleCreate}
        		>

				    <TextValidator
	                	label="Name"
	                	onChange={event => this.handleChangeName(event)}
	                	name="name"
	                	value={this.state.name}
	                	validators={['required']}
	                	errorMessages={['this field is required']}
	            	/>

				     <SketchPicker />

				    <input
					    accept="image/*"
					    id="upload-file"
					    type="file"
						onChange={this.handleChangeImage}
					 />

				    <Button
				    	variant="contained"
				    	color="primary"
					    type="submit"
	                	disabled={this.props.submitted}
	            	>
	                {
	                    (this.props.submitted && 'Your form is submitted!')
	                    || (!this.props.submitted && 'Create')
	                }
					</Button>
			    </ValidatorForm>
			</div>
		)
	}
}
 