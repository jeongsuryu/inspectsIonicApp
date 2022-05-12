import React from 'react';

const ResultText = (props) => {
    const {type, value} = props;

    return (
        <div>    
            <p className="result_recommend">
                {(type === 'depress' && value <= 18) && <span className="result_congrats">"건강하시네요. 축하합니다!"</span>}
                {(type === 'depress' && (value > 18 && value < 22)) && <span className="result_try">"기분 전환이 필요합니다."</span>}
                {(type === 'depress' && value >= 22) && <span className="result_warning">"전문의와 상의해주세요."</span>}
                {(type === 'stress' && value <= 15) && <span className="result_congrats">"건강하시네요. 축하합니다!"</span>}
                {(type === 'stress' && (value > 15 && value < 19)) && <span className="result_try">"기분 전환이 필요합니다."</span>}
                {(type === 'stress' && (value >= 19)) && <span className="result_warning">"전문의와 상의해주세요."</span>}
                {(type === 'dementia' && value <= 19) && <span className="result_warning">"전문의와 상의해주세요."</span>}
                {(type === 'dementia' && (value > 19 && value < 24)) && <span className="result_try">"조금 더 노력해주세요."</span>}
                {(type === 'dementia' && (value >= 24)) && <span className="result_congrats">"건강하시네요. 축하합니다!"</span>}
            </p>        
        </div>
    );
};


export default ResultText;