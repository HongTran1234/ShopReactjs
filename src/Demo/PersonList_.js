import React, { Component } from 'react'
import axios from 'axios'
class PersonList_ extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.setState({ name: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault()
        const user = {
            name: this.state.name
        }
        axios.post('http://jsonplaceholder.typicode.com/users', { user })
            .then(res => {
                console.log(res)
                console.log(res.data)
            })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Person Name:
                        <input type="text" name="name" onChange={this.handleChange}></input>

                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
export default PersonList_
// this.setState({ files: [...this.state.files, ...e.target.files] })
// let product = this.state.product
// product = product.filter(item => item.id !== id);
// this.setState({ product: !this.state.product });