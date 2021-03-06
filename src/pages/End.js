import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chgTitle, setTime } from "../utils";
import { service_host } from '../globalVar.js';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styled from 'styled-components';

const Button = styled.button``;

const End = ({match, history}) => {
  const AUDIO = document.querySelector('.js-audio');
  const [imgsrc, setImgsrc] = useState('on');

  const type  = match.params.type;
  const title = chgTitle(type);
  const class_name = type === 'depress' ? 'depression' : type;
  const score = match.params.score;
  const start_time = match.params.stime;
  const end_time = setTime();
  
  const [tk, setTk] = useState(setToken());
  const [info, setInfo] = useState(settingAxiosVal());

  useEffect(()=> {
    handleAudio();
 },[imgsrc]);

  async function insertInspect() {
    await axios.post(service_host+"/api/postInsertInspect", {
      "access_token" : tk,
      "game_name": type,
      "total_score" : score,
      "start_time":start_time,
      "end_time":end_time,
      "game_info": info
    }).then(function (res) {
      if (res) {
        AsyncStorage.removeItem('game_info');
        history.replace("/result/"+class_name+"/"+score);
      }
    }).catch(function (err) {
      console.log('postInsertInspect error: ', err);
    });
  }

  async function handleAudio() {
    if (imgsrc === 'on') {
      try {
        AUDIO.play();
        AUDIO.currentTime = 1;
      } catch(error) {
        console.log("play Error : ",error)
      }
    } else {
      try {
        if (AUDIO.paused === false) AUDIO.pause();         
      } catch(error) {
        console.log("stop Error : ",error)
      }
    }
   }

  function settingAxiosVal() {
    AsyncStorage.getItem('game_info').then(result => {
      setInfo(result);
    });
  }

  function setToken() {
    AsyncStorage.getItem("@access_token").then(result => {
      setTk(result);
    });
  }

  function handleSound() {
    setImgsrc(imgsrc==='on'? 'off' : 'on');
  }

  return (
    <div>
      <div className={`inspects_wrap ${class_name}`}>
        <h1 className="blind_inline">???????????? ????????? ???</h1>
        <nav className="tnb_area" role="navigation">
          <div className="basic_box tool_bar">
            <Link to="/home" className="btn_home"><img src="/assets/arrow_prev_white.svg" alt="???????????? ?????? ?????????" /></Link>
            <h2 className="page_tit">{title} ?????????</h2>
            <button type="button" className="btn_sound_toggle" onClick={handleSound}>
              <img src={"/assets/icon_sound_"+imgsrc+".svg"} alt="?????? ?????????" />
              <audio autoPlay loop={false} src="recodes/last_recode.mp3" className="js-audio"/>
            </button>
          </div>
        </nav>
        <div className="contents_wrap inspects_end">
          <figure className="end_contents_area">
            <div className="img_wrap">
              <span className="blind_block">????????? ???????????? ?????????</span>
            </div>
            <figcaption>
              <h3 className="cont_tit">{title} ?????????</h3>
              <p className="cont_para">
                ????????? ?????? ??????????????????.<br /><br />
                ???????????????.
              </p>
            </figcaption>
          </figure>
          <Button onClick={insertInspect} className="btn_btm">?????? ??????</Button>
        </div>
      </div>
    </div>
  );
};

export default End;
