import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { service_host } from '../globalVar.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResultText from './ResultText.js';


const LastResult = (props) => {
    const type = props.type;
    const [score, setScore] = useState(0);
    const [date, setDate] = useState('');
    let datas = [];

    useEffect(() => {
        getLastResult(type);
    });

    async function getLastResult(type) {
        let TokenPromise = AsyncStorage.getItem('@access_token').then(
            (result) => {
                return result;
            },
        );

        if (!TokenPromise) props.history.push('/home');
        const token = await TokenPromise;

        datas = await axios
            .post(service_host + '/api/postInspectTotalScore', {
                "access_token": token,
            })
            .then(function (res) {
                const score = res.data.data[type];                
                const date_type = type === 'dementia' ? 'time_dementia' : (type === 'stress' ? 'time_stress' : 'time_depress');
               // console.log(res.data);
                const date = res.data.data[date_type];
                return [score, date];
            })
            .catch(function (error) {
                console.log('postInspectTotalScore error: ', error);
            });

            if (datas[0] !== 0) { 
                setScore(datas[0]);
             //   console.log(datas[0])
                const date_temp = datas[1].split('T')[0];
                setDate(date_temp);
            }
    }

    return (
        <div>
            {score !== 0 ? (
            <div className="result_info_wrap">
                <p className="recent_result">
                    {date.split('-')[0]}년 {date.split('-')[1]}월 {date.split('-')[2]}일
                    <b className="result_value">'{score} 점'</b>
                </p>
                <ResultText type={type} value={score}/>
            </div>
            ) : (
            <div className="result_info_wrap">
                <p className="recent_result">검사 내역이 없습니다.</p>
            </div>
            )}
        </div>
    );
};

LastResult.propTypes = {
    type: PropTypes.string,
};

export default LastResult;
