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
			file: null,
			point: null,
			fileError: '',
			pointError: ''
		}
	}

	handleChangeName = event => {
		this.setState({ name: event.target.value })
	}

	handleChangeImage = event => {
		const file = event.target.files[0];
		this.setState({file: file})
	}

	handleChangePoint = event => {
		const point = event.target.files[0];
		this.setState({point: point})
	}

	fileUpload = (file, point) =>{
	    const url = API_DOMAIN + 'api/upload/team';
	    const formData = new FormData(this);
    	formData.append('file', file);
    	formData.append('point', point);
   
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
		});
		let fileError = '';
		let pointError = '';

		if (!this.state.file) fileError = 'Emblem is required';
		if (!this.state.point) pointError = 'Point is required'; 

    	if (!this.state.file || !this.state.point) {
    		this.setState({
    			fileError,
    			pointError
    		})
    	} else {
	    	this.fileUpload(this.state.file, this.state.point).then((response)=>{
	    		const color = `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${this.state.a})`;
	    		console.log(response.data, 'file upload')
	    		const { result, resultPoint} = response.data;
	    		this.props.dispatch(AdminActions.createTeam(result, this.state.name, color, resultPoint));

	    		this.setState({ 
	    			name: '',
	    			file: null,
	    			point: point,
	    			fileError,
	    			pointError
	    		})
	    	})
	    }
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

				    <div>Emplem:
					    <input
						    accept="image/*"
						    id="upload-file"
						    type="file"
							onChange={this.handleChangeImage}
						 />
						<p class='error'>{this.state.fileError}</p>
					</div>

					<div>Point:
						<input
						    accept="image/*"
						    id="upload-file-point"
						    type="file"
							onChange={this.handleChangePoint}
						 />
						<p class='error'>{this.state.pointError}</p>
					</div>

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
 