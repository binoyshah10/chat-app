import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from './AddTeam.module.css';
import { addTeam } from '../../actions/index'

const mapDispatchToProps = (dispatch) => {
    return {
        addTeam: payload => dispatch(addTeam(payload))
    };
}

const mapStateToProps = (state) => {
    return {
        selectedTeam: state.selectedTeam,
        selectedChannel: state.selectedChannel,
        user: state.user
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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1 className={styles.header}>{`Create a New Team`}</h1>
                    <input className={styles.teamInput} type="text" placeholder="Team Name" name="teamName" onChange={this.handleChange}/>
                    <div className={styles.buttonContainer}>
                        <input className={styles.cancelButton} type="button" value="Cancel" onClick={this.handleCancel}/>
                        <input className={styles.createButton} type="submit" value="Create Channel"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTeam));
