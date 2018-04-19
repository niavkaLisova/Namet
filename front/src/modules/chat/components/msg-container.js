import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from "react-redux"

import './Message.sass';

@connect((store, ownProps) => {
    return {
      betweenName: store.chat.betweenName
    };
})
class MsgContainer extends React.Component {
	render() {
		return (
			// <ListItem>
			<Card key={this.props.msg._id} class={ (localStorage.getItem('userId') == this.props.msg.author)? 'right': 'left'}>
			    <CardHeader
			      title={this.props.betweenName.map((user) => (user.id == this.props.msg.author)? user.name: '')}
			      subtitle={this.props.msg.text}
			      avatar=""
			    />
			</Card>
			//
			// </ListItem>

		)
	}
}

export default MsgContainer;
