import React, { Component } from 'react'
import styles from './SignUp.module.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitSignUp } from "../../actions/index";

const mapDispatchToProps = (dispatch) => {
    return {
        submitSignUp: payload => dispatch(submitSignUp(payload))
    };
}

class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confPassword: '',
        errors: []
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { firstName, lastName, email, username, password, confPassword } = this.state;

        if(!firstName || !lastName || !email || !username || !password || !confPassword) {
            const errors = ['All fields are required']
            this.setState({errors})
        }
        else if(password !== confPassword) {
            const errors = ['Passwords are not matching']
            this.setState({errors})
        }
        else {
            const payload = { firstName, lastName, email, username, password, confPassword }
            this.props.submitSignUp(payload);
        }
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
                    <h1 className={styles.loginHeader}>Create an Account</h1>
                    <div className={styles.linkWrapper}>
                        <p className={styles.link}>{`Already have an account? `}</p>
                        <Link to={`/login`}> 
                            <p className={styles.link}>{`Log In`}</p>
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
                        <input type="button" value="Sign Up" onClick={this.handleSubmit}/>
                        <div value="aaaa"></div>
                        {this.state.errors.map(error => (<p className={styles.error} key={error}>Error: {error}</p>))}
                        <Link to={`/forgotpassword`}>
                            <p>{`Forgot Password?`}</p>
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(SignUp)
