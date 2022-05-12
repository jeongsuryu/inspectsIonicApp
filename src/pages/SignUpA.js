import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from 'styled-components';

const Button = styled.button``;

const SignUpA = () => {
  const [agreeTerm1, setAgreeTerm1] = useState(false);
  const [agreeTerm2, setAgreeTerm2] = useState(false);
  const [agreeTerm3, setAgreeTerm3] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);

  useEffect(() => {
    if (agreeTerm1 == false || agreeTerm2 == false || agreeTerm3 == false) {
      setAgreeAll(false);
    }
    if (agreeTerm1 == true && agreeTerm2 == true && agreeTerm3 == true) {
      setAgreeAll(true);
    }
  }, [agreeTerm1, agreeTerm2, agreeTerm3]);

  const handleAllAgree = (e) => {
    const tg = e.target;

    if (tg.checked == true) {
      setAgreeTerm1(true);
      setAgreeTerm2(true);
      setAgreeTerm3(true);
    } else {
      setAgreeTerm1(false);
      setAgreeTerm2(false);
      setAgreeTerm3(false);
    }
  };

  const handleAgreeTerm = (e) => {
    const tg = e.target;
    const name = tg.name;

    if (name == "agree_term1") {
      setAgreeTerm1(!agreeTerm1);
    } else if (name == "agree_term2") {
      setAgreeTerm2(!agreeTerm2);
    } else if (name == "agree_term3") {
      setAgreeTerm3(!agreeTerm3);
    }
  };

  return (
    <div className="signup_wrap">
      <h1 className="blind_inline">정신건강 테스트 앱 회원가입</h1>
      <nav className="tnb_area" role="navigation">
        <div className="basic_box">
          <Link to="/" className="btn_home">
            <img src="/assets/arrow_prev_green.svg" alt="이전으로 가기 화살표" />
          </Link>
          <h2 className="page_tit">회원가입</h2>
        </div>
      </nav>
      <div className="index_bar">
        <span className="step active"></span>
        <span className="line"></span>
        <span className="step"></span>
        <span className="line"></span>
        <span className="step"></span>
      </div>
      <h2 className="signup_subtit">이용약관 동의</h2>
      <div className="terms_container">
        <div className="agree_area all_terms_area">
          <label className="check_custom">
            이용 약관 전체 동의하기
            <input
              type="checkbox"
              name="agree_terms"
              id="agree_terms"
              onClick={handleAllAgree}
              checked={agreeAll}
              readOnly
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="agree_area">
          <label className="check_custom">
            서비스 이용약관 동의 (필수)
            <input
              type="checkbox"
              name="agree_term1"
              id="agree_term1"
              onClick={handleAgreeTerm}
              checked={agreeTerm1}
              readOnly
            />
            <span className="checkmark"></span>
          </label>
          <Link to={{ pathname: "https://careyou.modoo.at/?link=8mftwd04" }} target="_blank" className="btn_term">
            내용보기
          </Link>
        </div>
        <div className="agree_area">
          <label className="check_custom">
            개인정보처리방침 동의 (필수)
            <input
              type="checkbox"
              name="agree_term2"
              id="agree_term2"
              onClick={handleAgreeTerm}
              checked={agreeTerm2}
              readOnly
            />
            <span className="checkmark"></span>
          </label>
          <Link to={{ pathname: "https://careyou.modoo.at/?link=atdka2zp" }} target="_blank" className="btn_term">
            내용보기
          </Link>
        </div>
        <div className="agree_area">
          <label className="check_custom">
            제 3자 제공에 별도 동의 (필수)
            <input
              type="checkbox"
              name="agree_term3"
              id="agree_term3"
              onClick={handleAgreeTerm}
              checked={agreeTerm3}
              readOnly
            />
            <span className="checkmark"></span>
          </label>
          <Link to={{ pathname: "https://careyou.modoo.at/?link=auue28wz" }} target="_blank" className="btn_term">
            내용보기
          </Link>
        </div>
      </div>
      <div className="btn_area">
        {agreeAll ? (
          <Link to="/signup2" className="btn_next on">
            <Button>다음</Button>            
          </Link>
        ) : (
          <Button className="btn_next">다음</Button>
        )}
      </div>
    </div>
  );
};

export default SignUpA;
