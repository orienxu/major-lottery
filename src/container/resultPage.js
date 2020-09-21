import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import Res from '../config/image';
import './App.css';
import {motion} from 'framer-motion'

export default class ResultPage extends Component {

    constructor() {
        super();
        this.state = {
            isFlipped: false,
            apiResponse: 'Node failed',
        };
    }

    renderContent() {
        return (
            <motion.div
                animate={{backgroundColor: ["#5C6FB2", "#D29C9C", "#2F75A7"]}}
                transition={{duration:10, yoyo:Infinity}}
                style={styles.contentMain}
            >
                <motion.img
                    initial={styles.initalStyle}
                    animate={{y: -100}} 
                    src={Res.subjectFoster} style={{ width: '30vmin', alignSelf: 'center', marginTop: '20vmin' }} />
                <div>
                    <motion.img
                    initial={styles.initalStyle}
                    animate={{x: 100, y: 180}}
                     src={Res.subjectFoster} style={{ width: '30vmin', margin: '10vmin' }} />
                    <motion.img
                    initial={styles.initalStyle}
                    animate={{x: -100, y: 180}}
                     src={Res.subjectFoster} style={{ width: '30vmin', margin: '10vmin' }} />
                </div>

                <div
                    style={styles.box}
                >
                    <h2 style={styles.rec}>
                        再抽一次
                    </h2>
                    <h2 style={styles.rec}>
                        &#12288;分享&#12288;
                    </h2>
                </div>
            </motion.div>
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
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#FEF5DD',
    },
    contentTitle: {
        marginLeft: '3vmin',
        marginTop: '1vmin',
    },
    contentPersonnel: {
        width: '100vmin',
        flexDirection: 'column',
    },
    box: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    rec: {
        backgroundColor: '#C4C4C4',
        borderRadius: '2vmin',
        margin: '10vmin',
        width: '30vmin',
    },
    initalStyle: {
        position: "absolute",
        top:0,
        bottom: 0,
        left: 0,
        right: 0,            
        margin: "auto"
    },
}

