import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Category from '../components/Category.js';
import os from '../components/ChkOs';

const Home = (props) => {  

    const search = qs.parse(props.location.search, {
        ignoreQueryPrefix:true
    });

    const [name, setName] = useState("");
    
    useEffect(()=>{        
        if (search.memory == 'true') {//로그인 상태 유지를 클릭하고 submit 해서 들어오면, 스토리지 셋팅
            AsyncStorage.setItem('memorySession', true);
        } else if (search.memory == 'false') {//이 코드가 작동하는지 모르겠다
            AsyncStorage.removeItem('memorySession');
        }
    },[]);

    useEffect(()=>{
        AsyncStorage.getItem('@name').then((res)=>{
            setName(res);

            if (name == null) {//로그인 안하고 접근시 로그인 페이지로 이동
                props.history.replace("/");            
             }
        }).catch((err)=>{
            console.log("Home useEffect Error: ", err);
        });
    }, [name]);

    //하단 배너의 다운로드 링크 생성
    const OS = os();
    let link = '';
    if (OS == 'ios') {
        link = 'https://apps.apple.com/kr/app/%EC%97%94%EB%B8%8C%EB%A0%88%EC%9D%B8/id1546621816';
    } else {
        link = 'https://play.google.com/store/apps/details?id=careyou.enbrain.app';
    }

    return(
        <div className="wrap_inspects_home">
            <nav className="tnb_area home">
                <div className="basic_box">
                    <div className="welcome_txt">{name}님, 환영합니다!</div>
                    <Link to={`/option/${name}`} className="btn_hamburger">
                        <img src="/assets/icon_hamburger.svg" alt="햄버거 메뉴 아이콘"/>
                    </Link>
                </div>
            </nav>
            <div className="contents_wrap inspects_home">
                <h2 className="cont_tit">테스트를 선택해주세요.</h2>
                <div className="test_category_boxes">
                    <Category type="dementia" tit="치매" subtit="Dementia"/>
                    <Category type="depression" tit="우울증" subtit="Depression"/>
                    <Category type="stress" tit="스트레스" subtit="Stress"/>
                </div>
            </div>
            <Link to={{pathname:link}} target="_blank" className="banner_thin_area">
                <div className="banner_box">
                    <div className="banner_cont_wrap">
                        <p className="banner_para">
                            게임으로 쉽고 재미있게 <span className="highlight">치매 예방</span>
                        </p>
                        <p className="banner_tit">
                            하루5분 두뇌활력 엔브레인
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
export default Home;