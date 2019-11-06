import React ,{Component} from 'react';
import { Table, Button } from 'reactstrap';

import { ModifyModal } from './Modal';

class  List extends Component {

    render () {
        return (
            <Table dark>
                <thead>
                    <tr>
                        <th> N </th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('name')}}> Name^ </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('type')}}> Type^ </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('constly')}}> Constly^ </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('price')}}> Price^ </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('quantity')}}> Quantity^ </Button></th>
                        <th> <Button outline color="info"onClick={() =>{this.props.sort('status')}}> Status^ </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('date1')}}> Date1^ </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('date2')}}> Date2^</Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('priority')}}> Priority^ </Button></th>
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

export { List};