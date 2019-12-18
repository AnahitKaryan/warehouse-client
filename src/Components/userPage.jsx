import React, {Component} from 'react';
import { Container, Jumbotron,  ListGroup, ListGroupItem } from 'reactstrap';
import * as log from 'loglevel';

import { Header } from './header';
import { Footer } from './footer';
import { fetchCall } from './../DAO/DAO.js';
import userImg from './../assets/images/user.png';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.fetchCall = fetchCall.bind(this);
    }

    componentDidMount() {
        this.fetchCall('users', 'GET')
            .then(response => response.json())
            .then(users => this.setState({users}))
            .catch(error => log.error('Fetch Error :-S' + error));
    }

    render () {
        const user  = this.state.users.find(element => element.email === localStorage.getItem('user'));
      
        return (
            <Container fluid>
                <Header history={this.props.history}/>
                <Jumbotron className="content mt-0">
                    <h1 className="text-warning text-center" >Personal Information</h1>
                    <img
                        src={userImg}
                        className="d-inline-block center user-img"
                        alt=""
                    />
                    
                    {user ? (  
                    <ListGroup flush>
                        <ListGroupItem disabled className="text-center">
                            <h3>1.Name - <em className="d-inline-block">{user.name}.</em>
                            </h3>
                        </ListGroupItem>
                        <ListGroupItem disabled className="text-center">
                            <h3>2.Surname - <em className="d-inline-block">{user.surname}.</em>
                            </h3>
                        </ListGroupItem>
                        <ListGroupItem disabled className="text-center">
                            <h3>4.Gender - <em className="d-inline-block">{user.gemus}.</em>
                            </h3>
                        </ListGroupItem>
                        <ListGroupItem disabled className="text-center">
                            <h3>3.Birthday - <em className="d-inline-block">{user.birthdate}.</em>
                            </h3>
                        </ListGroupItem>
                    </ListGroup>
                    ) : ( false )}
                </Jumbotron>
                <Footer/>
            </Container>
        );
    }
}

export { UserPage };
