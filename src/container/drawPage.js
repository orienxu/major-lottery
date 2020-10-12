import React, { Component } from 'react';
import Res from '../config/image';
import './App.css';
import {motion} from 'framer-motion'
import Button from '@material-ui/core/Button';

export default class DrawPage extends Component {
    
    constructor() {
        super();
        this.state = {
            chancesLeft: 3,
            isFlipped: false,
            apiResponse: 'Node failed',
        };
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
                <h1 style={styles.button}
                    onClick={this.props.action}
                >
                    点我抽卡
                </h1> 
                {/* <Button style={styles.button} variant="contained"
                    onClick={this.props.action}
                >
                    点我抽卡
                </Button> */}
                <h3 id = "ChancesLeft" style={styles.rec}>
                    剩余次数：3
                </h3> 

            </motion.div>
        );
    }
    componentDidMount () {
        document.getElementById("ChancesLeft").innerHTML = "剩余次数：" + this.state.chancesLeft;
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

