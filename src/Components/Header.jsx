import React, {Component} from 'react';

import { fetchCall } from '../DAO/DAO.js';
import warehouse from './../assets/images/warehouse.svg';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Container
} from 'reactstrap';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            respons: '',
            isOpen: false, 
            setIsOpen: false
        }
    }

    logOut = async(e) => {
        e.preventDefault();
        await fetchCall('signout', 'DELETE')
        .then((res) =>  {
            if(200 === res.status) {
                localStorage.setItem('isAuthed', false);
                this.props.history.push('/');
            } else {
                this.setState({respons: 'Connection problems!'});
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });     
    }
    
    render() {

        const {isOpen, setIsOpen} = this.state;
        const toggle = () => this.setState({isOpen: !isOpen});

        return (
            <Container fluid className="header">
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/home" className="text-warning mr-5">
                        <img
                          src={warehouse}
                          width="30"
                          height="30"
                          className="d-inline-block align-top"
                          alt=""
                        />
                        Warehouse
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem className="mr-5">
                                <NavLink className="text-white" href="/productsList">Products</NavLink>
                            </NavItem>
                            <NavItem className="mr-5">
                                <NavLink className="text-white" href="/SendersList">Senders</NavLink>
                            </NavItem>
                            <NavItem className="mr-5">
                                <NavLink className="text-white" href="/ShopsList">Shops</NavLink>
                            </NavItem>
                         </Nav>
                         <Button className="mr-5" color="warning" onClick={this.logOut}>Log Out</Button>
                    </Collapse>
                </Navbar>       
            </Container>
        );
    }
}

export { Header };
