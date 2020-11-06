import React, { Component } from 'react';
import Res from './../config/image';
import './App.css';
import BackgroundColor from '../config/backgroundColor';
import Quote from '../config/Quote';

const articleExists = {
  "cse": true,
  "acms": true,
  "arch": false,
  "biochem": false,
  "chem": false,
  "com": true,
  "ee": false,
  "info": true,
  "design": false,
  "foster": true,
  "math": false,
  "me": false,
  "music": false,
  "phys": false,
  "psych": true,
  "stat": true,
  "" : "",
  
  "cselink": "https://mp.weixin.qq.com/s?__biz=MzAwOTQxNDkwMQ==&mid=2651899657&idx=1&sn=6c8d60903ca4e57a08106e031c9928fe&chksm=80bb9693b7cc1f85d689753ede986ab38be4925a154dda21c71ba6f49ff83e8a6da8d7e78ae1&scene=178&cur_album_id=1353908768404373505#rd",
  "acmslink": "https://mp.weixin.qq.com/s?__biz=MzAwOTQxNDkwMQ==&mid=2651925026&idx=1&sn=c88b57774968a7b29e0cb6ae503c3708&chksm=80ba7bb8b7cdf2ae71261afaba4e020a4d6cd793f6b42e9b1d29bba3a13f7498cf1791afd671&scene=178&cur_album_id=1353908768404373505#rd",
  "comlink": "https://mp.weixin.qq.com/s?__biz=MzAwOTQxNDkwMQ==&mid=2651899730&idx=1&sn=a3e9971530d0de9e5e4b6f5ad3f4a626&chksm=80bb96c8b7cc1fde9e206d6d17974833134873a1dee14a7e5db76e2a737c0449ec1f55967a07&scene=178&cur_album_id=1353908768404373505#rd",
  "infolink": "https://mp.weixin.qq.com/s?__biz=MzAwOTQxNDkwMQ==&mid=2651904335&idx=1&sn=3149e0986741d4dba48d8bc660d7185a&chksm=80bb88d5b7cc01c377ffd1054bfcbcebacbf5aceca1908de43cb0fae91e62d6bd8a6ff6ab802&scene=178&cur_album_id=1353908768404373505#rd",
  "fosterlink": "https://mp.weixin.qq.com/s?__biz=MzAwOTQxNDkwMQ==&mid=2651898173&idx=1&sn=ad0dc4421f6efa977b354ca60179551d&chksm=80bb90a7b7cc19b1f4ae876fa796e7532fd1ee72022cba0593b72aa0e28885e3ee5d0f6719da&scene=178&cur_album_id=1353908768404373505#rd",
  "psychlink": "https://mp.weixin.qq.com/s?__biz=MzAwOTQxNDkwMQ==&mid=2651924195&idx=1&sn=7752b6d40f8375951d4fd9306a797a1d&chksm=80ba7779b7cdfe6fe06a22fa856b9f2a1a10939365b29bd7dc542c454cb3686ba5cc456e3405&scene=178&cur_album_id=1353908768404373505#rd",
  "statlink": "https://mp.weixin.qq.com/s?__biz=MzAwOTQxNDkwMQ==&mid=2651926992&idx=1&sn=3ae209eb3d672d8ae61f9465477da810&chksm=80ba604ab7cde95ca70d7545e9921e68a3b0eac6b13af48cd51534c950a8a283d087b40ba194&scene=178&cur_album_id=1353908768404373505#rd",
}


export default class InfoPage extends Component {

  constructor(match) {
    super();
    console.log(match)
    this.state = {
      apiResponse: 'Node failed',
      major: match['match']['params']['id']
    };
    
  }

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
          alt='major'
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
              {"“"}
            </p>
            <p style={{ fontFamily: 'PingFang SC', fontSize: '18px', lineHeight: '25px', fontWeight: '600' }}>
              {Quote[this.state.major]}
            </p>
            <p style={{ fontFamily: 'PingFang SC', fontSize: '48px', lineHeight: '67px' }}>
              {"”"}
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
            

              {articleExists[this.state.major] 
                && <div>
                      <h3 style={{
                        marginTop: '3vmin',
                        fontFamily: 'PingFang SC',
                        fontSize: '20px',
                        fontWeight: '500'
                      }}>
                        更多专业介绍↓↓
                      </h3>
                      <a href= {articleExists[this.state.major + "link"]}>
                        <img src={Res.article} style={{width: "40%"}} alt='major intro'/>
                      </a>
                    </div>
              }
              {!articleExists[this.state.major] 
                && <div>
                      <h3 style={{
                        marginTop: '3vmin',
                        fontFamily: 'PingFang SC',
                        fontSize: '20px',
                        fontWeight: '500'
                      }}>
                        查看更多专业介绍↓↓
                      </h3>
                      <img src={Res[this.state.major + "qr"]} alt="qrcode" />
                    </div>
              }
              <h3 style={{
                        marginTop: '3vmin',
                        fontFamily: 'PingFang SC',
                        fontSize: '20px',
                        fontWeight: '500'
              }}>
                查看更多课评↓↓
              </h3>
              <a href= "http://uwclassmate.com"><img src={Res.site} style={{width: "40%"}} alt="img of official website"/> </a>
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