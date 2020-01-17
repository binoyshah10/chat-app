import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from './AddChannel.module.css';
import { addChannel, selectChannel, resetAddChannel } from '../../actions/index'

const mapDispatchToProps = (dispatch) => {
    return {
        addChannel: payload => dispatch(addChannel(payload)),
        selectChannel: (payload) => dispatch(selectChannel(payload)),
        resetAddChannel: () => dispatch(resetAddChannel()),
    };
}

const mapStateToProps = (state) => {
    return {
        selectedTeam: state.selectedTeam,
        user: state.user,
        addChannelInfo: state.addChannel
    };
};

class AddChannel extends Component {

    state = {
       channelName: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { channelName }= this.state;
        const payload = { channelName, team: this.props.selectedTeam, user: this.props.user };
        this.props.addChannel(payload);
    }

    handleChange = (event) => {
        this.setState({
            channelName: event.target.value 
        })
    }

    handleCancel = () => {
        this.props.closeModal();
    }

    componentDidUpdate() {
        if (Object.entries(this.props.addChannelInfo).length > 0) {
            const { channel } = this.props.addChannelInfo;
            this.props.resetAddChannel();
            this.handleCancel();
            this.props.selectChannel(channel);
            this.props.history.push(`/team/${this.props.selectedTeam.id}/channel/${channel.id}`);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1 className={styles.header}>{`Create a New Channel`}</h1>
                    <input className={styles.channelInput} type="text" placeholder="Channel Name" name="channelName" onChange={this.handleChange}/>
                    <div className={styles.buttonContainer}>
                        <input className={styles.cancelButton} type="button" value="Cancel" onClick={this.handleCancel}/>
                        <input className={styles.createButton} type="submit" value="Create Channel"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddChannel));
