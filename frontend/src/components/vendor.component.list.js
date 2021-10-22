import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class List_Product extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            products: []
        }
    }

    componentDidMount() {
        const Product={
            vendor: this.state.id,
            status: 'waiting'
        }
        axios.post('http://localhost:4000/products/vendor', Product)
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

    Cancel_function(e,name,price,quantity,id)
    {
        const Product={
            vendor: id,
            name: name,
            price: price,
            quantity: quantity,
            status: 'waiting'
        }
        axios.post('http://localhost:4000/products/vendor/cancel', Product)
             .then(response => {
                const Product={
                    vendor: this.state.id,
                    status: 'waiting'
                }
                axios.post('http://localhost:4000/products/vendor', Product)
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
                    pathname: "/vendor/list/" + this.state.id
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
                                    <td><Button variant="danger" onClick={(e)=>this.Cancel_function(e,pro.name,pro.price,pro.quantity,this.state.id)} > Delete </Button> </td>
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