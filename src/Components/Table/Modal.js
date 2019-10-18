import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactDOM from 'react-dom';

class ModifyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Button color="success" onClick={this.toggle}> Modify </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}> Modify product params </ModalHeader>
                    <ModalBody>
                        <div className="fixedDiv">
                             <form>
                                <input onChange={this.props.inputsChange} value={this.props.item.name} required/>
                                <input onChange={this.props.inputsChange} value={this.props.item.type} required/>
                                <input onChange={this.props.inputsChange} value={this.props.item.constly} required/>
                                <input onChange={this.props.inputsChange} value={this.props.item.price} required/>
                                <input onChange={this.props.inputsChange} value={this.props.item.quantity} required/>
                                <input onChange={this.props.inputsChange} value={this.props.item.status} required/>
                               
                                <input
                                 type="date"
                                 name="date1"
                                 id="exampleDate"
                                 onChange={this.props.inputsChange}
                               />
                               <input
                                 type="date"
                                 name="date2"
                                 id="exampleDate"
                                 onChange={this.props.inputsChange}
                               />
                                <input onChange={this.props.inputsChange} value={this.props.item.priority} type="number" pattern="\d*" required/>
                                <Button color="info" onClick={this.addProduct}> Add</Button>{' '}
                             </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" onClick={this.props.addProduct}> Confirmed </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export { ModifyModal };