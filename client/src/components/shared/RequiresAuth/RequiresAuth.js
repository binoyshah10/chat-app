import React, { Component } from 'react';
import { connect } from 'react-redux';  
import Loading from '../Loading/Loading'
import Login from '../../Login/Login';

export default function RequiresAuth(ComposedComponent) {  
  class Authenticate extends Component {

    render() {
        return (
            <div>
                {
                    this.props.loading ? <Loading /> : this.props.loggedIn ? <ComposedComponent {...this.props} /> : <Login />
                }
            </div>
        )
    }
  }

  const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        loading: state.loading
    };
  };

  return connect(mapStateToProps)(Authenticate);
}
