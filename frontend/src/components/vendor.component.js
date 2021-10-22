import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class Vendor extends Component {
     constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id      
        }

    }

    add(e){
        this.props.history.push ({
            pathname: '/vendor/add_product/'+this.state.id
        })
    }

    list(e){
        this.props.history.push ({
            pathname: '/vendor/list/'+this.state.id
        })
    }

    dispatch(e){
        this.props.history.push ({
            pathname: '/vendor/dispatch/'+this.state.id
        })
     }
    
    dispatched(e){
        this.props.history.push ({
            pathname: '/vendor/dispatched/'+this.state.id
        })
    }
    render() {
        return (
            <div>
            <Button variant="success" onClick={(e)=>this.add(e)}> Add Product </Button>
            <Button variant="dark" onClick={(e)=>this.list(e)}> Current List of Products </Button>
            <Button variant="success" onClick={(e)=>this.dispatch(e)}> Dispatch </Button>
            <Button variant="dark" onClick={(e)=>this.dispatched(e)}> Dispatched </Button>
            </div>
        
        )
    }
}