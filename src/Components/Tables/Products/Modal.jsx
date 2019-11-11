import React, {Component} from 'react';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import '../../../assets/styles.css';

class ModifyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: this.props.item.name,
            type: this.props.item.type,
            constly: this.props.item.constly, 
            price: this.props.item.price, 
            quantity: this.props.item.quantity,
            status: this.props.item.status,
            date1: this.props.item.date1,
            date2: this.props.item.date2,
            priority: this.props.item.priority
        };
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
 
    onCloseModal = (e) => {
        this.props.updateProduct(e, this.props.item);
        this.setState({ open: false });
    };  

    render() {
        const { open } = this.state;
        return (
            <div>
                <Button color="success" onClick={this.onOpenModal} className="modify"> Modify </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h3 color="info"> Modify product params </h3>
                    <form>
                        <input onChange={this.props.onChange} defaultValue={this.state.name} name="name" required/>
                        <input onChange={this.props.onChange} defaultValue={this.state.type} name="type" required/>
                        <input onChange={this.props.onChange} defaultValue={this.state.constly} name="constly"  pattern="\d*" required/>
                        <input onChange={this.props.onChange} defaultValue={this.state.price}  name="price" pattern="\d*" required/>
                        <input onChange={this.props.onChange} defaultValue={this.state.quantity} name="quantity" pattern="\d*" required/>
                        <input onChange={this.props.onChange} defaultValue={this.state.status} name="status" required/>
                        <input
                         type="date"
                         name="date1"
                         id="exampleDate"
                         defaultValue={this.state.date1}
                         onChange={this.props.onChange}
                       />
                       <input
                         type="date"
                         name="date2"
                         id="exampleDate"
                         defaultValue={this.state.date2}
                         onChange={this.props.onChange}
                       />
                        <input onChange={this.props.onChange} defaultValue={this.state.priority} name="priority" type="number" pattern="\d*" required/>
                    </form>
                    <Button color="info" onClick={this.onCloseModal}> Confirmed </Button>
                </Modal>
            </div>
        );
    }
}

export { ModifyModal };