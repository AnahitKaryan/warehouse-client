import React, {Component} from 'react';
import {
    SwipeableDrawer,
    List,
    Divider,
    ListItem,
    ListItemText,
    IconButton,
    Box,
    Grid
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

class Home extends Component {
    constructor(props) {
        super(props);
            this.state = {
            drawerOpen: false
        }
        this.component = this.props.component;
    }

    toggleDrawer =  (drawerOpen) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        this.setState({drawerOpen});
    }
    
    logOut = () => {
        localStorage.setItem('isAuthed', false);
        this.props.history.push('/');
    }

    componentWillMount() {
        const isAuthed = localStorage.getItem('isAuthed');
        if (!isAuthed) {
            this.props.history .push('/');
        }
    }

    sideList = () => (
        <div
            className="list"
            role="presentation"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}>
            <Divider/>
                <List>
                    <ListItem button key="Table" onClick={() => this.props.history.push('/table')}>
                        <ListItemText primary="Table"/>
                    </ListItem>
                </List>
            <Divider/>
            <List>
                <ListItem button key="Log Out" onClick={this.logOut}>
                    <ListItemText primary="Log Out"/>
                </ListItem>

            </List>
        </div>
    );

    render() {
        return (
            <div>
                <Grid container direction="row">
                    <Box ml={2} mt={1}>
                        <IconButton
                          color="default"
                          aria-label="Open drawer"
                          onClick={this.toggleDrawer(true)}
                          edge="start">
                        <MenuIcon/>
                        </IconButton>
                    </Box>
                    {this.component ? this.component : null}
                </Grid>

                <SwipeableDrawer
                  open={this.state.drawerOpen}
                  onClose={this.toggleDrawer(false)}
                  onOpen={this.toggleDrawer(true)}>
                  {this.sideList('left')}
                </SwipeableDrawer>
            </div>
        );
    }
}

export default Home;
