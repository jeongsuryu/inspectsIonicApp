import React, { useEffect, useState } from 'react';

const AnswerYN = (props) => {
    const input_state = props.offAllSelect;
    const current_ary = props.ary;
    const [changeValue, setChangeValue] = useState(false);

    useEffect( () => {
        if (input_state === true) offChecked();
    }, [input_state]);

    useEffect(()=>{
        chkValue();
    }, [current_ary]);

    function handleSelect(e) {
        props.onAnswerSelect(Number(e.target.value));
    }

    function offChecked() {
        const input_items = document.querySelectorAll("input");

        for (var i = 0; i < input_items.length; i++) {
            input_items[i].checked = false;
        }
    }

    function chkValue() {
        if (current_ary.correct === "reverse") {
            setChangeValue(true);
        } else {
            setChangeValue(false);
        }
    }

    return (
        <div className="multiple_choice_area">
            <label className="multiple_choice_custom" htmlFor="multiple1">
                <input
                type="radio"
                name="multiple_choice_dementia"
                id="multiple1"
                value={changeValue === false ? 1 : 0}
                onClick={handleSelect}
                />
                <span className="multiple_choice_txt">예</span>
            </label>
            <label className="multiple_choice_custom" htmlFor="multiple2">
                <input
                type="radio"
                name="multiple_choice_dementia"
                id="multiple2"
                value={changeValue === false ? 0 : 1}
                onClick={handleSelect}
                />
                <span className="multiple_choice_txt">아니오</span>
            </label>
        </div>
    );
};

export default AnswerYN;