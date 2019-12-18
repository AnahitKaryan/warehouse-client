import React from 'react';
import { Navbar, Container } from 'reactstrap';
import warehouse from './../assets/images/warehouse.svg';

const Footer = function() {
	return (
		<Container fluid className="footer">
			<Navbar className="bg-dark d-flex flex-column" light expand="md">
				<div className="d-flex flex-row">
					<h5 className="text-warning text-center" >Warehouse</h5>
					<img
						src={warehouse}
						width="30"
						height="30"
						className="d-inline-block align-top ml-2"
						alt=""
					/>
				</div>
				<em className="text-white text-center" > 
                    The  Warehouse app  whichenables  that stores warehouse information in tables what products exist, which stores and shippers the warehouse works warehouse.
				</em>
			</Navbar>
		</Container>
	);
};
export { Footer };