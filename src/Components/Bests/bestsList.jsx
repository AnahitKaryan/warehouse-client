import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class BestsList extends Component {
    
    render () {
        const name = this.props.name;
        const elements = this.props.elements.sort(function(a, b) {
            return a.priority < b.priority;
        }) 

        return (
            <div>
                {elements.length > 0 ? (  
                <ListGroup className="mt-5">
                    <ListGroupItem tag="button" action className="bg-secondary text-center text-white">
                        Top three {name}.
                    </ListGroupItem>
                    <ListGroupItem tag="button" action>    
                        1. {elements[0].name} &#9734; &#9734; &#9734;
                    </ListGroupItem>
                    <ListGroupItem tag="button" action>
                        2. {elements[1].name} &#9734; &#9734;
                    </ListGroupItem>
                    <ListGroupItem tag="button" action>
                        3. {elements[2].name} &#9734;
                    </ListGroupItem>
                </ListGroup>
                ) : ( false )}
            </div>
        );
    }
}

export { BestsList };