import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from './AddChannel.module.css';
import { addChannel, resetAddTeam } from '../../actions/index'

const mapDispatchToProps = (dispatch) => {
    return {
        addChannel: payload => dispatch(addChannel(payload)),
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
            teamName: event.target.value 
        })
    }

    handleCancel = () => {
        this.props.closeModal();
    }

    componentDidUpdate() {
        // if (Object.entries(this.props.addTeamInfo).length > 0) {
        //     const { team, channel } = this.props.addTeamInfo;
        //     this.props.resetAddTeam();
        //     this.handleCancel();
        //     this.props.selectTeam(team);
        //     this.props.history.push(`/team/${team.id}/channel/${channel.id}`);
        // }
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
