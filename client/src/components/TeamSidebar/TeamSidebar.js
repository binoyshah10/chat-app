import React, { Component } from 'react'
import { connect } from "react-redux";
import { getAllTeams, selectTeam } from "../../actions/index";

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
        if (this.props.allTeams.length > 0 && this.props.selectedTeam === '') {
            const firstTeam = this.props.allTeams[0];
            this.props.selectTeam(firstTeam);
        }
    }

    render() {
        return (
            <div>
                Hello
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSidebar)
