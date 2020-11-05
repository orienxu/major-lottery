import React, { Component } from 'react';
import Res from '../config/image';
import './App.css';
import InfoPage from './infoPage';
import DrawPage from './drawPage';
import ResultPage from './resultPage';
import CollectionPage from './Collection/collection';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person'
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LogInPage from './LoginPage';
import ServerConfig from '../config/ServerConfig';
import { AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ResultPagePC from './resultPagePC'
import InfoPagePC from './infoPagePC';

import {Button,Toolbar } from '@material-ui/core';
export default class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            id: 'info',
            loggedIn: false,
            loggedInUser: "",
            usingIp: false,
            openLoginWindow: false,
            width: 0,
            reinitializeDraw: false,
        }
    }

    handleClick(pageId) {
        this.setState({ id: pageId });
    }

    renderTop() {
        return (
            <AppBar style={styles.topMain}>
                <IconButton
                    component={Link}
                    to={"/"}
                    aria-label="Home"
                // onClick={() => this.handleClick('draw')}
                >
                    <HomeIcon
                        style={{color: 'black'}}/>

                </IconButton>

                <Link to="www.uwclassmates.com">
                    <img src={Res.icon} style={{maxHeight: '12vmin', alignSelf: 'center'}} alt="logo"/>
                </Link>
            
                <div>
                    {this.state.loggedIn && !this.state.usingIp && <IconButton
                        component={Link}
                        to={`/collection/${this.state.loggedInUser}`}
                        aria-label="Collection"
                    > 
                        <StarIcon 
                            style={{color: 'black'}}/>
                    </IconButton>}
                    {(!this.state.loggedIn || this.state.usingIp) && <IconButton
                        component={Link}
                        to={"/"}
                        aria-label="User"
                        onClick={() => { this.setState({ openLoginWindow: true }) }}
                    >
                        <PersonIcon
                            style={{ marginLeft: '-3vmin', color: 'black'}}

                        />
                    </IconButton>}
                </div>
            </AppBar >
        );
    }

    renderTopPC() {
        return (
            <AppBar 
                style={styles.topMainPC}
            >
                <Toolbar style={{padding: '0px', float: 'left'}}>
                    <img src={Res.icon} style={{maxHeight: '12vmin'}} alt="logo"/>
                </Toolbar>

            
                <div
                    style={{
                        float: 'right',
                        padding: '0px',
                        height: '12vmin',
                        marginLeft: '3vh',
                    }}
                    >
                    {this.state.loggedIn && !this.state.usingIp && <Button
                        component={Link}
                        to={`/collection/${this.state.loggedInUser}`}
                        aria-label="Collection"
                        style={{
                            fontSize: '3vh',
                            height: '12vmin',
                            width: '23vmin',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems:'center',
                                justifyContent: 'center',
                            }}
                        >  
                            <StarIcon
                                style={{ fontSize: '40' }}
                            />
                            <div style={{padding: '0vmin, 1vmin', fontSize: "50%"}}>
                            我的收藏
                            </div>
                        </div>
                    </Button>}
                    {!this.state.loggedIn && <Button
                        aria-label="User"
                        onClick={() => { this.setState({ openLoginWindow: true }) }}
                        style={{
                            fontSize: '3vh',
                            height: '12vmin',
                            width: '23vmin',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems:'center',
                                justifyContent: 'center',
                            }}
                        >
                            
                            <PersonIcon
                                style={{ fontSize: '40' }}
                            />
                            <div style={{padding: '0vmin, 1vmin', fontSize: "50%"}}>
                            用户注册/登录
                            </div>
                        </div>
                    </Button>}
                </div>
                <Button
                    component={Link}
                    to={"/"}
                    aria-label="Home"
                    style={{
                        float: 'right',
                        fontSize: '3vh',
                        padding: '0px',
                        height: '12vmin',
                        width: '23vmin',                  
                    }}
                >            
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems:'center',
                            justifyContent: 'center',
                        }}
                    >
                        <HomeIcon
                            style={{ fontSize: '40' }}
                        />
                        <div style={{padding: '0vmin, 1vmin', fontSize: "50%"}}>
                            抽卡首页
                        </div>
                    </div>        


                </Button>
            </AppBar >
            
        );
    }
    componentWillMount() {
        let current = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        this.setState({
            width: current
        })
    }

    render() {
        const { id } = this.state;
        console.log(this.state.width)
        return (
            <Router>
                <div className="App">
                    {this.state.width < 768 && this.renderTop()}
                    {this.state.width >= 768 && this.renderTopPC()}
                    <div
                        style={{clear: 'both'}}>
                        <Switch>
                            <Route path="/collection/:username" exact component={CollectionPage} />

                            <Route path="/" exact component={() => {
                                return <DrawPage 
                                            loggedIn={this.state.loggedIn}
                                            loggedInUser={this.state.loggedInUser} 
                                            setUserToVisitor={() => {this.setUserToVisitor()}}
                                            initialize={this.state.reinitializeDraw}
                                            usingIp={this.state.usingIp}/>
                                            
                            }} />
                            {this.state.width > 768 && <Route path="/info/:id" component={InfoPagePC}/>}
                            <Route path="/info/:id" component={InfoPage}/>
        
                            <Route path = "/collection/:username" exact component={CollectionPage}/>
                            <Route path="/result" component={() => {
                                if (this.state.width > 768)
                                    return <ResultPagePC loggedIn={this.state.loggedIn} loggedInUser={this.state.loggedInUser} />
                                else 
                                    return <ResultPage loggedIn={this.state.loggedIn} loggedInUser={this.state.loggedInUser} />
                            }}/>
                        </Switch>
                    </div>
                    {/* pass additional props into loginpage */}
                    
                    <LogInPage 
                        open={this.state.openLoginWindow} 
                        onClose={() => this.onLogInClose()} 
                        registerAction={(username, pass, display) => {this.onRegister(username, pass, display)}} 
                        loginAction={(username, pass, display) => {this.onLogIn(username, pass, display)}} />
                </div>
            </Router>
            
        );
    }

    setUserToVisitor() {
        this.setState({
            loggedInUser: 'guest',
            loggedIn: true,
            usingIp: true,
            reinitializeDraw: true,
        })
    }

    onLogIn(username, password, display) {
        //console.log(ServerConfig.SERVER_URL + ServerConfig.LOGIN_NAME + username + ServerConfig.LOGIN_PASS + password)
        fetch(ServerConfig.SERVER_URL + ServerConfig.LOGIN_NAME + username + ServerConfig.LOGIN_PASS + password)
            .then(checkStatus)
            .then(data => {    
                console.log(data) 
                if(JSON.parse(data).success === 1) {
                    if(display) {
                        alert("User Logged in Successfully");
                    }
                    this.setState({
                        loggedIn: true,
                        loggedInUser: username,
                        usingIp: false,                    
                    })
                } else {
                    alert(JSON.parse(data).result + ", please try again");
                }         
            })
    }

    async onRegister(username, password, display) {
        console.log(password + username);
        fetch(ServerConfig.SERVER_URL + ServerConfig.REGISTER_NAME + username + ServerConfig.REGISTER_PASS + password)
            .then(checkStatus)
            .then(data => {    
                console.log(data)                
                if(JSON.parse(data).success === 1) {
                    if(display) {
                        alert("Register sucessful, please log in");
                    }  
                } else {
                    alert(JSON.parse(data).result + ", please try again");
                }        
            })
    }

    onLogInClose() {
        this.setState({
            openLoginWindow: false,
        })
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
    topMainPC: {
        width: '100%',
        height: '12vmin',
        backgroundColor: 'white',
        display: 'inline',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        overflow: 'auto',
        position: 'relative',
    },
    topMain: {
        width: '100%',
        height: '12vmin',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        overflow: 'auto',
        position: 'relative',
    }
}