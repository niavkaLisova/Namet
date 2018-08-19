import React from 'react'

import * as ChatActions from '../../actions/chat-actions'
import * as UserActions from '../../../user/actions/user-actions'
import { socketConnect } from 'socket.io-react'
import { connect } from "react-redux"
import { withStyles } from '@material-ui/core/styles'
import { API_DOMAIN } from '../../../../utils/config.js'
import appHistory from '../../../../utils/app-history'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

import CounterMessages from './counterMessages-container'

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 80,
    height: 80,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

@connect((store, ownProps) => {
  return {
    limit: store.chat.limit,
    messages: store.chat.messages,
    unread: store.chat.unread,
    between: store.chat.between,
  };
})
class ListroomsContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
  	  	msg: ''
		};

		this.props.chat.map((item) => {
			this.props.dispatch(ChatActions.unreadSelect(item._id));
		})

		this.props.dispatch(ChatActions.messageRead('', this));

		this.props.socket.on('message g', (data) => {
	    this.props.chat.map((item) => {
				this.props.dispatch(ChatActions.unreadSelect(item._id));
			});
      this.props.dispatch(ChatActions.allChat());
      console.log(data, 'g')
	  });

    this.props.socket.on('reload read message', () => {
    	console.log('reload')
    	this.props.chat.map((item, index) => {
				this.props.dispatch(ChatActions.getMessagesRoom(this.props.idChat, this.props.limit))
			});
    })

		this.props.socket.on('message', (data) =>{
			console.log('msg', data)
			this.props.dispatch(ChatActions.messageRead(this.props.roomId, this));
			data.read = true
			this.props.dispatch(ChatActions.messageAdd(data));

			if (window.document.getElementById('scroll')) {
				let nodeList = window.document.getElementById('scroll')
			    let node = window.document.getElementById('scrollContainer')
				let style = window.getComputedStyle(nodeList, null);
				let height = parseFloat(style.getPropertyValue("height"));
				node.scrollTo(0, height); 
			}
		})
		setTimeout(function(){
			if(window.document.getElementById('scroll')) {
				let style = window.getComputedStyle(window.document.getElementById('scroll'), null);
				let height = parseFloat(style.getPropertyValue("height"));
				window.document.getElementById('scrollContainer').scrollTo(0, height)
			}
		}.bind(this), 1000)
	}

	openChat = chat => {
		appHistory.push('/chat/' + chat._id)
	}

	handleDeleteAllM = () => {
		console.log('delete m', this.props.messages.length, this.props.idChat)
		if (this.props.messages.length > 0) {
			this.props.dispatch(ChatActions.deleteUserFromChatAllM(this.props.idChat, this.props.between.length))
			this.props.dispatch(ChatActions.getMessagesRoom(this.props.idChat, this.props.limit))
		}
	}

	handleDeleteRoom = () => {
		if(this.props.messages.length > 0) {
			this.props.dispatch(ChatActions.deleteUserFromChatAllM(this.props.idChat, this.props.between.length))
		}
		this.props.dispatch(ChatActions.deleteRoom(this.props.idChat, this.props.between.length, this.props.socket))
		this.props.socket.emit('leave room', this.props.roomId);
	}

	render = () => {
		const { classes, theme } = this.props;

		return (
			<div>
				<hr />
				{(Object.keys(this.props.chat)).map(key => {
			    return (
			    	<div key={key}>
				    	<Card className={classes.card}>
				        <CardMedia
				          className={classes.cover}
				          image={API_DOMAIN + 'public/upload/user/noname.png'}
				          title={this.props.chat[key].name}
				        />

				        <div className={classes.details}>
				          <CardContent className={classes.content}>
				            <Typography variant="body2">
				            	<CounterMessages 
								      	id={key} 
								      	that={this.props.dispatch} 
								      	unread={this.props.unread[this.props.chat[key]._id]} 
								      	active={this.props.chat[key]._id == this.props.idChat}  
								      	between={this.props.chat[key].between}
								     	 	handleDeleteAllM={this.handleDeleteAllM}
								     	 	handleDeleteRoom={this.handleDeleteRoom}
								     	 />
				            </Typography>
				            <Typography 
				            	variant="caption"
				            	color="textSecondary"
				            	onClick={() => this.openChat(this.props.chat[key])}
				             >
				              select
				            </Typography>
				          </CardContent>
				        </div>
				      </Card>
				    </div>
				    )
				  })
				}
			</div>
		)
	}
}

export default socketConnect( withStyles(styles, { withTheme: true })(ListroomsContainer));
