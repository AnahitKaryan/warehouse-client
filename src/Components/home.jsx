import React, {Component} from 'react';

import { Header } from './header';
import { Footer } from './footer';
import { Slide } from './carousel';

import { Container } from 'reactstrap';

class Home extends Component {
	render() {
		return (
			<Container fluid className="content">
				<Header history={this.props.history}/>
				<Slide/>
				<Footer/>
			</Container>
		);
	}
}

export { Home };