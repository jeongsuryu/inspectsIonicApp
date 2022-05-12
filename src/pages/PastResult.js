import React from "react";
import { Link } from 'react-router-dom';
import LastResult from "../components/LastResult.js";
import PastListItems from "../components/PastListItems.js";

function PastResult(props) {
    const { type, name } = props.match.params;

  return (
    <div className={`inspects_wrap ${type}`}>
      <h1 className="blind_inline">정신건강 테스트 앱</h1>
      <nav className="tnb_area" role="navigation">
        <div className="basic_box tool_bar">
          <button type="button" onClick={() => props.history.push(`/option/${name}`)} className="js-back_home btn_home">
            <img src="/assets/arrow_prev_white.svg" alt="이전으로 가기 화살표" />
          </button>
          <h2 className="page_tit">지난 점수 다시보기</h2>
        </div>
      </nav>
      <div className="contents_wrap">
        <div className="result_tit_wrap">
          <h3 className="result_tit">최근 결과 점수</h3>
          <LastResult type={type === 'depression' ? 'depress' : type}/>
        </div>
        <div className="result_contents_wrap">
          <PastListItems type={type === 'depression' ? 'depress' : type}/>          
          <Link to="/home" className="btn_btm">
            처음으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PastResult;