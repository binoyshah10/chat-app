import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getChannels, selectChannel, sendSocketMessage } from "../../actions/index";
import styles from './ChannelSidebar.module.css';
import _ from 'lodash/core';
import { MdAddCircleOutline } from 'react-icons/md';
import ReactModal from 'react-modal';
import AddChannel from '../AddChannel/AddChannel';

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
        selectedTeam: {},
        channel: {},
        isOpen: false
    }

    componentDidUpdate() {
        if(Object.entries(this.props.selectedTeam).length !== 0 && !_.isEqual(this.state.selectedTeam, this.props.selectedTeam)) {
            this.setState({selectedTeam: this.props.selectedTeam});
            this.props.getChannels(this.props.selectedTeam)
        }

        if (this.props.channels.length > 0 && Object.entries(this.props.selectedChannel).length === 0) {
            const firstChannel = this.props.channels[0];
            // this.props.selectChannel(firstChannel);
            this.setState({ channel: firstChannel });
            this.handleSelectChannel(firstChannel);
        }

        if(!_.isEqual(this.state.channel, this.props.selectedChannel)) {
            this.setState({ channel: this.props.selectedChannel });
            this.handleSelectChannel(this.props.selectedChannel);
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

    addChannel = () => {
        this.setState({ isOpen: true });
    }

    closeModal = () => {
        this.setState({ isOpen: false });
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

                <div >
                    <div className={styles.channelsHeading}>
                        {'Channels'}
                        <div className={styles.channelAdd} onClick={this.addChannel}>
                            <MdAddCircleOutline />
                        </div>
                    </div>
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

                <ReactModal 
                        isOpen={this.state.isOpen}
                        onRequestClose={this.closeModal}
                        style={{
                            overlay: {
                              position: 'fixed',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: 'rgba(0, 0, 0, 0.75)'
                            },
                            content: {
                              position: 'absolute',
                              marginTop: '150px',
                              marginLeft: '20%',
                              marginRight: '20%',
                              marginBottom: '200px',
                              border: '1px solid #ccc',
                              background: '#fff',
                              overflow: 'auto',
                              WebkitOverflowScrolling: 'touch',
                              borderRadius: '4px',
                              outline: 'none',
                              height: '200px',
                            }
                          }}
                    >
                        <AddChannel closeModal={this.closeModal}/>
                    </ReactModal>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelSidebar));
