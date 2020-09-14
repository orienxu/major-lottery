import React, { Component } from 'react';
//import ReactCardFlip from 'react-card-flip';
import subject1 from '../res/subject1.png';


//import hearthstone from './res/Hearthstone.jpg';
//import Share from 'social-share-react'
import './App.css';


export default class UserPage extends Component {

    renderColors() {
        const isBackgroundRed = true;

        return (
            <div
                style={{
                    backgroundColor: isBackgroundRed ? 'red' : 'blue',
                }} />
        );
    }

    renderContent() {
        return (
            <div style={styles.contentMain}>
                <section className="main-page">
                    < img src={subject1} style={{ width: '20%', height: '45%', marginTop: '4vmin' }} />

                    <div className="page-title">
                        <p>Password</p >
                    </div>

                    <div className="card-container" style={{ marginBottom: '4vmin' }}>
                        <div style={{ marginBottom: '1vmin' }}>New</div>
                        <input className="userInput" type="text" placeholder="1234567" style={{ marginRight: '1vmin' }}></input>
                        <button className="button" style={{ borderRadius: '5px' }}>confirm</button>
                    </div>

                    <div className="cardContainer">
                        <div style={{ marginBottom: '1vmin' }} >Again</div>
                        <input className="userInput" type="text" placeholder="1234567" style={{ marginRight: '1vmin' }}></input>
                        <button className="button" style={{ borderRadius: '5px' }}>confirm</button>
                    </div>

                </section>
            </div>
        );
    }

    render() {
        return (
            <div className="App">
                {this.renderContent()}
                {this.renderColors()}
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
        //width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        height: '100vh',
        overflow: 'hidden',
        //backgroundColor: '#DA86F8',
    },

    button: {
        borderRadius: '5px',
    },

    cardContainer: {
        width: '80%',
        height: '25vmin',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    userInput: {
        marginRight: '2vmin',
    }
}