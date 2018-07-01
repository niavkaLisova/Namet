import React from 'react'
import { Link } from 'react-router-dom'

import * as AdminActions from '../actions/admin-actions'
import Admin from './admin-container'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'

@connect((store, ownProps) => {
  	return {
    	findJunior: store.adminN.findJunior
  	};
})
export default class SelectContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			juniorObj: {},
			visible: false
		}
	}

	selectJunior = (user) => {
		console.log('select jun', user);

		this.setState({
			juniorObj: user
		})
	}

	onChangeSelect = (event) => {
		let visible = (event.target.value.length > 0)? true: false;
	    
	    this.setState({
	      input: event.target.value,
	      visible
	    });

	    this.props.dispatch(AdminActions.findJunior(event.target.value));
	}

	render() {
		return (
		  	<List>
			    <TextField
		        	label="select user"
		          	placeholder="junior"
			        margin="normal"
			        value={this.state.input}
			        onChange={this.onChangeSelect.bind(this)}
		        />
			    <Button variant='contained' onClick={this.selectJunior}>
			    	Add
			    </Button>
			
				{(this.state.visible) ? (this.props.findJunior.map( (user) => {
					return (
						<Card key={user._id}>    
					        <CardContent>
					          	<Typography gutterBottom variant="headline" component="h2">
					            	{user.nickname}
					          	</Typography>
					          	<Typography component="p">
					            	{user.name}
					          	</Typography>
					        </CardContent>
				        	<CardActions>
				          		<Button size="small" color="primary" onClick={() => this.selectJunior(user)}>
				            		Select
				          		</Button>
				          		<Button size="small" color="primary">
				            		<Link to={`/user/${user._id}`}>
										See page {user._id}
				            		</Link>
				          		</Button>
				        	</CardActions>
				      	</Card>
					)
				})) : ''
				}
				
			</List>
		)
	}
}