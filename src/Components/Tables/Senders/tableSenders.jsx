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

class TableSenders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			history: [],
			filteredList: [],
			name: '',
			surname: ''
		};
		this.fetchCall = fetchCall.bind(this);
	}

	componentDidMount() {
		this.fetchCall('histories', 'GET')
			.then(response => response.json())
			.then(history => this.setState({history}))
			.catch(error => log.error('Fetch Error :-S' + error));


		this.fetchCall('senders', 'GET')
			.then(response => response.json())
			.then(data => this.setState({ data: data.map((element) => {

				let totalBenefit = ZERO;

				this.state.history.forEach((item) => {
					if(item.sender === element.name + ',' + element.surname) {
						totalBenefit += (item.price - item.constly) * item.quantity;
					}
				});
				element.priority = totalBenefit;

				return element;
			})
			}))
			.catch(error => log.error('Fetch Error :-S' + error));
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
    		.then((res) => {
    			if (res.status !== OK) {
    				log.error('Looks like there was a problem. Status Code: ' + res.status);
    				return;
    			}
    		}).catch(function(err) {
    			log.error('Fetch Error :-S' + err);
    		});
    }

    checkInputs = () => {
    	return this.state.name.length === ZERO || this.state.surname.length === ZERO ;
    }

    checkName = () => {
    	return this.state.data.find(element => element.name === this.state.name && element.surname === this.state.surname);
    }

    createNewSender = () => {
    	const newSender = {};
        
    	newSender.name = this.state.name;
    	newSender.surname = this.state.surname;
    	newSender.priority = ZERO;
        
    	return newSender;
    }

    addSender = (e) => {
    	e.preventDefault();

    	const newSender = this.createNewSender();

    	newSender.id = this.state.data.length > ZERO ? Math.max(...this.state.data.map(item => item.id)) + ONE : ZERO;
        
    	this.fetchCall('senders', 'POST', newSender)
    		.then((res) => {
    			if (res.status !== OK) {
    				log.error('Looks like there was a problem. Status Code: ' + res.status);
    				return;
    			}
    		}).catch(function(err) {
    			log.error('Fetch Error :-S' + err);
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
    	newSender.priority = item.priority;

    	this.fetchCall('senders', 'PUT', newSender)
    		.then((res) => {
    			if (res.status !== OK) {
    				log.error('Looks like there was a problem. Status Code: ' + res.status);
    				return;
    			}
    		}).catch(function(err) {
    			log.error('Fetch Error :-S' + err);
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

    	return (
    		<Container fluid className="content">
    			<Header history={this.props.history}/>
    			<br/>
    			<Col sm={{ size: 10, offset: 1 }} className="mb-5">
    				<h3 className="text-center text-warning text-uppercase font-weight-bold"> 
                        Senders Table
    					<ModifyModal 
    						className="modal" 
    						addSender={this.addSender}
    						onChange={this.inputsChange}
    						checkInputs ={this.checkInputs}
    						checkName={this.checkName}
    						mod="add"
    					/>
    				</h3>
    				<h5>Search</h5>
    				<input placeholder="Enter the search text  &#9906;" value={this.state.searchText} onChange={this.search}/>
    				<List senders={list}
    					deleteSender={this.deleteSender}
    					sort={this.sort}
    					updateSender={this.updateSender}
    					inputsChange={this.inputsChange}
    					checkInputs ={this.checkInputs}
    					addItem={this.addItem}
    					checkName={this.checkName}
    				/>
    			</Col>
    			<br/><br/>
    			<Footer/>
    		</Container>
    	);
    }
}

export { TableSenders };