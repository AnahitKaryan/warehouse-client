import React ,{Component} from 'react';
import { Table, Button  } from 'reactstrap';

import { ModifyModal } from './Modal';
import { PaginacionTabla } from './../paginacion/PaginacionTabla';

class  List extends Component {
    state = {
        itemsperpage: 10,
        nocolumns: 5
    }
    render () {

        const theadData = ['N', 'name', 'surname', 'Modify', 'Delete'];
        const {senders, sort, updateSender, inputsChange, deleteSender} = this.props;

        return (
            <Table hover responsive>
                <thead>
                    <tr>
                    {theadData.map((item) => (
                        item === 'N' || item === 'Modify' || item === 'Delete' ? (
                            <th> {item} </th>
                        ) : (
                            <th> {item}
                                <span  onClick={sort.bind(this, item)}> 
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
                    items={senders.map((item, index) => (
                    <tr key={item.id}>
                        <td> {index + 1} </td>
                        <td> {item.name} </td>
                        <td> {item.surname} </td>

                        <ModifyModal 
                        className="modal" 
                        item={item}
                        updateSender={updateSender}
                        onChange={inputsChange}
                        mod="update"
                        respons={this.state.respons} 
                        />
                        <td>
                            <Button close  onClick=
                            {deleteSender.bind(this, item.id)} />
                        </td>
                    </tr>
                    ))}
                    pagesspan={4}
                />
          </Table>
        );
    }
}

export { List};