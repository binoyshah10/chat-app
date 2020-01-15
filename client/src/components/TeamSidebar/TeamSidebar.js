import React, { Component } from 'react'
import { connect } from "react-redux";
import { getAllTeams, selectTeam, getChannels, selectChannel } from "../../actions/index";
import { withRouter } from "react-router";
import styles from './TeamSidebar.module.css';
import _ from 'lodash/core';

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTeams: (payload) => dispatch(getAllTeams(payload)),
        selectTeam: (payload) => dispatch(selectTeam(payload)),
        getChannels: (payload) => dispatch(getChannels(payload)),
        selectChannel: (payload) => dispatch(selectChannel(payload)),
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        allTeams: state.allTeams,
        selectedTeam: state.selectedTeam,
        channels: state.channelsForTeam,
        selectedChannel: state.selectedChannel
    };
};

class TeamSidebar extends Component {

    state = {
        selectedTeam: {},
        channels: {}
    }

    componentDidMount() {
        console.log(this.props.user)
        this.props.getAllTeams(this.props.user);
    }

    componentDidUpdate() {
        if (this.props.allTeams.length > 0 && Object.entries(this.props.selectedTeam).length === 0) {
            const firstTeam = this.props.allTeams[0];
            // this.props.selectTeam(firstTeam);
            this.setState({ selectedTeam: firstTeam });
            this.handleSelectTeam(firstTeam);
        }

        if(Object.entries(this.props.selectedTeam).length !== 0 && !_.isEqual(this.state.selectedTeam, this.props.selectedTeam)) {
            this.setState({selectedTeam: this.props.selectedTeam});
            this.props.getChannels(this.props.selectedTeam)
        }

        if (this.props.channels.length > 0 && !_.isEqual(this.state.channels, this.props.channels)) {
            this.setState({ channels: this.props.channels });
            const firstChannel = this.props.channels[0];
            this.props.selectChannel(firstChannel);
            this.props.history.push(`/team/${this.props.selectedTeam.id}/channel/${firstChannel.id}`);
        }
    }

    handleSelectTeam = (team) => {
        this.props.selectTeam(team);
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.allTeams.map(team => {
                        return <li className={styles.teamListItem} key={team.id} onClick={() => this.handleSelectTeam(team)}>
                            {team.name[0].toUpperCase()}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamSidebar));
