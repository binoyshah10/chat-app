import React, { Component } from 'react';
import styles from './Login.module.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitLogin } from "../../actions/index";

function mapDispatchToProps(dispatch) {
    return {
      submitLogin: loginInfo => dispatch(submitLogin(loginInfo))
    };
}


class Login extends Component {

    state = {
        emailOrUsername: '',
        password: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { emailOrUsername, password } = this.state;
        this.props.submitLogin({ emailOrUsername, password });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <h1 className={styles.loginHeader}>Log into App</h1>
                        <Link to={`/signup`}>
                            <p>Or Create Account</p>
                        </Link>
                    <form onSubmit={this.handleSubmit}>
                        <input className={styles.textInput} type="text" placeholder="Email Address or Username" name="emailOrUsername" onChange={this.handleChange}/>
                        <input className={styles.textInput} type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                        <input type="submit" value="Login"/>
                        <Link to={`/forgotpassword`}>
                            <p>{`Forgot Password?`}</p>
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Login)
