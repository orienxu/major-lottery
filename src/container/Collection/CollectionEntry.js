import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import Res from '../../config/image';

const imageMap = {
    "cse.png": Res.cse,
    "acms.png": Res.acms,
    "arch.png": Res.arch,
    "biochem.png": Res.bioChem,
    "chem.png": Res.chem,
    "com.png": Res.com,
    "ee.png": Res.ee,
    "info.png": Res.info,
    "design.png": Res.design,
    "foster.png": Res.foster,
    "math.png": Res.math,
    "me.png": Res.me,
    "music.png": Res.music,
    "phys.png": Res.phys,
    "psych.png": Res.psych,
    "stat.png": Res.stat
}

const fullNameMap = {
    "cse.png": "Computer Science",
    "acms.png": "Applied and Computational Math Science",
    "arch.png": "Architecture",
    "biochem.png": "Biological Chemistry",
    "chem.png": "Chemistry",
    "com.png": "Communication",
    "ee.png": "Electrical Engineering",
    "info.png": "Informatic",
    "design.png": "Design",
    "foster.png": "Business Administration",
    "math.png": "Mathematics",
    "me.png": "Mechanical Engineering",
    "music.png": "Music",
    "phys.png": "Physics",
    "psych.png": "Psychology",
    "stat.png": "Statistics"
}


export default class CollectionEntry extends Component{    
    constructor() {
        super()
    }
    render() {
        return(
            <Button onClick={this.helper}>
                <div style={styles.box}>
                    <img src={imageMap[this.props.image]} style={styles.img} />
                    <h2 style={styles.majorName}>{fullNameMap[this.props.image]}</h2>
                </div>
            </Button>
        );
    }

    helper() {
        console.log("what ever")
    }
}

const styles = {
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