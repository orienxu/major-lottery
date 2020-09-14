import React, { Component } from 'react';
import Res from '../config/image';
import './App.css';

export default class DrawPage extends Component {

    constructor() {
        super();
        this.state = {
            isFlipped: false,
            apiResponse: 'Node failed',
        };
    }

    renderTop() {
        return (
            <div style={styles.topMain}>
                <img src={Res.arrow}
                    style={{ width: '7vmin', marginLeft: '3vmin' }}
                />
                <div style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <img src={Res.star}
                        style={{ width: '7vmin', marginRight: '1.5vmin' }}
                    />
                    <img src={Res.user}
                        style={{ width: '7vmin', marginRight: '3vmin' }}
                    />
                </div>
            </div >
        );
    }

    renderContent() {
        return (
            <div
                style={styles.contentMain}
            >
                <div style={styles.icon}>
                    <img src={Res.icon} style={{ width: '55vmin' }} />
                </div>
                <h1 style={styles.button}
                    onClick={this.props.action}
                >
                    点我抽卡
                </h1>
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
    topMain: {
        width: '100%',
        height: '12vmin',
        backgroundColor: '#B9A9D9',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
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
        backgroundColor: 'white',
        width: '60vmin',
        height: '80vmin',
        alignSelf: 'center',
        marginTop: '20vmin',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

