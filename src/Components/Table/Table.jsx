import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './Table.css';

class Table extends Component {
    state = {
        columns: [
            {
                title: 'Name',
                field: 'name'
            }, 
            {
                title: 'Type',
                field: 'type'
            },
            {
                title: 'Constly',
                field: 'constly'
            },
            {
                title: 'Price',
                field: 'price'
            },
            {
                title: 'Quantity',
                field: 'quantity'
            },
            {
                title: 'Status',
                field: 'status'
            },

            {
                title: 'Date of import',
                field: 'date1',
                type: 'date',
                customSort: (a, b) => new Date(a.date) - new Date(b.date),
                render: (data) => this.toDate(data.date)
            },
            {
                title: 'Date of export',
                field: 'date2',
                type: 'date',
                customSort: (a, b) => new Date(a.date) - new Date(b.date),
                render: (data) => this.toDate(data.date)
            },
            {
                title: 'Priority',
                field: 'priority',
                lookup: {
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5'
            },
            customSort: (a, b) => a.priority - b.priority
          }
        ],
        data: [
            {
                name: 'Milk',
                type: 'Dairy',
                consily: 250,
                price: 280,
                quantity: 10,
                status: 'Is useful',
                date1: 'Sep 19 2010',
                date2: 'Sep 30 2010',
                priority: 1
            }, 
            {
                name: 'Coca-cola',
                type: 'Drink',
                consily: 500,
                price: 550,
                quantity: 15,
                status: 'Is useful',
                date1: 'Sep 19 2010',
                date2: 'Sep 30 2010',
                priority: 3
            }
        ]
    };

    toDate = string => new Date(string).toDateString()

    priorities = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5'
    }

    render() {
        return (
            <div id="table">
                <MaterialTable
                    title="Table"
                    columns={this.state.columns}
                    data={this.state.data}
                    sorting
                    editable={{
                    onRowAdd: newData => new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...this.state.data];
                            data.push(newData);
                            this.setState({
                              ...this.state,
                              data
                            });
                        }, 600);
                    }),
                    onRowUpdate: (newData, oldData) => new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...this.state.data];
                            data[data.indexOf(oldData)] = newData;
                            this.setState({
                                ...this.state,
                                 data
                            });
                        }, 600);
                    }),
                    onRowDelete: oldData => new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...this.state.data];
                            data.splice(data.indexOf(oldData), 1);
                            this.setState({
                                 ...this.state,
                                 data
                            });
                        }, 600);
                    })
                }}/>
            </div>
        );
    }
}

export default Table;