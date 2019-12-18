import React, { Component } from 'react';
import * as log from 'loglevel';

import '../assets/css/userDataForm.css';
import { fetchCall } from '../DAO/DAO.js';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const OK = 200;

class Login extends Component {
    state = {
    	email: '',
    	password: '',
    	respons: ''
    }
    
    inputsChange = (e) => {
    	const name = e.target.name;
    	const value = e.target.value;
    	
    	if(name === 'email') {
    		this.setState({email: value}) ;
    	} else if(name === 'password') {
    		this.setState({password: value});
    	}
    }

    login = async(e) => {
    	e.preventDefault();
    	const user = Object.assign(this.state);
    	await fetchCall('signin', 'POST', user)
    		.then((res) => {
    			if(OK === res.status) {
    				localStorage.setItem('isAuthed', true);
    				localStorage.setItem('user', this.state.email);
    				this.props.history.push('/home');
    			} else {
    				this.setState({respons:'Password or Email is false!'});
    			}
    		}).catch(function(err) {
    			log.error('Fetch Error :-S' + err);
    		});
    }

    handleSubmit = (e) => {
    	this.props.history.push('/register');
    }

    forgotPassword = (e) => {
    	this.props.history.push('/forgotPassword');
    }
    
    render() {
    	return (
    		<Form className="user-data-form" noValidate>
    			<h3 className="res">{this.state.respons}</h3>
    			<h2 className="user-data-form__title">Sign In</h2>
    			<FormGroup>
    				<Label className="user-data-form__label">Email</Label>
    				<Input
    					className="user-data-form__input"
    					type="text"
    					placeholder="Enter your email"
    					name="email"
    					onChange={this.inputsChange}
    				/>
    			</FormGroup>
    			<FormGroup>
    				<Label className="user-data-form__label" for="examplePassword">Password</Label>
    				<Input
    					className="user-data-form__input"
    					type="password"
    					name="password"
    					placeholder="Enter your password"
    					onChange={this.inputsChange}
    				/>
    			</FormGroup>
    			<Button className="user-data-form__button" type="submit" onClick={this.login}>
                    Login
    			</Button>
    			<Button className="user-data-form__button" onClick={this.handleSubmit}>
                    Register
    			</Button>
    			<button className="btn btn-link d-flex justify-content-center" onClick={this.forgotPassword}>Forgot password</button>
    		</Form>
    	);
    }
}

export { Login };