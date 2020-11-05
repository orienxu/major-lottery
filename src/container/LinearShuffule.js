import Res from '../config/image';
import React from "react";
import { motion } from "framer-motion";
import { Page } from "framer";

const Animations = {
    backAndForth: {
        y: 0,
        x: ["-700vw", "400vw"],
        transition: {
          x: {
            duration: 5,
            type: "easeInOut"
          }
        }
      },
}
const ALL = ["cse", "ee", "info", "design", "acms", "biochem", "stat", "com", "arch", "me", "foster", "psych", "phys", "math", "music", "chem"]


const LinearShuffule = () => {
    const cards = ALL.map(card => {
        return createCard({image: card})
    })
    
    return (
        <Page
            style={STYLE.ANIMATION_DIV}
            defaultEffect={"pile"}
            contentWidth="auto"
            contentHeight="strech"
            direction="horizontal"
            dragEnabled={false}
        >
            {cards}
        </Page>
    )
}

//Creates each individual card base on names
const createCard = (props) => {
    return(
        <motion.div
          variants={Animations}
          animate={"backAndForth"}
          style={STYLE.CARD}
        > 
            <img style={STYLE.CARD_IMAGE} src={Res[props.image]} alt={props.image}></img>
        </motion.div>
    )
}

const STYLE = {
    ANIMATION_DIV: {
        position: "absolute",
        top: "50%",
        left: "3%",
        margin: "auto",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    CARD: {
        paddingLeft: "10vw",
    },
    CARD_IMAGE: {
        width: "120px",
        height: "240px "
    }
}

export default LinearShuffule