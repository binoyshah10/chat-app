import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from './MainWindow.module.css';
import { connectSocket, sendSocketMessage, getMessages } from '../../actions/index';
import MessagesWindow from '../MessagesWindow/MessagesWindow';
import MessageInput from '../MessageInput/MessageInput';

const mapDispatchToProps = (dispatch) => {
    return {
        connectSocket: () => dispatch(connectSocket()),
        sendSocketMessage: (payload) => dispatch(sendSocketMessage(payload)),
        getMessages: (payload) => dispatch(getMessages(payload))
    };
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        loading: state.loading,
        selectedTeam: state.selectedTeam,
        selectedChannel: state.selectedChannel,
        user: state.user,
    };
};

class MainWindow extends Component {

    state = {
        message: ''
    }   

    componentDidMount() {
        this.props.connectSocket();
    }

    componentDidUpdate() {
         // get messages from server
         if(Object.entries(this.props.selectedTeam).length !== 0 && Object.entries(this.props.selectedChannel).length !== 0) {
             const payload = {
                team: this.props.selectedTeam,
                channel: this.props.selectedChannel,
                user: this.props.user
            }
            this.props.getMessages(payload);
         }
    }

    render() {
        return (
            <div>
                <div className={styles.MessageWindowPosition}>
                    <MessagesWindow />
                </div>
                <MessageInput selectedTeam={this.props.selectedTeam} selectedChannel={this.props.selectedChannel} user={this.props.user}/>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainWindow));
