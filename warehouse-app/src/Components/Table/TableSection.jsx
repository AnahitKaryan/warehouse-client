import React, {Component} from 'react';
import List from './List';

import { Button } from 'reactstrap';

class TableSection extends Component {
    constructor(props) {
    super(props);
    this.state = {
     productsInList: [],
     filteredList: [],
 product: '' ,
     priority: '',
     date: '',
   };
   this.DATA = this.state.productsInList;
  }
  nameChange = (e) => {
    this.setState({product: e.target.value});
  }
  priorityChange = (e) => {
    this.setState({priority: e.target.value});
  }
  dateChange = (e) => {
    this.setState({date: e.target.value});
  }
  deleteProduct = (i) => {
   this.setState({
      productsInList: this.state.productsInList.filter((item, index) => index !== i)
    });
  }

  addProduct = (e) => {
    e.preventDefault();
    if(this.state.product.length === 0 || this.state.priority.length === 0 || this.state.date.length === 0) {
      alert('Fill all the fields correctly');
      return
    }
    const newProduct = {
        product: this.state.product,
        id: Date.now(),
        priority: this.state.priority,
        date:  this.state.date
    };
    this.setState(state => ({
       productsInList: state.productsInList.concat(newProduct),
       product: '',
       priority: '',
       date: ''
     }));

  }

  search = (e) => {
      console.log('changeee', e.target);
      const searchString = e.target.value;
      this.setState({
        filteredList: this.state.productsInList.filter((item) => item.product.toLowerCase().match(searchString)),
        searchText: searchString
      });

  }
  sortByName = () => {
      this.setState({
          productsInList: this.state.productsInList.sort((function(a, b) { return a.product > b.product;}))
      });
  }
  sortByPriority = () => {
      this.setState({
          productsInList: this.state.productsInList.sort((function(a, b) { return Number(a.priority) > Number(b.priority);}))
      });
  }
  sortByDate = () => {
      this.setState({
          productsInList: this.state.productsInList.sort((function(a, b) {
            const date1 = a.date.split("-");
            const date2 = a.date.split("-");
            return date1[2] > date2[2] || date1[1] > date2[1] || date1[0] >= date2[0];
          }))
      });
  }
  render () {
  	const list = this.state.searchText ? this.state.filteredList : this.state.productsInList;

    return (
      <div>
        <input  placeholder="Enter the search text" value={this.state.searchText} onChange={this.search}/>
        <List products={list}
              deleteProduct={this.deleteProduct}
              nameChange={this.state.nameChange}
              priorityChange={this.state.priority}
              dateChange={this.state.dateChange}
              addProduct={this.state.addProduct}
              sortByName={this.sortByName}
              sortByPriority={this.sortByPriority}
              sortByDate={this.sortByDate}
        />
        <div>
        <h4> Enter product params </h4>
         <form>
            <input onChange={this.nameChange} value={this.state.product} placeholder="Enter new product name" required/>
            <input onChange={this.priorityChange} value={this.state.priority} type="number" pattern="\d*" placeholder="Enter priority" required/>
            <input
             type="date"
             name="date"
             id="exampleDate"
             placeholder="date placeholder"
             onChange={this.dateChange}
           />
            <Button color="info" onClick={this.addProduct}> Add</Button>{' '}
         </form>
        </div>

      </div>
    );
  }
}

export default TableSection;
