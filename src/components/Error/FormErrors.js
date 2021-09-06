import React, { Component } from 'react'
class FormErrors extends Component {
    renderErrors() {
        let formError = this.props.formError
        if (Object.keys(formError).length > 0) {
            return Object.keys(formError).map((key, i) => {
                return (
                    <p key={i}>{formError[key]}</p>
                )
            })
        }
    }
    render() {

        return (
            <div className='errorForm'>
                {this.renderErrors()}
            </div>
        );
    }
}

export default FormErrors