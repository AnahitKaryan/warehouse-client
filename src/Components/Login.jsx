import React, { Component } from 'react';
import '../assets/styles.css';
import { fetchCall } from '../DAO/DAO.js';

import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    inputsChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        name === 'email' ? this.setState({email: value}) : this.setState({password: value});
    }

    login = async(e) => {
        e.preventDefault();
        const user = Object.assign(this.state);
        await fetchCall('signin', 'POST', user)
        .then((res) =>  {
            if(200 === res.status) {
                console.log('respons hader ------' + JSON.stringify(res.headers))
                document.cookie = res.headers.Cookie; //-----?
                localStorage.setItem('isAuthed', true);
                this.props.history.push('/home');
            } else {
                alert('Password or Email is false');
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    handleSubmit = (e) => {
        this.props.history.push('/register');
    }
    render() {
        return (
            <Form className="user-data-form" noValidate>
                <h2 className="user-data-form__title">Sign In</h2>
                <Col>
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
                </Col>
                <Col>
                    <FormGroup>
                        <Label  className="user-data-form__label" for="examplePassword">Password</Label>
                        <Input
                        className="user-data-form__input"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={this.inputsChange}
                      />
                    </FormGroup>

                </Col>
                <Button className="user-data-form__button" type="submit" onClick={this.login}>
                    Login
                </Button>
                <Button  className="user-data-form__button" onClick={this.handleSubmit}>
                    Register
                </Button>
            </Form>
        );
    }
}

export { Login };