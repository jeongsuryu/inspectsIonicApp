import React, { useEffect, useState, useCallback } from 'react';
import { Link  } from 'react-router-dom';
//import { IonPage } from '@ionic/react';
import { service_host } from '../globalVar.js';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styled from 'styled-components';

const Button = styled.button``;

const Index = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tgPw, setTgPw] = useState(0);
    const [checkSs, setCheckSs] = useState(false);
    const [memorySession, setMemorySession] = useState('');

    useEffect(()=> {//로그인 상태에서 접근시 홈으로 이동
        AsyncStorage.getItem('memorySession').then((res)=>{
            setMemorySession(res);
        });
    },[]);

    useEffect(()=>{
        if (memorySession == 'true') {
            props.history.replace("/home");
        }
    },[memorySession]);

    function emailHandler(e) {
        setEmail(e.target.value);
    }
    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    function handleTogglePw() {
        setTgPw(tgPw===0?1:0);
    }

    function handleEnter(e) {
        if (e.key ==="Enter") submitId()
    }

    function checkSession() {
        setCheckSs(!checkSs);
    }

    async function submitId() {
        if (email.length == 0) {
            return alert('이메일이나 아이디를 입력해주세요.');
        }
        if (password.length == 0) {
            return alert('비밀번호를 입력해주세요.');
        }

        await axios.post(service_host+"/api/login", {
            "email": email,
            "password": password
        }).then(function (res) {
            const datas = res.data;
            const name = datas.data.name;
            const token = datas.data.access_token;
            if (token) {
                AsyncStorage.setItem('@access_token',token);
                AsyncStorage.setItem('@name', name);
                AsyncStorage.setItem('@email', email);
            }

            if (checkSs == true || checkSs == false) {//로그인 상태 유지(세션) - 단순히 페이지 접근할 때는 submitID에 들어오지 않으므로 
                props.history.push("/home?memory="+checkSs);
            } else {
                props.history.push("/home");
            }

        }).catch(function (err) {
            console.log('submitId error: ', err);
            alert("로그인에 실패했습니다. 정보를 확인해주세요.");
            setPassword('');
            AsyncStorage.removeItem("@name");
            AsyncStorage.removeItem("@email");
            AsyncStorage.removeItem("@access_token");
        });
    }  

    return (
        <div className="inspects_wrap">
            <h1 className="blind_inline">정신건강 테스트 앱</h1>
            <div className="instpects_login">
                <div className="title_area">
                    <h2>MENTAL HEALTH TEST</h2>
                    <p>정신건강테스트</p>
                </div>
                <form action="#" onSubmit={(e)=> e.preventDefault()}>     
                <div className="login_area">
                    <fieldset>
                        <legend>이메일 주소나 아이디를 입력해주세요</legend>
                        <div className="inp_box">
                            <input type="text" name="enbrain_email" placeholder="이메일 주소 또는 아이디" value={email} required onChange={emailHandler} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>비밀번호를 입력해주세요</legend>
                        <div className="inp_box box_lay2">
                            <input type={tgPw===0?"password":"text"} name="enbrain_password" placeholder="패스워드" value={password} onChange={passwordHandler} onKeyPress={handleEnter} required />
                            <span onClick={handleTogglePw} className="btn_show_blind js-btn_onoff_pw">SHOW</span>
                        </div>
                    </fieldset>
                        <fieldset>
                        <legend>로그인을 유지하시겠습니까?</legend>
                        <label className="check_custom">로그인 상태 유지
                            <input type="checkbox" name="session_log" id="session_log" value={checkSs} onClick={checkSession}/>
                            <span className="checkmark"></span>
                        </label>
                    </fieldset>
                    {/* <button type="submit" onClick={submitId} className="btn_ispt_blue js-signin">로그인</button> */}
                    <Button onClick={submitId} className="btn_ispt_blue">로그인</Button>
                </div>
                </form>
                <div className="signs_area">
                    <Link to={{pathname: "https://enbrain.kr/signup-find"}} target="_blank">아이디 찾기</Link>
                    <Link to={{pathname: "https://enbrain.kr/signup-find"}} target="_blank" className="middle_txt">비밀번호 재설정</Link>
                    <Link to="/signup1" className="last_txt">회원가입</Link>
                </div>
                <div className="foot_version_info">
                    <b>버전 정보</b><span>현재 버전 : 2.53</span>
                </div>
            </div>
        </div>
    );
}
export default Index;