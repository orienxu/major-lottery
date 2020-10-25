import React, { Component } from 'react';
import Res from '../config/image';
import './App.css';
import InfoPage from './infoPage';
import UserPage from './User';
import DrawPage from './drawPage';
import ResultPage from './resultPage';
import CollectionPage from './Collection/collection';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person'
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import LogInPage from './LoginPage';
import ServerConfig from '../config/ServerConfig';

export default class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            id: 'info',
            loggedIn: false,
            loggedInUser: "weifeng",
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
                <h3 style={{marginLeft: "7vmin"}} >华大课友抽奖</h3>
                <div>
                    <IconButton
                        component={Link}
                        to={`/collection/${this.state.loggedInUser}`}
                        aria-label="Collection"
                    >
                        <StarIcon />
                    </IconButton>
                    <IconButton
                        aria-label="User"
                        onClick={() => {this.setState({openLoginWindow: true})}}
                    >
                        <PersonIcon
                            style={{ marginLeft: '-3vmin' }}
                        
                        />
                    </IconButton>
                </div>
            </div >
        );
    }

    setUserToVisitor(ip) {
        this.setState({
            loggedInUser: ip
        })
    }

    render() {
        const { id } = this.state;
        return (
            <Router>
                <div className="App">
                    {this.renderTop()}
                    <Switch>
                        <Route path="/info/:id" component={InfoPage}/>
                        <Route path = "/collection/:username" exact component={CollectionPage}/>

                        <Route path="/" exact component={() => {
                            return <DrawPage loggedIn={this.state.loggedIn} setUserToVisitor= {(ip) => {this.setUserToVisitor(ip)}}/>
                        }} />

                        <Route path="/result" component={InfoPage}/>
                    </Switch>
                    {/* pass additional props into loginpage */}
                    <LogInPage open={this.state.openLoginWindow} onClose={() => this.onLogInClose()} logInAction={(username, pass) => {this.onLogIn(username, pass)}} />
                </div>
            </Router>
        );
    }

    onLogIn(username, password) {
        
    }

    onRegister(username, password) {
        
    }

    onLogInClose() {
        this.setState({
            openLoginWindow: false,
        })
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