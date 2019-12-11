import React, {Component} from 'react';
import { Container, Jumbotron, ListGroup, ListGroupItem } from 'reactstrap';

import { Header } from './Header';
import { Footer } from './Footer';
import { fetchCall } from '../DAO/DAO.js';

class Best extends Component {
    constructor(props) {
        super(props);
        this.state = {
            senders: [{}, {}, {}],
            shops: [{}, {}, {}],
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
            senders:senders.map((element) => {
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
        const  senders = this.state.senders.sort(function(a, b) {
            return a.priority < b.priority;
        });
        const shops = this.state.shops.sort(function(a, b) {
            return a.priority < b.priority;
        }) 
        return (
            <Container fluid>
                <Header history={this.props.history}/>
                <Jumbotron className="content">
                        <h1 className="text-warning text-center mr-5" >Best Partner</h1>

                        <ListGroup>
                            <ListGroupItem tag="button" action className="bg-secondary text-center text-white">
                                Top three Shops
                            </ListGroupItem>
                            <ListGroupItem tag="button" action>    
                                1. {shops[0].name} &#9734; &#9734; &#9734;
                            </ListGroupItem>
                            <ListGroupItem tag="button" action>
                                2. {shops[1].name} &#9734; &#9734;
                            </ListGroupItem>
                            <ListGroupItem tag="button" action>
                                3. {shops[2].name} &#9734;
                            </ListGroupItem>
                        </ListGroup>
                        <ListGroup className="mt-5">
                            <ListGroupItem tag="button" action className="bg-secondary text-center text-white">
                                Top three Senders
                            </ListGroupItem>
                            <ListGroupItem tag="button" action>
                                1. {senders[0].name} &#9734; &#9734; &#9734;
                            </ListGroupItem>
                            <ListGroupItem tag="button" action>
                                2. {senders[1].name} &#9734; &#9734;
                            </ListGroupItem>
                            <ListGroupItem tag="button" action>
                                3. {senders[2].name} &#9734;
                            </ListGroupItem>
                        </ListGroup>
                </Jumbotron>
                <Footer/>
            </Container>
        );
    }
}
export { Best };
