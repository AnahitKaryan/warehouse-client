import React ,{Component} from 'react';
import  ModifyModal from './Modal.js';

import { Table } from 'reactstrap';
import { Button } from 'reactstrap';

class  List extends Component {

  render () {
    return (
      <Table dark>
        <thead>
          <tr>
            <th> N </th>
            <th> Name <Button outline color="info" onClick={this.props.sortByName}>v</Button></th>
            <th> Priority <Button outline color="info" onClick={this.props.sortByPriority}>v</Button></th>
            <th> Date <Button outline color="info" onClick={this.props.sortByDate}>v</Button></th>
            <th> Modify </th>
            <th> Delete </th>
          </tr>
        </thead>
        <tbody>
            {this.props.products.map((item, index) => (
            <tr key={item.id}>
              <td> {index + 1} </td>
              <td> {item.product} </td>
              <td> {item.priority} </td>
              <td> {item.date} </td>
              < ModifyModal 
                className="modal" item={item}
                nameChange={this.props.nameChange}
                priorityChange={this.props.priorityChange}
                dateChange={this.props.dateChange}
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

export default List;
