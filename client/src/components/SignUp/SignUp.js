import React, { Component } from 'react'
import styles from './SignUp.module.css';
import { Link } from "react-router-dom";

export default class SignUp extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <h1 className={styles.loginHeader}>Create an Account</h1>
                    <div className={styles.linkWrapper}>
                        <p className={styles.link}>{`Already have an account? `}</p>
                        <Link to={`/login`}> 
                            <p className={styles.link}>{`Log In`}</p>
                        </Link>
                    </div>
                    <form>
                        <span>
                            <input className={styles.adjInputLeft} type="text" placeholder="First Name" name="firstname"/>
                            <input className={styles.adjInputRight} type="text" placeholder="Last Name" name="lastname"/>
                        </span>
                        <input className={styles.textInput} type="text" placeholder="Email Address" name="email"/>
                        <input className={styles.textInput} type="text" placeholder=" Username" name="username"/>
                        <input className={styles.textInput} type="password" placeholder="Password" name="password"/>
                        <input className={styles.textInput} type="password" placeholder="Confirm Password" name="confPassword"/>
                        <input type="button" value="Login"/>
                        <Link to={`/forgotpassword`}>
                            <p>{`Forgot Password?`}</p>
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}
