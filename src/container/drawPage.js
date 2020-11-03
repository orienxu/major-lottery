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
            ipAddress: "",
            loggedIn: false,
            chancesLeft: 3,
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
        var self = this
        this.setState({
            playAnimation: true
        })
        this.ANIMATION_TIMER = setTimeout(() => {self.props.history.push("/result")}, 3500)
        //do api call here
        // if (!this.props.loggedIn) {
        //     var ip = "place holder";
        //     //get ip
        //     //and set it back by calling a function passed in props
        //     this.props.setUserToVisitor(ip);
        // }
        //transition to next resultPage
        //possiblily by calling this.props.history.push(`/result/$this.props.loggedInUser`)

        // this.setState({ 
        //     chancesLeft: this.state.chancesLeft - 1,
        // })

        // update chancesLeft
        //let username = this.props.username;
        // let username = "weifeng";
        // fetch(ServerConfig.SERVER_URL + ServerConfig.UPDATE_TIME + username)
        // .then(checkStatus)
        // .then(data => {    
        //     console.log(data); 
        //     //console.log(JSON.parse(data).result);
        // })
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
                // animate={{backgroundColor: ["#5C6FB2", "#D29C9C", "#2F75A7"]}}
                // transition={{duration:10, yoyo:Infinity}}
                style={styles.contentMain}
            >
                {this.props.loggedInUser !== "" && <h3 style={{ textAlign: "center", color: "white"}} > 欢迎回来! {this.props.loggedInUser}</h3>}
                <div style={styles.icon}>
                    <img src={Res.cardBack} style={{ width: '90%' }} />
                </div>
                {/* 判断是否有剩余次数 */}
                {this.btn()}
                {this.state.playAnimation && <LinearShuffle /> }
            </motion.div>

        );
    }

    // check user status
    componentWillMount () {       
    }

    componentWillUnmount() {
        clearTimeout(this.ANIMATION_TIMER)
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
            <div className="App" >
                {this.renderContent()}
            </div>
        );
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
