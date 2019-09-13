import React from 'react';
import TableSection from './Table/TableSection';

class Home extends React.Component {
  render() {
    return (
     <div>
        <h1> Home Page </h1>
        <button> LogOut</button> 
        <TableSection/>
     </div>

    );
  }
}
export default Home;
