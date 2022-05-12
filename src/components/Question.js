import React, { useState, useEffect } from "react";
//import AudioPlayer from 'react-audio-element';

const Question = (props) => {
  let audio = document.querySelector('.js-audio'); 
  const [playState, setPlayState] = useState(false);
  const sound_on_off = props.soundState;

  const type = props.type;
  const qnbr = props.qnbr;
  const currentQa = props.ary;

  const q_sentence = currentQa.question_txt;
  const audioId = currentQa.id;


  useEffect(()=> {
    if (sound_on_off == false) {
      pauseAudio();
    }
  }, [sound_on_off]);

  function pauseAudio() {
    audio = document.querySelector('.js-audio');
    try {
      if (audio.duration > 0 && !audio.ended && audio.currentTime > 0) {
        audio.pause();
        setPlayState(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function playAudio() {
    if (playState == true) {
     await pauseAudio();
    }
    
    if (sound_on_off == true) {
      audio = document.querySelector('.js-audio'); 
      try {
        await audio.play();
        setPlayState(true);
        audio.currentTime = 2;
      } catch (e) {
        console.log("playAudio() error: ", e);
      }
    }
  }

  return (
    <div className="inspects_question_wrap">
      <h3 className="question_tit js-question_nbr">
        Q.&nbsp;<span className="nbr_txt">{qnbr < 10 ? "0" + qnbr : qnbr}</span>
      </h3>
      { //playState == false && 
      <button type="button" className="listen_again js-listen" onClick={playAudio}> 다시듣기</button>
      }
      
      {sound_on_off == true ? (
        <audio src={`recodes/${type}_${audioId}.mp3`} volume="1.0" className="js-audio" autoPlay loop={false}/>
      ):(
        <audio src={`recodes/${type}_${audioId}.mp3`} volume="1.0" className="js-audio" loop={false}/>
      )}

      <div className="question_cont js-question">
        {q_sentence}
        {type === "dementia" && qnbr === 21 && (<span className="question_txt_highlight">1 - 2 - 3 - 4</span>)}
        {type === "dementia" && qnbr === 23 && (
          <span className="question_txt_highlight">딸기 - 바나나 - 토마토 - 사과</span>
        )}
      </div>
    </div>
  );
};

export default Question;
