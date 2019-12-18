import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { NotFound } from './Components/notFound';
import { UserPage } from './Components/userPage';
import { Login } from './Components/login';
import { Register } from './Components/register';
import { ForgotPassword } from './Components/forgotPassword';
import { Home } from './Components/home';
import { Best } from './Components/Bests/best';
import { TableHistories } from './Components/Tables/Histories/tableHistories';
import { TableProducts } from './Components/Tables/Products/tableProducts';
import { TableShops } from './Components/Tables/Shops/tableShops';
import { TableSenders } from './Components/Tables/Senders/tableSenders';
import './assets/css/styles.css';

class App extends React.Component {

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={Login}/>
					<Route path='/register' component={Register}/>
					<Route path='/forgotPassword' component={ForgotPassword}/>
					<Route path='/home' component={Home}/>
					<Route path='/productsList' component={TableProducts}/>
					<Route path='/shopsList' component={TableShops}/>
					<Route path='/sendersList' component={TableSenders}/>
					<Route path='/historiesList' component={TableHistories}/>
					<Route path='/best' component={Best}/>
					<Route path='/userPage' component={UserPage}/>
					<Route path='*'component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export { App };