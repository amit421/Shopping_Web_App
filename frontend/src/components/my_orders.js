import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class My_Orders extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.my_Orders = this.my_Orders.bind(this)
    this.all = this.all.bind(this)
    this.state = {
      id: this.props.match.params.id,
      products: [],
      name: '',
    }
  }

  componentDidMount() {
    const prod = {
        customer: this.state.id,
    }
    axios.post('http://localhost:4000/products/customer_product',prod)
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

  onChange(e) {
    this.setState({
      name: e.target.value
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


  my_Orders(e) {
    const prod = {
        customer: this.state.id,
    }
    axios.post('http://localhost:4000/products/customer_product',prod)
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
            <Button variant="success" onClick={(e) => this.my_Orders(e)}>My Orders </Button>
          </div>
          <table className="table col-md-6 mx-auto">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Quantity Remaining</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
            { 
                this.state.products.map((pro,i) => {
                    return (
                        <tr>
                            <td>{pro.name}</td>
                            <td>{pro.price}</td>
                            <td>{pro.status}</td>
                            <td>{pro.quantity}</td>
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

