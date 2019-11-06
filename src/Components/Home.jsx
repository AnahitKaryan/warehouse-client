import React, {Component} from 'react';
import SideNav, { Nav, NavItem } from '@trendmicro/react-sidenav';
import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Button } from 'reactstrap';

import { fetchCall } from '../DAO/DAO.js';
import { TableProducts } from './Tables/Products/TableProducts';
import { TableSenders } from './Tables/Senders/TableSenders';
import { TableShops } from './Tables/Shops/TableShops';

class Home extends Component {
    logOut = async(e) => {
        e.preventDefault();
        await fetchCall('signout', 'DELETE')
        .then((res) =>  {
            if(200 === res.status) {
                localStorage.setItem('isAuthed', false);
                this.props.history.push('/');
            } else {
                alert('Connection problems');
            }
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });     
    }

    render() {
        return (
            <BrowserRouter>
                <Route render={({location, history}) => (
                    <React.Fragment>
                        <SideNav onSelect={(selected) => {
                                    const to = '/' + selected;
                                    if (location.pathname !== to) {
                                        history.push(to);
                                    }
                                }}>
                            <SideNav.Nav >
                                <NavItem eventKey="productsList">
                                    <NavLink to='/home/productsList'>
                                        Products List 
                                     </NavLink>
                                </NavItem>
                                <NavItem eventKey="shopsList">
                                    <NavLink to='/home/shopsList'>
                                        Shops List
                                    </NavLink>
                                </NavItem>
                                <NavItem eventKey="sendersList">
                                    <NavLink to='/home/sendersList'>
                                         Senders List
                                    </NavLink>
                                </NavItem>
                                <NavItem eventKey="sendersList">
                                    <Button color="primary" onClick={this.logOut}>Log Out</Button>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>
                        <div>
                            <Route path="/home/productsList" 
                                   component={TableProducts}/>
                            <Route path="/home/shopsList" 
                                   component={TableShops}/>
                            <Route path="/home/sendersList" 
                                   component={TableSenders}/>
                        </div>
                    </React.Fragment>
                )}/>
            </BrowserRouter>
        );
    }
}

export { Home };