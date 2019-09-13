import React from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



export default class App extends React.Component {
   constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      name: '',
      surname: '',
      date: '',
      gemus: '',
      loginOrRegister: false,
      homeSection: 1
    };
  }
  cancellInRegister() {
    this.setState({loginOrRegister: true});
  }
  registerInLogin() {
  //  this.setState({loginOrRegister: false});
  return alert('aa')
  }

  render() {
    return (
      <Router>
        
           <Route path='/' exact component={Register}/>
           <Route path='/login' component={Login}  />
           <Route path='/home' component={Home}/>
        
      </Router>
    );
  }
}