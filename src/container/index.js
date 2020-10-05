import React, { Component } from 'react';
import Res from '../config/image';
import './App.css';
import InfoPage from './infoPage';
import UserPage from './user';
import DrawPage from './drawPage';
import ResultPage from './resultPage';
import CollectionPage from './Collection/collection';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person'
import { motion } from "framer-motion";

export default class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            id: 'info',
            loggedIn: false,
            loggedInUser: "weifeng"
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
                    aria-label="Home"
                    disabled={id === 'draw'}
                    onClick={() => this.handleClick('draw')}
                >
                    <HomeIcon />
                </IconButton>
                <div>
                    <IconButton
                        aria-label="Collection"
                        disabled={id === 'collection'}
                        onClick={() => this.handleClick('collection')}
                    >
                        <StarIcon />
                    </IconButton>
                    <IconButton
                        aria-label="User"
                        disabled={id === 'user'}
                        onClick={() => this.handleClick('user')}
                    >
                        <PersonIcon
                            style={{ marginLeft: '-4vmin' }}
                        />
                    </IconButton>
                </div>
            </div >
        );
    }

    render() {
        const { id } = this.state;
        const subpage = () => {
            switch (id) {
                case "info": return <InfoPage />;
                case "user": return <UserPage />;
                case "draw": return <DrawPage action={() => this.handleClick('result')} />;
                case "result": return <ResultPage/>;
                case "collection": 
                return <CollectionPage 
                            action={() => this.handleClick('result')}
                            loggedInUser= {this.state.loggedInUser}
                        />;

                default: return <h1>No project match</h1>
            }
        }
        return (
            <div className="App">
                {this.renderTop()}
                {
                    subpage()
                }
            </div>
        );
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