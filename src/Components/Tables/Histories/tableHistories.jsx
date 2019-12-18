import React, {Component} from 'react';
import { Col, Container } from 'reactstrap';
import * as log from 'loglevel';

import { Header } from './../../header';
import { Footer } from './../../footer';
import {List } from './list';
import { fetchCall } from '../../../DAO/DAO.js';


const ZERO = 0;
const ONE = 1;
const TWO = 2;
const OK = 200;

class TableHistories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			filteredList: []
		};
		this.fetchCall = fetchCall.bind(this);
	}

	componentDidMount() {
		this.fetchCall('histories', 'GET')
			.then(response => response.json())
			.then(data => this.setState({data}))
			.catch(error => log.error('Fetch Error :-S' + error));
	}

    deleteHistory = (id) => {
    	this.setState({
    		data: this.state.data.filter((item) => item.id !== id)
    	});

    	const obj = {};
    	obj.id = id;
    
    	this.fetchCall('histories', 'DELETE', obj )
    		.then((res) => {
    			if (res.status !== OK) {
    				log.error('Looks like there was a problem. Status Code: ' + res.status);
    				return;
    			}
    		}).catch(function(err) {
    			log.error('Fetch Error :-S' + err);
    		});
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
    				const firstDate = a[field].split('-');
    				const lastDate = b[field].split('-');
    				return firstDate[TWO] > lastDate[TWO] || firstDate[ONE] > lastDate[ONE] || firstDate[ZERO] >= lastDate[ZERO];
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
    		<Container fluid className="content">
    			<Header history={this.props.history}/>
    			<br/>
    			<Col sm={{ size: 12 }} className="mb-5">
    				<h3 className="text-center text-warning text-uppercase font-weight-bold"> 
                        Products history table
    				</h3>
    				<h5>Search</h5>
    				<input placeholder="Enter the search text &#9906;" value={this.state.searchText} onChange={this.search}/>
    				<List histories={list}
    					deleteHistory={this.deleteHistory}
    					sort={this.sort}
    				/>
    			</Col>
    			<br/><br/>
    			<Footer/>
    		</Container>
    	);
    }
}

export { TableHistories };