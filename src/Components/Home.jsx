import React, {Component} from 'react';

import { Header } from './Header';
import { Footer } from './Footer';
import { Slide } from './Carousel';

import { Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <Container fluid>
                <Header history={this.props.history}/>
                <Slide/>
                <Footer/>
            </Container>
        );
    }
}

export { Home };