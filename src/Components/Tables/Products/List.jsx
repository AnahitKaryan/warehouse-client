import React ,{Component} from 'react';
import { Table, Button } from 'reactstrap';

import { ModifyModal } from './Modal';

class  List extends Component {

    render () {
        const theadData = ['N', 'name', 'type', 'constly', 'price', 'quantity', 'status', 'date1', 'date2', 'priority', 'Modify', 'Delete'];
        return (
            <Table dark>
                <thead>
                    <tr>
                    {theadData.map((item) => (
                        item === 'N' || item === 'Modify' || item === 'Delete' ? (
                            <th> {item} </th>
                        ) : (
                            <th> 
                                <Button outline color="info" onClick={this.props.sort.bind(this, item)}> 
                                    {item} ^
                                </Button>
                            </th>
                        )
                    ))} 
                    </tr>
                </thead>
                <tbody>
                    {this.props.products.map((item, index) => (
                    <tr key={item.id}>
                        <td> {index + 1} </td>
                        <td> {item.name} </td>
                        <td> {item.type} </td>
                        <td> {item.constly} </td>
                        <td> {item.price} </td>
                        <td> {item.quantity} </td>
                        <td> {item.status} </td>
                        <td> {item.date1} </td>
                        <td> {item.date2} </td>
                        <td> {item.priority} </td>

                        <ModifyModal 
                        className="modal" item={item}
                        updateProduct={this.props.updateProduct}
                        onChange={this.props.inputsChange}
                        />
                        <td> 
                            <Button color="danger"  onClick={this.props.deleteProduct.bind(this, item.id)} >
                                Delete 
                            </Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
          </Table>
        );
    }
}

export { List};