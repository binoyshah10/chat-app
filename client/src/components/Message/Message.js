import React, { Component } from 'react';
import styles from './Message.module.css';

export default class Message extends Component {
    render() {

        let date = new Date(Date.parse(this.props.createdAt));
        date =  date.getHours() + ":"  
                + date.getMinutes() + "  " 
                + (date.getMonth()+1)  + "/" 
                + date.getDate() + "/"
                + date.getFullYear();
               

        return (
            <div className={styles.messageContainer}>
                <span className={styles.top}>
                    <div className={styles.user}>
                        {`${this.props.name}`}
                    </div>
                    <div className={styles.time}>
                        {`${date}`}
                    </div>
                </span>
                <span className={styles.message}>{`${this.props.message}`}</span>
            </div>
        )
    }
}
