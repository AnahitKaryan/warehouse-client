import React, { Component } from 'react';
import '../assets/login.css';
import { FetchContext } from './FetchContext';

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
        try {
            const result = await this.context('http://localhost:8081/signin', 'POST', user );
            const content = await result.json();
            if(200 === result.status) {
                localStorage.setItem('isAuthed', true);
                this.props.history.push('/home');

            } else {
                alert(content.message);
            }
              
        } catch (error) {
            alert(`Password or Email is false`);
        }
    }

    handleSubmit = (e) => {
        this.props.history.push('/register');
    }
    render() {
        return (
            <Container className="App">
                <h2>Sign In</h2>
                <Form className="form" noValidate>
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                            type="text"
                            placeholder="Enter your email"
                            name="email"
                            onChange={this.inputsChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={this.inputsChange}
                          />
                        </FormGroup>
                     
                    </Col>
                    <Button type="submit" onClick={this.login}>
                        Login
                    </Button>
                    <Button   onClick={this.handleSubmit}>
                        Register
                    </Button>
                </Form>
            </Container>
        );
    }
}

Login.contextType = FetchContext;
export { Login };
