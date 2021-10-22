import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class Dispatched extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            products: []
        }
    }

    componentDidMount() {
        const Product={
                    status: 'dispatched'
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

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Ratings</th>
                            <th>Reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((pro,i) => {
                            return (
                                <tr>
                                    <td>{pro.name}</td>
                                    <td>{pro.price}</td>
                                    <td>{pro.ratings}</td>
                                    <td>{pro.review}</td>
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