import React, { Component } from 'react';
import * as log from 'loglevel';

import '../assets/css/userDataForm.css';
import { fetchCall } from '../DAO/DAO.js';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const ZERO = 0;
const FIVE = 5;
const OK = 200;

class ForgotPassword extends Component {
    state = {
    	email: '',
    	password: '',
    	repeatPassword: '',
    	errors: {
    		email: 'Email is not valid!',
    		password: 'Password must be 5 characters long!',
    		repeatPassword: 'Password repetition must be 5 characters long!'
    	},
    	valid: false,
    	respons: ''
    }

    validateForm = (errors) => {
    	let valid = true;
    	Object.values(errors).forEach(
    		(val) => val.length > ZERO && (valid = false)
    	);
    	return valid;
    }

    checkValidation = (event) => {
    	const { name, value } = event.target;
    	let errors = this.state.errors;
    	const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

    	switch (name) {
    	case 'email':
    		errors.email =
                    validEmailRegex.test(value) ? '': 'Email is not valid!';
    		break;
    	case 'password':
    		errors.password =
                    value.length < FIVE ? 'Password must be 5 characters long!' : '';
    		break;
    	case 'repeatPassword':
    		errors.repeatPassword =
                    value.length < FIVE ? 'Password repetition must be 5 characters long!' : '';
    		break;
    	default:
    		break;
    	}

    	this.setState({errors, [name]: value}, ()=> {
    		log.error(errors);
    	});
    	this.validateForm(this.state.errors);
    }

    inputsChange = (e) => { 
    	const targetValue = e.target.value;

    	this.setState({[e.target.name]: targetValue});
    	this.checkValidation(e);

    	if(!this.validateForm(this.state.errors)){
    		this.setState({valid: false});
    	} else {
    		this.setState({valid: true});
    	}
    }

    confirmed = (e) => {
    	e.preventDefault();

    	if(this.validateForm(this.state.errors)) {
    		if(this.state.password !== this.state.repeatPassword) {
    			this.setState({respons: 'Password repetition does not match password'});
    			return;
    		} else {
    			this.setState({respons: ''});
    		}

    		log.error('Valid Form');

    		const newUser = {
    			'email': this.state.email,
    			'password': this.state.password
    		};
            
    		fetchCall('forgotPassword', 'PUT', newUser)
    			.then((res) => {
    				if (res.status !== OK) {
    					this.setState({respons: 'Check the accuraty of the data!'});

    					log.error('Looks like there was a problem. Status Code: ' + res.status);

    					return;

    				} else if (res.status === OK) {
    					this.props.history.push('/');
    				}
    			}).catch(function(err) {
    				log.error('Fetch Error :-S' + err);
    			});
    	} else {
    		log.error('Invalid Form');
    	}
    }

    cancellClick = () => {
    	this.props.history.push('/');
    }

    render() {
    	const {errors} = this.state;
    	return (
    		<Form className="user-data-form" noValidate>
    			<h3 className="res">{this.state.respons}</h3>
    			<h2 className="user-data-form__title">Forgot password</h2>
    			<FormGroup>
    				<Label className="user-data-form__label" >Enter your email</Label>
    				<Input
    					className="user-data-form__input"
    					placeholder="Enter email"
    					name="email"
    					onChange={this.inputsChange}
    					required
    				/>
    				{errors.email.length > ZERO &&
                    <span className="user-data-form__span-error">{errors.email}</span>}
    			</FormGroup>
    			<FormGroup>
    				<Label className="user-data-form__label" for="examplePassword">Enter new password</Label>
    				<Input
    					className="user-data-form__input"
    					type="password"
    					placeholder="Enter new password"
    					name="password"
    					onChange={this.inputsChange}
    					required
    				/>
    				{errors.password.length > ZERO &&
                    <span className="user-data-form__span-error">{errors.password}</span>}
    			</FormGroup>
    			<FormGroup>
    				<Label className="user-data-form__label" for="exampleRepeatPassword">Repeat new password</Label>
    				<Input
    					className="user-data-form__input"
    					type="password"
    					placeholder="Repeat new password"
    					name="repeatPassword"
    					onChange={this.inputsChange}
    					required
    				/>
    				{errors.repeatPassword.length > ZERO &&
                    <span className="user-data-form__span-error">{errors.repeatPassword}</span>}
    			</FormGroup>
    			<Button className="user-data-form__button" type="submit" onClick={this.confirmed} disabled={!this.state.valid}>
                    Confirmed
    			</Button>
    			<Button className="user-data-form__button" onClick={this.cancellClick}>
                    Cancell
    			</Button>
    		</Form>
    	);
    }
}

export { ForgotPassword };