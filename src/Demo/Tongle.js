import React, { Component } from 'react'
class Tongle extends Component {
    constructor(props) {
        super(props)
        this.state = { isTongle: true }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState(state => ({
            isTongle: !state.isTongle


        }))
    }
    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isTongle ? 'ON' : 'OFF'}
            </button>
        );
    }
}
export default Tongle
