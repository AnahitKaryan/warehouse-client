import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Col, Container } from 'reactstrap';

import { Header } from './../../Header';
import { Footer } from './../../Footer';
import {List } from './List';
import { ModifyModal } from './Modal';
import { fetchCall } from '../../../DAO/DAO.js';

class TableSenders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filteredList: [],
            name: '',
            surname: ''
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

        if(this.checkInputs()) {
            this.setState({respons:'Fill all the fields correctly!'});
        } else {
            this.setState({respons:''});
        }
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
        return this.state.name.length === 0 || this.state.surname.length === 0 ;
        
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

    addItem = (item) => {
        this.setState({
            name: item.name ,
            surname: item.surname
        });
    }

    updateSender = (e, item) => {
        e.preventDefault();

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
            <Container fluid>
                <Header history={this.props.history}/>
                <br/>
                <Col sm={{ size: 10, offset: 1 }}>
                    <h3 className="mt-5 text-center text-warning text-uppercase font-weight-bold"> 
                        Senders Table
                        <ModifyModal 
                            className="modal" 
                            respons={this.state.respons}            addSender={this.addSender}
                            onChange={this.inputsChange}
                            checkInputs ={this.checkInputs}
                            mod="add"
                        />
                    </h3>
                    <h5>Search</h5>
                    <input  placeholder="Enter the search text  &#9906;" value={this.state.searchText} onChange={this.search}/>
                    <List senders={list}
                        deleteSender={this.deleteSender}
                        sort={this.sort}
                        updateSender={this.updateSender}
                        inputsChange={this.inputsChange}
                        checkInputs ={this.checkInputs}
                        addItem={this.addItem}
                    />
                </Col>
                <br/><br/>
                <Footer/>
            </Container>
        );
    }
}

export { TableSenders };