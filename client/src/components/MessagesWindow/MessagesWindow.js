import React, { Component } from 'react';
import { connect } from "react-redux";
import Message from '../Message/Message';
import styles from './MessagesWindow.module.css';

const mapStateToProps = (state) => {
    return {
        selectedTeam: state.selectedTeam,
        selectedChannel: state.selectedChannel,
        messages: state.messages
    };
};

class MessagesWindow extends Component {

    componentDidUpdate() {
        if (Object.entries(this.props.messages).length !== 0) {
            this.newData.scrollIntoView({ behavior: "smooth" })
        }
    }

    render() {
        const teamChannelName = `${this.props.selectedTeam.name}-${this.props.selectedChannel.name}`;
        return (
            <div className={styles.messagesWindowContainer}>
                {this.props.messages[teamChannelName] && 
                this.props.messages[teamChannelName].map((messageData, index) => 
                    <div ref={(ref) => this.newData = ref}  key={index}> 
                        <Message 
                           name={messageData.user.firstName} 
                           message={messageData.message} 
                           createdAt={messageData.createdAt} 
                           key={index}
                       />
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps)(MessagesWindow);
