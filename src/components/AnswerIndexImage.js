import React, { useEffect, useState } from 'react';
import produce from 'immer';
import { makeRandomNbr } from '../utils';

const AnswerIndexImage = (props) => {
  const input_state = props.offAllSelect;

  const initialImages = props.answersArray;
  let temp_array = props.answersArray;

  const [data, setData] = useState([]);

  useEffect(() => {
    let i=initialImages.length;
      while (i > 0) {
          let random_nbr = makeRandomNbr(i, 0);
          const tempB = temp_array.splice(random_nbr, 1);
          setData(                
              produce((draft) => {
                  draft.push(tempB[0])
              })                
          );
          --i;
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);
    
  useEffect( () => {
    if (input_state === true) offChecked();
  }, [input_state]);

  function handleSelect(e) {
    props.onAnswerSelect(e.target);
  }

  function offChecked() {
    const input_items = document.querySelectorAll('input');

    for (var i = 0; i < input_items.length; i++) {
      input_items[i].checked = false;
    }
  }

  return (
    <div className="image_choice_area">
      <fieldset className="fruit_choice4 multiple_fruit4">
        <legend>답을 선택해 주세요</legend>
        <div className="label_wrap">
        {data.map(item => 
          <label className="image_choice_item" key={item.id}>
            <input
              type="checkbox"
              name={item.name}
              value={item.id}
              onClick={handleSelect}
            />
            <span className="image_wrap">
              <img src={`/assets/${item.src}`} alt={`${item.alt} 사진`} />
            </span>
          </label>
        )}
        </div>
      </fieldset>
    </div>
  );
};

export default AnswerIndexImage;
