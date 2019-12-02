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
            status: this.props.item.status
        };
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
 
    onCloseModal = (e) => {
        this.props.updateShop(e, this.props.item);
        this.setState({ open: false });
    };  

    render() {
        const { open } = this.state;
        const { onChange } = this.props;
        const data = ['name', 'status'];
        return (
            <div>
                <Button color="success" onClick={this.onOpenModal} className="modify"> Modify </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h3 color="info"> Modify sender params </h3>
                    <form>
                        {data.map(element => ( 
                            <input onChange={onChange} defaultValue={this.state[element]} name={element} required/> 
                        ))}
                    </form>
                    <Button color="info" onClick={this.onCloseModal}> Confirmed </Button>
                </Modal>
            </div>
        );
    }
}

export { ModifyModal };