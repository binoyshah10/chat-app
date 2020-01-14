import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        return (
            <div>
                {`Name: ${this.props.name} Message: ${this.props.message}`}
            </div>
        )
    }
}
