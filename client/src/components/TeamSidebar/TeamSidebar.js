import React, { Component } from 'react'
import { connect } from "react-redux";
import { getAllTeams, selectTeam } from "../../actions/index";
import styles from './TeamSidebar.module.css';

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTeams: (payload) => dispatch(getAllTeams(payload)),
        selectTeam: (payload) => dispatch(selectTeam(payload))
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        allTeams: state.allTeams,
        selectedTeam: state.selectedTeam
    };
};

class TeamSidebar extends Component {

    componentDidMount() {
        console.log(this.props.user)
        this.props.getAllTeams(this.props.user);
    }

    componentDidUpdate() {
        console.log(this.props.allTeams)
        console.log(this.props.selectedTeam)
        if (this.props.allTeams.length > 0 && Object.entries(this.props.selectedTeam).length === 0) {
            const firstTeam = this.props.allTeams[0];
            this.props.selectTeam(firstTeam);
        }
    }

    handleSelectTeam = (event) => {
        console.log(event.target.id);
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.allTeams.map(team => {
                        return <li className={styles.teamListItem} key={team.id} id={team.id} onClick={(event) => this.handleSelectTeam(event)}>
                            {team.name[0].toUpperCase()}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSidebar)
