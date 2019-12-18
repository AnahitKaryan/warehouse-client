import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

class BestsList extends Component {
    
	render () {
		const name = this.props.name;
		const elements = this.props.elements.sort(function(a, b) {
			return a.priority < b.priority;
		}); 

		return (
			<div>
				{elements.length > ZERO ? (  
					<ListGroup className="mt-5">
						<ListGroupItem tag="button" action className="bg-secondary text-center text-white">
                        Top three {name}.
						</ListGroupItem>
						<ListGroupItem tag="button" action>    
                        1. {elements[ZERO].name} &#9734; &#9734; &#9734;
						</ListGroupItem>
						<ListGroupItem tag="button" action>
                        2. {elements[ONE].name} &#9734; &#9734;
						</ListGroupItem>
						<ListGroupItem tag="button" action>
                        3. {elements[TWO].name} &#9734;
						</ListGroupItem>
					</ListGroup>
				) : ( false )}
			</div>
		);
	}
}

BestsList.propTypes = {
 	name: PropTypes.string,
  	elements: PropTypes.array
};

export { BestsList };