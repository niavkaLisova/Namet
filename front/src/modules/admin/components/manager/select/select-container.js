import React from 'react'
import { Link } from 'react-router-dom'

import * as AdminActions from '../../../actions/admin-actions'
import ModalUser from '../ModalUser'
import SelectBlockContainer from './selectBlock-container'
import SelectDeleteContainer from './selectDelete-container'
import BoxShowContainer from '../boxShow-container'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Icon from '@material-ui/core/Icon'
import { connect } from 'react-redux'

import '../../Admin.sass'

@connect((store, ownProps) => {
  	return {
    	
  	};
})
export default class SelectContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: 1
		}
	}

	showBox = value => {
		this.setState({show: value})
	}

	render() {
		return (
		  	<List>
		  		
				<BoxShowContainer
		  			showBox={this.showBox}
		  		/>

				{(this.state.show == 0)? '': ''}
				{(this.state.show == 1)? (
					<SelectBlockContainer />
		  		): ''}
				{(this.state.show == 2)? (
				<SelectDeleteContainer/>): ''}

			</List>
		)
	}
}