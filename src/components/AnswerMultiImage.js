import React, { useEffect, useState } from 'react';
import produce from 'immer';
import { makeRandomNbr, original_array } from '../utils';

let temp_array = [];

const AnswerMultiImage = (props) => {
    const input_state = props.offAllSelect;
    const initialImages = original_array(props.currentNumber);
    temp_array = initialImages;

    const [data, setData] = useState([]);

    useEffect(()=> {
        let iii=initialImages.length;
        while (iii > 0) {
            let random_nbr = makeRandomNbr(iii, 0);
            const tempB = temp_array.splice(random_nbr, 1);
            
            setData(                
                produce((draft) => {
                    draft.push(tempB[0])
                })                
            );
            --iii;
        }
    }, []);
    
    useEffect( () => {
        if (input_state === true) offChecked();
    }, [input_state]);

    
    function handleSelect(e) {        
        props.onAnswerSelect(e.target);
    }

    function offChecked() {
        const input_items = document.querySelectorAll("input");

        for (var i = 0; i < input_items.length; i++) {
            input_items[i].checked = false;
        }
    }    

    return (
        <div className="image_choice_area">
            <fieldset className="object_choice6">
                <legend>답을 선택해 주세요</legend>
                <div className="label_wrap">
                    {data.map(item => 
                        <label className="image_choice_item" key={item.id}>
                            <input type="checkbox" name={item.name} value={item.id} onClick={handleSelect}/>
                            <span className="image_wrap"><img src={`/assets/${item.src}.png`} alt={`${item.alt} 사진`}/></span>
                        </label>
                    )}
                </div>
            </fieldset>
        </div>
    );
};

export default AnswerMultiImage;