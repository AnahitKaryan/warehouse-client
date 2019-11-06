import  React  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { Home } from './Components/Home';

class App extends React.Component {
    render() {
    return (
        <BrowserRouter>
            <Route path='/' exact component={Login}/>
            <Route path='/register' component={Register}  />
            <Route path='/home' component={Home}/>
        </BrowserRouter>
        );
    }
}

export { App };