import React, { useEffect, useState } from 'react';

const AnswerFive = (props) => {
    const input_state = props.offAllSelect;
    const current_ary = props.ary;
    const [changeValue, setChangeValue] = useState(false);

  useEffect(() => {
      if ( input_state === true) offChecked();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input_state]);
    
    useEffect(()=>{//
      chkValue();      
    }, [current_ary]);

  function handleSelect(e) {
    props.onAnswerSelect(Number(e.target.value));
  }

  function offChecked() {
    const input_items = document.querySelectorAll('input');

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
      <label className="multiple_choice_custom" htmlFor="multiple3">
        <input
          type="radio"
          name="multiple_choice_dementia"
          value={changeValue === false ? 0 : 4}
          id="multiple3"
          onClick={handleSelect}
        />
        <span className="multiple_choice_txt">전혀 그렇지 않다.</span>
      </label>
      <label className="multiple_choice_custom" htmlFor="multiple4">
        <input
          type="radio"
          name="multiple_choice_dementia"
          value={changeValue === false ? 1 : 3}
          id="multiple4"
          onClick={handleSelect}
        />
        <span className="multiple_choice_txt">거의 그렇지 않다.</span>
      </label>
      <label className="multiple_choice_custom" htmlFor="multiple5">
        <input
          type="radio"
          name="multiple_choice_dementia"
          value={changeValue === false ? 2 : 2}
          id="multiple5"
          onClick={handleSelect}
        />
        <span className="multiple_choice_txt">때때로 그렇다.</span>
      </label>
      <label className="multiple_choice_custom" htmlFor="multiple6">
        <input
          type="radio"
          name="multiple_choice_dementia"
          value={changeValue === false ? 3 : 1}
          id="multiple6"
          onClick={handleSelect}
        />
        <span className="multiple_choice_txt">자주 그렇다.</span>
      </label>
      <label className="multiple_choice_custom" htmlFor="multiple7">
        <input
          type="radio"
          name="multiple_choice_dementia"
          value={changeValue === false ? 4 : 0}
          id="multiple7"
          onClick={handleSelect}
        />
        <span className="multiple_choice_txt">매우 자주 그렇다.</span>
      </label>
    </div>
  );
};

export default AnswerFive;
