import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './Table.css';
import { fetchCall } from '../../DAO/DAO.js';

class ProductsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            data: []
        }
        this.fetchCall = fetchCall.bind(this);
    }

    toDate = string => new Date(string).toDateString();

    priorities = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5'
    }

    componentDidMount() {
        this.fetchCall('products', 'GET')
        .then(response => response.json())
        .then(data => this.setState({data}))
        .catch(error => console.log('Fetch Error :-S', error));
    }

    validateRow = (data) => {
        const fields = ['name', 'type', 'constly', 'price', 'quantity', 'status', 'date1', 'date2', 'priority'];
        console.log(data)
        for(let i = 0; i < fields.length; ++i) {
            if(!data[fields[i]]) {
                alert('All fields must be filled');
                return false;
            }
        }
        return true;
    }

    addRow =(newData) => {
        this.fetchCall('products', 'POST', newData);
    }

    deleteRow =(oldData) => {
        this.fetchCall('products', 'DELETE', oldData );
    }

    updateRow = (newData,oldData) => {
        let data = newData;
        data.id = oldData.tableData.id; 
        this.fetchCall('products', 'PUT', data );
    }


    render() {
        return (
            <div id="table">
                <h1> Products List </h1>
                <MaterialTable
                    title="Table"
                    columns={this.state.columns}
                    data={this.state.data}
                    sorting
                    editable={{
                    onRowAdd: newData => new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if(this.validateRow(newData)) {
                                const data = [...this.state.data];
                                data.push(newData);
                                this.setState({
                                  ...this.state,
                                  data
                                });
                                this.addRow(newData);
                            }
                        }, 600);

                    }),
                    onRowUpdate: (newData, oldData) => new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if(this.validateRow(newData)) {
                                const data = [...this.state.data];
                                data[data.indexOf(oldData)] = newData;
                                this.setState({
                                    ...this.state,
                                     data
                                });
                                this.updateRow(newData,oldData);
                            }
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
                            this.deleteRow(oldData);
                        }, 600);
                    })
                }}/>
            </div>
        );
    }
}

export { ProductsTable };
