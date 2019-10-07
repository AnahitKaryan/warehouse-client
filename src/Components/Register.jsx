import React, { Component } from 'react';
import {
    Container, Col, Row, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

import { FetchContext } from './FetchContext';

class Register extends Component {
    state = {
        name: '',
        surname: '',
        birthdate: '',
        gemus: 'female',
        email: '',
        password: '',
        errors: {
            name: '',
            surname: '',
            birthdate: '',
            gemus: '',
            email: '',
            password: ''
        },
        valid: false
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    checkValidation = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        const validEmailRegex =  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        switch (name) {
            case 'name': 
                let valid = value.length < 1 || (value[0] >= 'A' && value[0] <= 'Z');
                errors.name = 
                !valid ? 'The name must contain at least one character and begin with a capital letter!': '';
                break;
            case 'surname': 
                let validSurname = value.length < 1 || (value[0] >= 'A' && value[0] <= 'Z');
                errors.surname = 
                !validSurname ? 'The surname must contain at least one character and begin with a capital letter!': '';
                break;
            case 'birthdate': 
                errors.birthdate = value ? '' : 'Birthdate is requared value!';
                break;
            case 'gemus': 
                errors.gemus = value ? '' : 'Gemus is requared value!';
                break;
            case 'email': 
                errors.email =
                validEmailRegex.test(value) ? '': 'Email is not valid!';
                break;
            case 'password': 
                errors.password = 
                value.length < 5 ? 'Password must be 5 characters long!' : '';
                break;
            default:
                break;
        }

        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })
        this.validateForm(this.state.errors);
    }

    inputsChange = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        this.setState({targetName: targetValue});
        this.checkValidation(e);

        if(!this.validateForm(this.state.errors)){
            this.setState({valid: false});
        } else {
            this.setState({valid: true});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validateForm(this.state.errors)) {
            console.info('Valid Form')
            const newUser = {
                "name": this.state.name,
                "surname": this.state.surname,
                "birthdate": this.state.birthdate,
                "gemus": this.state.gemus,
                "email": this.state.email,
                "password": this.state.password       
            }
            this.context('http://localhost:8081/signup', 'POST', newUser );
        } else {
            console.error('Invalid Form')
        }                  
    }

    cancellClick = () => {
        this.props.history.push('/');
    }

    radioClick = (e) => {
        this.setState({ gemus: e.target.value })
    }

    render() {
        const {errors} = this.state;
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
                        {errors.email.length > 0 && 
                        <span className="error">{errors.email}</span>}
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
                        {errors.password.length > 0 && 
                        <span className="error">{errors.password}</span>}
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
                        {errors.name.length > 0 && 
                         <span className="error">{errors.name}</span>}
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
                        {errors.surname.length > 0 && 
                        <span className="error">{errors.surname}</span>}
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
                                {errors.birthdate.length > 0 && 
                                <span className='error'>{errors.birthdate}</span>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup tag="fieldset">
                        <legend>Gemus</legend>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" value="male"
                                    checked={this.state.gemus === 'male'} onChange={this.radioClick} required />
                                    Male
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" value="female"
                                    checked={this.state.gemus === 'female'} onChange={this.radioClick} required/>
                                    Female
                            </Label>
                        </FormGroup>
                        {errors.gemus.length > 0 && 
                        <span className="error">{errors.gemus}</span>}
                    </FormGroup>
                    <Button type="submit" disabled={!this.state.valid} onClick={this.handleSubmit}>
                        Register
                    </Button>
                    <Button  onClick={this.cancellClick}>
                        Cancell
                    </Button>
                </Form>
            </Container>
        );
    }
}

Register.contextType = FetchContext;
export { Register };

