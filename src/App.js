import  React  from 'react';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { Home } from './Components/Home';
import { ProductsTable}  from './Components/Tables/ProductsTable';
import { SendersTable } from './Components/Tables/SendersTable';
import { ShopsTable } from './Components/Tables/ShopsTable';

import { BrowserRouter, Route } from 'react-router-dom';

import { TableSection }from './Components/Table/TableSection';

class App extends React.Component {
    render() {
    return (
        <BrowserRouter>
            <Route path='/' exact component={Login}/>
            <Route path='/register' component={Register}  />
            <Route path='/home' component={Home}/>
            <Route path='/productsTable'  render={(props) => <Home s{...props} component={<TableSection />}/>}/>
            <Route path='/shopsTable'  render={(props) => <Home s{...props} component={<ShopsTable />}/>}/>
            <Route path='/sendersTable'  render={(props) => <Home s{...props} component={<SendersTable />}/>}/>
        </BrowserRouter>
        );
    }
}

export { App };
