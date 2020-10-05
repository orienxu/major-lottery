import React, { Component } from 'react';
import Res from '../../config/image';
import '../App.css';
import ServerConfig from '../../config/ServerConfig'
import CollectionEntry from './CollectionEntry';
import { motion } from 'framer-motion'

export default class CollectionPage extends Component {

    constructor() {
        super();
        this.state = {
            owned: [],
        }
    }

    renderContent() {
        return (
            <div
                style={styles.contentMain}
            >
                <h2 style={styles.contentTitle}>我的卡片</h2>
                <div style={styles.box}>
                    <img src={Res.subjectFoster} style={styles.img} />
                    <h2 style={styles.majorName}>Applied and Computational Math Science</h2>
                </div>
                <div style={styles.box}>
                    <img src={Res.subjectFoster} style={styles.img} />
                    <h2 style={styles.majorName}>CSE</h2>
                </div>
                <div style={styles.box}>
                    <img src={Res.subjectFoster} style={styles.img} />
                    <h2 style={styles.majorName}>M E</h2>
                </div>

            </div>
        );
    }

    render() {
        return (
            <motion.div className="App"                
            >
                <motion.div style = {styles.contentMain}
                    animate={{backgroundColor: ["#5C6FB2", "#D29C9C", "#2F75A7"]}}
                    transition={{duration: 5, yoyo:Infinity}}
                >
                    {this.state.owned}
                </motion.div>
            </motion.div>
        );
    }

    componentDidMount() {  
        this.setState({
            owned: []
        })      
        this.getOwnedCard()        
    }

    async getOwnedCard() {
        let username = this.props.loggedInUser
        if (username !== null && username !== "") {
            fetch(ServerConfig.SERVER_URL + ServerConfig.GET_OWNED_CARD + username)
                .then(this.checkStatus)
                .then(data => {                    
                    const ownedCard = JSON.parse(data).result
                    console.log(ownedCard)
                    this.setState({
                        owned: ownedCard.map(card => (
                            <CollectionEntry key={card} image={card} />
                        ))
                    })
                })

        } else {
            alert("User are not suppose to be here if not logged in, please file a bug")
        }
    }

    checkStatus(response) { 
        if (response.status >= 200 && response.status < 300 || response.status == 0) {  
        return response.text();
        } else {  
        return Promise.reject(new Error(response.status + ": " + response.statusText)); 
        } 
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
        overflow: 'hidden',
        backgroundColor: '#FCF4D9',
    },
    contentTitle: {
        marginLeft: '3vmin',
        marginTop: '1.3vmin',
        marginBottom: '0vmin',
        fontFamily: 'PingFang SC',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '4vh',
        lineHeight: '5.6vh',
        color: '#000000',
    },
    contentPersonnel: {
        width: '100vmin',
        flexDirection: 'column',
    },
    box: {
        width: '90vw',
        margin: '1.8vw',
        padding: '3vw',
        display: 'flex',
        alignItems: 'center',
        background: '#EDD29D',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '28px',
    },
    img: {
        width: '40vmin',
        filter: 'drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))',
    },
    majorName: {
        marginLeft: '3vmin',
        fontFamily: 'Annie Use Your Telescope',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '3.4vh',
        lineHeight: '4.8vh',
    }
}

