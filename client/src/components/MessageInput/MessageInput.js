import React, { Component } from 'react';
import { connect } from "react-redux";
import styles from './MessageInput.module.css';
import { sendSocketMessage } from '../../actions/index';

const mapDispatchToProps = (dispatch) => {
    return {
        sendSocketMessage: (payload) => dispatch(sendSocketMessage(payload)),
    };
}

class MessageInput extends Component {

    state = {
        message: ''
    }   

    handleSubmit = (event) => {
        event.preventDefault();
        const { message } = this.state;

        const payload = {
            socketChannel: 'sendMessage',
            data: {
                team: this.props.selectedTeam,
                channel: this.props.selectedChannel,
                message: message,
                user: this.props.user
            }
        }

        this.props.sendSocketMessage(payload);
        this.setState({message: ''});
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className={styles.MessageInputContainer}>
                    <input type="text" name="message" value={this.state.message} className={styles.MessageInput} placeholder="Enter a Message" onChange={this.handleChange}/> 
                </form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(MessageInput);
