import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangename = this.onChangename.bind(this)
    this.onChangeemail = this.onChangeemail.bind(this)
    this.onChangepassword = this.onChangepassword.bind(this)
    this.onChangeusertype = this.onChangeusertype.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      name: '',
      email: '',
      password: '',
      usertype: 'customer'
    }
  }

  onChangename(e) {
    this.setState({
      name: e.target.value
    })
  }
  onChangeemail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangepassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onChangeusertype(e) {
    this.setState({
      usertype: e.target.value
    })
  }


  onSubmit(e)  {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      usertype: this.state.usertype
    }

    console.log(newUser)
    
    axios.post('http://localhost:4000/users/register',newUser)

    this.setState({
        name: '',
        email: '',
        password: '',
        usertype: 'customer' 
      })
  }

  render() {
    return (
      <div>
        <h3>Sign Up </h3>
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
            <label>Email:</label>
            <input  type="email"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeemail}
                />
          </div>
          <div className="form-group"> 
            <label>Password:</label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangepassword}
                />
          </div>
          <div className="form-group"> 
            <label>Usertype:</label>
            <select
                required
                className="form-control"
                value={this.state.usertype}
                onChange={this.onChangeusertype}>
              <option value="customer">customer</option>
              <option value="vendor">vendor</option>
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}