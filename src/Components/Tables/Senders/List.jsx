import React ,{Component} from 'react';
import { Table, Button  } from 'reactstrap';

import { ModifyModal } from './Modal';

class  List extends Component {
    render () {
        const theadData = ['N', 'name', 'surname', 'Modify', 'Delete'];
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
                        <td>
                            <Button color="danger"  onClick={this.props.deleteSender.bind(this, item.id)} >
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