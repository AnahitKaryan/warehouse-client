import React ,{Component} from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { PaginacionTabla } from './../paginacion/paginacionTabla';

const ONE = 1;

class List extends Component {
    state = {
    	itemsperpage: 10,
    	nocolumns: 15
    }

    render () {

    	const theadData = ['N', 'name', 'type', 'constly', 'price', 'quantity', 'status', 'date1', 'date2', 'priority', 'sender', 'shop', 'exportDate', 'Delete'];
        
    	const { histories, sort, deleteHistory } = this.props;
        
    	return (
    		<Table hover responsive>
    			<thead>
    				<tr>
    					{theadData.map((item) => (
    						item === 'N' || item === 'Delete' ? (
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
    				items={histories.map((item, index) => (
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
    						<td> {item.sender} </td>
    						<td> {item.shop} </td>
    						<td> {item.exportDate} </td>
    						<td>
    							<Button close onClick=
    								{deleteHistory.bind(this, item.id)} />
    						</td>
    					</tr>
    				))}
    			/>
    		</Table>
    	);
    }
}

List.propTypes = {
	histories: PropTypes.array.isRequired,
	sort: PropTypes.func.isRequired,
	deleteHistory: PropTypes.func.isRequired
};

export { List};