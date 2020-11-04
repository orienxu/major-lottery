import React, { Component } from 'react';
import Res from './../config/image';
import './App.css';
import BackgroundColor from '../config/backgroundColor';
import Quote from '../config/Quote';

export default class InfoPage extends Component {

  constructor(match) {
    super();
    console.log(match)
    this.state = {
      apiResponse: 'Node failed',
      major: match['match']['params']['id']
    };
    
  }

  // async callAPI() {
  //   const response = await fetch('http://localhost:9000/login?username=weifeng&password=123');
  //   const data = await response.json();

  //   console.log('data', data);
  // }

  // componentDidMount() {
  //   this.callAPI();
  // }

  renderContent() {
    return (
      <div
        style={{justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        display: 'flex',

        flexDirection: 'column',
        backgroundColor: BackgroundColor[this.state.major],}}
      >
        <img src={Res[this.state.major]}
          style={{
            width: '67vmin',
            alignSelf: 'center',
            marginTop: '7vmin'
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              width: '100vmin',
              height: '25vmin',
              borderRadius: 30,
              backgroundColor: '#FFFDED',
              border: '2px',
              solid: '#000000',
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '3vmin'
            }}
          >
            <p style={{ fontFamily: 'PingFang SC', fontSize: '48px', lineHeight: '67px' }}>
              {"\“"}
            </p>
            <p style={{ fontFamily: 'PingFang SC', fontSize: '18px', lineHeight: '25px', fontWeight: '600' }}>
              {Quote[this.state.major]}
            </p>
            <p style={{ fontFamily: 'PingFang SC', fontSize: '48px', lineHeight: '67px' }}>
              {"\”"}
            </p>
          </div>
          <div
            style={{
              width: '90%',
              height: '1vmin',
              background: '#AAAAAA',
              marginTop: '7vmin',
            }}
          >

          </div>
          <div style={{ width: '100vmin', height: '100%' }}>
            <h3 style={{
              alignSelf: 'flex-center',
              marginLeft: 'auto',
              marginTop: '6vmin',
              fontFamily: 'PingFang SC',
              fontSize: '20px',
              lineHeight: '34px',
              fontWeight: '500'
            }}>
              专业介绍
            </h3>
            <img src={Res[this.state.major + "qr"]} style={{}}/>
          </div>
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
    alignItems: 'center',
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
  },
  quoteBox: {
    width: '98vmin',
    height: '35vmin',
    borderRadius: 30,
    backgroundColor: '#FFFDED',
    border: 1,
    solid: '#000000',
    boxSizing: 'border-box'
  }
}