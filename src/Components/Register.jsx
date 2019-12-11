import React, { Component } from 'react';
import {
    Col, Row, Form,
    FormGroup, Label, Input,
    Button
} from 'reactstrap';

import { fetchCall } from '../DAO/DAO.js';
import '../assets/css/userDataForm.css';

class Register extends Component {
    state = {
        name: '',
        surname: '',
        birthdate: '',
        gemus: 'female',
        email: '',
        password: '',
        errors: {
            name: 'The name must contain at least one character and begin with a capital letter!',
            surname: 'The surname must contain at least one character and begin with a capital letter!',
            birthdate: 'Birthdate is requared value!',
            gemus: '',
            email: 'Email is not valid!',
            password: 'Password must be 5 characters long!'
        },
        valid: false,
        respons: '',
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
        const validEmailRegex =  RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

        switch (name) {
            case 'name':
                let valid = value === [] || (value[0] >= 'A' && value[0] <= 'Z');
                errors.name =
                !valid ? 'The name must contain at least one character and begin with a capital letter!': '';
                break;
            case 'surname':
                let validSurname = value === [] || (value[0] >= 'A' && value[0] <= 'Z');
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
        const targetValue = e.target.value;

        this.setState({[e.target.name]: targetValue});
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
            fetchCall('signup', 'POST', newUser)
            .then((res) =>  {
                if (res.status !== 200) {
                    if (res.status === 400) {
                        this.setState({respons: 'There is already a user at this email address,enter a different address!'});
                    } else if (res.status === 404) {
                        this.setState({respons: 'Conflict error!'});
                    } else if (res.status === 500) {
                        this.setState({respons: 'INTERNAL_SERVER_ERROR!'});
                    } 
                    console.log('Looks like there was a problem. Status Code: ' +  res.status);
                    return;
                } else  if (res.status === 200)  {
                    this.props.history.push('/');
                }
            }).catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
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
            <Form className="user-data-form" noValidate>
                <h3 className="res">{this.state.respons}</h3>
                <h2 className="user-data-form__title">Register</h2>
                <FormGroup>
                    <Label className="user-data-form__label" >Email</Label>
                     <Input
                        className="user-data-form__input"
                        placeholder="Enter email"
                        autoCapitalize={false}
                        name="email"
                        onChange={this.inputsChange}
                        required
                      />
                    {errors.email.length > 0 &&
                    <span className="user-data-form__span-error">{errors.email}</span>}
                </FormGroup>
                <FormGroup>
                    <Label className="user-data-form__label" for="examplePassword">Password</Label>
                     <Input
                        className="user-data-form__input"
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        onChange={this.inputsChange}
                        required
                    />
                    {errors.password.length > 0 &&
                    <span className="user-data-form__span-error">{errors.password}</span>}
                </FormGroup>
                <FormGroup>
                    <Label className="user-data-form__label" >Name</Label>
                    <Input
                        className="user-data-form__input"
                        placeholder="Enter name"
                        autoCapitalize={false}
                        name="name"
                        onChange={this.inputsChange}
                        required
                     />
                    {errors.name.length > 0 &&
                     <span className="user-data-form__span-error">{errors.name}</span>}
                </FormGroup>
                <FormGroup>
                    <Label className="user-data-form__label" >Surname</Label>
                    <Input
                        className="user-data-form__input"
                        type="text"
                        placeholder="Enter surname"
                        autoCapitalize={false}
                        name="surname"
                        onChange={this.inputsChange}
                        required
                    />
                    {errors.surname.length > 0 &&
                    <span className="user-data-form__span-error">{errors.surname}</span>}
                </FormGroup>
                <Row form>
                    <legend className="user-data-form__legend">Birthday</legend>
                    <Col>
                        <FormGroup>
                            <Input
                                className="user-data-form__input"
                                type="date"
                                name="birthdate"
                                id="exampleDate"
                                onChange={this.inputsChange}
                            />
                            {errors.birthdate.length > 0 &&
                            <span className="user-data-form__span-error">{errors.birthdate}</span>}
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup tag="fieldset">
                    <legend className="user-data-form__legend">Gemus</legend>
                    <FormGroup check>
                        <Label className="user-data-form__label" check>
                            <Input
                                className="user-data-form__input" 
                                type="radio" 
                                name="radio"
                                value="male"
                                checked={this.state.gemus === 'male'} 
                                onChange={this.radioClick} required /> 
                                <span>&#9794;  Male</span>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label className="user-data-form__label" check>
                            <Input
                                className="user-data-form__input" 
                                type="radio" 
                                name="radio" 
                                value="female"
                                checked={this.state.gemus === 'female'} 
                                onChange={this.radioClick} required/>
                                <span>&#9792;  Female</span>
                        </Label>
                    </FormGroup>
                    {errors.gemus.length > 0 &&
                    <span className="user-data-form__span-error">{errors.gemus}</span>}
                </FormGroup>
                <Button className="user-data-form__button" type="submit" disabled={!this.state.valid} onClick={this.handleSubmit}>
                    Register
                </Button>
                <Button  className="user-data-form__button" onClick={this.cancellClick}>
                    Cancell
                </Button>
            </Form>
        );
    }
}

export { Register };