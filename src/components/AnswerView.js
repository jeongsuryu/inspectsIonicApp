import React, { useEffect } from 'react';

const AnswerView = (props) => {
    const input_state = props.offAllSelect;

    useEffect( () => {
        if (input_state === true) offChecked();
    }, [input_state]);

    function offChecked() {
        const input_items = document.querySelectorAll("input");

        for (var i = 0; i < input_items.length; i++) {
            input_items[i].checked = false;
        }
    }

    return (        
        <div className="image_choice_area">              
            <fieldset className="object_show3">
                <legend>잘 보고 기억해 주세요.</legend>
                <div className="label_wrap">
                    <label className="image_choice_item">
                        <input type="radio" name="object_show3"/>
                        <span className="image_wrap"><img src="/assets/object3_car.png" alt="차 사진"/></span>
                    </label>
                    <label className="image_choice_item">
                        <input type="radio" name="object_show3" />
                        <span className="image_wrap"><img src="/assets/object3_cap.png" alt="모자 사진"/></span>
                    </label>
                    <label className="image_choice_item">
                        <input type="radio" name="object_show3" />
                        <span className="image_wrap"><img src="/assets/object3_rock.png" alt="돌 사진"/></span>
                    </label>
                </div>
            </fieldset>
        </div>
    );
};

export default AnswerView;