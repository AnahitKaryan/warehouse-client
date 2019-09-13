import React, { Component } from 'react';
import {
  Container, Col, Row, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';


class Register extends Component {
  state = {
    name: '',
    surname: '',
    birthdate: '',
    gemus: 'female',
    email: '',
    password: '',
  }
  inputsChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log('kanchvel e inoputChange' + name + value)
    switch(name) {
  
      case 'email':
        this.setState({email: value});
        break;
      case 'password':
        this.setState({password: value});
        break;
      case 'name':
        this.setState({name: value});
        break;
      case 'surname':
        this.setState({surname: value});
        break;
      case 'birthdate':
        this.setState({birthdate: value});
        break;
      case 'gemus':
        this.setState({gemus: value }); 
        break;
      default:
        break;
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = Object.assign(this.state);
    /*const newUser = {
          "name": this.state.name,
          "surname": this.state.surname,
          "birthdate": this.state.birthdate,
          "gemus": this.state.gemus,
          "email": this.state.email,
          "password": this.state.password       
     }*/
    fetch('http://localhost:8081/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify( newUser)
                }).then((res) =>  {
                  if (res.status !== 200) { 
                    console.log('Looks like there was a problem. Status Code: ' +  res.status);  
                    return;  
                  }
                  this.props.history.push('/login')
                }).catch(function(err) {  
                  console.log('Fetch Error :-S', err);  
                });
                      
  }

  render() {
    return (
      <Container className="App">
        <h2>Register</h2>
        <Form className="form" noValidate>
            <FormGroup>
              <Label>Email</Label>
              <Input
                placeholder="Enter email"
                autoCapitalize={false}
                name="email"
                onChange={this.inputsChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={this.inputsChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input
                placeholder="Enter name"
                autoCapitalize={false}
                name="name"
                onChange={this.inputsChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Surname</Label>
              <Input
                type="text"
                placeholder="Enter surname"
                autoCapitalize={false}
                name="surname"
                onChange={this.inputsChange}
                required
              />
            </FormGroup>
            <Row form>
              <legend>Birthday</legend>
              <Col>
                <FormGroup>
                  <Input
                   type="date"
                   name="birthdate"
                   id="exampleDate"
                   onChange={this.inputsChange}
                 />
               </FormGroup>
             </Col>
           </Row>
           <FormGroup tag="fieldset">
              <legend>Genus</legend>
           <FormGroup check>
              <Label check>
                <Input type="radio" name="radio"/>
                   Male
              </Label>
          </FormGroup>
          <FormGroup check>
              <Label check>
                <Input type="radio" name="radio"/>
                  Female
              </Label>
          </FormGroup>
          </FormGroup>
          <Button type="submit" onClick={this.handleSubmit}>
            Register
          </Button>
          <Button  onClick={() => {}}>
            Cancell
          </Button>
        </Form>
      </Container>
    );
  }
}
export default Register;

{/* avelacnel radioi arjeqn el,Cancell sexmelis gnal login page*/}
