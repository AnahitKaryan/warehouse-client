import React, {Component} from 'react';
import { Button } from 'reactstrap';
import Modal from 'react-responsive-modal';

class ModifyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            respons: ''
        };
    }

    onOpenModal = () => {
        this.setState({
            respons: '',
            open: true
        });
        
        if(this.props.mod === 'update') {
            this.props.addItem(this.props.item);
        }
    };
 
    onCloseModal = (e) => {
        this.setState({ open: false });
    };  

    confirmed = (e) => {

        if(this.props.mod === 'add') {

            if(!this.props.checkInputs()) {
                this.setState({ respons: '' });
                this.props.addSender(e)
                this.setState({ open: false });
            } else {
                this.setState({respons:'Fill all the fields correctly!'});
                return;
            }

        } else  if(this.props.mod === 'update'){
            if(!this.props.checkInputs()) {
                this.setState({ respons: '' });
                this.props.updateSender(e, this.props.item)
                this.setState({ open: false });
            } else {
                this.setState({respons:'Fill all the fields correctly!'});
                return;
            }
        }
    }

    render() {
        const { open, respons } = this.state;
        const { onChange, mod, item} = this.props;
        const data = ['name', 'surname'];
        let renderData;
        if (mod === 'add') {
            renderData = <div>
                <Button close onClick={this.onOpenModal} className="modify">
                    <span role="img" aria-label="Close"> &#10133;</span>
                </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h3 color="warning"> Enter new sender params </h3>
                    <form>
                        {data.map(element => ( 
                            <input onChange={onChange} name={element} placeholder={element} required/> 
                        ))}
                    </form>
                    <p className="res">{respons}</p>
                    <Button color="warning" onClick={this.confirmed}> Confirmed </Button>
                </Modal>
            </div>
        } else if(mod === 'update') {
            renderData = <div>
                <Button close onClick={this.onOpenModal} className="modify">
                    <span role="img" aria-label="Close">&#9997;</span>
                </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h3 color="warning"> Modify sender params </h3>
                    <form>
                        {data.map(element => ( 
                            <input onChange={onChange} defaultValue={item[element]} name={element} required/> 
                        ))}
                    </form>
                    <p className="res">{respons}</p>
                    <Button color="warning" onClick={this.confirmed}> Confirmed </Button>
                </Modal>
            </div>
        }
        return (
            <div>
                {renderData}
            </div>
        );
    }
}

export { ModifyModal };