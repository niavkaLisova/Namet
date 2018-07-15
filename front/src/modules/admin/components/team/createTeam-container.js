import React from 'react'
import appHistory from '../../../../utils/app-history'

import * as AdminActions from '../../actions/admin-actions'
import Admin from '../admin-container'

import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { SketchPicker } from 'react-color'

import '../Admin.sass'

export default class CreateTeamContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			r: 0,
			b: 0,
			g: 0,
			a: 0,
			emblem: ''
		}
	}

	handleChangeName = event => {
		this.setState({ name: event.target.value })
	}

	handleCreate = () => {
		let inputs = document.getElementsByTagName('input');

		this.setState({ 
			r: Number(inputs[2].defaultValue),
			g: Number(inputs[3].defaultValue),
			b: Number(inputs[4].defaultValue),
			a: Number(inputs[5].defaultValue)
		})
	}

	handleChangeColor = event => {
		this.setState({ color: event.target.value })
	}

	handleChangeImage = event => {
		console.log('event', event.target.value)
	}

	render() {
		
		return (
		  	<div>
		  		<Input
			        placeholder="Name"
			        inputProps={{
			          'aria-label': 'Name',
			        }}
			        value={this.state.name}
			        onChange={event => this.handleChangeName(event)}
			      />
			    <SketchPicker />

			    <div style={{
				    'backgroundColor': `rgb(${this.state.r}, ${this.state.g}, ${this.state.b})`
				}}>
			    	<p>TEXT</p>
			    </div>

			    <form ref='uploadForm' 
			      id='uploadForm' 
			      action='http://127.0.0.1:3000/api/upload' 
			      method='post' 
			      encType="multipart/form-data">
			        <input type="file" name="sampleFile" />
			        <input type='submit' value='Upload!' />
			    </form> 

			    <Button variant="contained" color="primary" onClick={this.handleCreate}>
			    	Create
			    </Button>

			</div>
		)
	}
}
 