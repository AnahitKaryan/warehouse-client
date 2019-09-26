import React from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Table from './Components/Table/Table';

import {BrowserRouter as Router, Route} from 'react-router-dom';



export default class App extends React.Component {

    render() {
    return (
            <Router>
                <Route path='/' exact component={Login}/>
                <Route path='/register' component={Register}  />
                <Route path='/home' component={Home}/>
                <Route path='/productsTable'  render={(props) => <Home s{...props} component={<Table data='products'/>}/>}/>
                <Route path='/shopsTable'  render={(props) => <Home s{...props} component={<Table data='shops'/>}/>}/>
                <Route path='/sendersTable'  render={(props) => <Home s{...props} component={<Table data='senders'/>}/>}/>
            </Router>
        );
    }
}
