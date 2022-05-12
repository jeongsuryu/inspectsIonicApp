import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {service_host} from '../globalVar.js';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Option = (props) => {
    const [showModal, setShowModal] = useState(0);
    const [showModalTerm, setShowModalTerm] = useState(0);
    const { name } = props.match.params;
    
    let token = '';

    function handleLogout() {
        AsyncStorage.removeItem("@name");
        AsyncStorage.removeItem("@email");
        AsyncStorage.removeItem("@access_token");
        AsyncStorage.removeItem("memorySession");

        props.history.replace("/");
    }

    async function handleCloseID() {
        token = await AsyncStorage.getItem('@access_token');
        if (token.length === 0) {
            props.history.replace("/");
        }

        await axios.post(service_host+"/api/withdraw", {
            "access_token":token,
        }).then(function () {
            alert(name +"님, 회원탈퇴가 완료되었습니다.\r\n메인 페이지로 이동합니다.");
            handleLogout();
        }).catch(function (err) {
            console.log('handleCloseID error: ', err);
            alert("회원탈퇴에 실패했습니다.\r\n새로고침 후 다시 시도해주세요.");
            window.location.reload();
        });
        
    }

    return (
        <div className="inspects_wrap">
            <h1 className="blind_inline">정신건강 테스트 앱</h1>
            <nav className="tnb_area option" role="navigation">
                <div className="basic_box transform_box">
                    <button type="button" className="btn_logout" onClick={handleLogout}>로그아웃</button>
                    <Link to="/home" className="btn_close"><img src="/assets/icon_exit_white.svg" alt="나가기 아이콘"/></Link>
                </div>
            </nav>
            <div className="contents_wrap inspects_option">
                <h2 className="cont_tit">지난 점수 다시보기</h2>
                <div className="results_view_boxes">
                    <Link to="/viewResultAll/dementia" className="box_wrap">
                        <figure className="box_area dementia">
                            <img src="/assets/icon_dementia.svg" alt="뇌 아이콘"/>
                            <figcaption>
                                <h3 className="category_tit">치매</h3>
                                <span className="link_past_result">지난 결과보기</span>
                            </figcaption>
                        </figure>
                    </Link>
                    <Link to="/viewResultAll/depression" className="box_wrap">
                        <figure className="box_area depression">
                            <img src="/assets/icon_depression.svg" alt="우울한 아이콘"/>
                            <figcaption>
                                <h3 className="category_tit">우울증</h3>
                                <span className="link_past_result">지난 결과보기</span>
                            </figcaption>
                        </figure>
                    </Link>
                    <Link to="/viewResultAll/stress" className="box_wrap">
                        <figure className="box_area stress">
                            <img src="/assets/icon_stress.svg" alt="뇌 과부하 아이콘"/>
                            <figcaption>
                                <h3 className="category_tit">스트레스</h3>
                                <span className="link_past_result">지난 결과보기</span>
                            </figcaption>
                        </figure>
                    </Link>
                </div>
                <div className="external_links">
                    <Link to={{pathname: "https://careyou.org/"}} target="_blank" className="btn_link">홈페이지</Link>
                    <Link to={{pathname:"https://cafe.naver.com/lovecareyou" }} className="btn_link" target="_blank">커뮤니티</Link>
                    <button className="btn_link" type="button" onClick={()=>setShowModalTerm(1)}>이용약관</button>
                    <button className="btn_link" type="button" onClick={()=>setShowModal(1)}>회원탈퇴</button>
                </div>
                <div className="foot_version_info">
                    <b>버전 정보</b><span>현재 버전 : 2.53</span>
                </div>
            </div>
        {showModal === 1 &&
        <div className="modal_delete_account js-modal-window">
            <div className="modal_wrap">
                <div className="modal_contents">
                    <img src="/assets/icon_warning.svg" alt="경고 아이콘" />
                    <p className="modal_para">
                        회원탈퇴 즉시 계정 내<br/>
                        모든 데이터가 삭제되며,<br/>
                        재가입 시에도 복원되지 않습니다.
                    </p>
                    <p className="modal_tit">
                        회원탈퇴를 진행하시겠습니까?
                    </p>
                    <div className="btn_wrap">                        
                        <button type="button" onClick={handleCloseID} className="modal_btn2">확인</button>
                        <button type="button" onClick={()=>setShowModal(0)} className="modal_btn2 js-modal-close">취소</button>
                    </div>
                </div>
            </div>
        </div>
        }
        {showModalTerm === 1 &&
        <div className="modal_terms js-modal-window">
            <div className="modal_wrap">
                <div className="modal_contents">                    
                        <p className="terms_tit">서비스 이용약관</p>
                        <div className="terms_wrap">
                            <ol className="terms_list">
                                <li>
                                    <strong className="terms_section">제1장 총칙</strong>
                                    <ol>
                                        <li>
                                            <strong className="terms_section">제 1 조 (목적)</strong>
                                            이 약관은 주식회사 캐어유(이하 “회사”라 한다)에서 운영하는 엔브레인플랫폼(이하 “본 사이트”라 한다) 및 엔브레인게임, 정신건강테스트
                                            치매ㆍ
                                            우울증ㆍ 스트레스(이하 “서비스”라 한다)를 이용함에 회원의 권리 의무 및 책임사항을 규정함을 목적으로 합니다.
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 2 조 (용어의 정의)</strong>
                                            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                                            <ol>
                                                <li>
                                                    ① “본 사이트”라 함은 회사가 컴퓨터 등 정보통신 설비를 이용하여 제공할 수 있도록 설정한 가상의 공간을 말합니다.
                                                </li>
                                                <li>
                                                    ② “서비스”라 함은 회사가 운영하는 애플리케이션(엔브레인게임, 정신건강테스트 치매ㆍ우울증ㆍ스트레스)을
                                                    말합니다.<br />
                                                    [부칙]3에 명시되어 있습니다.
                                                </li>
                                                <li>
                                                    ③ “회원”이라 함은 본 약관에 동의하고, 본 사이트에 로그인하여 본 약관에 따라 회사가 제공하는 서비스를 받는 자를
                                                    말합니다.
                                                </li>
                                                <li>
                                                    ④ "아이디(ID)"라 함은 회원이 서비스를 제공받기 위하여 본 사이트로 접속할 수 있는 Login명을 의미하며, 회원의
                                                    식별 및
                                                    서비스 이용을 위하여 자신의 전화번호 및 이메일 주소를 말합니다.
                                                </li>
                                                <li>
                                                    ⑤ "비밀번호(패스워드)"라 함은 회원 본인임을 확인하고 본 사이트 및 서비스에 제공되는 각종 정보의 보안을 위해 회원
                                                    자신의
                                                    비밀보호를 위한 암호 문자를 말합니다.
                                                </li>
                                                <li>
                                                    ⑥ “개인정보”라 함은 당해 정보에 포함되어있는 성명, 연락처, 생년월일 등의 사항에 의하여 특정 개인을 식별할 수 있는
                                                    정보를
                                                    말합니다.
                                                </li>
                                                <li>
                                                    ⑦ 회원은 기관 회원, 기관 소속 회원, 일반회원, 운영자로 구분되며, 각 회원은 다음과 같은 권한을 가지고 있습니다.
                                                    <ol>
                                                        <li>
                                                            가. 기관 회원 : 『라이선스 사용 계약서』 계약을 통해 승낙이 성립한 회원을 의미합니다.
                                                        </li>
                                                        <li>
                                                            나. 기관 소속 회원 : 기관 회원을 통해 등록 및 가입이 승낙 된 회원을 의미합니다.
                                                        </li>
                                                        <li>
                                                            다. 일반회원 : 서비스를 통해 가입을 하고 서비스 이용을 목적으로 하는 회원을 의미합니다.
                                                        </li>
                                                        <li>
                                                            라. 운영자 : 회사의 본 사이트를 관리하기 위하여 발급 된 회원입니다.
                                                        </li>
                                                    </ol>
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 3 조 (이용약관의 효력 및 변경)</strong>
                                            <ol>
                                                <li>
                                                    ① 이 약관은 본 사이트와 서비스에 게시하거나 기타의 방법으로 회원에게 통보함으로써 효력이 발생합니다.
                                                </li>
                                                <li>
                                                    ② 회사는 사정상 변경의 경우와 영업상 중요 사유가 발생한 경우에는 이 약관을 변경할 수 있으며, 변경 된 약관은 전항과
                                                    같은
                                                    방법으로 공지 또는 통보함으로써 효력을 발생합니다.
                                                </li>
                                                <li>
                                                    ③ 회사가 전항에 따라 공지 또는 통보한 날로부터 개정약관의 시행일 7일 후까지 거부의사를 표시하지 않으면 변경된 약관을
                                                    승인한
                                                    것으로 본다는 뜻을 명확하게 공지 또는 통보하였음에도 거부의 의사표시가 없는 경우에는 변경 된 약관을 승인한것으로 봅니다.
                                                    회원이
                                                    개정약관에 동의하지 않을 경우 회원은 이용 계약을 해지할 수 있습니다.
                                                </li>
                                                <li>
                                                    ④ 회사는 불가피한 사정이 있는 경우 관계법령을 위배되지 않는 범위에서 본 약관을 개정할 수 있습니다.
                                                </li>
                                                <li>
                                                    ⑤ 회사는 불가피한 사정이 있는 경우 제공하는 본 사이트와 서비스 내용을 변경할 수 있으며, 이 경우 변경 된 내용 및
                                                    제공일자를
                                                    명시하여 본 사이트 및 서비스 화면에 공지하거나 기타의 방법으로 회원에게 통보합니다.
                                                </li>
                                                <li>
                                                    ⑥ 회사는 본 사이트와 서비스 내용의 변경으로 인하여 이용자가 입은 손해에 대하여 배상하지 아니합니다. 단, 회사의 고의
                                                    또는
                                                    중과실이 있는 경우에는 그러하지 아니합니다.
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 4 조 (서비스 중단 및 약관 외 준칙)</strong>
                                            <ol>
                                                <li>
                                                    ① 이 약관은 회원이 본 사이트 및 서비스를 이용할 때 함께 적용됩니다.
                                                </li>
                                                <li>
                                                    ② 회사는 시스템 등 장치의 보수점검 및 고장, 일시적 통신장애, 서비스 개발, 시스템 정기 점검, 긴급조치 등 불가피한
                                                    사유에
                                                    의해 서비스 제공이 일정 기간 동안 제한 또는 중단 될 수 있습니다.
                                                </li>
                                                <li>
                                                    ③ 회사는 제 2항의 사유로 본 사이트 및 서비스 제공이 일시적으로 중단됨으로 인하여 회원 및 제3자 가입은 손해에
                                                    대하여는
                                                    배상하지 아니합니다. 단 회사의 고의 또는 중과실이 있는 경우에는 그러하지 아니합니다.
                                                </li>
                                                <li>
                                                    ④ 이 약관에 명시되지 아니한 사항은 관계법령의 규정이 적용됩니다.
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <strong className="terms_section">제2장 이용계약의 체결</strong>
                                    <ol>
                                        <li>
                                            <strong className="terms_section">제 5 조 (이용계약의 성립 등)</strong>
                                            <ol>
                                                <li>
                                                    ① 이용계약의 성립의 함은 회사가 정한 약관에 동의한다는 의사표시를 함으로써 회원가입을 진행한 회원이며, 또는 회사와
                                                    『라이선스
                                                    사용 계약서』를 작성한 다음 운영자가 본 사이트에서 이를 승낙을 한 회원에 한해 이용 계약은 성립합니다.
                                                </li>
                                                <li>
                                                    ② 제1항의 승낙은 본 사이트와 서비스 이용 승낙을 포함합니다. 다만, 각 서비스의 개별적 적용되는 약관에 대한 동의는
                                                    최초로
                                                    이용할 때 별도의 동의절차를 거칠 수 있습니다.
                                                </li>
                                                <li>
                                                    ③ 회사는 전 항과 같이 회원으로 가입할 것을 신청한 회원 중 이하 각호에 해당하지 않는 한 회원으로 등록합니다.
                                                    <ol>
                                                        <li>
                                                            가. 다른 사람의 명의를 사용하여 신청한 경우
                                                        </li>
                                                        <li>
                                                            나. 가입신청자가 본 약관 제6조 9항에 의거하여 이전에 회원 자격을 상실한 적이 있는 경우
                                                        </li>
                                                        <li>
                                                            다. 가입신청서의 내용에 허위, 기재 누락, 오기가 있는 경우
                                                        </li>
                                                        <li>
                                                            라. 기타 회원으로 등록하는 것이 회사의 업무 수행상 현저히 지장이 있다고 판단되는 경우
                                                        </li>
                                                    </ol>
                                                </li>
                                                <li>
                                                    ④ 회원 가입 계약의 성립 시기는 운영자가 승낙한 시점으로 합니다.
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 6 조 (서비스 정의 및 이용조건)</strong>
                                            <ol>
                                                <li>
                                                    ① 회사는 본 사이트와 서비스를 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.
                                                </li>
                                                <li>
                                                    ② 회사는 본 사이트와 서비스를 이용하기 위해 회원에게 생년월일, 가장 최근의 연락처 및 기타 정보를 제출하는 것을 요청할
                                                    수
                                                    있으며, 회원은 이러한 정보의 정확성과 완전성을 유지해야합니다. 회원은 서비스의 이용을 위해 또는 운영자가 회원의 계정에
                                                    접근해
                                                    사용하거나 수정하는 것을 허용하기 위해 사용자 이름, 암호, 이메일 주소를 제공할 수 있습니다.
                                                </li>
                                                <li>
                                                    ③ 회사는 회원이 본 사이트에 정확한 정보를 제출하지 아니하거나 회원의 계정 정보를 안전하게 보관하지 않음으로 인한 손실
                                                    및
                                                    손해에 대해서 책임을 지지 않습니다.
                                                </li>
                                                <li>
                                                    ④ 회원은 본 사이트 및 서비스를 이용하는데 필요한 장비 및 비용을 회사와의 『라이선스 사용 계약서』에 맞춰
                                                    지불해야합니다.
                                                </li>
                                                <li>
                                                    ⑤ 회사는 본 사이트와 서비스를 안전하고 정상적으로 운영하기 위해 회원이 제공하는 콘텐츠에 대한 일정 권리를 회원으로부터
                                                    얻어야
                                                    합니다. 따라서 회원은 당 사이트 및 서비스를 이용해 제공한 콘텐츠에 대해 회사가 회원의 콘텐츠를 수정, 복제 및 배포할
                                                    수 있는
                                                    권리를 부여하는 것에 동의합니다. 또한 회사가 이용계약의 성립이 승낙 된 회원에 대하여 해당 서비스 제공의 목적으로 해당
                                                    콘텐츠의
                                                    이용을 가능하게 하며 해당 콘텐츠에 대한 권리를 양도할 수 있고 법적 의무를 준수하기 위해 회원의 콘텐츠를 제3자가
                                                    사용하는 것을
                                                    허용할 수 있다는 것에도 동의합니다.
                                                </li>
                                                <li>
                                                    ⑥ 이 약관에서 회사에 부여 된 권리를 제외하고 이용계약의 성립 된 회원의 콘텐츠에 대한 모든 권리를 보유합니다.
                                                </li>
                                                <li>
                                                    ⑦ 회사에 부여 된 권리를 제외하고 회원의 동의 없이 회사는 회원의 콘텐츠를 공개할 수 없습니다. 단 회원이 공유를
                                                    목적으로
                                                    배포한 콘텐츠 또는 회원의 동의를 얻은 콘텐츠에 한해서는 회사가 회원의 콘텐츠를 이용, 전시, 배포 및 수정하는 것을
                                                    동의하는
                                                    것으로 봅니다.
                                                </li>
                                                <li>
                                                    ⑧ 회사는 회원의 본 사이트와 서비스 이용에 관해 회원 계정의 사용을 해지 또는 휴면 상태로 전환 할 수 있습니다. 회사가
                                                    회원의
                                                    계정 또는 서비스 이용을 종료하는 이유는 다음과 같으며, 서비스 제공 측면 및 회사의 정책에 반하는 경우가 포함됩니다.
                                                    <ol>
                                                        <li>
                                                            가. 회원이 이 약관 또는 개별 계약을 위반한 경우
                                                        </li>
                                                        <li>
                                                            나. 회원의 요청으로 계정을 삭제한 경우
                                                        </li>
                                                        <li>
                                                            다. 회원이 서비스를 1년이상 미사용 한 경우
                                                        </li>
                                                        <li>
                                                            라. 회원이 서비스 이용과 관련해 회사 또는 기관에게 지불해야 하는 비용의 미불 및 체납한 경우
                                                        </li>
                                                        <li>
                                                            마. 정부 기관의 요청이 있는 경우
                                                        </li>
                                                        <li>
                                                            바. 기타 중대한 사유로 인하여 회사가 서비스 제공을 지속하는 것이 부적당하다고 인정하는 경우
                                                        </li>
                                                    </ol>
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 7 조 (개인정보의 보호 및 사용)</strong>
                                            본 사이트는 관계법령이 정하는 바에 따라 회원 등록정보를 포함한 회원의 개인정보를 보호하기 위해 노력합니다. 회원 개인정보의 보호 및
                                            사용에
                                            대해서는 관련법령 및 본 사이트의 개인정보 보호정책이 적용됩니다.
                                            <ol>
                                                <li>
                                                    ① 회사는 본 사이트의 원활한 활용을 위해 필요한 회원의 신상정보를 수집할 수 있습니다.
                                                </li>
                                                <li>
                                                    ② 회원의 개인정보를 수집하는 때에는 이하 각호의 경우를 제외하고는 당해 회원의 동의를 받습니다.
                                                    <ol>
                                                        <li>
                                                            가. 법률의 특별한 규정이 있는 경우
                                                        </li>
                                                        <li>
                                                            나. 서비스 이용계약의 이행을 위해서 필요한 경우
                                                        </li>
                                                    </ol>
                                                </li>
                                                <li>
                                                    ③ 회사는 개인정보의 분실, 도난, 유출, 변조되지 아니하도록 안정성 확보에 필요한 기술적 조치 등을 강구해야합니다.
                                                </li>
                                                <li>
                                                    ④ 제공 된 개인정보는 당해 이용자의 동의없이 목적 외 이용이나 제3자에게 제공할 수 없습니다. 단 다음에는 예외로
                                                    합니다.
                                                    <ol>
                                                        <li>
                                                            가. 법률에 특별한 규정이 있는 경우
                                                        </li>
                                                        <li>
                                                            나. 사용자 인증 절차
                                                        </li>
                                                        <li>
                                                            다. 서비스의 제공에 따른 요금정산 및 배송 등을 위하여 필요한 경우
                                                        </li>
                                                        <li>
                                                            라. 본 사이트의 원활한 운영 및 통계분석자료로 활용
                                                        </li>
                                                        <li>
                                                            마. 통계작성ㆍ학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는
                                                            경우
                                                        </li>
                                                    </ol>
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 8 조 (이용 신청의 승낙과 제한)</strong>
                                            <ol>
                                                <li>
                                                    ① 본 사이트는 제6조의 규정에 의한 회원에 대하여 본 사이트와 서비스 이용을 승낙합니다.
                                                </li>
                                                <li>
                                                    ② 본 사이트 및 서비스는 아래사항에 해당하는 경우에 대해서 승낙하지 아니 합니다.
                                                    <ol>
                                                        <li>
                                                            가.『라이선스 사용 계약서』내용을 허위로 기재한 경우
                                                        </li>
                                                        <li>
                                                            나. 기타 규정한 제반사항을 위반하며 신청하는 경우
                                                        </li>
                                                    </ol>
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 9 조 (회원 ID 부여 및 변경 등)</strong>
                                            <ol>
                                                <li>
                                                    ① 본 사이트 및 서비스 회원에 대하여 약관에 정하는 바에 따라 자신이 선정한 전화번호 및 이메일 주소를 ID로
                                                    부여합니다.
                                                </li>
                                                <li>
                                                    ② 회원 ID는 원칙적으로 변경이 불가하며 부득이한 사유로 인하여 변경 하고자 하는 경우에는 재가입을 하시거나 본 사이트
                                                    운영자에게 문의 주시기 바랍니다.
                                                </li>
                                                <li>
                                                    ③ 기타 회원 개인정보 관리 및 변경 등에 관한 사항은 서비스 별 안내에 정하는 바에 의합니다.
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <strong className="terms_section">제3장 계약 당사자의 의무</strong>
                                    <ol>
                                        <li>
                                            <strong className="terms_section">제 10 조 (회사의 의무)</strong>
                                            <ol>
                                                <li>
                                                    ① 회사는 회원이 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록 하여야 합니다.
                                                </li>
                                                <li>
                                                    ② 본 사이트 및 서비스의 시스템 점검 및 서비스 개발, 통신장애, 기타 불가항력적인 사고 등 특별한 사정이 없는 한 이
                                                    약관 및
                                                    동의서가 정한 바에 따라 지속적으로 안정적인 서비스를 제공할 의무가 있습니다.
                                                </li>
                                                <li>
                                                    ③ 회사는 관계법령과 이 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 본 사이트와
                                                    서비스를
                                                    제공하기 위하여 최선을 다하여 노력합니다.
                                                </li>
                                                <li>
                                                    ④ 회사는 회원의 신용정보를 포함한 개인신상정보의 보안에 대하여 기술적 안전 조치를 강구하고 관리에 만전을 기함으로써
                                                    회원의
                                                    정보보안에 최선을 다합니다.
                                                </li>
                                                <li>
                                                    ⑤ 회원은 언제든지 자신의 개인정보를 열람할 수 있고 회사 또는 운영자에게 잘못 된 정보에 대한 정정을 요청할 수
                                                    있습니다.
                                                </li>
                                                <li>
                                                    ⑥ 회사는 회원으로부터 제기되는 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 적절한 절차를 거쳐 즉시 처리하여야
                                                    합니다.
                                                    다만, 즉시 처리가 곤란한 경우는 회원에게 그 사유와 처리일정을 통보하여야 합니다.
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 11 조 (회원의 의무)</strong>
                                            <ol>
                                                <li>
                                                    ① 회원은 본 사이트와 서비스를 이용할 때 다음 각호의 행위를 하지 않아야 합니다.
                                                    <ol>
                                                        <li>
                                                            가. 신청 또는 변경 시 허위내용의 등록
                                                        </li>
                                                        <li>
                                                            나. 본인 이외의 개인정보를 부정하게 사용하는 행위
                                                        </li>
                                                        <li>
                                                            다. 본 사이트에 게시된 정보의 변경
                                                        </li>
                                                        <li>
                                                            라. 본 사이트 및 서비스를 이용하여 얻은 정보를 회원의 개인적인 이용 외에 복사, 가공, 번역, 2차적
                                                            저작 등을
                                                            통하여 복제, 공연, 방송, 전시, 배포, 출판 등에 사용하거나 제3자에게 제공하는 행위
                                                        </li>
                                                        <li>
                                                            마. 타인의 명예를 손상시키거나 불이익을 주는 행위
                                                        </li>
                                                        <li>
                                                            바. 회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위
                                                        </li>
                                                        <li>
                                                            사. 공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형, 음성 등을 타인에게 유포하는 행위
                                                        </li>
                                                        <li>
                                                            아. 범죄와 결부된다고 객관적으로 인정되는 행위
                                                        </li>
                                                        <li>
                                                            자. 본 사이트와 서비스와 관련된 설비의 오동작이나 정보 등의 파괴 및 혼란을 유발시키는 컴퓨터 바이러스
                                                            감염
                                                            자료를 등록 또는 유포하는 행위
                                                        </li>
                                                        <li>
                                                            차. 본 사이트와 서비스의 안정적 운영을 방해할 수 있는 정보를 전송하거나 수신자의 의사에 반하여 광고성
                                                            정보를
                                                            전송하는 행위
                                                        </li>
                                                        <li>
                                                            카. 기타 관계법령 및 규정에 위배되는 행위
                                                        </li>
                                                    </ol>
                                                </li>
                                                <li>
                                                    ② 회원은 본 사이트와 서비스 이용시 아이디와 비밀번호 사용에 대한 다음과 같은 의무를 이행해야합니다.
                                                    <ol>
                                                        <li>
                                                            가. 회원은 본 사이트와 서비스를 이용하는 경우, 본인의 아이디와 비밀번호를 사용해야합니다.
                                                        </li>
                                                        <li>
                                                            나. 아이디와 비밀번호에 관한 모든 관리의 책임은 회원에게 있습니다.
                                                        </li>
                                                        <li>
                                                            다. 회원은 자신의 아이디 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
                                                        </li>
                                                        <li>
                                                            라. 회원의 아이디 및 비밀번호의 관리의 부실로 인한 모든 책임은 회원이 부담합니다.
                                                        </li>
                                                        <li>
                                                            마. 회원의 아이디 및 비밀번호를 도난당하거나 제3자에게 사용되고 있음을 인지한 경우에는 바로 회사나
                                                            운영자에게
                                                            통보하고 회사나 운영자의 안내에 따릅니다.
                                                        </li>
                                                    </ol>
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <strong className="terms_section">제4장 서비스의 이용</strong>
                                    <ol>
                                        <li>
                                            <strong className="terms_section">제 12조 (서비스 이용 시간)</strong>
                                            <ol>
                                                <li>
                                                    ① 회원의 본 사이트와 서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 운영을
                                                    원칙으로
                                                    합니다. 단, 본 사이트 및 서비스의 시스템 정기점검, 증설 및 교체를 위해 회사가 정한 날이나 시간에 본 사이트와
                                                    서비스를 일시
                                                    중단할 수 있으며, 예정되어 있는 작업으로 인한 본 사이트와 서비스 일시 중단은 본 사이트를 통해 사전에 공지합니다.
                                                </li>
                                                <li>
                                                    ② 본 사이트와 서비스를 특정 범위로 분할하여 각 범위 별로 이용가능시간을 별도로 지정할 수 있습니다. 다만 이 경우 그
                                                    내용을
                                                    공지합니다.
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 13 조 (저작권)</strong>
                                            <ol>
                                                <li>
                                                    ① 회사는 본 사이트를 포함한 서비스를 구성하는 모든 소프트웨어 및 그에 관한 모든 지적재산권 등과 관련 된 모든 법적
                                                    권익 및
                                                    이익을 가지고 있습니다.
                                                </li>
                                                <li>
                                                    ② 회사는 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다. 다만, 게시물의 원저작자가 별도로 있는 경우
                                                    그
                                                    출처를 명시하며 해당 게시물의 저작권은 원저작자에게 있습니다.
                                                </li>
                                                <li>
                                                    ③ 회원은 본 사이트 및 서비스를 이용함으로써 얻은 정보를 회사의 승낙없이 복제, 송신, 출판, 배포, 방송 기타 방법에
                                                    의하여
                                                    영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
                                                </li>
                                                <li>
                                                    ④ 회원이 직접 게시한 저작물의 저작권은 회원에게 있습니다. 다만, 회원은 본 사이트에 무료로 이용할 수 있는 권리를
                                                    허락한
                                                    것으로 봅니다.
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 14 조 (유료서비스)</strong>
                                            <ol>
                                                <li>
                                                    ① 회사와 『라이선스 사용 계약서』가 성립 된 회원이 정한 유료서비스는 별도로 정해진 라이선스 사용 규정에 따르며,
                                                    변경사항은
                                                    시행 전에 본 사이트를 통하여 회원에게 공지합니다.
                                                </li>
                                                <li>
                                                    ② 유료서비스를 이용하려는 회원은 정해진 요금체계에 따라 요금을 지불해야합니다.
                                                </li>
                                                <li>
                                                    ③ 회사는 일부 서비스를 무료로 제공하고 있으나, 회원은 전체 이용을 위해 유료로 제공 받을 수 있습니다. 회사와
                                                    『라이선스 사용
                                                    계약서』을 진행 후 서비스 이용 권한을 받을 수 있습니다.
                                                </li>
                                                <li>
                                                    ④ 회원이 회사가 유료로 제공하는 서비스를 이용하는 경우 비용을 지불 후 이용하는 것을 원칙으로 합니다.
                                                </li>
                                                <li>
                                                    ⑤ 결제방법은 계약서 상에 표기 된 바에 따릅니다.
                                                </li>
                                                <li>
                                                    ⑥ 회사는 결제의 이행을 위하여 반드시 필요한 회원의 정보를 추가적으로 요구할 수 있으며, 회원은 회사가 요구하는 정보를
                                                    정확하게
                                                    제공하여야 합니다.
                                                </li>
                                                <li>
                                                    ⑦ 회원의 귀책사유로 이용요금을 환불 하는 경우 일반적인 방법은 아래와 같습니다.
                                                    <ol>
                                                        <li>
                                                            가. 회사가 제공하는 유료서비스가 결제 된 후 1회의 이용만으로 서비스의 이용이나 구매가 완료되는 서비스인
                                                            경우
                                                            해당 유료서비스를 이용한 후에는 환불이 불가능합니다.
                                                        </li>
                                                        <li>
                                                            나. 회사가 제공하는 유료서비스가 결제 후 1개월(결제기준) 이하로 지속되는 서비스인 경우 해지일로부터 이용
                                                            일수에
                                                            해당하는 금액을 제외한 나머지 금액을 환불합니다. 본 항의 규정은 1개월 단위로 매월 결제 되는 유료서비스의
                                                            경우에도 적용됩니다.
                                                        </li>
                                                        <li>
                                                            다. 회사가 제공하는 유료서비스가 결제 후 1개월(결제 기준)을 초과하여 지속되는 서비스인 경우 해지일로부터
                                                            이용
                                                            일수에 해당하는 금액을 제외한 나머지 금액을 환불합니다.
                                                        </li>
                                                    </ol>
                                                </li>
                                                <li>
                                                    ⑧ 회원은 이용요금에 대하여 이의를 제기할 수 있습니다. 단, 이용요금에 관한 이의는 그 사유 발생을 안 날로부터 30일
                                                    이내에
                                                    그 사유가 발생한 날로부터 3개월 이내에 제기하여야 합니다.
                                                </li>
                                                <li>
                                                    ⑨ 회사는 과오금이 발생한 경우 또는 전액 환불의 경우 이용 대금의 결제와 동일한 방법으로 환불하여야 합니다. 다만,
                                                    동일한
                                                    방법으로 환불이 불가능하거나 서비스의 중도해지로 인한 부분 환불 등의 경우에는 회사가 정한 별도의 방법으로 환불합니다.
                                                </li>
                                                <li>
                                                    ⑩ 환불에 회원의 협조가 필요한 경우에 회원의 귀책사유로 인한 환불 지연에 대해서는 회사는 책임을 지지 않습니다.
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <strong className="terms_section">제5장 계약 해지 및 이용 제한</strong>
                                    <ol>
                                        <li>
                                            <strong className="terms_section">제 15 조 (계약 해지)</strong>
                                            회원이 『라이선스 사용 계약서』 계약을 해지하고자 하는 때에는 회사가 정한 프로세스에 따릅니다.
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 16 조 (서비스 이용제한)</strong>
                                            <ol>
                                                <li>
                                                    ① 회사는 회원이 본 사이트와 서비스 내용에 있어서 본 약관 제 11조(회원의 의무) 내용을 위반하거나, 다음 각 호에
                                                    해당하는
                                                    경우 회사는 회원에게 이용을 제한할 수 있습니다.
                                                    <ol>
                                                        <li>가. 2년 이상 당 사이트와 서비스를 이용한 적이 없는 경우</li>
                                                        <li>나. 기타 정상적인 당 사이트와 서비스 운영에 방해가 될 경우</li>
                                                    </ol>
                                                </li>
                                                <li>
                                                    ② 상기 이용제한 규정에 따라 본 사이트와 서비스를 이용하는 회원에게 별도 공지 없이 회사는 회원에게 일시정지, 이용계약
                                                    해지 할
                                                    수 있습니다.
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 17 조 (전자우편주소 수집 금지)</strong>
                                            회원은 전자우편주소 추출기 등을 이용하여 전자우편주소를 수집 또는 제3자에게 제공할 수 없습니다.
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <strong className="terms_section">제6장 손해배상 및 기타사항</strong>
                                    <ol>
                                        <li>
                                            <strong className="terms_section">제 18 조 (손해배상)</strong>
                                            회사는 본 사이트와 서비스의 무료ㆍ유료로 제공되는 서비스 모두 관련하여 회원에게 어떠한 손해가 발생하더라도 회사가 고의 또는 과실로 인한
                                            손해
                                            발생을 제외하고는 이에 대하여 책임을 부담하지 아니합니다.
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 19 조 (분쟁해결)</strong>
                                            <ol>
                                                <li>
                                                    ① 회사와 회원은 본 사이트 및 서비스와 관련하여 발생한 분쟁을 원활하게 해결하기 위하여 필요한 모든 노력을 하여야
                                                    합니다.
                                                </li>
                                                <li>
                                                    ② 회사는 회원으로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만 신속한 처리가 곤란한 경우에는
                                                    회원에게
                                                    그 사유와 처리일정을 즉시 통보해 드립니다.
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <strong className="terms_section">제 20조 (재판권 및 준거법)</strong>
                                            <ol>
                                                <li>
                                                    ① 회사와 회원간에 본 사이트 및 서비스 이용으로 발생한 분쟁에 관한 소송은 회사 주소지 관할 법원으로 합니다.
                                                </li>
                                                <li>
                                                    ② 회사와 회원간에 제기된 소송에는 대한국민법을 적용합니다.
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                            <ol className="terms_add">
                                <li>
                                    1. [시행일] 이 약관은 2020년 01월 01일부터 적용되며, 종전 약관은 본 약관으로 대체되며, 개정된 약관의 적용일 이전 가입자도 개정된 약관의
                                    적용을
                                    받습니다.
                                </li>
                                <li>
                                    2. [경과규정] 회사의 본 사이트 및 서비스의 이용 회원인 경우 본 약관에 동의함으로써 서비스의 별도 가입절차 없이 이용할 수 있도록 합니다.
                                </li>
                                <li>
                                    3. 회사(주식회사 캐어유)는 본 사이트(엔브레인플랫폼) 및 서비스(엔브레인게임 –애플리케이션ㆍ정신건강테스트 치매-애플리케이션ㆍ정신건강테스트
                                    우울증-애플리케이션ㆍ정신건강테스트 스트레스-애플리케이션) 등을 제공하고있습니다.
                                </li>
                            </ol>
                        </div>
                        <div className="btn_wrap">
                            <button type="button" onClick={()=>setShowModalTerm(0)} className="modal_btn">닫기</button>
                        </div>
                </div>
            </div>
        </div>
        }
        
    </div>
    );
};

export default Option;