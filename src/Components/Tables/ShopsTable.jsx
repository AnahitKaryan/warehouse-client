import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './Table.css';
import { fetchCall } from '../../DAO/DAO.js';

class ShopsTable extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Name',
                    field: 'name'
                }, 
                {
                    title: 'Status',
                    field: 'status'
                },
            ],
            data: []
        };
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
        this.fetchCall('shops', 'GET')
        .then(response => response.json())
        .then(data => this.setState({data}))
        .catch(error => console.log('Fetch Error :-S', error));
    }

    validateRow = (data) => {
        let fields = ['name', 'status'];
        for(let i = 0; i < fields.length; ++i) {
            if(!data[fields[i]]) {
                alert('All fields must be filled');
                return false;
            }
        }
        return true;
       
    }

    addRow =(newData) => {
        fetchCall('shops', 'POST', newData);
    }

    deleteRow =(oldData) => {
        fetchCall('shops', 'DELETE', oldData );
    }

    updateRow = (newData,oldData) => {
        let data = newData;
        data.id = oldData.tableData.id; 
        fetchCall('shops', 'PUT', data );
    }

    render() {
        return (
            <div id="table">
                <h1> Shops List </h1>
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

export { ShopsTable };