import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

export default class Order_Product extends Component {
  constructor(props) {
    super(props)

    this.onChangequantity = this.onChangequantity.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      quantity: '',
      customer: this.props.match.params.id,
      prod_id: this.props.match.params.id2
    }
  }

  onChangequantity(e) {
    this.setState({
      quantity:e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const newProduct = {
      quantity: this.state.quantity,
      customer: this.state.customer,
      iid: this.state.prod_id
    }

    console.log(newProduct)
    
    axios.post('http://localhost:4000/products/update',newProduct)
      .then(res => console.log(res.data))

    this.setState({
      quantity: ''
    })

    const prod = {
            q: 0
        }
    axios.post('http://localhost:4000/products/setdispatch',prod)
         .then(response => {
            console.log(response.data)
         })
         .catch(function(error) {
             console.log(error);
         })
    this.props.history.push({
      pathname: '/customer/'+this.state.customer
    })
  }

  render() {
    return (
      <div>
      <h3>Order Product</h3>
        <form onSubmit={this.onSubmit}>
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
            <input type="submit" value="Confirm" className="btn btn-primary" />
          </div> 
        </form>
      </div>

    )
  }
}
