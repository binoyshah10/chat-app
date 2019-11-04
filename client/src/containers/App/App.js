import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import { connect } from "react-redux";
import './App.css';

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/">
          {this.props.loggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/login" component={Login} />
        <Route  path="/signup" component={SignUp} />
      </Switch>
    )
  }
}

export default connect(mapStateToProps)(App);
