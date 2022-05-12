import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Button = styled.button``;

const SignUpB = () => {
  const form = document.querySelector('#basic_form');
  const [btnNext, setBtnNext] = useState(false);
  const [signup3Link, setSignup3Link] = useState("");

  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
 // const [gender, setGender] = useState("");
  const [ocodeInp, setOcodeInp] = useState(false);
  const [ocode, setOcode] = useState("");

  useEffect(()=> {
    if (ocodeInp == true) {
      setSignup3Link(name+"/"+birth+"/"+ocode);
    } else {
      setSignup3Link(name+"/"+birth);
    }
  },[name, birth, ocodeInp, ocode]);

  const handleOcodeBox = (e) => {
    const tg = e.target;
    const on_off = tg.value;

    if (on_off == 'g') {
      setOcodeInp(true);
    } else {
      setOcodeInp(false);
    }
  }

  const handleGender = e => {
    const genders = document.querySelectorAll('.btn_gender');
    genders[0].classList.remove('active');
    genders[1].classList.remove('active');

    const tg = e.target;
    tg.classList.add('active');
    const gender = tg.getAttribute("data-gender");

//    setGender(gender);
    handleInputItems();
  }

  const checkSpe = /[~!@#$%^&*()_+|<>?;:{}'"]/;
  const handleName = (e) => {
    const v = e.target.value;
    
    if (checkSpe.test(v) == true) {
      return alert("이름에 특수문자를 사용하실 수 없습니다.");
    }

    setName(v);
  }

  const checkNum = /[0-9]/;
  const handleBirth = (e) => {
    const v = e.target.value;
  
    if (checkNum.test(v) == false) {
      return alert("숫자만 입력해주세요.");
    }

    setBirth(v);
  }

  const handleOcode = e => {
    const v = e.target.value;

    if (checkNum.test(v) == false) {
      return alert("숫자만 입력해주세요.");
    }

    setOcode(v);
    handleInputItems(); 
  }

  function handleInputItems() {
    
    if (name == "") {
      setBtnNext(false);
      return false;
    }

    if (birth == "") {
      setBtnNext(false);
      return false;
    }

   const community = form['community'];
   if (community.value == '') {
    setBtnNext(false);
    return false;
   }
    if (community.value == "g") {
      if (ocode == undefined || ocode == '') {
        setBtnNext(false);
        return false;
      }
    }    

    setBtnNext(true);
  }

  return (
    <div className="signup_wrap">
      <h1 className="blind_inline">정신건강 테스트 앱 회원가입</h1>
      <nav className="tnb_area" role="navigation">
        <div className="basic_box">
          <Link to="/signup1" className="btn_home">
            <img src="/assets/arrow_prev_green.svg" alt="이전으로 가기 화살표" />
          </Link>
          <h2 className="page_tit">회원가입</h2>
        </div>
      </nav>
      <div className="index_bar">
        <span className="step passed"></span>
        <span className="line passed"></span>
        <span className="step active"></span>
        <span className="line"></span>
        <span className="step"></span>
      </div>
      <h2 className="signup_subtit">기본정보 입력</h2>
      <div className="terms_container">
        <form id="basic_form" action="#" onSubmit={(e)=> e.preventDefault()}>     
          <div className="basic_inp_area">
            <fieldset>
                <legend>이름을 입력해주세요</legend>
                <div className="inp_box name_box">
                  <input type="text" className="inp" name="enbrain_name" placeholder="이름" value={name} onChange={handleName} required onBlur={handleInputItems}/>
                </div>
            </fieldset> 
            <fieldset>
              <legend>생년월일을 입력해주세요</legend>
              <div className="inp_box">
                <input type="text" className="inp" name="enbrain_birth" placeholder="생년월일 8자리 - 예, 20140723" maxLength="8" onBlur={handleInputItems} value={birth} onChange={handleBirth} />
              </div>
            </fieldset>
            {/* <fieldset className="gender_area">
              <legend>성별을 선택해주세요</legend>
              <button type="button" className="btn_gender female" data-gender="f" onClick={handleGender}>여성</button>
              <button type="button" data-gender="m" className="btn_gender active" onClick={handleGender}>남성</button>
            </fieldset> */}
            <fieldset className="gigwan_gain">
              <legend>기관 소속이신가요?</legend>
              <div className="check_area">
                <label className="check_custom">기관소속
                  <input type="radio" name="community" value="g" id="gigwan" onClick={handleOcodeBox}  onChange={handleInputItems}/>
                  <span className="checkmark"></span>
                </label>
                <label className="check_custom">일반회원
                  <input type="radio" name="community" value="n" onClick={handleOcodeBox} onChange={handleInputItems}/>
                  <span className="checkmark"></span>
                </label>
              </div>
                {ocodeInp == true && (
                  <div className="inp_box">
                    <input type="text" className="inp" name="ocode" placeholder="기관코드" maxLength="4" value={ocode} onChange={handleOcode} onBlur={handleInputItems}/>
                  </div>
                )}
            </fieldset>
          </div>
        </form>
      </div>        
      <div className="btn_area">
      {btnNext==true ? (
        <Link className="btn_next on" to={`/signup3/${signup3Link}`}>다음</Link>
      ) : (
        <Button className="btn_next"> 다음 </Button>
      )}
      </div>      
    </div>
  );
}

export default SignUpB;