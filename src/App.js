import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import Res from './config/image';
import Share from 'social-share-react'
import './App.css';


export default class DrawCards extends Component {

  constructor() {
    super();
    this.state = {
      isFlipped: false,
      apiResponse: 'Node failed',
    };
    this.handleClick = this.handleClick.bind(this);

  }

  callAPI() {
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text(),
        console.log('res')
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

  renderTop() {
    return (
      <div style={styles.topMain}>
        <img src={Res.arrow}
          style={{ width: '7vmin', marginLeft: '3vmin' }}
        />
        <div style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <img src={Res.star}
            style={{ width: '7vmin', marginRight: '1.5vmin' }}
          />
          <img src={Res.user}
            style={{ width: '7vmin', marginRight: '3vmin' }}
          />
        </div>
      </div >
    );
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

  // renderTest() {
  //   return (
  //     <div>
  //       <ReactCardFlip
  //         isFlipped={this.state.isFlipped}
  //         flipDirection="horizontal"
  //         className="CardContainer"
  //       >
  //         <div>
  //           <img src={Res.hearthstone} className="App-logo" alt="logo" onClick={this.handleClick} />
  //         </div>
  //         <div>
  //           <img src={Res.subjectFoster} className="App-logo" alt="logo" onClick={this.handleClick} />
  //         </div>
  //       </ReactCardFlip>
  //       <p>{this.state.apiResponse}</p>
  //       <Share
  //         url='https://www.baidu.com'
  //         title='分享生活点滴'
  //         disabled={['google', 'facebook', 'twitter', 'qq', 'douban', 'tencent', 'linkedin']}
  //         descripiton='我抽到了Foster专业'
  //         image={Res.subject1}
  //         site={['wechat']}
  //       />
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="App">
        {this.renderTop()}
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
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    height: '100vh',
    overflow: 'hidden',
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

