import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';

import { setTime, shuffle } from '../utils';
import { stress } from '../inspectsArrays';

import Tnb from '../components/Tnb';
import Question from '../components/Question';
import AnswerFive from '../components/AnswerFive';


import styled from 'styled-components';

const Button = styled.button``;

let transformQuestion = shuffle(stress);
let temp_info = "";

const Stress = ({ history, modal }) => {  
  const [startTime, setStartTime] = useState(setTime());
  const maxNbr = stress.length;

  const [gameInfo, setGameInfo] = useState('');
  const [Qnbr, setQnbr] = useState(1);
  const [currentAry, setCurrentAry] = useState(transformQuestion[Qnbr-1]);

  const [selectedVal, setSelectedVal] = useState(0); //사용자가 선택한 값
  const [score, setScore] = useState(0);

  const [showButton, setShowButton] = useState(false);
  const [onOffAllInput, setOnOffAllInput] = useState(false);
  const [soundOnOff, setSoundOnOff] = useState(true);
  const [showModal, setShowModal] = useState(modal);
  
  useEffect(()=>{
    if (Qnbr > 1) setCurrentAry(transformQuestion[Qnbr-1]);
  },[Qnbr]);

  const toggleModal = () => {//뒤로가기 클릭
    setShowModal(!modal);

    if ( soundOnOff == true ) {
      setSoundOnOff(false);
    }
  }

  const toggleSpeaker = () => {//소리 온오프
    setSoundOnOff(!soundOnOff);
  }

  /* 한 개 인풋 클릭할 때 */
  const onSelect = useCallback((value) => {
    setShowButton(true); //다음 문제로 가기 버튼 표시
    setOnOffAllInput(false); //인풋 상태 전체 클릭 해제 하는 로직 막기

    setSelectedVal(value); //선택한 값 저장
    temp_info = kipStorage(value); //선택한 값을 문자열로 저장
  });

  const kipStorage = useCallback((v) => {
    //게임 인포를 위한 문자열 만들기. 값을 선택할 때마다 매개변수가 바뀌고 들어온다
    const question_id = currentAry.id;
    //우울증, 스트레스 점수는 선택한 인풋의 value 가 곧 점수
    let temp = `{question_nbr: ${Qnbr}, Qid: ${question_id}, score: ${v}}`;

    if (maxNbr > Qnbr) {
      //마지막 문제에서는 콤마를 찍지 않는다
      temp += ', ';
    }

    return temp;
  });

  /* 다음 문제로 */
  const onNext = useCallback(() => {
    setScore(
      produce(draft => draft + selectedVal)
    );

    setShowButton(false); //'다음문제로 가기' 버튼 가리기
    setOnOffAllInput(true); //모든 인풋 상태 선택해제

    setGameInfo(
      produce(draft => draft + temp_info)
    );

    setQnbr(
      produce(draft => draft + 1)
    );

    setSelectedVal();
  });
  
  const saveStorage = useCallback(() =>{
    AsyncStorage.setItem('game_info', '{' + gameInfo + '}');
  });

  if (Qnbr > maxNbr) {
    saveStorage();
    history.push('/end/stress/' + score + '/' + startTime); //검사, 점수, 시작 시간 넘겨 페이지 이동
  }

  return (
    <div
      className="inspects_wrap stress">
      <h1 className="blind_inline">정신건강 테스트 앱</h1>
      <Tnb title="스트레스" onoff={soundOnOff} onClickSpeaker={toggleSpeaker} onClickPrev={toggleModal}/>

      {(maxNbr >= Qnbr) && (
        <div className="contents_wrap">
          <Question ary={currentAry} type="stress" qnbr={Qnbr} soundState={soundOnOff}/>

          <div className="inspects_contents_wrap">           
            <AnswerFive
              onAnswerSelect={onSelect}
              offAllSelect={onOffAllInput}
              ary={currentAry}
            />

            {showButton === true && (
              <Button
                className="btn_btm js-next_btn"
                onClick={onNext}
              >
                <span className="next_question">다음 문제로 넘어가기</span>
              </Button>
            )}
          </div>
        </div>
      )}

      {showModal === true && (
        <div className="modal_go_home js-modal-window on">
          <div className="modal_wrap">
            <div className="modal_contents">
              <img src="/assets/icon_warning.svg" alt="경고 아이콘" />
              <p className="modal_tit">
                메인 화면으로 <br />
                돌아가시겠습니까?
              </p>
              <p className="modal_para">
                진행 중인 테스트 과정이 <br />
                사라집니다.
              </p>
              <div className="btn_wrap">
                <Link to="/home" className="modal_btn2">확인</Link>
                <Button                  
                  className="modal_btn2"
                  onClick={() => setShowModal(!showModal)}
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stress;
