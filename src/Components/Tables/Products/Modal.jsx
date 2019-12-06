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
                if(this.props.isNumeric()) {
                    this.setState({respons:'The value of the constly, price, quantity and priority must be a number!'});
                } else {
                    this.setState({ respons: '' });
                    this.props.addProduct(e)
                    this.setState({ open: false });
                }
            } else {
                this.setState({respons:'Fill all the fields correctly!'});
                return;
            }

        } else  if(this.props.mod === 'update'){
            if(!this.props.checkInputs()) {
                if(this.props.isNumeric()) {
                    this.setState({respons:'The value of the constly, price, quantity and priority must be a number!'});
                } else {
                    this.setState({ respons: '' });
                    this.props.updateProduct(e, this.props.item)
                    this.setState({ open: false });
                }
            } else {
                this.setState({respons:'Fill all the fields correctly!'});
                return;
            }
        }
    }

    render() {
        const { open, respons } = this.state;
        const data = ['name', 'type', 'constly', 'price', 'quantity', 'status', 'date1', 'date2', 'priority'];
        const { onChange, mod, item} = this.props;

        let renderData;
        if (mod === 'add') {
            renderData = <div>
                <Button close onClick={this.onOpenModal} className="modify">
                    <span> &#10133;</span>
                </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h3 color="warning"> Enter new product params </h3>
                    <form>
                        {data.map(element => ( 
                            <input onChange={onChange} name={element} placeholder={element} type={(element === 'date1' || element === 'date2' ? "date" : "text")}  required/> 
                        ))}
                    </form>
                    <p className="res">{respons}</p>
                    <Button color="warning" onClick={this.confirmed}> Confirmed </Button>
                </Modal>
            </div>
        } else if(mod === 'update') {
            renderData = <div>
                <Button close onClick={this.onOpenModal} className="modify">
                    <span>&#9997;</span>
                </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h3 color="warning"> Modify product params </h3>
                    <form>
                        {data.map(element => ( 
                            <input onChange={onChange} defaultValue={item[element]} name={element} type={(element === 'date1' || element === 'date2' ? "date" : "text")} required/> 
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