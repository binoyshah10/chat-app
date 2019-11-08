import React, { Component } from 'react'
import styles from './Chat.module.css';
import ChannelSidebar from '../../components/ChannelSidebar/ChannelSidebar';
import Header from '../../components/Header/Header';
import MainWindow from '../../components/MainWindow/MainWindow';
import TeamSidebar from '../../components/TeamSidebar/TeamSidebar';

export default class Chat extends Component {
    render() {
        return (
            <div className={styles.gridContainer}>
                <div className={styles.header}>
                    <Header />
                </div>
                
                <div className={styles.teamSidebar}>
                   <TeamSidebar />
                </div>

                <div className={styles.channelSidebar}>
                   <ChannelSidebar />
                </div>


                <div className={styles.main}>
                    <MainWindow />
                </div>

            </div>
        )
    }
}
