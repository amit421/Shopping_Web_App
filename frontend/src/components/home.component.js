import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

export default class Home extends Component {

	constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

	componentDidMount() {
        axios.post('http://localhost:4000/users/all')
             .then(response => {
                this.setState ({
                    users: response.data
                });
                console.log(response.data)
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

  render() {
    return (
    	<div>
			<div className="container">
				<div className="jumbotron mt-5">
					<div className="col-sm-8 mx-auto">
						<h1 className="text-center">WELCOME</h1>
					</div>
				</div>
			</div>
		    <div className="container">
			    <table className="table table-striped">
			    	<thead>
			            <tr>
			                <th>Name</th>
			                <th>Email</th>
			                <th>Type</th>
			            </tr>
			        </thead>
			        <tbody>
			        { 
			            this.state.users.map((use,i) => {
			                return (
			                    <tr>
			                        <td>{use.name}</td>
			                        <td>{use.email}</td>
			                        <td>{use.usertype}</td>
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

