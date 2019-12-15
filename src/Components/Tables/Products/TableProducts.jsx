import React, {Component} from 'react';
import { Col, Container } from 'reactstrap';

import { Header } from './../../Header';
import { Footer } from './../../Footer';
import {List } from './List';
import { ModifyModal } from './Modal';
import { fetchCall } from '../../../DAO/DAO.js';

class TableProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            history: [],
            filteredList: [],
            name: '',
            type: '',
            constly: '', 
            price: '', 
            quantity: '',
            date1: '',
            date2: ''
        };
        this.fetchCall = fetchCall.bind(this);
    }
    
    componentDidMount() {
        this.fetchCall('products', 'GET')
        .then(response => response.json())
        .then(data => this.setState({ data: data.map((element) => {
            const date2 = new Date(element.date2);
            const currentDate = new Date();

            if (currentDate > date2) {
                element.status = 'Not useful';
            } else {
                element.status = 'Is useful';
            } 
            return element;
            })
        }))
        .catch(error => console.log('Fetch Error :-S', error));

        this.fetchCall('histories', 'GET')
        .then(response => response.json())
        .then(history => this.setState({history}))
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

    deleteProduct = (id) => {
        this.setState({
            data: this.state.data.filter((item) => item.id !== id)
        });
        const obj = {};
        obj.id = id;
    
        this.fetchCall('products', 'DELETE', obj )
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
        const empty = this.state.name.length === 0 ||
            this.state.type.length === 0 ||
            this.state.constly.length === 0 ||
            this.state.price.length === 0 ||
            this.state.quantity.length === 0 ||
            this.state.date1.length === 0 ||
            this.state.date2.length === 0 ;

        if (empty){
            return 'Fill all the fields correctly!';
        } else if(!this.checkDates()) {
           return 'Expiration date cannot be less than the date of manufacture!';
        } else  if(this.isNumeric()) {
            return 'The value of the constly, price and quantity  must be a number!';
        } 
        return '';
    }

    checkDates = () => {
        const date1 = new Date(this.state.date1);
        const date2 = new Date(this.state.date2);
           
        return date2 >= date1 ;
    }

    isNumeric = () => {
        return isNaN(this.state.constly) || isNaN(this.state.price) || isNaN(this.state.quantity);
    }

    createNewProduct = () => {
        const newProduct = {};
        newProduct.name = this.state.name;
        newProduct.type = this.state.type;
        newProduct.constly = this.state.constly;
        newProduct.price = this.state.price;
        newProduct.quantity = this.state.quantity;
        newProduct.date1 = this.state.date1;
        newProduct.date2 = this.state.date2;

        const date2 = new Date(this.state.date2);
        const currentDate = new Date();

        if (currentDate > date2) {
            newProduct.status = 'Not useful';
        } else {
            newProduct.status = 'Is useful';
        }
        
        const oneBenefit =  newProduct.price -  newProduct.constly;
        let totalBenefit = 0;
        let notUsefulCount = 0;

        this.state.history.forEach((item) => {
            if(item.name === newProduct.name) {
                if(item.sender === 'null' && item.shop === 'null') {
                    notUsefulCount ++;
                } else {
                    totalBenefit += (item.price - item.constly) * item.quantity;
                }
            }
        })

        if(totalBenefit === 0) {
            if(notUsefulCount > 0) {
                newProduct.priority = -(notUsefulCount * oneBenefit);
            } else {
                newProduct.priority = 0;
            }
        } else {
            newProduct.priority = totalBenefit - (notUsefulCount * oneBenefit);
        }
        
        return newProduct;
    }

    addProduct = (e) => {
        e.preventDefault();

        if(this.checkInputs()) {
            this.setState({respons:'Fill all the fields correctly!'});
            return
        }

        const newProduct = this.createNewProduct();
        newProduct.id = this.state.data.length > 0 ? this.state.data[this.state.data.length - 1].id + 1 : 0;

        this.fetchCall('products', 'POST', newProduct)
        .then((res) =>  {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  res.status);
                return;
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

        this.setState(state => ({
            data: state.data.concat(newProduct),
            name: '',
            type: '',
            constly: '', 
            price: '', 
            quantity: '',
            date1: '',
            date2: ''
        }));
    }

    addItem = (item) => {
        this.setState({
            name: item.name ,
            type: item.type,
            constly: item.constly, 
            price: item.price, 
            quantity: item.quantity,
            date1: item.date1,
            date2: item.date2
        });
    }

    updateProduct = (e, item) => {
        e.preventDefault();
        
        const newProduct = this.createNewProduct();
        newProduct.id = item.id;
        
        this.fetchCall('products', 'PUT', newProduct )
        .then((res) =>  {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  res.status);
                return;
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
        
        this.setState(state => ({
            data: state.data.map(function(el) { return el === item ? newProduct : el; }),
            name: '',
            type: '',
            constly: '', 
            price: '', 
            quantity: '',
            date1: '',
            date2: ''
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
        
        return (
            <Container fluid>
                <Header history={this.props.history}/>
                <br/>
                <Col sm={{ size: 12 }}>
                    <h3 className="mt-5 text-center text-warning text-uppercase font-weight-bold"> 
                        Current Products Table
                        <ModifyModal 
                            className="modal" 
                            respons={this.state.respons}
                            addProduct={this.addProduct}
                            onChange={this.inputsChange}
                            checkInputs ={this.checkInputs}
                            mod="add"
                        />
                    </h3>
                    <h5>Search</h5>
                    <input  placeholder="Enter the search text &#9906;" value={this.state.searchText} onChange={this.search}/>
                    <List products={list}
                          deleteProduct={this.deleteProduct}
                          sort={this.sort}
                          updateProduct={this.updateProduct}
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

export { TableProducts };