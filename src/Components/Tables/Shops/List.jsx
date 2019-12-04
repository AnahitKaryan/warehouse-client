import React ,{Component} from 'react';
import { Table, Button } from 'reactstrap';

import { ModifyModal } from './Modal';
import { PaginacionTabla } from './../paginacion/PaginacionTabla';

class  List extends Component {
     state = {
        itemsperpage: 10,
        nocolumns: 5
    }

    render () {

        const theadData = ['N', 'name', 'status', 'Modify', 'Delete'];
        const {shops, sort, updateShop, inputsChange, deleteShop} = this.props;

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
                    items={shops.map((item, index) => (
                    <tr key={item.id}>
                        <td> {index + 1} </td>
                        <td> {item.name} </td>
                        <td> {item.status} </td>

                        <ModifyModal 
                        className="modal" 
                        item={item}
                        updateShop={updateShop}
                        onChange={inputsChange}
                        mod="update"
                        respons={this.state.respons} 
                        />
                        <td>
                            <Button close  onClick=
                            {deleteShop.bind(this, item.id)} />
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