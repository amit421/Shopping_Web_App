import React from 'react'; 
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/navbar.component'
import Home from './components/home.component'
import Login from './components/login.component'
import Register from './components/register.component'
import Vendor from './components/vendor.component'
import Customer from './components/customer.component'
import Add_product from './components/vendor.component.add.js'
import List_Product from './components/vendor.component.list.js'
import Order_Product from './components/customer.order.js'
import Dispatch from './components/vendor.dispatch.js'
import Dispatched from './components/vendor.dispatched.js'
import My_Orders from './components/my_orders.js'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/vendor/:id" component={Vendor} />
          <Route path="/customer/:id" component={Customer} />
          <Route path="/vendor/add_product/:id" component={Add_product} />
          <Route path="/vendor/list/:id" component={List_Product} />
          <Route path="/customer/order_product/:id/:id2" component={Order_Product} />
          <Route path="/vendor/dispatch/:id" component={Dispatch}/>
          <Route path="/vendor/dispatched/:id" component={Dispatched}/>
          <Route path="/customer/my_orders/:id" component={My_Orders}/>

      </div>  
    </Router>
  );
}

export default App;
