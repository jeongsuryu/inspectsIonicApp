import React, { useEffect } from 'react';

const AnswerFour = (props) => {
  const input_state = props.offAllSelect;  
  const list = props.answersArray;
  //console.log(list);

  useEffect(() => {
      if (input_state === true) offChecked();
  }, [input_state]);

  function handleSelect(e) {
    props.onAnswerSelect(Number(e.target.value));
  }

  function offChecked() {
    const input_items = document.querySelectorAll('input');

    for (var i = 0; i < input_items.length; i++) {
      input_items[i].checked = false;
    }
  } 

  return (
    <div className="multiple_choice_area">
      {list.map((val, index) =>   
          <label className="multiple_choice_custom" key={index}>
            <input type="radio" name="multiple_choice_dementia" value={index} onClick={handleSelect}/>
            <span className="multiple_choice_txt">{val}</span>
          </label>
      )}
    </div>
  );
};

export default AnswerFour;
