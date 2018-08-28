import React from 'react'
import { Route, IndexRoute, Switch } from 'react-router'
import LoginContainer from '../modules/login/components/login-container'
import ChatContainer from '../modules/chat/components/chat-container'

import UserContainer from '../modules/user/components/user-container'
import RecordContainer from '../modules/user/components/record/record-container'
import EditContainer from '../modules/user/components/edit/edit-container'
import SettingsContainer from '../modules/user/components/settings/settings-container'
import FullScreenContainer from '../modules/user/components/read/fullScreen-container'
import FollowContainer from '../modules/user/components/follow/follow-container'
import CollectionEditContainer from '../modules/user/components/edit/collectionEdit-container'
import TeamSettingsContainer from '../modules/user/components/settings/teamSettings-container'
import BudgetContainer from '../modules/budget/components/budget-container'

import AdminPanelContainer from '../modules/admin/components/adminPanel-container'
import AdminJuniorContainer from '../modules/admin/components/adminJunior-container'
import ManagerContainer from '../modules/admin/components/manager-container'
import DashboardContainer from '../modules/dashboard/components/dashboard-container'
import AdminReportContainer from '../modules/admin/components/adminReport-container'
import TeamContainer from '../modules/admin/components/team-container'
import PostOfferContainer from '../modules/admin/components/postOffer-container'
import Welcome from '../modules/register/components/welcome'
import Error from '../modules/user/components/error'
import Confirm from '../modules/login/components/confirm'
import RegisterContainer from '../modules/register/components/register-container'

import TeamPageContainer from '../modules/team/components/teamPage-container'

import { RouteHandler } from 'react-router'
import requireAuth from './require-auth'

export default (
	<Switch>
		<Route exact path="/" component={Welcome} />
		<Route path="/register" component={RegisterContainer} />
		<Route path="/login" component={LoginContainer} />
		<Route path='/confirm/:email/:id' component={Confirm} />
		<Route path='/admin/junior' component={AdminJuniorContainer} />
		<Route path='/admin/manager' component={ManagerContainer} />
		<Route path='/admin/report' component={AdminReportContainer} />
		<Route path='/admin/team' component={TeamContainer} />
		<Route path='/admin/offer' component={PostOfferContainer} />
		<Route path='/admin' component={AdminPanelContainer} />
		<Route path='/error/:id/:time' component={Error} />
		<DashboardContainer>
			<Route path='/settings' component={SettingsContainer} />
   			<Route path='/user/:id?' component={UserContainer} />
     	   	<Route path='/chat/:idChat?' component={ChatContainer} />
     	   	<Route path='/record/:idUser/:idRecord?' component={RecordContainer} />
			<Route path='/edit/:idRecord' component={EditContainer} />
			<Route path='/read/:idRecord/' component={FullScreenContainer} />
			<Route path='/follow/:id' component={FollowContainer} />
			<Route path='/collection' component={CollectionEditContainer} />
			<Route path='/select/team' component={TeamSettingsContainer} />
			<Route path='/team/:idTeam?' component={TeamPageContainer} />
			<Route path='/budget/:idUser?' component={BudgetContainer} />
		</DashboardContainer>
	</Switch>
);

//
// onEnter={requireAuth}