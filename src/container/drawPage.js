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
            //ipAddress: "",
            chancesLeft: 3,
            isFlipped: false,
            playAnimation: false,
            apiResponse: 'Node failed',
        };
        // this.handleClick = this.handleClick.bind(this);
        // this.checkUser = this.checkUser.bind(this);
        // this.getUserIP = this.getUserIP.bind(this);
    }
    
    handleCardClick() {
        var self = this
        this.setState({
            playAnimation: true
        })
        this.ANIMATION_TIMER = setTimeout(() => {self.props.history.push("/result")}, 3000)
        //do api call here
        // if (!this.props.loggedIn) {
        //     var ip = "place holder";
        //     //get ip 
        //     //and set it back by calling a function passed in props
        //     this.props.setUserToVisitor(ip);
        // }
        //transition to next resultPage
        //possiblily by calling this.props.history.push(`/result/$this.props.loggedInUser`)

        this.setState({ 
            chancesLeft: this.state.chancesLeft - 1,
        })
        // document.getElementById("ChancesLeft").innerHTML = "剩余次数：" + this.state.chancesLeft;
    }

    btn = () => {
        /*
            You have to checck the chances everytime you call generate card
            using some sort of fetch(api)
         */
        if(this.state.chancesLeft > 0) {
            //update time left before transitioning
            return <Button
                    style={styles.button}
                    onClick={() => {this.handleCardClick()}}
                    >
                    点我抽卡
                    </Button>;
        } else {
            return <h1 
            style={styles.fakeButton}>
                次数用尽
            </h1>
        }
        
    }
    
    renderContent() {
        return (
            <motion.div
                animate={{backgroundColor: ["#5C6FB2", "#D29C9C", "#2F75A7"]}}
                transition={{duration:10, yoyo:Infinity}}
                style={styles.contentMain}
            >
                <div style={styles.icon}>
                    <img src={Res.cardBack} style={{ width: '55vmin' }} />
                </div>
                {/* 判断是否有剩余次数 */}
                {this.btn()}
                <h3 id = "ChancesLeft" style={styles.rec}>{this.state.chancesLeft}</h3>
                {this.state.playAnimation && <LinearShuffle /> }
            </motion.div>                 
                       
        );
    }

    // check user status
    componentWillMount () {
        //Dont do any ip checking here, component are not loaded
        this.checkUser();
    }

    componentWillUnmount() {
        clearTimeout(this.ANIMATION_TIMER)
    }

    componentDidMount () {
        //You could do this by updating the state
    }

    //问题在于getUserIp可以得到ip 但是传不回来
    async checkUser() {
        if(!this.state.loggedIn) {
            console.log(this.getUserIP());
            // check ip and get chancesleft
        } else {
            // get chancesleft
        }
        //this.state.chancesLeft = 3;
    }
    
    getUserIP() {
        fetch('https://api.ipify.org?format=jsonp?callback=?', {
          method: 'GET',
          headers: {},
        })
        .then(res => {
          return res.text()
        }).then(ip => {
            //dont return the result, set it to a state, it automatically updates the page where that state is used.
            return ip;
            //console.log(this.state.ipAddress);
        });
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
    contentMain: {
        display: 'flex',
        flexDirection: 'column',   
        flex: 1,
        overflow: 'hidden',
        position: "relative"
    },
    contentTitle: {
        marginLeft: '3vmin',
        marginTop: '1vmin',
    },
    contentPersonnel: {
        width: '100vmin',
        flexDirection: 'column',
    },
    button: {
        fontSize: '32px',
        alignSelf: 'center',
        backgroundColor: '#4B2E83',
        borderRadius: '3vmin',
        marginTop: '5vmin',
        marginBottom: '3vmin',
        color: 'white',
        width: '55vmin',
        height: '15vmin',
        display: 'flex',
        alignItems: 'center',
    },
    fakeButton: {
        fontSize: '32px',
        alignSelf: 'center',
        backgroundColor: '#4B2E83',
        borderRadius: '6vmin',
        marginTop: '5vmin',
        color: 'white',
        width: '60vmin',
        height: '17vmin',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    LOGIN_POPUP: {
        
    }
}

export default withRouter(DrawPage);
