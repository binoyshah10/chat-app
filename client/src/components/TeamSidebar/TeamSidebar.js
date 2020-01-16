import React, { Component } from 'react'
import { connect } from "react-redux";
import { getAllTeams, selectTeam, getChannels, selectChannel } from "../../actions/index";
import { withRouter } from "react-router";
import styles from './TeamSidebar.module.css';
import _ from 'lodash/core';
import { MdAdd } from 'react-icons/md';
import ReactModal from 'react-modal';
import AddTeam from '../AddTeam/AddTeam';

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
        channels: {},
        isOpen: false
    }

    componentDidMount() {
        console.log(this.props.user)
        this.props.getAllTeams(this.props.user);
        ReactModal.setAppElement('body')
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

    handleAddTeam = () => {
        this.setState({ isOpen: true })
    }

    closeModal = () => {
        this.setState({ isOpen: false })
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
                    <li className={styles.teamListItem} onClick={this.handleAddTeam}>
                        <MdAdd />
                    </li>
                    <ReactModal 
                        isOpen={this.state.isOpen}
                        onRequestClose={this.closeModal}
                        // className={styles.addTeamModal}
                        // overlayClassName={styles.modalOverlay}

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
                              marginLeft: '400px',
                              marginRight: '400px',
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
                        <AddTeam closeModal={this.closeModal}/>
                    </ReactModal>
                </ul>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamSidebar));
