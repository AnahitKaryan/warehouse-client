import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './Table.css';

class Table extends Component {
    constructor(props) {
        super(props);
        if(this.props.data === 'products') {
            this.url = 'http://localhost:8081/products';
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
        } else if(this.props.data === 'shops') {
            this.url = 'http://localhost:8081/shops';
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
        } else if(this.props.data === 'senders') { 
            this.url = 'http://localhost:8081/senders';
            this.state = {
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
        }
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
        fetch(this.url, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data =>
            this.setState({data})
        )
        .catch(error => console.log('Fetch Error :-S', error));

    }
    validateRow = (data) => {
        let fields;
        if(this.props.data === 'products') {
            fields = ['name', 'type', 'constly', 'price', 'quantity', 'status', 'date1', 'date2', 'priority'];
        } else if(this.props.data === 'shops') { 
            fields = ['name', 'status'];
        } else if(this.props.data === 'senders') { 
            fields = ['name', 'surname'];
        }
        console.log(data)
        for(let i = 0; i < fields.length; ++i) {
            if(!data[fields[i]]) {
                alert("All fields must be filled");
                return false;
            }
        }
        return true;
       
    }
    addRow =(newData) => {
        fetch(this.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(newData)
        }).then((res) =>  {
            if (res.status !== 200) { 
                console.log('Looks like there was a problem. Status Code: ' +  res.status);  
                return;  
            }
            console.log(newData)
        }).catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
    }

    deleteRow =(oldData) => {
        console.log(oldData)
        fetch(this.url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify( oldData)
        }).then((res) =>  {
            if (res.status !== 200) { console.log('0000000000000000: ' +  res.status); 
                console.log('Looks like there was a problem. Status Code: ' +  res.status);  
                return;  
            }
        }).catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
    }

    updateRow = (newData,oldData) => {
        console.log(oldData.id)
        let data = newData;
        data.id = oldData.id; 
        fetch(this.url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(data)
        }).then((res) =>  {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  res.status);  
                return;  
            }
        }).catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
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

export default Table;