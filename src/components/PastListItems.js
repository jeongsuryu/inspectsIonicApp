
import React, { useEffect, useState } from 'react';
import { service_host } from '../globalVar.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResultText from './ResultText';

const PastListItems = (props) => {
    const type = props.type;
    let datas = [];
    const [getType, setGetType] = useState([]);

    useEffect(() => {
        getPastResult(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    async function getPastResult(type) {
        let TokenPromise = AsyncStorage.getItem('@access_token').then(
            (result) => {
                return result;
            },
        );

        if (!TokenPromise) props.history.push('/home');
        const token = await TokenPromise;

        datas = await axios
            .post(service_host + '/api/postInspectByUserId', {
                "access_token": token,
            })
            .then(function (res) {
                const data_list = res.data.data.list;
                return data_list;              
            })
            .catch(function (error) {
                console.log('postInspectByUserId error: ', error);
            });
            
        setGetType(await datas.filter(data => {
            if ( data["game_name"] === type) return data;
        }));
    }

    return (
        <ul className="past_result_list">
            {getType.length !== 0 &&
                <li>
                    <p className="past_result">
                        지난 결과를 더 보시려면
                        <br />
                        아래로 스크롤 해주세요.
                    </p>
                </li>           
            }
            {getType.map((b,index)=>{
                return(
                    <li key={index}>
                        <p className="past_result">{ 
                            b["start_time"].split(' ')[0]}
                            <b className="past_result_score"> '{b["total_score"]} 점'</b>
                        </p>
                        <ResultText type={type} value={b["total_score"]} />
                    </li>
                )
            })}
        </ul>
    );
};

export default PastListItems;

