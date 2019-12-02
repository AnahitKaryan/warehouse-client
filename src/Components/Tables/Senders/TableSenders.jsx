import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Col } from 'reactstrap';

import {List } from './List';
import { fetchCall } from '../../../DAO/DAO.js';

class TableSenders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filteredList: [],
            name: '',
            surname: '',
            respons: ''
        };
        this.fetchCall = fetchCall.bind(this);
    }

    componentDidMount() {
        this.fetchCall('senders', 'GET')
        .then(response => response.json())
        .then(data => this.setState({data}))
        .catch(error => console.log('Fetch Error :-S', error));
    }

    inputsChange = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;
        this.setState({[targetName]: targetValue});
    }

    deleteSender = (id) => {
        this.setState({
            data: this.state.data.filter((item) => item.id !== id)
        });
        const obj = {};
        obj.id = id;
    
        this.fetchCall('senders', 'DELETE', obj )
        .then((res) =>  {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  res.status);
                return;
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    checkInputs = () => {
        const check = this.state.name.length === 0 ||
                    this.state.surname.length === 0 ;
        return check;
    }

    createNewSender = () => {
        const newSender = {};
        newSender.name = this.state.name;
        newSender.surname = this.state.surname;

        return newSender;
    }

    addSender = (e) => {
        e.preventDefault();
        if(this.checkInputs()) {
            this.setState({respons:'Fill all the fields correctly!'});
            return
        }
        const newSender = this.createNewSender();
        newSender.id = this.state.data.length > 0 ? this.state.data[this.state.data.length - 1].id + 1 : 0;
        
        this.fetchCall('senders', 'POST', newSender)
        .then((res) =>  {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  res.status);
                return;
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

        this.setState(state => ({
            data: state.data.concat(newSender),
            name: '',
            surname: ''
        }));

    }

    updateSender = (e, item) => {
        e.preventDefault();
        this.setState({
            name: item.name ,
            surname: item.surname
        });
       
        if(this.checkInputs()) {
            this.setState({respons:'Fill all the fields correctly!'});
            return
        }

        const newSender = this.createNewSender();
        newSender.id = item.id;
        
        this.fetchCall('senders', 'PUT', newSender)
        .then((res) =>  {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  res.status);
                return;
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
        
        this.setState(state => ({
            data: state.data.map(function(el) { return el === item ? newSender: el; }),
            name: '',
            surname: '' 
        }));
    }

    search = (e) => {
        const searchString = e.target.value;
        this.setState({
            filteredList: this.state.data.filter((item) => item.name.toLowerCase().match(searchString)),
            searchText: searchString
        });
    }

    sort = (field) => {
        this.setState({
            data: this.state.data.sort(function(a, b) {
                return a[field] > b[field];
            })
        });        
    }

    render () {
        const list = this.state.searchText ? this.state.filteredList : this.state.data;

        const data = ['name', 'surname'];

        return (
            <Col sm={{ size: 10, offset: 1 }}>
                <h3> Senders Table</h3>
                <input  placeholder="Enter the search text" value={this.state.searchText} onChange={this.search}/>
                <List senders={list}
                    deleteSender={this.deleteSender}
                    sort={this.sort}
                    updateSender={this.updateSender}
                    inputsChange={this.inputsChange}
                />
                <h2 className="res">{this.state.respons}</h2>
                <h4> Enter added sender params </h4>
                <Form>
                    {data.map(item => ( 
                        <Col sm={3}>
                            <FormGroup> 
                                <Input onChange={this.inputsChange} placeholder={item} name={item} value={this.state.item} required/> 
                            </FormGroup>
                        </Col>
                    ))}
                    <Col sm={3}>
                        <FormGroup>
                            <Button color="info" onClick={this.addSender}>Add</Button>
                        </FormGroup>
                    </Col>
                </Form>
                
            </Col>
        );
    }
}

export { TableSenders };