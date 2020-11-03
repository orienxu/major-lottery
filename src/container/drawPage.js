import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Res from '../config/image';
import './App.css';
import {motion} from 'framer-motion'
import {withRouter} from 'react-router-dom'
import LinearShuffle from './LinearShuffule'
import ServerConfig from '../config/ServerConfig';

class DrawPage extends Component {
    ANIMATION_TIMER = null;
    LOGIN_TIMER = null;
    constructor() {
        
        super();
        this.state = {
            ipAddress: "",
            loggedIn: false,
            guestPassword: "guest",
            isFlipped: false,
            playAnimation: false,
            apiResponse: 'Node failed',
            width: 0,
            height: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.checkUser = this.checkUser.bind(this);
        // this.getUserIP = this.getUserIP.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    handleCardClick() {        
        
        if (!this.props.loggedIn) {
            console.log(this.state.ipAddress);
            //console.log("temp" + this.state.ipAddress);
            alert("用户未登录，抽卡结果将不会保存")
            this.props.setUserToVisitor(this.state.ipAddress);
            fetch(ServerConfig.SERVER_URL + ServerConfig.LOGIN_NAME + this.state.ipAddress + ServerConfig.LOGIN_PASS + this.state.guestPassword)
            .then(checkStatus)
            .then(data => {    
                console.log(data) 
                if(JSON.parse(data).success === 0) {
                    console.log("1");
                    //setTimeout(this.props.registerAction(this.state.ipAddress, this.state.guestPassword, false), 10000);
                    this.props.registerAction(this.state.ipAddress, this.state.guestPassword, false);
                }
                console.log("2");
                this.LOGIN_TIMER = setTimeout(() => {this.props.loginAction(this.state.ipAddress, this.state.guestPassword, false)}, 1000);      
            })
        }
        //transition to next resultPage
        //possiblily by calling this.props.history.push(`/result/$this.props.loggedInUser`)

        // this.setState({ 
        //     chancesLeft: this.state.chancesLeft - 1,
        // })

        // update chancesLeft


        var self = this
        this.setState({
            playAnimation: true
        })
        this.ANIMATION_TIMER = setTimeout(() => {self.props.history.push("/result")}, 3500)
    }

    btn = () => {
        /*
            You have to checck the chances everytime you call generate card
            using some sort of fetch(api)
         */
        // this.getUserInfo();
        
        // if(this.state.chancesLeft > 0) {
        //     //update time left before transitioning
             return <Button
                     //component={Link}
                     //to="/result"
                     style={styles.button}
                     onClick={() => {this.handleCardClick()}}
                     >
                     点我抽卡
                     </Button>;
        // } else {
        //     return <h1 
        //     style={styles.fakeButton}>
        //         次数用尽
        //     </h1>
        // }
        
    }

    renderContent() {
        return (
            <motion.div
                animate={{backgroundColor: ["#5C6FB2", "#D29C9C", "#2F75A7"]}}
                transition={{duration:10, yoyo:Infinity}}
                style={styles.contentMain}
            >
                <div style={styles.icon}>
                    <img src={Res.cardBack} style={{ width: '90%' }} />
                </div>
                {/* 判断是否有剩余次数 */}
                {this.btn()}
                {this.state.playAnimation && <LinearShuffle /> }
            </motion.div>

        );
    }

    getIp() {
        fetch('https://api.ipify.org?format=jsonp?callback=?', {
            method: 'GET',
            headers: {},
            })
            .then(res => {
                return res.text()
            }).then(ip => {
                this.setState({
                    ipAddress: ip,
                })
                //console.log(this.state.ipAddress);
            });
    }
    // check user status
    componentWillMount () {       
        this.getIp();
    }

    componentWillUnmount() {
        clearTimeout(this.ANIMATION_TIMER)
        clearTimeout(this.LOGIN_TIMER)
    }

    componentDidMount () {

    }

    // getUserInfo() {
    //     let username = "";
    //     if(!this.state.loggedIn) {
    //         this.getUserIP();
    //         username = this.state.ipAddress;
    //     } else {
    //         //username = this.props.username;
    //     }
    //     username = "weifeng";
    //     if (username !== null && username !== "") {
    //         fetch(ServerConfig.SERVER_URL + ServerConfig.CHECK_TIME + username)
    //             .then(checkStatus)
    //             .then(data => {    
    //                 //console.log(data); 
    //                 //console.log(JSON.parse(data).result);
    //                 this.setState({
    //                     chancesLeft: JSON.parse(data).result
    //                 });
    //             })
    //     } else {
    //         alert("User are not suppose to be here if not logged in, please file a bug")
    //     }
         
    // }
    // async getUserIP() {
    //     fetch('https://api.ipify.org?format=jsonp?callback=?', {
    //       method: 'GET',
    //       headers: {},
    //     })
    //     .then(res => {
    //       return res.text()
    //     }).then(ip => {
    //         this.setState({
    //             ipAddress: ip,
    //         })
    //         console.log(this.state.ipAddress);
    //     });
    // }
    
    render() {
        return (
            <div className="App">
                {this.renderContent()}
            </div>
        );
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
        height: "80vh",
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
        position: "relative",
        height: '100vh',
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
