import React from 'react'
import { Route, IndexRoute, Switch } from 'react-router'
import LoginContainer from '../modules/login/components/login-container'
import ChatContainer from '../modules/chat/components/chat-container'
import UserContainer from '../modules/user/components/user-container'
import PaymentContainer from '../modules/payment/components/payment-container'
import DashboardContainer from '../modules/dashboard/components/dashboard-container'
import Welcome from '../modules/register/components/welcome'
import RegisterContainer from '../modules/register/components/register-container'
import { RouteHandler } from 'react-router'
import requireAuth from './require-auth'

export default (
	<Switch>
		<Route exact path="/" component={Welcome} />
		<Route path="/register" component={RegisterContainer} />
		<Route path="/login" component={LoginContainer} />
		<DashboardContainer>
   			<Route path='/user/:id' component={UserContainer} />
     	   	<Route path='/payment' component={PaymentContainer} />
     	   	<Route path='/chat/' component={ChatContainer} />
     	</DashboardContainer>
	</Switch>
);

//
// onEnter={requireAuth}