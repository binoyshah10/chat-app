import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getChannels, selectChannel, sendSocketMessage } from "../../actions/index";
import styles from './ChannelSidebar.module.css';
import _ from 'lodash/core';

const mapDispatchToProps = (dispatch) => {
    return {
        getChannels: (payload) => dispatch(getChannels(payload)),
        selectChannel: (payload) => dispatch(selectChannel(payload)),
        sendSocketMessage: (payload) => dispatch(sendSocketMessage(payload))
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        selectedTeam: state.selectedTeam,
        channels: state.channelsForTeam,
        selectedChannel: state.selectedChannel
    };
};


class ChannelSidebar extends Component {

    state = {
        selectedTeam: {}
    }

    componentDidUpdate() {
        if(Object.entries(this.props.selectedTeam).length !== 0 && !_.isEqual(this.state.selectedTeam, this.props.selectedTeam)) {
            this.setState({selectedTeam: this.props.selectedTeam});
            this.props.getChannels(this.props.selectedTeam)
        }

        if (this.props.channels.length > 0 && Object.entries(this.props.selectedChannel).length === 0) {
            const firstChannel = this.props.channels[0];
            // this.props.selectChannel(firstChannel);
            this.handleSelectChannel(firstChannel);
        }
    }

    handleSelectChannel = (channel) => {
        this.props.selectChannel(channel);

        const payload = {
            socketChannel: 'setTeamChannel',
            data: {
                team: this.props.selectedTeam,
                channel: channel
            }
        }

        this.props.sendSocketMessage(payload);
        this.props.history.push(`/team/${this.props.selectedTeam.id}/channel/${channel.id}`);
    }

    render() {
        return (
            <div>
                <div className={styles.teamName}>
                    <p>{this.props.selectedTeam.name}</p>
                </div>

                <div className={styles.user}>
                    <p>{this.props.user.firstName + ' ' + this.props.user.lastName}</p>
                </div>

                <div className={styles.channelsHeading}>
                    <p>{'Channels'}</p>
                    <ul>
                        {this.props.channels.map(channel => {
                            return <li className={styles.channel} key={channel.id} onClick={() => this.handleSelectChannel(channel)}>
                                {`#${channel.name}`}
                             </li>
                        })}
                    </ul>
                </div>

                <div className={styles.directMessages}>
                    <p>{'Direct Messages'}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelSidebar));
