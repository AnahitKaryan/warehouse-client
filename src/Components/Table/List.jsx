import React ,{Component} from 'react';
import { ModifyModal } from './Modal.js';

import { Table } from 'reactstrap';
import { Button } from 'reactstrap';

class  List extends Component {

    render () {
        return (
            <Table dark>
                <thead>
                    <tr>
                        <th> N </th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('name')}}> Name v </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('type')}}> Type v </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('constly')}}> Constly v </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('price')}}> Price v </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('quantity')}}> Quantity v </Button></th>
                        <th> <Button outline color="info"onClick={() =>{this.props.sort('status')}}> Status v </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('date1')}}> Date1 v </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('date2')}}> Date2 v </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('priority')}}> Priority v </Button></th>
                        <th> Modify </th>
                        <th> Delete </th>
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
                        onChange={this.props.inputsChange}
                        updateProduct={this.props.updateProduct}
                        />
                        <td> <Button color="danger"  onClick={() => this.props.deleteProduct(item.id)} > Delete </Button>{' '} </td>
                    </tr>
                    ))}
                </tbody>
          </Table>
        );
    }
}

export { List} ;