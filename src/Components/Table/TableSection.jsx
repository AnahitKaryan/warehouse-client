import React, {Component} from 'react';
import {List } from './List';
import { FetchContext } from './../FetchContext';

import { Button } from 'reactstrap';

class TableSection extends Component {
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
            priority: ''
            
        };
    }

    componentDidMount() {
      
            fetch('http://localhost:8081/products',{ method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => this.setState({data}))
            .catch(error => console.log('Fetch Error :-S', error));
    }


    inputsChange = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;
        this.setState({targetName: targetValue});
    }


    deleteProduct = (i) => {
        this.setState({
            data: this.state.data.filter((item, index) => index !== i)
        });
    }

    addProduct = (e) => {
        e.preventDefault();
        let check = this.state.name.length === 0 ||
                    this.state.type.length === 0 ||
                    this.state.constly.length === 0 ||
                    this.state.price.length === 0 ||
                    this.state.quantity.length === 0 ||
                    this.state.status.length === 0 ||
                    this.state.date1.length === 0 ||
                    this.state.date2.length === 0 ||
                    this.state.priority.length === 0 ;

        if(check) {
            alert('Fill all the fields correctly');
            return
        }
        const newProduct = {};
        newProduct.name = this.state.name;
        newProduct.type = this.state.type;
        newProduct.constly = this.state.constly;
        newProduct.price = this.state.price;
        newProduct.quantity = this.state.quantity;
        newProduct.status = this.state.status;
        newProduct.date1 = this.state.date1;
        newProduct.date2 = this.state.date2;
        newProduct.priority = this.state.priority;

        this.context('http://localhost:8081/products', 'POST', newProduct );
        this.setState(state => ({
            data: state.data.concat(newProduct),
            name: '',
            type: '',
            constly: '', 
            price: '', 
            quantity: '',
            status: '',
            date1: '',
            date2: '',
            priority: ''
            
        }));

    }

    search = (e) => {
        console.log('changeee', e.target);
        const searchString = e.target.value;
        this.setState({
            filteredList: this.state.data.filter((item) => item.name.toLowerCase().match(searchString)),
            searchText: searchString
        });
    }

    sort = (field) => {
        switch (field) {
            case 'priority':
                this.setState({
                    data: this.state.data.sort((function(a, b) { return Number(a.priority) > Number(b.priority);}))
                });
                break;
            case 'date1':
                this.setState({
                    data: this.state.data.sort((function(a, b) {
                        const firstDate = a.date1.split("-");
                        const lastDate = a.date1.split("-");
                        return firstDate[2] > lastDate[2] || firstDate[1] > lastDate[1] || firstDate[0] >= lastDate[0];
                    }))
                });
                break;
            case 'date1':
                this.setState({
                    data: this.state.data.sort((function(a, b) {
                        const firstDate = a.date2.split("-");
                        const lastDate = a.date2.split("-");
                        return firstDate[2] > lastDate[2] || firstDate[1] > lastDate[1] || firstDate[0] >= lastDate[0];
                    }))
                });
                break;
  
            default: this.setState({
                data: this.state.data.sort((function(a, b) { return a.field > b.field;}))
            });
        
        }
    }


    render () {
        const list = this.state.searchText ? this.state.filteredList : this.state.data;

        return (
          <div>
            <input  placeholder="Enter the search text" value={this.state.searchText} onChange={this.search}/>
            <List products={list}
                  deleteProduct={this.deleteProduct}
                  onChange={this.inputsChange}
                  addProduct={this.addProduct}
                  sort={this.sort}
            />
            <div>
            <h4> Enter product params </h4>
             <form>
                <input onChange={this.inputsChange} placeholder="Enter new product name" name='name' required/>
                <input onChange={this.inputsChange} placeholder="Enter new product type" name='type' required/>
                <input onChange={this.inputsChange} placeholder="Enter new product constly" name='constly' required/>
                <input onChange={this.inputsChange} placeholder="Enter new product price" name='price' required/>
                <input onChange={this.inputsChange} placeholder="Enter new product quantity" name='quantity' required/>
                <input onChange={this.inputsChange} placeholder="Enter new product status" required/>
               
                <input
                 type="date"
                 name="date1"
                 id="exampleDate"
                 placeholder="date1 placeholder"
                 onChange={this.inputsChange}
                />
                <input
                 type="date"
                 name="date2"
                 id="exampleDate"
                 placeholder="date2 placeholder"
                 onChange={this.inputsChange}
                />
                <input onChange={this.inputsChange} type="number" pattern="\d*" placeholder="Enter priority" name='priority' required/>
                <Button color="info" onClick={this.addProduct}> Add</Button>{' '}
             </form>
            </div>

          </div>
        );
    }
}

export { TableSection };