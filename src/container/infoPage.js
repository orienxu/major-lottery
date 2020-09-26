import React, { Component } from 'react';
import Res from './../config/image';
import './App.css';

export default class InfoPage extends Component {

  constructor() {
    super();
    this.state = {
      apiResponse: 'Node failed',
    };
  }

  async callAPI() {
    const response = await fetch('http://localhost:9000/login?username=weifeng&password=123');
    const data = await response.json();

    console.log(data);
  }

  componentWillMount() {
    this.callAPI();
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