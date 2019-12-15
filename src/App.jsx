import  React  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { Home } from './Components/Home';
import { Best } from './Components/Bests/Best';
import { TableHistories } from './Components/Tables/Histories/TableHistories';
import { TableProducts } from './Components/Tables/Products/TableProducts';
import { TableShops } from './Components/Tables/Shops/TableShops';
import { TableSenders } from './Components/Tables/Senders/TableSenders';
import './assets/css/styles.css';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Route path='/' exact component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/home' component={Home}/>
                <Route path='/productsList' component={TableProducts}/>
                <Route path='/shopsList' component={TableShops}/>
                <Route path='/sendersList' component={TableSenders}/>
                <Route path='/historiesList' component={TableHistories}/>
                <Route path='/best' component={Best}/>
            </BrowserRouter>
        );
    }
};

export { App };