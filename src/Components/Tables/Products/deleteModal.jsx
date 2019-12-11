import React, {Component} from 'react';
import { Button, Label, Input, FormGroup } from 'reactstrap';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

import { fetchCall } from '../../../DAO/DAO.js';
import '../../../assets/styles.css';

class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            respons: '',
            senders: [],
            shops: [],
            senderValue: 'null',
            shopValue: 'null',
            status: this.props.item.status,
            element: false,
            forceDelete: false
        };
        this.fetchCall = fetchCall.bind(this);
    }

    componentDidMount() {
        this.fetchCall('senders', 'GET')
        .then(response => response.json())
        .then(senders => this.setState({senders}))
        .catch(error => console.log('Fetch Error :-S', error));

        this.fetchCall('shops', 'GET')
        .then(response => response.json())
        .then(shops => this.setState({shops}))
        .catch(error => console.log('Fetch Error :-S', error));
    }

    onOpenModal = () => {
        this.setState({
            respons: '',
            open: true
        });
    };
 
    onCloseModal = (e) => {
        this.setState({ open: false });
    };  

    senderChange = (e) => {
        this.setState({ senderValue: e.target.value });
    }

    shopChange = (e) => {
        this.setState({ shopValue: e.target.value });
    }

    handleClick = (e) => {
        if(e.target.id === 'toShop') {
            this.setState({
                senderValue: this.state.senders[0].name + ',' + this.state.senders[0].surname,
                shopValue: this.state.shops[0].name,
                forceDelete: true,
                element: <FormGroup>
                            <Label for="senderSelect">Choose sender </Label>
                            <Input type="select" name="select" id="senderSelect" onChange={this.senderChange}>
                                {this.state.senders.map((item) => (
                                    <option value={item.name + ',' + item.surname}>{item.name},{item.surname}</option>
                                ))} 
                            </Input>
                            <Label for="shopSelect">Choose shop </Label>
                            <Input type="select" name="select" id="shopSelect" onChange={this.shopChange}>
                                {this.state.shops.map((item) => (
                                    <option value={item.name}>{item.name}</option>
                                ))} 
                            </Input>
                         </FormGroup>
            });
        } else {
            this.setState({
                element: false,
                senderValue: 'null',
                shopValue: 'null'
            });
            if (e.target.id === 'toNotFit'){
            this.setState({
                status: 'Not useful',
                forceDelete: true
            });
        } 
        }
    }

    confirmed = (e) => {
        e.preventDefault();

        const data = {};
        data.name = this.props.item.name;
        data.type = this.props.item.type;
        data.constly = this.props.item.constly;
        data.price = this.props.item.price;
        data.quantity = this.props.item.quantity;
        data.date1 = this.props.item.date1;
        data.date2 = this.props.item.date2;
        data.priority = this.props.item.priority;
        
        data.status = this.state.status;
        data.sender = this.state.senderValue;
        data.shop = this.state.shopValue;
        data.exportDate = new Date();
        console.log('dataaaa' + data)

        if(this.state.forceDelete) {
            this.fetchCall('histories', 'POST', data)
            .then((res) =>  {
                if (res.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +  res.status);
                    return;
                }
            }).catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
        }

        this.props.deleteProduct(this.props.item.id);
        this.setState({ open: false });
    }

    render() {
        const { open, respons } = this.state;
      
        return (
            <div>
                <Button close onClick={this.onOpenModal}>
                </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <FormGroup tag="fieldset">
                        <legend>Specify the reason for deletion</legend>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" id="toTrash" onClick={this.handleClick} checked />
                                Delete completely.
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" id="toNotFit" onClick={this.handleClick} />
                                Product is not fit,transfer to history.
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" id="toShop" onClick={this.handleClick}/>
                                Product is shipped to the shop.
                            </Label>
                        </FormGroup>
                    {this.state.element}
                    <p className="res">{respons}</p>
                    <Button color="warning" onClick={this.confirmed}> Confirmed </Button>
                    </FormGroup>
                </Modal>
            </div>
        );
    }
}

export { DeleteModal };