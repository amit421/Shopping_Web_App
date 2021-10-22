import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class Dispatch extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            products: []
        }
    }

    componentDidMount() {
        const Product={
                    status: 'placed'
                }
        axios.post('http://localhost:4000/products/', Product)
            .then(response => {
                this.setState ({
                    products: response.data
                });
                console.log(response.data)
            })
            .catch(function(error) {
                console.log(error);
         })
    }


    Dispatch_function(e,id)
    {
        const Product={
            vendor: id
        }
        axios.post('http://localhost:4000/products/vendor/dispatched', Product)
             .then(response => {
                const Product={
                    status: 'placed'
                }
                axios.post('http://localhost:4000/products/', Product)
                     .then(response => {
                         this.setState ({
                            products: response.data
                        });
                         console.log(response.data)
                     })
                     .catch(function(error) {
                         console.log(error);
                     })
                this.props.history.push ({
                    pathname: "/vendor/dispatch/" + this.state.id
                 })
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
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
                                    <td><Button variant="success" onClick={(e)=>this.Dispatch_function(e,this.state.id)} > Dispatch </Button> </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}