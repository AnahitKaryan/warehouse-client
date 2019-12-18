import React ,{Component} from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { ModifyModal } from './modal';
import { PaginacionTabla } from './../paginacion/paginacionTabla';

const ONE = 1;

class List extends Component {
     state = {
     	itemsperpage: 10,
     	nocolumns: 5
     }

     render () {

     	const theadData = ['N', 'name', 'priority', 'Modify', 'Delete'];
     	const {shops, sort, updateShop, inputsChange, deleteShop, checkInputs, addItem, checkName} = this.props;

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
     				items={shops.map((item, index) => (
     					<tr key={item.id}>
     						<td> {index + ONE} </td>
     						<td> {item.name} </td>
     						<td> {item.priority} </td>
     						<td>
     							<ModifyModal 
     								className="modal" 
     								item={item}
     								updateShop={updateShop}
     								onChange={inputsChange}
     								mod="update"
     								checkInputs={checkInputs}
     								addItem={addItem}
     								checkName={checkName}
     							/>
     						</td>
     						<td>
     							<Button close onClick={deleteShop.bind(this, item.id)} />
     						</td>
     					</tr>
     				))}
     			/>
     		</Table>
     	);
     }
}

List.propTypes = {
	shops: PropTypes.array.isRequired,
	sort: PropTypes.func.isRequired,
	updateShop: PropTypes.func.isRequired,
	inputsChange: PropTypes.func.isRequired,
	deleteShop: PropTypes.func.isRequired,
	checkInputs: PropTypes.func.isRequired,
	addItem: PropTypes.func.isRequired,
	checkName: PropTypes.func.isRequired
};

export { List};