import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import Res from '../config/image';
import './App.css';
import ServerConfig from '../config/ServerConfig';
import { motion } from 'framer-motion'

export default class ResultPage extends Component {

    constructor() {
        super();
        this.state = {
            isFlipped1: false,
            isFlipped2: false,
            isFlipped3: false,
            apiResponse: 'Node failed',
            cardResult: ['cardBack', 'cardBack', 'cardBack'],
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
        //this.setState(prevState => ({ isFlipped1: !prevState.isFlipped1 }));
        this.setState(prevState => ({ isFlipped1: true }));
    }
    handleClick2(e) {
        e.preventDefault();
        //this.setState(prevState => ({ isFlipped2: !prevState.isFlipped2 }));
        this.setState(prevState => ({ isFlipped2: true }));
    }
    handleClick3(e) {
        e.preventDefault();
        //this.setState(prevState => ({ isFlipped3: !prevState.isFlipped3 }));
        this.setState(prevState => ({ isFlipped3: true }));
    }

    renderContent(cards) {
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
                            y: -180,
                        }}
                        style={styles.initalStyle}
                    >
                        {this.card1(cards[0])}
                    </motion.div>
                    <div
                        style={{
                            display: 'flex', flexDirection: 'row', width: '100vmin', alignContent: 'center', marginTop: '5vh'
                        }}
                    >
                        <motion.div
                            animate={{
                                x: -100,
                                y: 70,
                            }}
                            style={styles.initalStyle}
                        >
                            {this.card2(cards[1])}
                        </motion.div>
                        <motion.div
                            animate={{
                                x: 100,
                                y: 70,
                            }}
                            style={styles.initalStyle}

                        >
                            {this.card3(cards[2])}
                        </motion.div>
                    </div>
                </div>
            </div >
        );
    }

    renderBottom() {
        return (
            <div style={styles.box}>
                <button style={styles.rec}>
                    再抽一次
            </button>
                <button style={styles.rec}>
                    &#12288;分享&#12288;
            </button>
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

    componentDidMount() {  
        this.generateNewCard()        
    }

    async generateNewCard() {
        //let username = this.props.loggedInUser
        let username = "weifeng"
        if (username !== null && username !== "") {
            fetch(ServerConfig.SERVER_URL + ServerConfig.GENERATE_NEW_CARD + username)
                .then(checkStatus)
                .then(data => {    
                    console.log(data)                
                    const newCards = JSON.parse(data).result
                    console.log(newCards)
                    this.setState({
                        cardResult: newCards
                    })
                })
            this.setState(prevState => ({ isFlipped1: false, isFlipped2: false, isFlipped3: false })); 
        } else {
            alert("User are not suppose to be here if not logged in, please file a bug")
        }
    }

}

function checkStatus(response) { 
    if ((response.status >= 200 && response.status < 300) || response.status === 0) {  
        console.log(5)
        return response.text();
    } else { 
        console.log(5) 
        return Promise.reject(new Error(response.status + ": " + response.statusText)); 
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

