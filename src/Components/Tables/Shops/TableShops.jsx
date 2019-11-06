import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Col } from 'reactstrap';

import {List } from './List';
import { fetchCall } from '../../../DAO/DAO.js';

class TableShops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filteredList: [],
            name: '',
            status: ''
        };
        this.fetchCall = fetchCall.bind(this);
    }

    componentDidMount() {
        this.fetchCall('shops', 'GET')
        .then(response => response.json())
        .then(data => this.setState({data}))
        .catch(error => console.log('Fetch Error :-S', error));
    }

    inputsChange = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;
        this.setState({[targetName]: targetValue});
    }

    deleteShop = (id) => {
        this.setState({
            data: this.state.data.filter((item) => item.id !== id)
        });
        const obj = {};
        obj.id = id;
    
        this.fetchCall('shops', 'DELETE', obj )
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
                      this.state.status.length === 0 ;
        return check;
    }

    createNewShop = () => {
        const newShop = {};
        newShop.name = this.state.name;
        newShop.status = this.state.status;

        return newShop;
    }

    addShop = (e) => {
        e.preventDefault();
        if(this.checkInputs()) {
            alert('Fill all the fields correctly');
            return
        }
        const newShop = this.createNewShop();
        newShop.id = this.state.data.length > 0 ? this.state.data[this.state.data.length - 1].id + 1 : 0;
        
        this.fetchCall('shops', 'POST', newShop)
        .then((res) =>  {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  res.status);
                return;
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

        this.setState(state => ({
            data: state.data.concat(newShop),
            name: '',
            status: ''
        }));

    }

    updateShop = (e, item) => {
        e.preventDefault();
        this.setState({
            name: item.name ,
            status: item.status
        });
       
        if(this.checkInputs()) {
            alert('Fill all the fields correctly');
            return
        }

        const newShop = this.createNewShop();
        newShop.id = item.id;
        
        this.fetchCall('shops', 'PUT', newShop)
        .then((res) =>  {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  res.status);
                return;
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
        
        this.setState(state => ({
            data: state.data.map(function(el) { return el === item ? newShop: el; }),
            name: '',
            status: '' 
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

        return (
            <Col sm={{ size: 10, offset: 1 }}>
                <h3> Shops Table</h3>
                <input  placeholder="Enter the search text" value={this.state.searchText} onChange={this.search}/>
                <List shops={list}
                    deleteShop={this.deleteShop}
                    sort={this.sort}
                    updateShop={this.updateShop}
                    inputsChange={this.inputsChange}
                />
                <h4> Enter added shop params </h4>
                <Form>
                    <Col sm={3}>
                        <FormGroup> 
                            <Input onChange={this.inputsChange} placeholder="Enter new sender name" name="name" required/> 
                        </FormGroup>
                    </Col>
                    <Col sm={3}>
                        <FormGroup>
                            <Input onChange={this.inputsChange} placeholder="Enter new sender status" name="status" required/>
                        </FormGroup>
                    </Col>
                    <Col sm={3}>
                        <FormGroup>
                            <Button color="info" onClick={this.addShop}> 
                                Add
                            </Button>
                        </FormGroup>
                    </Col>
                </Form>
            </Col>
        );
    }
}

export { TableShops };