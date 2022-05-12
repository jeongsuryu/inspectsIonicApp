import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { App as CapacitorApp } from "@capacitor/app";

import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';
import loadable from '@loadable/component';

import styled from 'styled-components';

import {
  setTime,
  funcGetYear,
  funcGetSeason,
  funcGetMonth,
  funcGetDate,
  funcGetDay,
  funcGetSomething,
  funcGetCalMinus,
  funcSetImages
} from '../utils';
import { dementia } from '../inspectsArrays';

import Tnb from '../components/Tnb';
import Question from '../components/Question';
import AnswerFour from '../components/AnswerFour';

const AnswerView = loadable(()=> import('../components/AnswerView'));
const AnswerMultiImage = loadable(()=> import('../components/AnswerMultiImage'));
const AnswerOneImage = loadable(()=> import('../components/AnswerOneImage'));
const AnswerMove = loadable(()=> import('../components/AnswerMove'));
const AnswerIndexImage = loadable(()=>import('../components/AnswerIndexImage'));

let temp_info = '';

const Button = styled.button``;

const Dementia = (props) => {
  const [startTime, setStartTime] = useState(setTime());
  const maxNbr = dementia.length;
  
  const [gameInfo, setGameInfo] = useState('');
  const [Qnbr, setQnbr] = useState(1);
  
  const [currentAry, setCurrentAry] = useState(dementia[Qnbr-1]);
  var func = currentAry.choice_fnc;
  const [answersArray, setAnswersArray] = useState([]); // 현재 번호와 타입에 맞는 문제와 답 목록을 배열에서 가져온다
  var firstArray;
  const [correct, setCorrect] = useState(0);
  
  const [selectedVal, setSelectedVal] = useState(0); //사용자가 선택한 값
  const [selectedValMulti, setSelectedValMulti] = useState([]); //사용자가 선택한 멀티값
  const [score, setScore] = useState(0);

  const [showButton, setShowButton] = useState(false);
  const [onOffAllInput, setOnOffAllInput] = useState(false);
  const [soundOnOff, setSoundOnOff] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCurrentAry(dementia[Qnbr-1]);
  }, [Qnbr]);
  
  useEffect(()=> {
    func = currentAry.choice_fnc;
      
    if (func == 'paperMove' || func == 'triangleMove') {//기억하라는 문제, 드래그앤드랍 문제는 버튼을 기본으로 보여준다 view, move
    //  setAnswersArray([]);
      setCorrect('abc');
      setShowButton(true);
    } else if ( func == 'null' || func == undefined ) {
      setCorrect('');
      setAnswersArray([]); //이걸로 초기화하지 않으면 
      setShowButton(true);
    } else {
      firstArray = choiceFunction(func);
      setAnswersArray(firstArray[0]);
      setCorrect(firstArray[1]);
    }
  }, [currentAry]);

  const toggleModal = () => {//뒤로가기 클릭
    setShowModal(!showModal);
    
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

    if (value === 'success') {
      //드래그앤드랍, move 문제
      setSelectedVal(true);
      temp_info = kipStorage(true);
      return;
    }

    setSelectedVal(value); //선택한 값 저장
    temp_info = kipStorage(value); //선택한 값을 문자열로 저장
  });

  /* 여러 인풋 클릭할 때 */
  const onSelectMulti = useCallback((target) => {
    setOnOffAllInput(false);

    if (Qnbr === 12) temp_info = ''; //view 다음 문제를 위해서

    const temp_val = Number(target.value);
    
    if (target.checked === true) {
      if (showButton === false) setShowButton(true); //다음 문제로 가기 버튼 표시

      if (selectedValMulti.length >= correct.length) {
        target.checked = false;    
        return;
      }
    
      setSelectedValMulti(
        produce(draft => {
          draft.push(temp_val)
        })
      );
    } else if (target.checked === false) {
      const stringVal = selectedValMulti.join('');
      // console.log(stringVal);
      const idx = stringVal.indexOf(target.value);
      setSelectedValMulti(
        produce(draft => {
          draft.splice(idx,1)
        })
      );

      if (selectedValMulti.length === 1) {
        setShowButton(false);
      }
    }

    temp_info = kipStorage(selectedValMulti); //선택한 값을 문자열로 저장
  });

  const kipStorage = useCallback((v) => {
    //게임 인포를 위한 문자열 만들기. 값을 선택할 때마다 매개변수가 바뀌고 들어온다

    let temp;

    if (correct === v) {
      temp = `{"question_nbr": ${Qnbr}, "score": 1}`;
    } else if (correct !== v) {
      temp = `{"question_nbr": ${Qnbr}, "score": 0}`;
    }

    if (correct === 'abc') {
      //도형 이동
      if (v === true) {
        temp = `{"question_nbr": ${Qnbr}, "score": 1}`;
      } else if (v === null) {
        temp = `{"question_nbr": ${Qnbr}, "score": 0}`;
      }
    }

    if (typeof v === 'object') {
      //다중선택(순서 x)
      temp = `{"question_nbr": ${Qnbr}, "values": [${v}]}`;
    }

    if (maxNbr > Qnbr) {//마지막 문제에서는 콤마를 찍지 않는다
      temp += ', ';
    }

    return temp;
  });



  /* 다음 문제로 */
  const onNext = useCallback(() => {

    //setRender(false);
    calulateScore();

    setShowButton(false); //다음문제로 가기 버튼 가리기
    setOnOffAllInput(true); //모든 인풋 상태 선택해제

    setGameInfo(
      produce(draft => draft + temp_info)
    );

    setSelectedVal();
    setSelectedValMulti([]);
    setAnswersArray([]);
    setQnbr(
      produce(draft => draft+1)
    );
  });  
 
  const saveStorage = useCallback(() => {
    AsyncStorage.setItem('game_info', '{' + gameInfo + '}');
  });

  if (Qnbr > maxNbr) {
    saveStorage(); //게임 인포 저장
    props.history.push('/end/dementia/' + score + '/' + startTime); //검사, 점수, 시작 시간 넘겨 페이지 이동
  } 

  function calulateScore() {
    //치매 점수
    if (correct === 'abc' && selectedVal === true) {
      //도형이동
      setScore(
        produce(draft => draft+1)
      )
    } else if (currentAry.answer_type === 'multiImage') {
      //다중 선택
      for (var i=0; i<selectedValMulti.length; i++) {
        // console.log('선택값 ',selectedValMulti[i]);
        for (var j=0; j<correct.length; j++) {
          // console.log('정답 ',correct[j]);
          if (selectedValMulti[i] === correct[j]) {
            setScore(
              produce(draft => draft+1)
            )
          }
        }
      }
    } else if (currentAry.answer_type === "view") {
      temp_info = '';
    } else if (currentAry.answer_type === 'indexImage') { //순서 선택
      if (selectedValMulti[0] !== correct[0]) {
        return;
      }
      if (selectedValMulti[1] !== correct[1]) {
        return;
      }
      if (selectedValMulti[2] !== correct[2]) {
        return;
      }
      if (selectedValMulti[3] !== correct[3]) {
        return;
      }

      setScore(produce(draft => draft+1));
    }

    if (correct === selectedVal) {//일반 문제 기준
      setScore(
        produce(draft => draft+1)
      )
    }
  }

  /*치매 정답 목록 만들기*/
  function choiceFunction(obj) {
   // console.log('obj', obj);
    switch (obj) {
      case 'year':
        return funcGetYear();
      case 'season':
        return funcGetSeason();
      case 'month':
        return funcGetMonth();
      case 'date':
        return funcGetDate();
      case 'day':
        return funcGetDay();
      case 'do':
        return funcGetSomething(obj);
      case 'look':
        return funcGetSomething(obj);
      case 'posture':
        return funcGetSomething(obj);
      case 'gps':
        return funcGetSomething(obj);
      case 'country':
        return funcGetSomething(obj);
      case 'proverb':
        return funcGetSomething(obj);
      case 'emergencyCar':
        return funcGetSomething(obj);
      case 'sound':
        return funcGetSomething(obj);
      case 'oneChoice' :
        return funcSetImages(Qnbr);
      case 'thirdChoice':
        return funcSetImages(Qnbr);
      case 'numbersIndex':
        return funcSetImages(Qnbr);
      case 'fruitsIndex':
        return funcSetImages(Qnbr);
      case 'calculate':
        return funcGetCalMinus(Qnbr);
      default: return [Array(4), 0];
    }
  }


  return (
    <div className="inspects_wrap dementia">
      <h1 className="blind_inline">정신건강 테스트 앱</h1>
      <Tnb title="치매" onoff={soundOnOff} onClickSpeaker={toggleSpeaker} onClickPrev={toggleModal}/>

      {(maxNbr >= Qnbr) && (
        <div className="contents_wrap">
          <Question ary={currentAry} type="dementia" qnbr={Qnbr} soundState={soundOnOff}/>

          <div className="inspects_contents_wrap">
            
            {(currentAry.answer_type === 'four' || currentAry.answer_type === 'sound') && 
              <AnswerFour
                onAnswerSelect={onSelect}
                offAllSelect={onOffAllInput}
                answersArray={answersArray}
              />
            }
            
          {currentAry.answer_type === 'view' && (
            <AnswerView />
          )}
          {currentAry.answer_type === 'multiImage' && (
            <AnswerMultiImage
              onAnswerSelect={onSelectMulti}
              offAllSelect={onOffAllInput}
              currentNumber={Qnbr}
              answersArray={answersArray}
            />
          )}
          {currentAry.answer_type === 'indexImage' && (
            <AnswerIndexImage
              onAnswerSelect={onSelectMulti}
              offAllSelect={onOffAllInput}
              currentNumber={Qnbr}
              answersArray={answersArray}
            />
          )}

          {currentAry.answer_type === 'onceImage' && (
            <AnswerOneImage
              onAnswerSelect={onSelect}
              offAllSelect={onOffAllInput}
              currentNumber={Qnbr}
              answersArray={answersArray}
            />
          )}
          {currentAry.answer_type === 'move' && (
            <AnswerMove obj={currentAry.choice_fnc} onMoveSelect={onSelect} />
          )}        

            {showButton === true && (
              <Button
                type="button"
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
        <div className="modal_go_home on">
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
                  onClick={()=>setShowModal(!showModal)}
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

export default Dementia;
