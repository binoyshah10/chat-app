import React from 'react';
import styles from './Message.module.css';

export default function Message(props) {
   
    let date = new Date(Date.parse(props.createdAt));
    date =  formatAMPM(date) + " "
            + (date.getMonth()+1)  + "/" 
            + date.getDate() + "/"
            + date.getFullYear().toString().substring(2,4);
            

    return (
        <div className={styles.messageContainer}>
            <span className={styles.top}>
                <div className={styles.user}>
                    {`${props.name}`}
                </div>
                <div className={styles.time}>
                    {`${date}`}
                </div>
            </span>
            <span className={styles.message}>{`${props.message}`}</span>
        </div>
    )
}

const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


