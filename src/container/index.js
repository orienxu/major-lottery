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

export default class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            id: 'info',
            loggedIn: false,
            loggedInUser: "",
            usingIp: false,
            openLoginWindow: false,
        }
    }

    handleClick(pageId) {
        this.setState({ id: pageId });
    }

    renderTop() {
        const { id } = this.state;
        return (
            <div style={styles.topMain}>
                <IconButton
                    component={Link}
                    to={"/"}
                    aria-label="Home"
                // onClick={() => this.handleClick('draw')}
                >
                    <HomeIcon />

                </IconButton>
                <h3 style={{ marginLeft: "7vmin" }} >专业上上签</h3>
                {this.state.loggedIn && !this.state.usingIp && <h3 style={{ textAlign: "center" }} > Welcome! {this.state.loggedInUser}</h3>}
                <div>
                    <IconButton
                        component={Link}
                        to={`/collection/${this.state.loggedInUser}`}
                        aria-label="Collection"
                    >
                        <StarIcon />
                    </IconButton>
                    {!this.state.loggedIn && <IconButton
                        aria-label="User"
                        onClick={() => { this.setState({ openLoginWindow: true }) }}
                    >
                        <PersonIcon
                            style={{ marginLeft: '-3vmin' }}

                        />
                    </IconButton>}
                </div>
            </div >
        );
    }



    render() {
        const { id } = this.state;
        return (
            <Router>
                <div className="App">
                    {this.renderTop()}
                    <Switch>
                        <Route path="/info/:id" component={InfoPage} />
                        <Route path="/collection/:username" exact component={CollectionPage} />

                        <Route path="/" exact component={() => {
                            return <DrawPage 
                                        loggedIn={this.state.loggedIn} 
                                        setUserToVisitor={(ip) => {this.setUserToVisitor(ip)}}
                                        async registerAction={(username, pass) => {this.onRegister(username, pass)}}
                                        loginAction={(username, pass) => {this.onLogIn(username, pass)}} />
                        }} />
                        <Route path="/info/:id" component={InfoPage}/>
    
                        <Route path = "/collection/:username" exact component={CollectionPage}/>
                        <Route path="/result" component={() => {
                            return <ResultPage loggedIn={this.state.loggedIn} loggedInUser={this.state.loggedInUser} />
                        }}/>
                    </Switch>
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

    setUserToVisitor(ip) {
        console.log("myip" + ip);
        this.setState({
            loggedInUser: ip,
            loggedIn: true,
            usingIp: true,
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
    topMain: {
        width: '100%',
        height: '12vmin',
        backgroundColor: '#F5F3F8',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        overflow: 'auto',
        position: 'relative',
    },
}