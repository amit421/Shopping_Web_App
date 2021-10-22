import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class Customer extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeval = this.onChangeval.bind(this)
    this.onChange = this.onChange.bind(this)
    this.all = this.all.bind(this)
    this.My_Orders = this.My_Orders.bind(this)
    this.Order = this.Order.bind(this)
    this.state = {
      id: this.props.match.params.id,
      products: [],
      users: [],
      name: '',
      val: ''
    }
  }

  componentDidMount() {
    const Product = {
      status: 'waiting'
    }
    axios.post('http://localhost:4000/products/',Product)
      .then(response => {
        this.setState ({
          products : response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      })
    const User = {
      _id: this.state.id
    }
    axios.post('http://localhost:4000/users/',User)
      .then(response => {
        this.setState ({
          users : response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  onChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeval(e) {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const products = {
      name: this.state.name
    }

    axios.post('http://localhost:4000/products/productbyname',products)
      .then(response => {
        this.setState ({
          products : response.data
        });
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error);
      })

    this.setState({
      name: ''
    })
  }

  all(e) {
    const Product = {
      status: 'waiting'
    }
    axios.post('http://localhost:4000/products/',Product)
      .then(response => {
        this.setState ({
          products : response.data
        });
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  My_Orders(e) {
    this.props.history.push ({
      pathname: '/customer/my_orders/'+this.state.id
    })
  //   const prod = {
  //       customer: this.state.id,
  //   }
  //   axios.post('http://localhost:4000/products/customer_product',prod)
  //     .then(response => {
  //       this.setState ({
  //         products : response.data
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     })
   }

  Order(e,prod_id) {
    this.props.history.push ({
      pathname: '/customer/order_product/'+this.state.id+'/'+prod_id
    })
  }

  sorti(e) {
    const prod = {
      value: this.state.val
    }
    axios.post('http://localhost:4000/products/sort',prod)
      .then(response => {
        this.setState ({
          products : response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      })
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">WELCOME</h1>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Search</label>
              <input type="text"
                  className="form-control"
                  placeholder="search by name"
                  value={this.state.name}
                  onChange={this.onChange}
                  />
            </div>
            <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
            </div>
          </form>
          <div>
            <Button variant="success" onClick={(e) => this.all(e)}>ALL </Button>
          </div>
          <div>
            <Button variant="success" onClick={(e) => this.My_Orders(e)}>My Orders </Button>
          </div>
          <form onSubmit={this.sorti()}>
            <div className="form-group"> 
              <label>Sort By</label>
              <select
                  required
                  className="form-control"
                  value={this.state.val}
                  onChange={this.onChangeval}>
                <option value="price">price</option>
                <option value="quantity">quantity</option>
              </select>
            </div>
            <div className="form-group">
              <input type="submit" value="Sort" className="btn btn-primary" />
            </div>
          </form>
          <table className="table col-md-6 mx-auto">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
            { 
                this.state.products.map((pro,i) => {
                    return (
                        <tr>
                            <td>{pro.name}</td>
                            <td>{pro.price}</td>
                            <td>{pro.quantity}</td>
                            <td>{pro.status}</td>
                            <td><Button variant="success" onClick={(e) =>this.Order(e,pro._id)}>Order</Button></td>
                        </tr>
                    )
                })
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

