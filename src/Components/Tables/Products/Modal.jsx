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
        const data = ['name', 'type', 'constly', 'price', 'quantity', 'status', 'date1', 'date2', 'priority'];
        const { onChange } = this.props;
        return (
            <div>
                <Button color="success" onClick={this.onOpenModal} className="modify"> Modify </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h3 color="info"> Modify product params </h3>
                    <form>
                        {data.map(element => ( 
                            <input onChange={onChange} placeholder={element} name={element} defaultValue={this.state[element]} type={(element === 'date1' || element === 'date2' ? "date" : "text")} required/> 
                        ))}
                    </form>
                    <Button color="info" onClick={this.onCloseModal}> Confirmed </Button>
                </Modal>
            </div>
        );
    }
}

export { ModifyModal };