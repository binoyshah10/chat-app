import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from './AddTeam.module.css';
import { addTeam, resetAddTeam, selectTeam } from '../../actions/index'

const mapDispatchToProps = (dispatch) => {
    return {
        addTeam: payload => dispatch(addTeam(payload)),
        resetAddTeam: () => dispatch(resetAddTeam()),
        selectTeam: (payload) => dispatch(selectTeam(payload)),
    };
}

const mapStateToProps = (state) => {
    return {
        selectedTeam: state.selectedTeam,
        selectedChannel: state.selectedChannel,
        user: state.user,
        addTeamInfo: state.addTeam
    };
};

class AddTeam extends Component {

    state = {
       teamName: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { teamName }= this.state;
        const payload = { teamName, user: this.props.user };
        this.props.addTeam(payload);
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
        if (Object.entries(this.props.addTeamInfo).length > 0) {
            const { team, channel } = this.props.addTeamInfo;
            this.props.resetAddTeam();
            this.handleCancel();
            this.props.selectTeam(team);
            this.props.history.push(`/team/${team.id}/channel/${channel.id}`);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1 className={styles.header}>{`Create a New Team`}</h1>
                    <input className={styles.teamInput} type="text" placeholder="Team Name" name="teamName" onChange={this.handleChange}/>
                    <div className={styles.buttonContainer}>
                        <input className={styles.cancelButton} type="button" value="Cancel" onClick={this.handleCancel}/>
                        <input className={styles.createButton} type="submit" value="Create Team"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTeam));
