import React from 'react';
import { Link } from 'react-router-dom';
// import BackButton from '../components/BackButton';
import os from '../components/ChkOs';
// import "slick-carousel/slick/slick.css";
// import Slider from "react-slick";

const Advertisement = (props) => {    
    /* 언제쓸지모르니 주석
    // const settings = {
        //     dots: true,
        //     infinite: true,
        //     autoplay: true,
        //     autoplaySpeed: 2000,
        //     slidesToShow: 1,
        //     slidesToScroll: 1
        //   };*/
    //os별 다운로드 링크 변경하기    
    const OS = os;
    let link = '';
    if (OS == 'ios') {
        link = 'https://apps.apple.com/kr/app/%EC%97%94%EB%B8%8C%EB%A0%88%EC%9D%B8/id1546621816';
    } else {
        link = 'https://play.google.com/store/apps/details?id=careyou.enbrain.app';
    }

    return (
        <div className="inspects_wrap">
        <h1 className="blind_inline ads">정신건강 테스트 앱</h1>
        <div className="inspects_ads">
            <Link to="/home" className="btn_exit"><img src="/assets/icon_exit_white.svg" alt="나가기 아이콘"/></Link>
            <ul className="ads_slides_area">
            {/* <Slider className="ads_slides_area js-ads-slick" {...settings}> */}              
                <li className="ads_page_enbrain_game2">
                    <div className="ads_cont_safe_area">
                        <figure className="ads_cont_enbrain_game2">
                            <div className="img_wrap">
                                <img src="/assets/enbrain_game_icon.png" alt="엔브레인 게임 아이콘" />
                            </div>
                            <figcaption>
                                <h2 className="cont_tit">엔브레인</h2>
                                <p className="cont_para">
                                    <span className="highlight dot_point">하</span><span className="highlight dot_point">루</span>
                                    <span className="highlight dot_point">5</span><span className="highlight dot_point">분</span>
                                    두뇌활력 충전!<br />
                                    게임으로 쉽고 재미있게 <span className="highlight">치매 예방</span>
                                </p>
                                
                                <Link className="link_download_enbrain js-link-enbrain" to={{pathname:link}} target="_blank">다운로드</Link>
                                
                            </figcaption>
                        </figure>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    );
};
    
export default Advertisement;