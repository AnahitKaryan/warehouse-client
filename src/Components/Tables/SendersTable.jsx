import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './Table.css';
import { FetchContext } from './../FetchContext';

class SendersTable extends Component {
    state = {
        columns: [
            {
                title: 'Name',
                field: 'name'
            }, 
            {
                title: 'SurName',
                field: 'surname'
            },
        ],
        data: []
    };

    toDate = string => new Date(string).toDateString();

    priorities = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5'
    }

    componentDidMount() {
        this.context('http://localhost:8081/senders', 'GET');
    }

    validateRow = (data) => {
        let fields = ['name', 'surname'];
        for(let i = 0; i < fields.length; ++i) {
            if(!data[fields[i]]) {
                alert('All fields must be filled');
                return false;
            }
        }
        return true;
       
    }

    addRow =(newData) => {
        this.context('http://localhost:8081/senders', 'POST', newData );
    }

    deleteRow =(oldData) => {
        this.context('http://localhost:8081/senders', 'DELETE', oldData );
    }

    updateRow = (newData,oldData) => {
        let data = newData;
        data.id = oldData.tableData.id; 
        this.context('http://localhost:8081/senders', 'PUT', data );
    }

    render() {
        return (
            <div id="table">
                <h1> Senders List </h1>
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

SendersTable.contextType = FetchContext;
export { SendersTable };
