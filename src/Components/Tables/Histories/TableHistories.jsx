import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Col } from 'reactstrap';

import { Header } from './../../Header';
import { Footer } from './../../Footer';
import {List } from './List';
import { ModifyModal } from './Modal';
import { fetchCall } from '../../../DAO/DAO.js';

class TableHistories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filteredList: [],
            name: '',
            type: '',
            constly: '', 
            price: '', 
            quantity: '',
            status: '',
            date1: '',
            date2: '',
            priority: '',
            sender: '',
            shop: '',
            exportDate: ''
        };
        this.fetchCall = fetchCall.bind(this);
    }

    componentDidMount() {
        this.fetchCall('histories', 'GET')
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

    deleteHistory = (id) => {
        this.setState({
            data: this.state.data.filter((item) => item.id !== id)
        });
        const obj = {};
        obj.id = id;
    
        this.fetchCall('histories', 'DELETE', obj )
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
        return this.state.name.length === 0 ||
               this.state.type.length === 0 ||
               this.state.constly.length === 0 ||
               this.state.price.length === 0 ||
               this.state.quantity.length === 0 ||
               this.state.status.length === 0 ||
               this.state.date1.length === 0 ||
               this.state.date2.length === 0 ||
               this.state.priority.length === 0 ||
               this.state.sender.length === 0 ||
               this.state.shop.length === 0 ||
               this.state.exportDate.length === 0;
    }

    isNumeric = () => {
        return isNaN(this.state.constly) || isNaN(this.state.price) || isNaN(this.state.quantity) || isNaN(this.state.priority);
    }

    createNewHistory = () => {
        const newHistory = {};
        newHistory.name = this.state.name;
        newHistory.type = this.state.type;
        newHistory.constly = this.state.constly;
        newHistory.price = this.state.price;
        newHistory.quantity = this.state.quantity;
        newHistory.status = this.state.status;
        newHistory.date1 = this.state.date1;
        newHistory.date2 = this.state.date2;
        newHistory.priority = this.state.priority;
        newHistory.sender = this.state.sender;
        newHistory.shop = this.state.shop;
        newHistory.exportDate = this.state.exportDate;

        return newHistory;
    }
    addHistory = (e) => {
        e.preventDefault();
        if(this.checkInputs()) {
            this.setState({respons:'Fill all the fields correctly!'});
            return
        }
        const newHistory = this.createNewHistory();
        newHistory.id = this.state.data.length > 0 ? this.state.data[this.state.data.length - 1].id + 1 : 0;

        this.fetchCall('histories', 'POST', newHistory)
        .then((res) =>  {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  res.status);
                return;
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

        this.setState(state => ({
            data: state.data.concat(newHistory),
            name: '',
            type: '',
            constly: '', 
            price: '', 
            quantity: '',
            status: '',
            date1: '',
            date2: '',
            priority: '',
            sender: '',
            shop: '',
            exportDate: '' 
        }));

    }

    addItem = (item) => {
        this.setState({
            name: item.name ,
            type: item.type,
            constly: item.constly, 
            price: item.price, 
            quantity: item.quantity,
            status: item.status,
            date1: item.date1,
            date2: item.date2,
            priority: item.priority,
            sender: item.sender,
            shop: item.shop,
            exportDate: item.exportDate
            
        });
    }

    updateHistory = (e, item) => {
        e.preventDefault();
        
        const newHistory = this.createNewHistory();
        newHistory.id = item.id;
        
        this.fetchCall('histories', 'PUT', newHistory )
        .then((res) =>  {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  res.status);
                return;
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
        
        this.setState(state => ({
            data: state.data.map(function(el) { return el === item ? newHistory : el; }),
            name: '',
            type: '',
            constly: '', 
            price: '', 
            quantity: '',
            status: '',
            date1: '',
            date2: '',
            priority: '',
            sender: '',
            shop: '',
            exportDate: ''
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
        const numberic = field === 'constly' || field === 'price' || field === 'quantity' || field === 'priority';
        const date = field === 'date1' || field === 'date2';
        const string = field === 'name' || field === 'type' || field === 'status';

        if(numberic) {
            this.setState({
                data: this.state.data.sort(function(a, b) { return Number(a[field]) > Number(b[field]);
                })
            });
        } else if(date) {
            this.setState({
                data: this.state.data.sort(function(a, b) {
                    const firstDate = a[field].split("-");
                    const lastDate = b[field].split("-");
                    return firstDate[2] > lastDate[2] || firstDate[1] > lastDate[1] || firstDate[0] >= lastDate[0];
                })
            });
        } else if(string) {
            this.setState({
                data: this.state.data.sort(function(a, b) {
                    return a[field] > b[field];
                })
            });
        }         
    }

    render () {
        const list = this.state.searchText ? this.state.filteredList : this.state.data;

        const data = ['name', 'type', 'constly', 'price', 'quantity', 'status', 'date1', 'date2', 'priority', 'sender', 'shop', 'exportDate'];
        
        return (
            <div>
                <Header history={this.props.history}/>
                <br/>
                <Col sm={{ size: 12 }}>
                    <h3 className="mt-5 text-center text-warning text-uppercase font-weight-bold"> 
                        Products history table
                        <ModifyModal 
                            className="modal" 
                            respons={this.state.respons}
                            addHistory={this.addHistory}
                            onChange={this.inputsChange}
                            checkInputs ={this.checkInputs}
                            isNumeric={this.isNumeric}
                            mod="add"
                        />
                    </h3>
                    <h5>Search</h5>
                    <input  placeholder="Enter the search text &#9906;" value={this.state.searchText} onChange={this.search}/>
                    <List histories={list}
                          deleteHistory={this.deleteHistory}
                          sort={this.sort}
                          updateHistory={this.updateHistory}
                          inputsChange={this.inputsChange}
                          checkInputs ={this.checkInputs}
                          addItem={this.addItem}
                          isNumeric={this.isNumeric}
                    />
                </Col>
                <br/><br/>
                <Footer/>
            </div>
        );
    }
}

export { TableHistories };