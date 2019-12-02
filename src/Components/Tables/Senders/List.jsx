import React ,{Component} from 'react';
import { Table, Button  } from 'reactstrap';

import { ModifyModal } from './Modal';

class  List extends Component {
    render () {

        const theadData = ['N', 'name', 'surname', 'Modify', 'Delete'];
        const {senders, sort, updateSender, inputsChange, deleteSender} = this.props;

        return (
            <Table dark>
                <thead>
                    <tr>
                    {theadData.map((item) => (
                        item === 'N' || item === 'Modify' || item === 'Delete' ? (
                            <th> {item} </th>
                        ) : (
                            <th> 
                                <Button outline color="info" onClick={sort.bind(this, item)}> 
                                    {item} ^
                                </Button>
                            </th>
                        )
                    ))} 
                    </tr>
                </thead>
                <tbody>
                    {senders.map((item, index) => (
                    <tr key={item.id}>
                        <td> {index + 1} </td>
                        <td> {item.name} </td>
                        <td> {item.surname} </td>

                        <ModifyModal 
                        className="modal" item={item}
                        onChange={inputsChange}
                        updateSender={updateSender}
                        />
                        <td>
                            <Button color="danger"  onClick={deleteSender.bind(this, item.id)} >
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