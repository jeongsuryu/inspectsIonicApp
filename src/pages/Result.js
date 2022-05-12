import React from 'react';
import { Link } from 'react-router-dom';
import { chgTitle } from "../utils";
import ResultLine from '../components/ResultLine';

import styled from 'styled-components';

const Button = styled.button``;

const Result = ({ match }) => {
  const type  = match.params.type;
  const score = match.params.score;
  const title = chgTitle(type);

  return (
    <div className={`inspects_wrap ${type}`}>
        <h1 className="blind_inline">정신건강 테스트 앱</h1>
        <nav className="tnb_area" role="navigation">
            <div className="basic_box tool_bar">
                <Link to="/home" className="js-back_home btn_home"><img src="/assets/arrow_prev_white.svg" alt="이전으로 가기 화살표"/></Link>
                <h2 className="page_tit kiosk_page_tit">{title} 테스트</h2>
            </div>
        </nav>
        <div className="contents_wrap">
            <div className="result_tit_wrap">
                <h3 className="result_tit">검사 결과</h3>
                <div className="result_info_wrap">
                    <p className="result_info"><span>사용자</span>님의 점수는 <b className="result_score">'{score} 점'</b></p>
                    {type === 'depression' && 
                        <p className="result_recommend">
                            { score <= 18 && "건강하시네요. 축하합니다!"}
                            { (score > 18 && score < 22) && "기분 전환이 필요합니다."}
                            { score >= 22 && "전문의와 상의해주세요."}
                        </p>
                    }
                    {type === 'stress' &&
                    <p className="result_recommend">
                    { score <= 15 && "건강하시네요. 축하합니다!"}
                    { (score > 15 && score < 19) && "기분 전환이 필요합니다."}
                    { score >= 19 && "전문의와 상의해주세요."}
                    </p>
                    }
                    {type === 'dementia' &&
                    <p className="result_recommend">
                    { score <= 19 && "전문의와 상의해주세요."}
                    { (score > 19 && score < 24) && "조금 더 노력해주세요."}
                    { score >= 24 && "건강하시네요. 축하합니다!"}
                    </p>
                    }
                </div>
            </div>
            <div className="result_contents_wrap">
                <div className="result_standard_list">
                    <p className="result_standard_guide"> 노인층의 {title} 증상을<br /> 선별하기 위한 검사입니다. </p>
                    <ResultLine type={type} />
                </div>
                <Link to="/advt"className="btn_btm">
                    <Button>처음으로 돌아가기</Button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Result;
