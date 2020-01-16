import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import { connect } from "react-redux";
import './App.css';
import { checkLoggedIn } from '../../actions/index';
import Chat from '../Chat/Chat';
import RequiresAuth from '../../components/shared/RequiresAuth/RequiresAuth';
import Loading from '../../components/shared/Loading/Loading';

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkLoggedIn: () => dispatch(checkLoggedIn())
  };
}

class App extends Component {

  componentDidMount() {
    this.props.checkLoggedIn();
  }


  render() {
    return (
      <Switch>
        <Route exact path="/" >
          <Redirect to="/login" />
        </Route>
        <Route exact path="/chat" component={RequiresAuth(Chat)} />
        <Route exact path="/team/:teamId/channel/:channelId" component={RequiresAuth(Chat)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/loading" component={Loading} />
      </Switch>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
