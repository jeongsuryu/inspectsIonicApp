import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Button = styled.button``;

const Intro = (props) => {
  const AUDIO = document.querySelector('.js-audio');
  const [imgsrc, setImgsrc] = useState('on');

  function handleSound() {
    setImgsrc(imgsrc==='on'? 'off' : 'on');
  }
  
  useEffect(()=> {
     handleAudio();
  },[imgsrc]);

  async function handleAudio() {
    if (imgsrc === 'on') {
      try {
        AUDIO.play();
        AUDIO.currentTime = 2;
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

  return (
      <div className="inspects_wrap dementia">
        <h1 className="blind_inline">정신건강 테스트 앱</h1>
        <nav className="tnb_area" role="navigation">
          <div className="basic_box tool_bar">
            <Link to="/home" className="btn_home">
              <img src="/assets/arrow_prev_white.svg" alt="이전으로 가기 화살표" />
            </Link>
            <h2 className="page_tit kiosk_page_tit">치매 테스트</h2>
            <button type="button" className="btn_sound_toggle" onClick={handleSound}>
              <img src={"/assets/icon_sound_"+imgsrc+".svg"} alt="소리 아이콘" />
              <audio autoPlay loop={false} src="recodes/dementia_0.mp3" className="js-audio"/>
            </button>
          </div>
        </nav>
        <div className="contents_wrap inspects_intro">
          <figure className="intro_contents_area">
            <div className="img_wrap">
              <span className="blind_block">테스트 카테고리 이미지</span>
            </div>
            <figcaption>
              <h3 className="cont_tit">
                치매 테스트
              </h3>
              <div className="cont_para">
                <p>지금부터 주식회사 캐어유에서</p>
                <p>제작한 정신건강테스트 중</p>
                <p>치매 테스트를 진행하겠습니다.</p>
                <br />
                <p>문제를 잘 보고</p>
                <p>신중히 선택해 주시기 바랍니다.</p>
              </div>
            </figcaption>
          </figure>
          <Link to={"/inspects/dementia"} className="btn_btm">
            <Button>시작하기</Button>
          </Link>
        </div>
      </div>

  );
};


export default Intro;
