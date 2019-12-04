import React, {Component} from 'react';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import '../../../assets/styles.css';

class ModifyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
 
    onCloseModal = (e) => {
        if(this.props.respons === ''){
            if(this.props.mod === 'add') {
                this.props.addShop(e);
            } else  if(this.props.mod === 'update'){
                this.props.updateShop(e, this.props.item);
            }
            this.setState({ open: false });
        } 
    };  

    render() {
        const { open } = this.state;
        const data = ['name', 'type', 'constly', 'price', 'quantity', 'status', 'date1', 'date2', 'priority'];
        const { onChange, mod, item,respons } = this.props;

        let renderData;
        if (mod === 'add') {
            renderData = <div>
                <Button close aria-label="Cancel" onClick={this.onOpenModal} className="modify">
                    <span> &#10133;</span>
                </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h3 color="info"> Enter new product params </h3>
                    <form>
                        {data.map(element => ( 
                            <input onChange={onChange} name={element} placeholder={element} type={(element === 'date1' || element === 'date2' ? "date" : "text")}  required/> 
                        ))}
                    </form>
                    <p className="res">{respons}</p>
                    <Button color="info" onClick={this.onCloseModal}> Confirmed </Button>
                </Modal>
            </div>
        } else if(mod === 'update') {
            renderData = <div>
                <Button close aria-label="Cancel" onClick={this.onOpenModal} className="modify">
                    <span>&#9997;</span>
                </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h3 color="info"> Modify product params </h3>
                    <form>
                        {data.map(element => ( 
                            <input onChange={onChange} defaultValue={item[element]} name={element} type={(element === 'date1' || element === 'date2' ? "date" : "text")} required/> 
                        ))}
                    </form>
                    <p className="res">{respons}</p>
                    <Button color="info" onClick={this.onCloseModal}> Confirmed </Button>
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