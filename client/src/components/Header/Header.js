import React, { Component } from 'react';
import { connect } from "react-redux";
import styles from './Header.module.css';



const mapDispatchToProps = (dispatch) => {
    return {
    };
}

const mapStateToProps = (state) => {
    return {
        selectedChannel: state.selectedChannel
    };
};


class Header extends Component {
    render() {
        return (
            <div>
                <div className={styles.channelHeader}>
                  {`#${this.props.selectedChannel.name}`}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
