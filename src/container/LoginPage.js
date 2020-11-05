//import { Button } from 'react-native-elements';
import React,  { useState, useRef } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogTitle, Button } from '@material-ui/core';

function LogInPage(props) {
    var username, password, newPassword;
    let usernameInput = useRef(null);
    let passwordInput = useRef(null);
    const {onClose, open, loginAction, registerAction} = props;
    const [registerOpen, setRegisterOpen] = useState(false)

    const handleClose = () => {
        setRegisterOpen(false)
        onClose();
    }

    const handleLoginClick = () => {
       // console.log(username + password)
        if(username === null || username === "") {
            alert("username should not be empty");
        } else if (password === null || password === "") {
            alert("password should not be empty");
        } else {
            loginAction(username, password, true);
            onClose();
        }
    }

    const handleRegisterClick = () => {
        if(!registerOpen) {
            usernameInput.current.value = "";
            passwordInput.current.value = "";
            setRegisterOpen(true);
        } else {
            //console.log(password + username);
            if(username === null || username === "") {
                alert("username should not be empty");
            } else if (password === null || password === "") {
                alert("password shoudld not be empty");
            } else if(password === newPassword) {
                registerAction(username, password, true);
                setRegisterOpen(false);
                onClose();
            } else {
                console.log(password);
                console.log(newPassword);
                alert("password not match");
            }
            
        }
        
    }
    //this.handleChange = this.handleChange.bind(this);
    const handlePasswordChange = (e) => {
        password = e.target.value;
    }
    const handleUsernameChange = (e) => {
        username = e.target.value;
    }
    const handleNewPasswordChange = (e) => {
        newPassword = e.target.value;
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
                        
                        <TextField style={styles.inputs} inputRef={usernameInput} label="Username" helperText="请小于10个字符" variant="outlined"  inputProps={INPUT_PROPS.USERNAME, {maxLength: 10}} onChange={handleUsernameChange}/>
                        <TextField style={styles.inputs} inputRef={passwordInput} label="Password" helperText="请小于20个字符" variant="outlined" inputProps={INPUT_PROPS.PASSWORD} onChange={handlePasswordChange}/>
                        {registerOpen && <TextField 
                                            style={styles.inputs} 
                                            label="Confirm Password" 
                                            variant="outlined" 
                                            inputProps={INPUT_PROPS.PASSWORD} 
                                            onChange={handleNewPasswordChange}/> }
                        {registerOpen === false && <Button style={styles.loginButton} onClick={handleLoginClick}> 登陆 </Button> }
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
         maxLength: 20
     }
 }

const styles = {
    loginButton: {
        backgroundColor: '#4B2E83',
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