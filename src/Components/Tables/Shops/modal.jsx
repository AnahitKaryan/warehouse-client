import React, {Component} from 'react';
import { Button } from 'reactstrap';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';

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
 
    onCloseModal = () => {
    	this.setState({ open: false });
    };  

    confirmed = (e) => {

    	if(this.props.mod === 'add') {

    		if(!this.props.checkInputs()) {
    			if (!this.props.checkName()) {
    				this.props.addShop(e);
    				this.setState({ open: false });
    			    this.setState({ respons: '' });
    			} else {
    				this.setState({respons:'A shop with that name already exist!'});
    			}
    		} else {
    			this.setState({respons:'Fill all the fields correctly!'});
    			return;
    		}

    	} else if(this.props.mod === 'update'){
        
    		if(!this.props.checkInputs()) {
    			if (!this.props.checkName()) {
    				this.props.updateShop(e, this.props.item);
    				this.setState({ open: false });
    				this.setState({ respons: '' });
    			} else {
    				this.setState({respons:'A shop with that name already exist!'});
    			}
    		} else {
    			this.setState({respons:'Fill all the fields correctly!'});
    			return;
    		}
    	}
    }

    render() {
    	const { open, respons } = this.state;
    	const { onChange, mod, item } = this.props;
    	const data = ['name'];
    	let renderData;
    	if (mod === 'add') {
    		renderData = <div>
    			<Button close onClick={this.onOpenModal} className="modify">
    				<span role="img" aria-label="Close"> &#10133;</span>
    			</Button>
    			<Modal open={open} onClose={this.onCloseModal} center>
    				<h3 color="warning"> Enter new shop params </h3>
    				<form>
    					{data.map(element => ( 
    						<input key={element} onChange={onChange} name={element} placeholder={element} required/> 
    					))}
    				</form>
    				<p className="res">{respons}</p>
    				<Button color="warning" onClick={this.confirmed}> Confirmed </Button>
    			</Modal>
    		</div>;
    	} else if(mod === 'update') {
    		renderData = <div>
    			<Button close onClick={this.onOpenModal} className="modify">
    				<span role="img" aria-label="Close">&#9997;</span>
    			</Button>
    			<Modal open={open} onClose={this.onCloseModal} center>
    				<h3 color="warning"> Modify shop params </h3>
    				<form>
    					{data.map(element => ( 
    						<input key={element} onChange={onChange} defaultValue={item[element]} name={element} required/> 
    					))}
    				</form>
    				<p className="res">{respons}</p>
    				<Button color="warning" onClick={this.confirmed}> Confirmed </Button>
    			</Modal>
    		</div>;
    	}
    	return (
    		<div>
    			{renderData}
    		</div>
    	);
    }
}

ModifyModal.propTypes = {
	item: PropTypes.object,
	updateSender: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	mod: PropTypes.string.isRequired,
	checkInputs: PropTypes.func.isRequired,
	addItem: PropTypes.func,
	checkName: PropTypes.func.isRequired
};

export { ModifyModal };