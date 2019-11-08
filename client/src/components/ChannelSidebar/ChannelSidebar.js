import React, { Component } from 'react';
import styles from './ChannelSidebar.module.css';

export default class ChannelSidebar extends Component {
    render() {
        return (
            <div>
                <div className={styles.teamName}>
                    <p>{'Team Name'}</p>
                </div>

                <div className={styles.user}>
                    <p>{'User Name'}</p>
                </div>

                <div className={styles.channelsHeading}>
                    <p>{'Channels'}</p>
                    <ul>
                        <li className={styles.channel}>{'#Channel 1'}</li>
                        <li className={styles.channel}>{'#Channel 2'}</li>
                        <li className={styles.channel}>{'#Channel 3'}</li>
                        <li className={styles.channel}>{'#Channel 4'}</li>
                    </ul>
                </div>

                <div className={styles.directMessages}>
                    <p>{'Direct Messages'}</p>
                </div>
            </div>
        )
    }
}
