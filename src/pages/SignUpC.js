import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { service_host } from '../globalVar.js';
import axios from "axios";

import styled from 'styled-components';

const Button = styled.button``;

const SignUpC = ({ match, history }) => { 
  const { name, birth, ocode } = match.params;
  const usertype = ocode ? 'gigwan' : 'general';
  const yyyy = birth ? birth.substr(0,4) : '';
  const mm = birth ? birth.substr(4,2) : '';
  const dd = birth ? birth.substr(6,2) : '';
  
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [rpw, setRpw] = useState('');

  const [btnNext, setBtnNext] = useState(false);

  const checkSpe = /[<(~!#$%^&*()-+)|\?/,):"'>]/;
  const handleEmail = (e) => {
    const v = e.target.value;

    if (checkSpe.test(v) == true) {
      return alert("특수문자를 사용하실 수 없습니다.");
    }

    setEmail(v);
  }

  const handlePw = e => {
    const tg = e.target.value;
    setPw(tg);
  }

  const handleRpw = e => {
    const tg = e.target.value;
    setRpw(tg);
  }

  function handleInputItems() {    
    if (email == "") {
      setBtnNext(false);
      return false;
    }

    if (pw == "") {
      setBtnNext(false);
      return false;
    }

    if (rpw == "") {
      setBtnNext(false);
      return false;
    }

    setBtnNext(true);
  }

  async function handleSubmit(e) {
    if (email.length < 6) {
      return alert("사용자 아이디는 6글자 이상이어야 합니다.");
    }

    if (pw !== rpw) {
      return alert("비밀번호 2가지가 서로 다릅니다.");
    }

    if (pw.length < 6) {
      return alert("비밀번호는 6글자 이상이어야 합니다.");
    }


    console.log(yyyy);

    await axios.post(service_host+"/api/signup", {
      usertype:usertype,
      name: name,
      email: email,
      password: pw,
      yyyy:yyyy,
      mm:mm,
      dd:dd,
      ocode: ocode == '' ? '0000':ocode
    }).then(function (res) {
      const result = res.data;
      console.log(result);

       if (result.code == 200) {
         alert(name+"님 환영합니다. 로그인 화면으로 이동합니다.");
         history.replace('/');
       }

       if (result.code == 500) {
        alert("이미 사용 중인 아이디이거나 알 수 없는 에러가 발생했습니다. 새로고침 후 다시 시도해주세요.");
       }
    }).catch(function (err) {
      console.log('axios api/signup error: ', err);
    });
  }

  return (
    <div className="signup_wrap">
      <h1 className="blind_inline">정신건강 테스트 앱 회원가입</h1>
      <nav className="tnb_area" role="navigation">
        <div className="basic_box">
          <Link to="/signup2" className="btn_home">
            <img src="/assets/arrow_prev_green.svg" alt="이전으로 가기 화살표" />
          </Link>
          <h2 className="page_tit">회원가입</h2>
        </div>
      </nav>
      <div className="index_bar">
        <span className="step passed"></span>
        <span className="line passed"></span>
        <span className="step passed"></span>
        <span className="line passed"></span>
        <span className="step active"></span>
      </div>
      <h2 className="signup_subtit">아이디 만들기</h2>
      <div className="terms_container">
        <form action="#" onSubmit={(e)=> e.preventDefault()}>     
          <div className="inp_area">
            <fieldset>
              <legend>사용하실 아이디를 입력해주세요</legend>
              <div className="inp_box">
                  <input type="text" name="inspects_email" placeholder="아이디 6자리 이상" className="inp" value={email} onChange={handleEmail} required onBlur={handleInputItems} autoComplete="off" minLength="6"/>
              </div>
            </fieldset>
            <fieldset>
              <legend>사용하실 비밀번호를 입력해주세요</legend>
              <div className="inp_box pw_box">
                <input type="password" name="inspects_pw" placeholder="비밀번호 6자리 이상" className="inp" value={pw} onChange={handlePw} required minLength="6" onBlur={handleInputItems} autoComplete="off"/>
              </div>
            </fieldset>
            <fieldset>
              <legend>비밀번호를 다시 한 번 입력해주세요</legend>
              <div className="inp_box">
                <input type="password" name="inspects_rpw" placeholder="비밀번호 확인" className="inp" value={rpw} onChange={handleRpw} onBlur={handleInputItems} minLength="6" required autoComplete="off"/>
              </div>
            </fieldset>
          </div>
        </form>        
      </div>      
      <div className="btn_area">
      {btnNext==true ? (
        <Button className="btn_next on" onClick={handleSubmit}>가입 완료</Button>
      ): (
        <Button className="btn_next">가입 완료</Button>
      )}
      </div>
    </div>
  );
}

export default SignUpC;