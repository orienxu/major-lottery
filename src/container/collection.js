import React, { Component } from 'react';
import Res from '../config/image';
import './App.css';


export default class CollectionPage extends Component {

    constructor() {
        super();
    }

    renderContent() {
        return (
            <div
                style={styles.contentMain}
            >
                <h2 style={styles.contentTitle}>我的卡片</h2>
                <div style={styles.box}>
                    <img src={Res.subjectFoster} style={styles.img} />
                    <h2 style={styles.majorName}>Applied and Computational Math Science</h2>
                </div>
                <div style={styles.box}>
                    <img src={Res.subjectFoster} style={styles.img} />
                    <h2 style={styles.majorName}>CSE</h2>
                </div>
                <div style={styles.box}>
                    <img src={Res.subjectFoster} style={styles.img} />
                    <h2 style={styles.majorName}>M E</h2>
                </div>

            </div>
        );
    }

    render() {
        return (
            <div className="App">
                {this.renderContent()}
            </div>
        );
    }

}

const styles = {
    topMain: {
        width: '100%',
        height: '12vmin',
        backgroundColor: '#B9A9D9',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentMain: {
        justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#FCF4D9',
    },
    contentTitle: {
        marginLeft: '3vmin',
        marginTop: '1.3vmin',
        marginBottom: '0vmin',
        fontFamily: 'PingFang SC',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '4vh',
        lineHeight: '5.6vh',
        color: '#000000',
    },
    contentPersonnel: {
        width: '100vmin',
        flexDirection: 'column',
    },
    box: {
        width: '90vw',
        margin: '1.8vw',
        padding: '3vw',
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 221, 155, 0.72)',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '28px',
    },
    img: {
        width: '40vmin',
        filter: 'drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))',
    },
    majorName: {
        marginLeft: '3vmin',
        fontFamily: 'Annie Use Your Telescope',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '3.4vh',
        lineHeight: '4.8vh',
    }
}

