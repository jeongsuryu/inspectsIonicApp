const Tnb = (props) => {
  const { title, onoff } = props;

  const handleModal = () => {
    props.onClickPrev();
  }

  const handleSoundOnOff = () => {
    props.onClickSpeaker();
  }

  return (
    <nav className="tnb_area" role="navigation">
      <div className="basic_box tool_bar">
        <span className="btn_home" 
          onClick={handleModal}
        >
          <img
            src="/assets/arrow_prev_white.svg"
            alt="이전으로 가기 화살표"
          />
        </span>
        <h2 className="page_tit kiosk_page_tit">{title} 테스트</h2>
        <button type="button" className="js-btn_sound" onClick={handleSoundOnOff}>
          <img src={`/assets/icon_sound_${onoff == true ?'on':'off'}.svg`} alt="소리 아이콘"/>
        </button>
      </div>
    </nav>
  )
}

export default Tnb;