import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import Res from '../../config/image';
import Quotes from '../../config/Quote'
import {withRouter} from 'react-router-dom';
// const fullNameMap = {
//     "cse": "Computer Science",
//     "acms": "Applied and Computational Math Science",
//     "arch": "Architecture",
//     "biochem": "Biological Chemistry",
//     "chem": "Chemistry",
//     "com": "Communication",
//     "ee": "Electrical Engineering",
//     "info": "Informatic",
//     "design": "Design",
//     "foster": "Business Administration",
//     "math": "Mathematics",
//     "me": "Mechanical Engineering",
//     "music": "Music",
//     "phys": "Physics",
//     "psych": "Psychology",
//     "stat": "Statistics"
// }

const fullNameMap = {
    "cse": "CSE",
    "acms": "ACMS",
    "arch": "ARCH",
    "biochem": "BIOCHEM",
    "chem": "CHEM",
    "com": "COM",
    "ee": "EE",
    "info": "INFO",
    "design": "DESIGN",
    "foster": "BUSINESS",
    "math": "MATH",
    "me": "ME",
    "music": "MUSIC",
    "phys": "PHYSICS",
    "psych": "PSYCHOLOGY",
    "stat": "STAT",
    "" : ""
}

class CollectionEntry extends Component{    
    constructor() {
        super()
    }

    render() {
        return(
            <Button onClick={() => this.helper()}>
                <div style={styles.box}>
                    <img src={Res[this.props.image]} style={styles.img} />
                    <ul style={styles.ul}>
                        <h2 style={styles.majorName}>{fullNameMap[this.props.image]}</h2>
                        <h4 style={styles.majorQuote}>{
                            Quotes[this.props.image === "cardBack" ? this.props.quote : this.props.image]
                        }</h4>
                    </ul>
                </div>
            </Button>
        );
    }

    helper() {
        if (this.props.image !== 'cardBack') {
            this.props.history.push(`/info/${this.props.image}`)
        } else {
            alert("You don't own this card yet, try your luck by returning to the home page!")
        }
        
    }
}

const styles = {
    box: {
        width: '90vw',
        margin: '1.0vw',
        padding: '2vw',
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
        fontFamily: 'Ro',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '2.5vh',
        display: 'flex',
        lineHeight: '4.8vh',
        // marginLeft: "auto",
        // marginRight: "auto",
        justifyContent: 'center',
    },
    majorQuote: {
        justifyContent: 'center',
    },
    ul: {
        flexDirection: "column",
        display: 'flex',
        textAlign: "center",
        listStyleType: 'none',
        marginLeft: "auto",
        marginRight: "auto",
    }
}

export default withRouter(CollectionEntry);