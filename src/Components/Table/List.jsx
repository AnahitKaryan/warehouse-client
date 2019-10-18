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
                        <th> Name <Button outline color="info" onClick={() =>{this.props.sort('name')}}>v</Button></th>
                        <th> Type <Button outline color="info" onClick={() =>{this.props.sort('type')}}>v</Button></th>
                        <th> Constly <Button outline color="info" onClick={() =>{this.props.sort('constly')}}>v</Button></th>
                        <th> Price <Button outline color="info" onClick={() =>{this.props.sort('price')}}>v</Button></th>
                        <th> Quantity <Button outline color="info" onClick={() =>{this.props.sort('quantity')}}>v</Button></th>
                        <th> Status <Button outline color="info"onClick={() =>{this.props.sort('status')}}>v</Button></th>
                        <th> Date1 <Button outline color="info" onClick={() =>{this.props.sort('date1')}}>v</Button></th>
                        <th> Date2 <Button outline color="info" oonClick={() =>{this.props.sort('ndate2')}}>v</Button></th>
                        <th> Priority <Button outline color="info" onClick={() =>{this.props.sort('priority')}}>v</Button></th>
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
                        <td> {item.date2} </td>
                        <td> {item.priority} </td>

                        <ModifyModal 
                        className="modal" item={item}
                        onChange={this.props.onChange}
                        addProduct={this.props.addProduct}
                        />
                        <td> <Button color="danger"  onClick={() => this.props.deleteProduct(index)} > Delete </Button>{' '} </td>
                    </tr>
                    ))}
                </tbody>
          </Table>
        );
    }
}

export { List} ;