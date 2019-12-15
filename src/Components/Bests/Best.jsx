import React, {Component} from 'react';
import { Container, Jumbotron } from 'reactstrap';

import { Header } from './../Header';
import { Footer } from './../Footer';
import { fetchCall } from './../../DAO/DAO.js';
import { BestsList } from './bestsList';

class Best extends Component {
    constructor(props) {
        super(props);
        this.state = {
            senders: [],
            shops: [],
            history: []
        };
        this.fetchCall = fetchCall.bind(this);
    }

    componentDidMount() {
        this.fetchCall('histories', 'GET')
        .then(response => response.json())
        .then(history => this.setState({history}))
        .catch(error => console.log('Fetch Error :-S', error));

        this.fetchCall('senders', 'GET')
        .then(response => response.json())
        .then(senders => this.setState({ 
            senders: senders.map((element) => {
                let totalBenefit = 0;

                this.state.history.forEach((item) => {
                    if(item.sender === element.name + ',' + element.surname) {
                        totalBenefit += (item.price - item.constly) * item.quantity;
                    }
                })
                element.priority = totalBenefit;

                return element;
            })
        }))
        .catch(error => console.log('Fetch Error :-S', error));

        this.fetchCall('shops', 'GET')
        .then(response => response.json())
        .then(shops => this.setState({ 
            shops: shops.map((element) => {

                let totalBenefit = 0;

                this.state.history.forEach((item) => {
                    if(item.shop === element.name) {
                        totalBenefit += (item.price - item.constly) * item.quantity;
                    }
                })
                element.priority = totalBenefit;

                return element;
            })
        }))
        .catch(error => console.log('Fetch Error :-S', error));
    }

    render () {
        const  { senders, shops } = this.state;
      
        return (
            <Container fluid>
                <Header history={this.props.history}/>
                <Jumbotron className="content">
                        <h1 className="text-warning text-center mr-5" >Best Partner</h1>
                        <BestsList elements={shops} name="Shops"/>
                        <BestsList elements={senders} name="Senders"/>
                </Jumbotron>
                <Footer/>
            </Container>
        );
    }
}

export { Best };
