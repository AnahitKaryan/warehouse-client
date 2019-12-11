import React from 'react';
import { Navbar, Container } from 'reactstrap';

const Footer = function() {
    return (
        <Container fluid className="footer">
            <Navbar className="bg-dark" light expand="md">
                <h5 className="text-warning text-center" >Warehouse</h5>
                <p className="text-white text-center" > 
                    The  Warehouse app  whichenables  that stores warehouse information in tables what products exist, which stores and shippers the warehouse works warehouse.
                </p>
            </Navbar>
        </Container>
    );
}
export { Footer };