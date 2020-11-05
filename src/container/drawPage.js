import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Res from '../config/image';
import './App.css';
import {motion} from 'framer-motion'
import {withRouter} from 'react-router-dom'
import LinearShuffle from './LinearShuffule'

class DrawPage extends Component {
    ANIMATION_TIMER = null;
    constructor() {
        super();
        this.state = {
            firstClick: true,
            loggedIn: false,
            guestPassword: "guest",
            playAnimation: false,
            width: 0,
            height: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        clearTimeout(this.ANIMATION_TIMER)
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    //first click without login, the page will pop up an alert
    //then for the second time the page will go for the lottery as a guest
    handleCardClick() {        
        if (!this.props.loggedIn) {
            if(this.state.firstClick) {
                alert("用户未登录，点击右上角登录即可保存抽到的卡片哟~");
                this.setState({
                    firstClick: false
                })
                return;
            } else {
                this.props.setUserToVisitor();
            }            
        }
        var self = this;
        this.setState(state => ({...state, playAnimation: true}));
        // this.setState({
        //     playAnimation: true
        // })
        console.log(this.state.playAnimation)
        this.ANIMATION_TIMER = setTimeout(() => {self.props.history.push("/result")}, 3500)
    }

    renderContent() {
        return (
            <motion.div
                style={styles.contentMain}
            >
                {this.props.loggedInUser !== "" && !this.props.usingIp && <h3 
                    style={{ 
                        textAlign: "center", 
                        color: "white", 
                        marginTop: "3vh", 
                        marginBottom: "-8vh"
                    }} 
                > 
                    欢迎回来! {this.props.loggedInUser}
                </h3>}
                <div style={styles.icon}>
                    <img src={Res.cardBack} alt="cardBack" style={{ width: '90%' }} />
                </div>
                <Button
                    style={styles.button}
                    onClick={() => {this.handleCardClick()}}
                    >
                    点我抽卡
                </Button>  
                {this.state.playAnimation && <LinearShuffle /> }
            </motion.div>

        );
    }

    render() {
        return (
            <div className="App" >
                {this.renderContent()}
            </div>
        );
    }
}

const styles = {
    contentMain: {
        height: "100vh",
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
        position: "relative",
        backgroundImage: `url(${Res.background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    },
    button: {
        fontSize: '130%',
        alignSelf: 'center',
        backgroundColor: '#4B2E83',
        borderRadius: '3vmin',
        marginTop: '8vmin',
        marginBottom: '3vmin',
        color: 'white',
        width: '25vh',
        height: '10vh',
        display: 'flex',
        alignItems: 'center',
        opacity: '80%',
    },
    rec: {
        alignSelf: 'center',
        borderRadius: '2vmin',
        marginTop: '-3vmin',
        width: '30vmin',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    icon: {
        alignSelf: 'center',
        marginTop: '20vmin',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}

export default withRouter(DrawPage);
