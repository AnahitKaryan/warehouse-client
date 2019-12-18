import React, {Component} from 'react';
import { Col, Container } from 'reactstrap';
import * as log from 'loglevel';

import { Header } from './../../header';
import { Footer } from './../../footer';
import {List } from './list';
import { ModifyModal } from './modal';
import { fetchCall } from '../../../DAO/DAO.js';

const ZERO = 0;
const ONE = 1;
const OK = 200;

class TableShops extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			history: [],
			filteredList: [],
			name: ''
		};
		this.fetchCall = fetchCall.bind(this);
	}

	componentDidMount() {
		this.fetchCall('histories', 'GET')
			.then(response => response.json())
			.then(history => this.setState({history}))
			.catch(error => log.error('Fetch Error :-S' + error));

		this.fetchCall('shops', 'GET')
			.then(response => response.json())
			.then(data => this.setState({ data: data.map((element) => {

				let totalBenefit = ZERO;

				this.state.history.forEach((item) => {
					if(item.shop === element.name) {
						totalBenefit += (item.price - item.constly) * item.quantity;
					}
				});
				element.priority = totalBenefit;

				return element;
			})
			}))
			.catch(error => log.error('Fetch Error :-S' + error));
    
	}

    checkInputs = () => {
    	return this.state.name.length === ZERO;
    }

    checkName = () => {
    	return this.state.data.find(element => element.name === this.state.name);
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
    		.then((res) => {
    			if (res.status !== OK) {
    				log.error('Looks like there was a problem. Status Code: ' + res.status);
    				return;
    			}
    		}).catch(function(err) {
    			log.error('Fetch Error :-S' + err);
    		});
    }

    createNewShop = () => {
    	const newShop = {};
    	newShop.name = this.state.name;
    	newShop.priority = ZERO;

    	return newShop;
    }

    addShop = (e) => {
    	e.preventDefault();

    	const newShop = this.createNewShop();
    	newShop.id = this.state.data.length > ZERO ? Math.max(...this.state.data.map(item => item.id)) + ONE : ZERO;
        
    	this.fetchCall('shops', 'POST', newShop)
    		.then((res) => {
    			if (res.status !== OK) {
    				log.error('Looks like there was a problem. Status Code: ' + res.status);
    				return;
    			}
    		}).catch(function(err) {
    			log.error('Fetch Error :-S' + err);
    		});

    	this.setState(state => ({
    		data: state.data.concat(newShop),
    		name: '',
    		status: ''
    	}));

    	return true;
    }

    addItem = (item) => {
    	this.setState({
    		name: item.name ,
    		status: item.status
    	});
    }

    updateShop = (e, item) => {
    	e.preventDefault();
    	const newShop = this.createNewShop();
    	newShop.id = item.id;
    	newShop.priority = item.priority;
        
    	this.fetchCall('shops', 'PUT', newShop)
    		.then((res) => {
    			if (res.status !== OK) {
    				log.error('Looks like there was a problem. Status Code: ' + res.status);
    				return;
    			}
    		}).catch(function(err) {
    			log.error('Fetch Error :-S' + err);
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
    		<Container fluid className="content">
    			<Header history={this.props.history}/>
    			<br/>
    			<Col sm={{ size: 10, offset: 1 }} className="mb-5">
    				<h3 className="text-center text-warning text-uppercase font-weight-bold"> 
                        Shops Table
    					<ModifyModal 
    						className="modal" 
    						addShop={this.addShop}
    						checkName={this.checkName}
    						onChange={this.inputsChange}
    						checkInputs ={this.checkInputs}
    						mod="add"
    					/>
    				</h3>
    				<h5>Search</h5>
    				<input placeholder="Enter the search text &#9906;" value={this.state.searchText} onChange={this.search}/>
    				<List shops={list}
    					deleteShop={this.deleteShop}
    					sort={this.sort}
    					updateShop={this.updateShop}
    					inputsChange={this.inputsChange}
    					checkInputs ={this.checkInputs}
    					checkName={this.checkName}
    					addItem={this.addItem}
    				/>
    			</Col>
    			<br/><br/>
    			<Footer/>
    		</Container>
    	);
    }
}

export { TableShops };