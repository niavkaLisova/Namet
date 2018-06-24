import React from 'react'
import { List, ListItem } from 'material-ui/List'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
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
	findMsg(element) {
		console.log('elem', element);
		return <p>1</p>;
	}
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
			          		{	
			          			(this.props.messages.find(x => (x.random == this.props.msg.random && x.user != localStorage.getItem('userId'))) )? (
								(this.props.messages.find(x => (x.random == this.props.msg.random && x.user != localStorage.getItem('userId'))).read) ? 'read': 'not read'
			          			): ('nema')
			          		}
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
