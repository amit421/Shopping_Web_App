import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

export default class Add_product extends Component {
  constructor(props) {
    super(props)

    this.onChangename = this.onChangename.bind(this)
    this.onChangeprice = this.onChangeprice.bind(this)
    this.onChangequantity = this.onChangequantity.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      vendor: this.props.match.params.id,
      name: '',
      price: '',
      quantity: '',
      status: 'waiting'
    }
  }


  onChangename(e) {
    this.setState({
      name:e.target.value
    })
  }
  onChangeprice(e) {
    this.setState({
      price:e.target.value
    })
  }
  onChangequantity(e) {
    this.setState({
      quantity:e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const newProduct = {
      vendor: this.state.vendor,
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity,
      status: this.state.status
    }

    console.log(newProduct)
    
    axios.post('http://localhost:4000/products/vendor/add_product',newProduct)
      .then(res => console.log(res.data))

    this.setState({
      name: '',
      price: '',
      quantity: ''
    })
  
  }

  render() {
    return (
      <div>
      <h3>Create Product</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name:</label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangename}
                />
          </div>
          <div className="form-group"> 
            <label>Price(in $):</label>
            <input  type="number"
                required
                className="form-control"
                value={this.state.price}
                onChange={this.onChangeprice}
                />
          </div>
          <div className="form-group"> 
            <label>quantity:</label>
            <input  type="number"
                required
                className="form-control"
                value={this.state.quantity}
                onChange={this.onChangequantity}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Product" className="btn btn-primary" />
          </div> 
        </form>
      </div>

    )
  }
}
