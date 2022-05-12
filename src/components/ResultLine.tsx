import React from 'react';

const ResultLine = (props) => {
    var type = props.type;

    return (
        <div>
            {type === "dementia" && (
                <div>
                    <p>19점 이하:
                        <span className="result_warning">전문의와 상의해 주세요.</span>
                    </p>
                    <p>
                        20점~23점:
                        <span className="result_try">조금 더 노력해 주세요.</span>
                    </p>
                    <p>
                        24점 이상:
                        <span className="result_congrats">건강하시네요. 축하합니다!</span>
                    </p>
                </div>
            )}

            {type === "depression" && (
                <div>
                    <p>
                        18점 이하:
                        <span className="result_congrats">건강하시네요. 축하합니다!</span>
                    </p>
                    <p>
                        19점~21점:
                        <span className="result_try">기분 전환이 필요합니다.</span>
                    </p>
                    <p>
                        22점 이상:
                        <span className="result_warning">전문의와 상의해주세요.</span>
                    </p>
                </div>
            )}
            {type === "stress" && (
                <div>
                    <p>
                        15점 이하:
                        <span className="result_congrats">건강하시네요. 축하합니다!</span>
                    </p>
                    <p>
                        16점~18점:
                        <span className="result_try">기분 전환이 필요합니다.</span>
                    </p>
                    <p>
                        19점 이상:
                        <span className="result_warning">전문의와 상의해주세요.</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default ResultLine;