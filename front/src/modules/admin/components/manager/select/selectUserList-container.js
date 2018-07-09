import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { connect } from 'react-redux'

@connect((store, ownProps) => {
  	return {
    	findUser: store.adminN.findUser
  	};
})
export default class SelectUserListContainer extends React.Component {
	render() {
		return (
		  	<div>
		  		{(this.props.findUser.slice(0, 2).map( (user) => {
					return (
						<Card key={user._id} >    
					        <CardContent>
					          	<Typography gutterBottom variant="headline" component="h2">
					            	{user.nickname}
					          	</Typography>
					          	<Typography component="p">
					            	{user.name}
					          	</Typography>
					        </CardContent>
				        	<CardActions>
				          		<Button size="small" color="primary" onClick={() => this.props.selectUser(user)}>
				            		Select
				          		</Button>
				          		<Button size="small" color="primary">
				            		<Link to={`/user/${user._id}`}>
										See page
				            		</Link>
				          		</Button>
				        	</CardActions>
				      	</Card>
					)
				}))}
			</div>
		)
	}
}