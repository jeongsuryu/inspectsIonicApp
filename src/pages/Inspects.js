import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { App as CapacitorApp } from "@capacitor/app";

import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';

import {
  chgTitle,
  setTime,
  funcGetYear,
  funcGetSeason,
  funcGetMonth,
  funcGetDate,
  funcGetDay,
  funcGetSomething,
  funcGetCalMinus,
  funcSetImages,
  shuffle
} from '../utils';
import { stress, depression, dementia } from '../inspectsArrays';
import Tnb from '../components/Tnb';
import Question from '../components/Question';
import AnswerYN from '../components/AnswerYN';
import AnswerFour from '../components/AnswerFour';
import AnswerFive from '../components/AnswerFive';
import AnswerView from '../components/AnswerView';
import AnswerMultiImage from '../components/AnswerMultiImage';
import AnswerOneImage from '../components/AnswerOneImage';
import AnswerMove from '../components/AnswerMove';
import AnswerIndexImage from '../components/AnswerIndexImage';

let start_time = '';
let temp_info = '';
let score = 0;
let transformQuestion = [];

const Inspects = ({ history, match, modal }) => {
  

  const type = match.params.type;
  const title = chgTitle(type);
  
  const maxNbr = type === 'depression' ? depression.length : (type === 'stress' ? stress.length : dementia.length);
  let func = '';
      
  const [Qnbr, setQnbr] = useState(1);
  const [gameInfo, setGameInfo] = useState('');
  transformQuestion = type === 'depression' ? shuffle(depression) : (type == 'stress' ? shuffle(stress) : dementia);
  
  const [currentAry, setCurrentAry] = useState(transformQuestion[Qnbr-1]);

  const [answersArray, setAnswersArray] = useState([]); // 치매에서 현재 번호와 타입에 맞는 문제와 답 목록을 배열에서 가져온다

  const [showButton, setShowButton] = useState(false);
  const [onOffAllInput, setOnOffAllInput] = useState(false);
  const [showModal, setShowModal] = useState(modal);

  const [selectedVal, setSelectedVal] = useState(0); //사용자가 선택한 값
  const [selectedValMulti, setSelectedValMulti] = useState([]); //사용자가 선택한 멀티값
  const [correct, setCorrect] = useState(0);
  const [render, setRender] = useState(false);
  const [soundOnOff, setSoundOnOff] = useState(true);

  /* 최초 실행 { */
  useEffect(() => {
    console.log('transformQuestion :::::: ',transformQuestion);
   
    start_time = setTime();    

    if (type == 'dementia') {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      func = currentAry.choice_fnc; //문제에 맞는 함수를 적용하기 위한
      const firstAnswer = choiceFunction(func);
      setCorrect(firstAnswer[1]);
      const tempAnswer = firstAnswer[0]; //답 목록 배열
      setAnswersArray(tempAnswer);
    }

    setRender(true);
  }, []);
  /* } 최초 실행  */
  

  function toggleModal() {
    setShowModal(!modal);
  }

  function toggleSpeaker() {
    setSoundOnOff(!soundOnOff);
  }

  /* onNext 함수에서 currentAry 가 변경될 때. 치매 문제만 */
  useEffect(() => {
    if (type !== 'dementia') return;
    setSelectedValMulti([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    func = currentAry.choice_fnc;
    if (func === undefined || func=== 'paperMove' || func === 'triangleMove') {//기억하라는 문제, 드래그앤드랍 문제는 버튼을 기본으로 보여준다 view, move
      setCorrect('abc');
      setShowButton(true);
      setRender(true);
      return;
    }   

    var temp_arry = choiceFunction(func);
    
    const temp_answer = temp_arry[0];
    setAnswersArray(temp_answer);
    
    setCorrect(temp_arry[1]);
    setRender(true);
  }, [currentAry]);

  useEffect(()=>{
    setCurrentAry(transformQuestion[Qnbr-1]);
  },[Qnbr]);


  /* 한 개 인풋 클릭할 때 */
  function onSelect(value) {
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
  }
  /* 여러 인풋 클릭할 때 */
  function onSelectMulti(target) {
    setOnOffAllInput(false);

    if (type === 'dementia' && Qnbr === 12) temp_info = ''; //view 다음 문제를 위해서

    const temp_val = Number(target.value);
    
    if (target.checked === true) {
      if (showButton === false) setShowButton(true); //다음 문제로 가기 버튼 표시

      if (selectedValMulti.length > correct.length) {
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
  }

  function kipStorage(v) {
    //게임 인포를 위한 문자열 만들기. 값을 선택할 때마다 바뀌고 들어온다
    let temp = '';

    if (type !== 'dementia') {
      //우울증, 스트레스 점수는 선택한 인풋의 value 가 곧 점수
      temp = `{"question_nbr": ${Qnbr}, "score": ${v}}`;
    } else {
      //치매 점수 계산 방법은 문제마다 다르다

      if (correct === v) {
        temp = `{"question_nbr": ${Qnbr}, "score": 1}`; //임시점수
      } else if (correct !== v) {
        temp = `{"question_nbr": ${Qnbr}, "score": 0}`; //임시점수
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
    }

    if (maxNbr > Qnbr) {
      //마지막 문제에서는 콤마를 찍지 않는다
      temp += ',';
    }

    return temp;
  }

  /* 다음 문제로 */
  function onNext() {
    if ( type === 'dementia' ) setRender(false);

    setShowButton(false); //다음문제로 가기 버튼 가리기
    calulateScore();
    setOnOffAllInput(true); //모든 인풋 상태 선택해제

    setGameInfo(
      produce(draft => draft + temp_info)
    );

    if (currentAry.answer_type === "view") {
      temp_info = '';
    }

    setQnbr( prevState => prevState+1 );

    if (Qnbr === maxNbr) {
      history.push('/end/' + type + '/' + score + '/' + start_time); //검사, 점수, 시작 시간 넘겨 페이지 이동
      saveStorage(); //게임 인포 저장
      score = 0;
    } 

    setSelectedVal();
    setSelectedValMulti([]);
  }

 
  function saveStorage() {
    AsyncStorage.setItem('game_info', '{' + gameInfo + '}');
  }

  function calulateScore() {
    if (type === 'depression') {
      //우울증 점수      
      if (
        (currentAry.correct === true && selectedVal === 0) ||
        (currentAry.correct === 'reverse' && selectedVal === 1)
      ) {
        score += 1;
      }
    } else if (type === 'stress') {
      //스트레스 점수
      // console.log('스트레스계산', score);
      score = score + selectedVal;
    } else if (type === 'dementia') {
      //치매 점수
      if (correct === 'abc' && selectedVal === 'success') {
        //도형이동
        score += 1;
      } else if (currentAry.answer_type === 'multiImage') {
        //다중 선택
        for (var i=0; i<selectedValMulti.length; i++) {
          // console.log('선택값 ',selectedValMulti[i]);
          for (var j=0; j<correct.length; j++) {
            // console.log('정답 ',correct[j]);
            if (selectedValMulti[i] === correct[j]) {
              score += 1;
            }
          }
        }
        // console.log(score);
      } else if (correct === selectedVal) {
        //일반 문제 기준
        score += 1;
      }
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
    }
  }


  return (
    <div
      className={`inspects_wrap ${
        type === 'depression' ? 'depression question' : type
      }`}
    >
      <h1 className="blind_inline">정신건강 테스트 앱</h1>
      <Tnb title={title} onoff={soundOnOff} onClickSpeaker={toggleSpeaker} onClickPrev={toggleModal}/>

      {(maxNbr >= Qnbr) && (render === true) && (
        <div className="contents_wrap">
          <Question ary={currentAry} type={type} qnbr={Qnbr} soundState={soundOnOff}/>

          <div className="inspects_contents_wrap">
            {type === 'depression' && 
              <AnswerYN
                onAnswerSelect={onSelect}
                offAllSelect={onOffAllInput}
              />
            }
            {type === 'stress' && 
              <AnswerFive
                onAnswerSelect={onSelect}
                offAllSelect={onOffAllInput}
                ary={currentAry}
              />
            }

            {type === 'dementia' && currentAry.answer_type === 'four' && 
              <AnswerFour
                onAnswerSelect={onSelect}
                offAllSelect={onOffAllInput}
                answersArray={answersArray}
              />
            }
            {type === 'dementia' && currentAry.answer_type === 'sound' && 
              <AnswerFour
                onAnswerSelect={onSelect}
                offAllSelect={onOffAllInput}
                answersArray={answersArray}
              />
            }
          {type === 'dementia' && currentAry.answer_type === 'view' && (
            <AnswerView />
          )}
          {type === 'dementia' && currentAry.answer_type === 'multiImage' && (
            <AnswerMultiImage
              onAnswerSelect={onSelectMulti}
              offAllSelect={onOffAllInput}
              currentNumber={Qnbr}
              answersArray={answersArray}
            />
          )}
          {type === 'dementia' && currentAry.answer_type === 'indexImage' && (
            <AnswerIndexImage
              onAnswerSelect={onSelectMulti}
              offAllSelect={onOffAllInput}
              currentNumber={Qnbr}
              answersArray={answersArray}
            />
          )}

          {type === 'dementia' && currentAry.answer_type === 'onceImage' && (
            <AnswerOneImage
              onAnswerSelect={onSelect}
              offAllSelect={onOffAllInput}
              type={Qnbr}
              answersArray={answersArray}
            />
          )}
          {type === 'dementia' && currentAry.answer_type === 'move' && (
            <AnswerMove obj={currentAry.choice_fnc} onMoveSelect={onSelect} />
          )}        

            {showButton === true && (
              <button
                type="button"
                className="btn_btm js-next_btn"
                onClick={onNext}
              >
                <span className="next_question">다음 문제로 넘어가기</span>
              </button>
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
                <Link to="/home" className="modal_btn2 js-modal-close">
                  확인
                </Link>
                <button
                  type="button"
                  className="modal_btn2"
                  onClick={() => setShowModal(!showModal)}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspects;
