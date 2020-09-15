import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import Res from './../config/image';
import './App.css';
import { motion } from "framer-motion"

export default class InfoPage extends Component {

  constructor() {
    super();
    this.state = {
      isFlipped: false,
      apiResponse: 'Node failed',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  callAPI() {
    fetch('http://localhost:9000/login?username=xxx&password=xxxx')
      .then(res => res.text(),
        // console.log('res')
      )
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  renderContent() {
    return (
      <div
        style={styles.contentMain}
      >
        <h2 style={styles.contentTitle}>CSE</h2>
        <img src={Res.subjectFoster} style={{ width: '67vmin', alignSelf: 'center' }} />
        <div>
          <h3>
            人设概览
          </h3>
          <p style={{ textAlign: 'left', marginTop: '-3vmin' }}>
            cse是个一丝不苟的执行者，他喜欢跟团队一起学习成长，也包括打游戏
          </p>
          <h3>
            专业介绍
          </h3>
          <p style={{ textAlign: 'left', marginTop: '-3vmin' }}>
            cse作为华大最热门的专业之一，
            也是非常competitive的专业之一。
            但是专业里面的机会和师资是觉得worth所有applicant的努力。
            例如一年几度的career fair就有他们的专属场所。
          </p>
        </div>
      </div>
    );
  }

  renderTest() {
    return (
      <div>
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="horizontal"
          className="CardContainer"
        >
          <div>
            <img src={Res.hearthstone} className="App-logo" alt="logo" onClick={this.handleClick} />
          </div>
          <div>
            <img src={Res.subjectFoster} className="App-logo" alt="logo" onClick={this.handleClick} />
          </div>
        </ReactCardFlip>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }

  render() {
    console.log('rendered')
    return (
      <div className="App">
        {this.renderContent()}
        {/* {this.renderTest()} */}
      </div>
    );
  }
}

const styles = {
  contentMain: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#DDDDDD',
  },
  contentTitle: {
    marginLeft: '3vmin',
    marginTop: '1vmin',
  },
  contentPersonnel: {
    width: '100vmin',
    flexDirection: 'column',
  }
}