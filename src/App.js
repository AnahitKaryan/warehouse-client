import  React  from 'react';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { Home } from './Components/Home';
import { ProductsTable}  from './Components/Tables/ProductsTable';
import { SendersTable } from './Components/Tables/SendersTable';
import { ShopsTable } from './Components/Tables/ShopsTable';
import {FetchProvider } from './Components/FetchContext';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends React.Component {

    fetchCall = function (urlData, methodData, bodyData) {
        let fetchObject = {
            method: methodData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        if(arguments[2]) {
            fetchObject.body = JSON.stringify(arguments[2])
        } 

        if( methodData === 'GET') {
            fetch(urlData, fetchObject)
            .then(response => response.json())
            .then(data => this.setState({data}))
            .catch(error => console.log('Fetch Error :-S', error));
            return;
        }

        if(urlData === 'http://localhost:8081/signin') {
            return fetch(urlData, fetchObject);
        }

        fetch(urlData, fetchObject).then((res) =>  {
            if (res.status !== 200) { 
                console.log('Looks like there was a problem. Status Code: ' +  res.status);  
                return;  
            }
            if(urlData === 'http://localhost:8081/signup') {
                this.props.history.push('/');
            }
        }).catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
    }

    render() {
    return (
        <FetchProvider value = {this.fetchCall}>
            <BrowserRouter>
                <Route path='/' exact component={Login}/>
                <Route path='/register' component={Register}  />
                <Route path='/home' component={Home}/>
                <Route path='/productsTable'  render={(props) => <Home s{...props} component={<ProductsTable />}/>}/>
                <Route path='/shopsTable'  render={(props) => <Home s{...props} component={<ShopsTable />}/>}/>
                <Route path='/sendersTable'  render={(props) => <Home s{...props} component={<SendersTable />}/>}/>
            </BrowserRouter>
        </FetchProvider>
        );
    }
}

export { App };