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
                        <input onChange={this.props.onChange} defaultValue={this.props.item.name} name="name" required/>
                        <input onChange={this.props.onChange} defaultValue={this.props.item.type} name="type" required/>
                        <input onChange={this.props.onChange} defaultValue={this.props.item.constly} name="constly"  pattern="\d*" required/>
                        <input onChange={this.props.onChange} defaultValue={this.props.item.price}  name="price" pattern="\d*" required/>
                        <input onChange={this.props.onChange} defaultValue={this.props.item.quantity} name="quantity" pattern="\d*" required/>
                        <input onChange={this.props.onChange} defaultValue={this.props.item.status} name="status" required/>
                        <input
                         type="date"
                         name="date1"
                         id="exampleDate"
                         defaultValue={this.props.item.date1}
                         onChange={this.props.onChange}
                       />
                       <input
                         type="date"
                         name="date2"
                         id="exampleDate"
                         defaultValue={this.props.item.date2}
                         onChange={this.props.onChange}
                       />
                        <input onChange={this.props.onChange} defaultValue={this.props.item.priority} name="priority" type="number" pattern="\d*" required/>
                    </form>
                    <Button color="info" onClick={this.onCloseModal}> Confirmed </Button>
                </Modal>
            </div>
        );
    }
}

export { ModifyModal };