import React, { Component } from 'react';
import styles from './Login.module.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitLogin } from "../../actions/index";
import { withRouter } from "react-router";

const mapDispatchToProps = (dispatch) => {
    return {
        submitLogin: payload => dispatch(submitLogin(payload))
    };
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        loggedOut: state.loggedOut,
        loading: state.loading,
        selectedTeam: state.selectedTeam,
        selectedChannel: state.selectedChannel
    };
};


class Login extends Component {

    state = {
        emailOrUsername: '',
        password: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { emailOrUsername, password } = this.state;
        const payload = { emailOrUsername, password }
        this.props.submitLogin(payload);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    componentDidMount() {
        if(this.props.loggedIn) {
            this.props.history.push('/chat')
        } else if (this.props.loggedOut && this.props.location.pathname !== '/login'){
            this.props.history.push('/login')
        }
    }

    componentDidUpdate() {
        if(this.props.loggedIn) {
            this.props.history.push('/chat')
        } else if (this.props.loggedOut && this.props.location.pathname !== '/login'){
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <h1 className={styles.loginHeader}>Log into Chat App</h1>
                        <Link to={`/signup`}>
                            <p className={styles.text}>{`Or Create Account`}</p>
                        </Link>
                    <form onSubmit={this.handleSubmit}>
                        <input className={styles.textInput} type="text" placeholder="Email Address or Username" name="emailOrUsername" onChange={this.handleChange}/>
                        <input className={styles.textInput} type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                        <input type="submit" value="Login"/>
                        <Link to={`/forgotpassword`}>
                            <p className={styles.text}>{`Forgot Password?`}</p>
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
