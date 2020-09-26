import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import Res from '../config/image';
import './App.css';
import { motion } from 'framer-motion'

export default class ResultPage extends Component {

    constructor() {
        super();
        this.state = {
            isFlipped1: false,
            isFlipped2: false,
            isFlipped3: false,
            apiResponse: 'Node failed',
        };
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);

    }

    card1 = (img) => {
        return (
            <ReactCardFlip
                isFlipped={this.state.isFlipped1}
                flipDirection="horizontal"
                className="CardContainer"
            >
                <div>
                    <img src={Res.cardBack} className="App-logo" alt="logo" onClick={this.handleClick1} />
                </div>
                <div>
                    <img src={Res[img]} className="App-logo" alt="logo" onClick={this.handleClick1} />
                </div>
            </ReactCardFlip>
        );
    }

    card2 = (img) => {
        return (
            <ReactCardFlip
                isFlipped={this.state.isFlipped2}
                flipDirection="horizontal"
                className="CardContainer"
            >
                <div>
                    <img src={Res.cardBack} className="App-logo" alt="logo" onClick={this.handleClick2} />
                </div>
                <div>
                    <img src={Res[img]} className="App-logo" alt="logo" onClick={this.handleClick2} />
                </div>
            </ReactCardFlip>
        );
    }

    card3 = (img) => {
        return (
            <ReactCardFlip
                isFlipped={this.state.isFlipped3}
                flipDirection="horizontal"
                className="CardContainer"
            >
                <div>
                    <img src={Res.cardBack} className="App-logo" alt="logo" onClick={this.handleClick3} />
                </div>
                <div>
                    <img src={Res[img]} className="App-logo" alt="logo" onClick={this.handleClick3} />
                </div>
            </ReactCardFlip>
        );
    }

    handleClick1(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped1: !prevState.isFlipped1 }));
    }
    handleClick2(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped2: !prevState.isFlipped2 }));
    }
    handleClick3(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped3: !prevState.isFlipped3 }));
    }

    renderContent() {
        return (
            <div style={styles.content}>
                <div
                    style={{
                        width: '100vmin',
                        height: '60vh',
                    }}
                >
                    <motion.div
                        animate={{
                            y: -150,
                        }}
                        style={styles.initalStyle}
                    >
                        {this.card1('subjectFoster')}
                    </motion.div>
                    <div
                        style={{
                            display: 'flex', flexDirection: 'row', width: '100vmin', alignContent: 'center', marginTop: '5vh'
                        }}
                    >
                        <motion.div
                            animate={{
                                x: -80,
                                y: 50,
                            }}
                            style={styles.initalStyle}
                        >
                            {this.card2('subjectFoster')}
                        </motion.div>
                        <motion.div
                            animate={{
                                x: 80,
                                y: 50,
                            }}
                            style={styles.initalStyle}

                        >
                            {this.card3('subjectFoster')}
                        </motion.div>
                    </div>
                </div>
            </div >
        );
    }

    renderBottom() {
        return (
            <div style={styles.box}>
                <h2 style={styles.rec}>
                    再抽一次
            </h2>
                <h2 style={styles.rec}>
                    &#12288;分享&#12288;
            </h2>
            </div>
        );
    }


    render() {
        return (
            <div style={styles.main}>
                <motion.div
                    animate={{ backgroundColor: ["#5C6FB2", "#D29C9C", "#2F75A7"] }}
                    transition={{ duration: 10, yoyo: Infinity }}
                    style={styles.contentMain}
                >
                    {this.renderContent()}
                    {this.renderBottom()}
                </motion.div>
            </ div>
        );
    }

}

const styles = {
    main: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FEFA5DD',
    },
    contentMain: {
        justifyContent: 'space-around',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
        overflow: 'hidden',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        paddingTop: '10vh',
    },
    box: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '10vh'
    },
    rec: {
        backgroundColor: '#C4C4C4',
        borderRadius: '2vmin',
        margin: '10vmin',
        width: '30vmin',
    },
    initalStyle: {
        position: "absolute",
        top: '40vh',
        left: '34vmin',
        margin: "auto",
        overflow: 'hidden',
    },
}

