import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import Res from '../config/image';
import './App.css';
import ServerConfig from '../config/ServerConfig';
import {withRouter} from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@material-ui/core';

class ResultPage extends Component {

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
                    <img src={Res.cardBack} style={{ width: '30vmin', height: 'auto' }} className="App-logo" alt="logo" onClick={this.handleClick1} />
                </div>
                <div>
                    <img src={Res[img]} style={{  width: '30vmin', height: 'auto' }} className="App-logo" alt="logo" onClick={this.handleClick1} />
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
                    <img src={Res.cardBack} style={{  width: '30vmin', height: 'auto' }} className="App-logo" alt="logo" onClick={this.handleClick2} />
                </div>
                <div>
                    <img src={Res[img]} style={{ width: '30vmin', height: 'auto' }} className="App-logo" alt="logo" onClick={this.handleClick2} />
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
                    <img src={Res.cardBack} style={{ width: '30vmin', height: 'auto' }} className="App-logo" alt="logo" onClick={this.handleClick3} />
                </div>
                <div>
                    <img src={Res[img]} style={{ width: '30vmin', height: 'auto' }} className="App-logo" alt="logo" onClick={this.handleClick3} />
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

    renderContent() {
        return (
            <div style={styles.content}>
                    <motion.div
                        initial={{
                            y: "18vh"
                        }}
                        animate={{
                            y: "-2vh",
                        }}
                        transition={{duration: 1}}
                        style={styles.initalStyle}
                    >
                        {this.card1(this.state.cardResult[0])}
                    </motion.div>
                    <div
                        style={{
                            display: 'flex', flexDirection: 'row', width: '100vmin', alignContent: 'center', marginTop: '5vh'
                        }}
                    >
                        <motion.div
                            initial={{
                                y: "-10vh",
                                x: "25vw"
                            }}
                            animate={{
                                x: "-2vw",
                                y: "0.3vh",
                            }}
                            transition={{duration: 1}}
                            style={styles.initalStyle}
                        >
                            {this.card2(this.state.cardResult[1])}
                        </motion.div>
                        <motion.div
                            initial={{
                                y: "-10vh",
                                x: "-25vw"
                            }}
                            animate={{
                                x: "2vw",
                                y: "0.3vh",
                            }}
                            transition={{duration: 1}}
                            style={styles.initalStyle}

                        >
                            {this.card3(this.state.cardResult[2])}
                        </motion.div>
                    </div>
            </div >
        );
    }

    renderBottom() {
        return (
            <div style={styles.box}>
                <Button style={styles.button} onClick = {() => this.generateNewCard()}>
                    再抽一次
                </Button>
            </div>
        );
    }

    render() {
        return (
                <motion.div
                    animate={{ backgroundColor: ["#5C6FB2", "#D29C9C", "#2F75A7"] }}
                    transition={{ duration: 10, yoyo: Infinity }}
                    style={styles.contentMain}
                >
                    {this.renderContent()}
                    {this.renderBottom()}
                </motion.div>
        );
    }

    componentDidMount() {
        if (this.props.loggedIn) 
            this.generateNewCard();   
        else 
            this.props.history.push('/');     
    }

    async generateNewCard() {
        let username = this.props.loggedInUser
        console.log(username)
        if (!this.props.loggedIn) {
            alert("Cards can only be saved after login.")
        }
        //let username = "f"
        if (username !== null && username !== "") {
            fetch(ServerConfig.SERVER_URL + ServerConfig.GENERATE_NEW_CARD + username)
                .then(checkStatus)
                .then(data => {    
                    console.log(data)                
                    const newCards = JSON.parse(data).result
                    console.log(newCards)
                    if (newCards.length > 0) {
                        this.setState({
                            cardResult: newCards
                        })
                    } else {
                        alert("Don't have enough lottery chances")
                        this.props.history.push("/")
                    }
                })
            this.setState(prevState => ({ isFlipped1: false, isFlipped2: false, isFlipped3: false })); 
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
    contentMain: {
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        alignItems: 'flex-center',
        flex: 1,
        overflow: 'hidden',
        backgroundImage: `url(${Res.background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        paddingTop: '10vh',
        // backgroundImage: `url(${Res.background})`,
        // backgroundSize: "cover",

    },
    box: {
        //display: 'flex',
        //justifyContent: 'space-between',
        paddingBottom: '10vh',
        alignSelf: 'center',
    },
    button: {
        fontSize: '130%',
        alignSelf: 'center',
        backgroundColor: '#4B2E83',
        borderRadius: '3vmin',
        marginTop: '5vmin',
        marginBottom: '3vmin',
        color: 'white',
        width: '25vh',
        height: '10vh',
        display: 'flex',
        alignItems: 'center',
    },
    initalStyle: {
        position: "flex",
        top: '40vh',
        left: '34vmin',
        margin: "auto",
        overflow: 'hidden',
    },
}

export default withRouter(ResultPage);