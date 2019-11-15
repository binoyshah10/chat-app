import React, { Component } from 'react';
import { connect } from "react-redux";
import { getChannels } from "../../actions/index";
import styles from './ChannelSidebar.module.css';
import _ from 'lodash/core';

const mapDispatchToProps = (dispatch) => {
    return {
        getChannels: (payload) => dispatch(getChannels(payload)),
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        selectedTeam: state.selectedTeam,
        channels: state.channelsForTeam
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
        console.log("channels")
        console.log(this.props.channels)
    }

    handleSelectChannel = (event) => {
        console.log(event);
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
                            return <li className={styles.channel} key={channel.id} id={channel.id} onClick={(event) => this.handleSelectChannel(event)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSidebar)
