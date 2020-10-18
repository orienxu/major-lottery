//import { Button } from 'react-native-elements';
import React, { Component } from 'react';
import './App.css';
import { motion } from 'framer-motion';

export default class UserPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          active: (props.locked && props.active) || false,
          value: props.value || "",
          error: props.error || "",
          labelA: props.labelA || "New Password",
          label: props.label || "Please Enter Again"
        };
      }
    
      changeValue(event) {
        const value = event.target.value;
        this.setState({ value, error: "" });
      }
    
      handleKeyPress(event) {
        if (event.which === 13) {
          this.setState({ value: this.props.predicted });
        }
      }

    renderContent() {
        const { active, value, error, labelA } = this.state;
        //const { active, value, error, lable} = this.state;
        const { predicted, locked } = this.props;
        const fieldClassName = `field ${(locked ? active : active || value) &&
        "active"} ${locked && !active && "locked"}`;
        
        return (
            <motion.div style={styles.contentMain} initial={{backgroundColor: '#72CCFF'}} animate={{backgroundColor: '#72CCFF', backgroundColor: '#BAD60F'}} transition={{duration:3, yoyo:Infinity}}>

                <section className="main-page">
                    

                    <div className="page-title">
                        <p>Password</p >
                    </div>

                    <div className="card-container" style={{ marginBottom: '4vmin' }}>
                        <div style={{ marginBottom: '1vmin' }}>New</div>
                        <div className={fieldClassName}>
                            {active && value && predicted && predicted.includes(value) && <p className="predicted">{predicted}</p>}
                            <input id={1}
                                type="text"
                                value={value}
                                placeholder={labelA}
                                onChange={this.changeValue.bind(this)}
                                onKeyPress={this.handleKeyPress.bind(this)}
                                onFocus={() => !locked && this.setState({ active: true })}
                                onBlur={() => !locked && this.setState({ active: false })}
                            />
                            <label htmlFor={1} className={error && "error"}>
                                {error || labelA}
                            </label>
                        </div>
                    </div>

                    <div className="cardContainer">
                        <div style={{ marginBottom: '1vmin' }} >Again</div>
                        <div className={fieldClassName}>
                            {active && value && predicted && predicted.includes(value) && <p className="predicted">{predicted}</p>}
                            <input id={1}
                                type="text"
                                value={value}
                                placeholder={labelA}
                                style={{marginBottom: '3vmin'}}
                                onChange={this.changeValue.bind(this)}
                                onKeyPress={this.handleKeyPress.bind(this)}
                                onFocus={() => !locked && this.setState({ active: true })}
                                onBlur={() => !locked && this.setState({ active: false })}
                            />
                            <label htmlFor={1} className={error && "error"}>
                                {error || labelA}
                            </label>
                        </div>
                        <button className="buttonUser" style={{ borderRadius: '5px', marginTop: '20px' }}>confirm</button>
                    </div>
                </section>
            </motion.div>
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    userInput: {
        marginRight: '2vmin',
    }
}