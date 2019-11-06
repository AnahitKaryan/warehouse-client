import React ,{Component} from 'react';
import { Table, Button  } from 'reactstrap';

import { ModifyModal } from './Modal';

class  List extends Component {

    render () {
        return (
            <Table dark>
                <thead>
                    <tr>
                        <th> N </th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('name')}}> Name ^ </Button></th>
                        <th> <Button outline color="info" onClick={() =>{this.props.sort('surname')}}> Surname ^</Button></th>
                        <th> Modify </th>
                        <th> Delete </th>
                     </tr>
                </thead>
                <tbody>
                    {this.props.senders.map((item, index) => (
                    <tr key={item.id}>
                        <td> {index + 1} </td>
                        <td> {item.name} </td>
                        <td> {item.surname} </td>

                        <ModifyModal 
                        className="modal" item={item}
                        onChange={this.props.inputsChange}
                        updateSender={this.props.updateSender}
                        />
                        <td> <Button color="danger"  onClick={() => this.props.deleteSender(item.id)} > Delete </Button>{' '} </td>
                    </tr>
                    ))}
                </tbody>
          </Table>
        );
    }
}

export { List};