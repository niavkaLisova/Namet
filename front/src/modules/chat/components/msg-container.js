import React from 'react'
import { List, ListItem } from 'material-ui/List'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import ReadContainer from './read-container'
import './Message.sass';
const ReactIntl = require('react-intl');
const FormattedRelative = ReactIntl.FormattedRelative;

@connect((store, ownProps) => {
    return {
    	messages: store.chat.messages,
    	betweenName: store.chat.betweenName
    };
})
class MsgContainer extends React.Component {
	render() {
		return (
			<div class={(this.props.msg.read)? '': 'read'} key={this.props._id}>
	        	<ListItem
		          class={(localStorage.getItem('userId') == this.props.msg.author)? 'right': 'left'}
		          primaryText={
		          	<Container>
		          		<span class='msgName'>{this.props.betweenName.map((user) => (user.id == this.props.msg.author)? user.name: '')}</span>
					</Container>
		          }
		          secondaryText={
		            <Container>
		            	<Row>
		            		<Col sm={12}>
		          				{this.props.msg.text}
		          			</Col>
		          		</Row>
		          		<Row>
			          		<Col sm={8}>
			          		{((this.props.messages[this.props.number - 1])?
			          		((this.props.msg.random == (this.props.messages[this.props.number - 1]).random)) ? (
			          			<ReadContainer value={(this.props.messages[this.props.number - 1])} />): ' ' :
			          		('') )}
			          		{((this.props.messages[this.props.number + 1])?
			          		((this.props.msg.random == (this.props.messages[this.props.number + 1]).random)) ? (' YES '): ' ' :
			          		('') )}
			          			
			          		</Col>
							<Col sm={4}>
								<FormattedRelative value={this.props.msg.createdAt} />
							</Col>
						</Row>
		                
		            </Container>
		          }
		          secondaryTextLines={2}
		        />

	        </div>
		)
	}
}

export default MsgContainer;
