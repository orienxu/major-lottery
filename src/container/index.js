import React, { Component } from 'react';
import Res from '../config/image';
import './App.css';
import InfoPage from './infoPage';
import UserPage from './user';
import DrawPage from './drawPage';
import ResultPage from './resultPage';
import CollectionPage from './collection';
import { motion } from "framer-motion";

export default class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            id: "draw"
        }
    }

    handleClick(pageId) {
        this.setState({ id: pageId });
    }

    renderTop() {
        return (
            <div style={styles.topMain}>
                <img src={Res.home}
                    onClick={
                        () => this.handleClick('draw')
                    }
                    style={{ width: '7vmin', marginLeft: '3vmin' }}
                />
                <div>
                    <img src={Res.star}
                        style={{ width: '7vmin', marginRight: '1.5vmin' }}
                    />
                    <img src={Res.user}
                        onClick={
                            () => this.handleClick('user')
                        }
                        style={{ width: '7vmin', marginRight: '3vmin' }}
                    />
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
                case "draw": return <DrawPage action={() => { this.handleClick('info') }} />;
                case "result": return <ResultPage />;

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
        backgroundColor: '#B9A9D9',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}