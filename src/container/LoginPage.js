//import { Button } from 'react-native-elements';
import React,  { useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogTitle, Button } from '@material-ui/core';

function LogInPage(props) {
    const {onClose, open, loginAction, registerAction} = props;
    const [registerOpen, setRegisterOpen] = useState(false)

    const handleClose = () => {
        setRegisterOpen(false)
        onClose();
    }

    const handleLoginClick = () => {
        loginAction();
        onClose();
    }

    const handleRegisterClick = () => {
        setRegisterOpen(true);
        //uncomment this to perform ur api fetch
        //registerAction();
        
    }

    return (
        <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title" 
        open={open}
        style={styles.outerDialog}
        fullWidth={true}
        >
            <DialogTitle> 登陆/注册 </DialogTitle>
                <motion.div style={styles.contentMain} >
                        
                        <TextField style={styles.inputs} label="Username" variant="outlined"  inputProps={INPUT_PROPS.USERNAME}/>
                        <TextField style={styles.inputs} label="Password" variant="outlined" inputProps={INPUT_PROPS.PASSWORD}/>
                        {registerOpen && <TextField style={styles.inputs} label="Confirm Password" variant="outlined" inputProps={INPUT_PROPS.PASSWORD}/> }
                        {registerOpen === false && <Button style={styles.loginButton}> 登陆 </Button> }
                        <Button style={styles.loginButton} onClick={handleRegisterClick}> 注册账号 </Button>
                </motion.div>

        </Dialog>
    )
}


const INPUT_PROPS = {
    USERNAME: {
        type: "email",
    },
    PASSWORD: {
        type: "password",
    }
}

const styles = {
    loginButton: {
        backgroundColor: '#4B2E83',
        marginTop: '5vmin',
        color: "white",
        width: "30vmin",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3vh",
        marginBottom: "0"
    },

    outerDialog: {
        margin: "auto",
    },
    contentMain: {
        display: 'flex',
        flexDirection: 'column',
        height: '200%',
        overflow: 'scroll',
        justifyContent: "center",
        marginBottom: "3vh"
    },
    inputs: {
        width: "80%",
        display: 'flex',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3vh",
    }
}

export default LogInPage