import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import subject1 from './res/subject1.png';
import subject2 from './res/subject2.png';
import subjectFoster from './res/subject-foster.png';
import hearthstone from './res/Hearthstone.jpg';
import Share from 'social-share-react'
import './App.css';


export default class DrawCards extends Component {

  constructor() {
    super();
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);

  }

  CardFlip = () => {
    // const [isFlipped, setIsFlipped] = userState(false);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {


    return (
      <div className="App">
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="horizontal"
          className="CardContainer"
        >
          <div>
            <img src={hearthstone} className="App-logo" alt="logo" onClick={this.handleClick} />
          </div>
          <div>
            <img src={subjectFoster} className="App-logo" alt="logo" onClick={this.handleClick} />
          </div>
        </ReactCardFlip>
        <Share
          url='https://www.baidu.com'
          title='分享生活点滴'
          disabled={['google', 'facebook', 'twitter', 'qq', 'douban', 'tencent', 'linkedin']}
          descripiton='我抽到了Foster专业'
          image={subject1}
          site={['wechat']}

        />
      </div>
    );
  }

}

