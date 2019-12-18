import React ,{Component} from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

import { ModifyModal } from './modal';
import { DeleteModal } from './deleteModal';
import { PaginacionTabla } from './../paginacion/paginacionTabla';

const ONE = 1;

class List extends Component {
    state = {
    	itemsperpage: 10,
    	nocolumns: 12
    }

    render () {

    	const theadData = ['N', 'name', 'type', 'constly', 'price', 'quantity', 'status', 'date1', 'date2', 'priority', 'Modify', 'Delete'];
    	const {products, sort, updateProduct, inputsChange, deleteProduct, checkInputs, addItem } = this.props;
        
    	return (
    		<Table hover responsive>
    			<thead>
    				<tr>
    					{theadData.map((item) => (
    						item === 'N' || item === 'Modify' || item === 'Delete' ? (
    							<th key={item}> {item} </th>
    						) : (
    							<th key={item}> {item}
    								<span onClick={sort.bind(this, item)}> 
                                    &#8657;
    								</span>
    							</th>
    						)
    					))} 
    				</tr>
    			</thead>
                
    			<PaginacionTabla
    				itemsperpage={this.state.itemsperpage}
    				nocolumns={this.state.nocolumns}
    				items={products.map((item, index) => (
    					<tr key={item.id}>
    						<td> {index + ONE} </td>
    						<td> {item.name} </td>
    						<td> {item.type} </td>
    						<td> {item.constly} </td>
    						<td> {item.price} </td>
    						<td> {item.quantity} </td>
    						<td> {item.status} </td>
    						<td> {item.date1} </td>
    						<td> {item.date2} </td>
    						<td> {item.priority} </td>
    						<td>
    							<ModifyModal 
    								className="modal" 
    								item={item}
    								updateProduct={updateProduct}
    								onChange={inputsChange}
    								mod="update"
    								checkInputs={checkInputs}
    								addItem={addItem}
    							/>
    						</td>
    						<td>
    							<DeleteModal 
    								className="modal" 
    								item={item}
    								deleteProduct={deleteProduct}
    							/>
    						</td>    
    					</tr>
    				))}
    			/>
    		</Table>
    	);
    }
}

List.propTypes = {
	products: PropTypes.array.isRequired,
	sort: PropTypes.func.isRequired,
	updateProduct: PropTypes.func.isRequired,
	inputsChange: PropTypes.func.isRequired,
	deleteProduct: PropTypes.func.isRequired,
	checkInputs: PropTypes.func.isRequired,
	addItem: PropTypes.func.isRequired
};

export { List};