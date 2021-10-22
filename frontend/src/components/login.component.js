import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeemail = this.onChangeemail.bind(this)
    this.onChangepassword = this.onChangepassword.bind(this)
    this.onChangeusertype = this.onChangeusertype.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      email: '',
      password: '',
      usertype: 'customer',
    }
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
  
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      usertype: this.state.usertype,
    }

    console.log(newUser)
    axios.post('http://localhost:4000/users/login',newUser)
      .then(resp => {
        console.log(resp.data)
         if(Object.entries(resp.data).length === 1)
         {
             if(resp.data[0].usertype === "vendor")
             {
                this.props.history.push({
                  pathname : '/vendor/'+resp.data[0]._id

                })
             }
            else
            {
              this.props.history.push({
                  pathname : '/customer/'+resp.data[0]._id

                })
            }
        }
     });

    this.setState({
      email: '',
      password: '',
      usertype: 'customer',
    })
}
  render() {
    return (
      <div>
        <h3>Log In </h3>
        <form onSubmit={this.onSubmit}>
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
            <label>Type:</label>
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
            <input type="submit" value="Sign In" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}