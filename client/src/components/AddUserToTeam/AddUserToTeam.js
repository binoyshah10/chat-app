import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from './AddUserToTeam.module.css';
import { addUsersToTeam, resetAddUsersToTeam } from '../../actions/index'
import AsyncSelect from 'react-select/async';
import axios from 'axios';
axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const mapDispatchToProps = (dispatch) => {
    return {
        addUsersToTeam: (payload) => dispatch(addUsersToTeam(payload)),
        resetAddUsersToTeam: () => dispatch(resetAddUsersToTeam())
    };
}

const mapStateToProps = (state) => {
    return {
        selectedTeam: state.selectedTeam,
        addUsersToTeamCompleted: state.addUsersToTeamCompleted
    };
};

class AddUserToTeam extends Component {

    state = {
       selectedOptions: null,
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const users = this.state.selectedOptions.map(user => {
            return {email: user.value} 
        })
        const payload = { users, team: this.props.selectedTeam }
        this.props.addUsersToTeam(payload)
    }

    handleChange = (event) => {
        this.setState({
            channelName: event.target.value 
        })
    }

    handleCancel = () => {
        this.props.closeModal();
    }

    handleChangeSelect = selectedOptions => {
        this.setState({ selectedOptions });
    }

    promiseOptions = inputValue => {
        return new Promise(resolve => {
            axios.get(`${API_BASE}/searchUser`, {
                params: {
                    userName: inputValue
                }
            }).then(response => resolve(response.data))
    })}

    componentDidUpdate() {
        // Reset addUsersToTeamCompleted in global 
        // store to close modal
        if (this.props.addUsersToTeamCompleted) { 
            this.props.resetAddUsersToTeam();
            this.props.closeModal();
        }
    }

    render() {
        return (
            <div>
                <form>
                    <h1 className={styles.header}>{`Add users to your team`}</h1>
                    <AsyncSelect
                        value={this.state.selectedOptions}
                        onChange={this.handleChangeSelect}
                        loadOptions={this.promiseOptions}
                        isMulti={true}
                        className={styles.userInput}
                        placeholder="Search for users"

                    />
                    <div className={styles.buttonContainer}>
                        <input className={styles.cancelButton} type="button" value="Cancel" onClick={this.handleCancel}/>
                        <input className={styles.createButton} type="button" value="Add User" onClick={this.handleSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddUserToTeam));
