import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Res from '../config/image';
import './App.css';
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
export default class DrawPage extends Component {

    constructor() {
        super();     
        this.state = {
            //ipAddress: "",
            loggedIn: false,
            chancesLeft: 3,
            isFlipped: false,
            apiResponse: 'Node failed',
        };
        this.handleClick = this.handleClick.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.getUserIP = this.getUserIP.bind(this);
    }
    
    handleClick() {
        //e.preventDefault();
        this.setState(prevState => ({ chancesLeft: this.state.chancesLeft - 1 }));
        document.getElementById("ChancesLeft").innerHTML = "剩余次数：" + this.state.chancesLeft;
    }

    btn = () => {
        if(this.state.chancesLeft > 0) {
            return <Button
                    onClick = {this.handleClick}
                    component={Link}
                    to="/result"
                    style={styles.button}
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
                {/* <Button
                    component={Link}
                    to="/result"
                    style={styles.button}
                >
                    点我抽卡
                    <Btn chances={this.state.chancesLeft}/>
                </Button> */}
                {/* 判断是否有剩余次数 */}
                {this.btn()}
                <h3 id = "ChancesLeft" style={styles.rec}>
                   
                </h3> 

            </motion.div>
        );
    }

    // check user status
    componentWillMount () {
        this.checkUser();
    }

    componentDidMount () {
        document.getElementById("ChancesLeft").innerHTML = "剩余次数：" + this.state.chancesLeft;
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
        justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#FFB9F0',
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
        borderRadius: '6vmin',
        marginTop: '5vmin',
        marginBottom: '3vmin',
        color: 'white',
        width: '60vmin',
        height: '17vmin',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
}

