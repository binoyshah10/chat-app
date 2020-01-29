import React, { Component } from 'react'
import styles from './SignUp.module.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitSignUp } from "../../actions/index";
import Toggle from 'react-toggle';
import "react-toggle/style.css"

const mapDispatchToProps = (dispatch) => {
    return {
        submitSignUp: payload => dispatch(submitSignUp(payload))
    };
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
    };
};

class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confPassword: '',
        teamName: '',
        errors: [],
        joinNewTeam: true
    }

    handleSubmit = (event) => {
        this.setState({errors: []})
        event.preventDefault();
        const { firstName, lastName, email, username, password, confPassword, teamName, joinNewTeam } = this.state;

        if(!firstName || !lastName || !email || !username || !password || !confPassword || !teamName) {
            const errors = ['All fields are required']
            this.setState({errors})
        }
        else if(password !== confPassword) {
            const errors = ['Passwords are not matching']
            this.setState({errors})
        }
        else {
            const payload = { firstName, lastName, email, username, password, confPassword, teamName, joinNewTeam }
            this.props.submitSignUp(payload);
        }
    }

    componentDidUpdate() {
        if(this.props.loggedIn) {
            // Not wowrking cause no cookie received
            this.props.history.push('/chat')
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    handleJoinTeam = () => {
        this.setState({joinNewTeam: !this.state.joinNewTeam});
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.signUpContainer}>
                    <h1 className={styles.signUpHeader}>Create an Account</h1>
                    <div className={styles.linkWrapper}>
                        <p className={styles.link}>{`Already have an account? `}</p>
                        <Link to={`/login`}>
                            {'Log In'}
                        </Link>
                    </div>
                    <form>
                        <span>
                            <input className={styles.adjInputLeft} type="text" placeholder="First Name" name="firstName" onChange={this.handleChange}/>
                            <input className={styles.adjInputRight} type="text" placeholder="Last Name" name="lastName" onChange={this.handleChange}/>
                        </span>
                        <input className={styles.textInput} type="text" placeholder="Email Address" name="email" onChange={this.handleChange}/>
                        <input className={styles.textInput} type="text" placeholder=" Username" name="username" onChange={this.handleChange}/>
                        <input className={styles.textInput} type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                        <input className={styles.textInput} type="password" placeholder="Confirm Password" name="confPassword" onChange={this.handleChange}/>
                        <div className={styles.joinTeamContainer}>
                            <Toggle
                                id='joinTeam'
                                defaultChecked={this.state.joinNewTeam}
                                onChange={this.handleJoinTeam} 
                                icons={false}
                            />
                            <span className={styles.teamSpan}>
                                <label htmlFor='joinTeam'>{this.state.joinNewTeam === true ? 'Create new team' : 'Join existing team'}</label>
                                <input className={styles.teamInput} type="text" placeholder="Enter team name" name="teamName" onChange={this.handleChange}/>
                            </span>
                        </div>
                        
                        <input type="button" value="Sign Up" onClick={this.handleSubmit}/>
                        {this.state.errors.map(error => (<p className={styles.error} key={error}>Error: {error}</p>))}
                        <Link to={`/forgotpassword`}>
                            <p className={styles.linkWrapper}>{`Forgot Password?`}</p>
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
