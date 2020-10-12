import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Res from '../config/image';
import './App.css';
import {Link} from 'react-router-dom'
export default class DrawPage extends Component {

    constructor() {
        super();
        this.state = {
            isFlipped: false,
            apiResponse: 'Node failed',
        };
    }

    renderContent() {
        return (
            <div
                style={styles.contentMain}
            >
                <div style={styles.icon}>
                    <img src={Res.cardBack} style={{ width: '55vmin' }} />
                </div>
                <Button
                    component={Link}
                    to="/result"
                    style={styles.button}
                >
                    点我抽卡
                </Button>
                <h3 style={styles.rec}>
                    剩余次数：3
                 </h3>
            </div>
        );
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
        height: '100vh',
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
        alignSelf: 'center',
        backgroundColor: '#4B2E83',
        borderRadius: '6vmin',
        marginTop: '15vmin',
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

