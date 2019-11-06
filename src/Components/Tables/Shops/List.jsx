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
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('name')}}> Name ^ </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('status')}}> Status ^ </Button></th>
                        <th> Modify </th>
                        <th> Delete </th>
                     </tr>
                </thead>
                <tbody>
                    {this.props.shops.map((item, index) => (
                    <tr key={item.id}>
                        <td> {index + 1} </td>
                        <td> {item.name} </td>
                        <td> {item.status} </td>

                        <ModifyModal 
                        className="modal" item={item}
                        onChange={this.props.inputsChange}
                        updateShop={this.props.updateShop}
                        />
                        <td> <Button color="danger"  onClick={() => this.props.deleteShop(item.id)} > Delete </Button>{' '} </td>
                    </tr>
                    ))}
                </tbody>
          </Table>
        );
    }
}

export { List};