import React, { Component } from 'react';

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
        const result = await fetch('http://localhost:8081/signin', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        });

      console.log("resultei Statys" + result.status);

      const content = await result.json();
      if(200 === result.status){
          this.props.history.push('/home');

      }else{
          alert(content.message);
      }
              
      } catch (error) {
          alert(`Password or Email is false`);
      }
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
          <Button  onClick={() => {this.props.history.push('/register');}}>
            Register
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
