//검사별 결과 추출하기
export default function pickList(type, ary) {
    
    let past_result = ary.filter((a) => {
        if (type === "depression") {
            if (a.game_name === "depress") {
                return a;
            }
        } else if (type === "stress") {
            if (a.game_name === "stress") {
                return a;
            }
        } else if (type === "dementia") {
            if (a.game_name === "dementia") {
                return a;
            }
        }
    });

    return past_result;    
}

export function chgTitle(type) {
    if (type === "dementia") return '치매';
    else if (type === "depression" || type === "depress") return "우울증";
    else return "스트레스";
}

export function getDate(full_date) {
    const date_temp = full_date.split('T')[0];
    return date_temp;
}

// DB에서 *_time 컬럼에 넣기 위한 처리 함수
export function setTime() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    month = month < 10 ? '0'+month : month;  
    let date2 = date.getUTCDate();
    date2 = date2 < 10 ? '0'+date2 : date2;  
    let hour = date.getUTCHours()+9;
    hour = hour < 10 ? '0'+hour : hour;
    let minutes = date.getUTCMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let seconds = date.getUTCSeconds();
    seconds = seconds < 10 ? '0'+seconds : seconds;
    const start_time = year+'-'+month+'-'+date2+'T'+hour+':'+minutes+':'+seconds;

    return start_time;
}

//치매문제1 연도
export function funcGetYear() {
    const date = new Date().getFullYear();
    const now_year = String(date);
    const before_nbr_year = now_year.slice(0, 2);
    const last_nbr_year = Number(now_year.slice(2)); 
    
    const n = first_loop(last_nbr_year, last_nbr_year+3, last_nbr_year-3);
    
    const correct = n.indexOf(last_nbr_year);
    
    const makeYear = n.map(year => {
        let addZero = '0';
        if ( year < 10 ) {
            addZero = '0'+year;
        } else {
            addZero = year;
        }

        return before_nbr_year + addZero;
    });
    
    return [makeYear, correct];
}


//치매문제2 계절
export function funcGetSeason() {
    const date = new Date();
    const now_month = date.getMonth()+1;

    const now_date = date.getDate();
    
    let seoson = '';
    if (4 >= now_month && now_month >= 2) {
        //2월 5일 입춘
        if (now_month === 2 && now_date < 5) seoson = '겨울';
        else seoson = '봄';
    } else if (7 >= now_month && now_month >= 5) {
        //5월 5일 입하
        if (now_month === 5 && now_date < 5) seoson = '봄';
        else seoson = '여름';
    } else if (10 >= now_month && now_month >= 8 ) {
        //8월 7일 입추
        if (now_month === 8 && now_date < 7) seoson = '여름';
        else seoson = '가을';
    } else {
        //11월 7일 이전 가을, 11월 7일 입동
        if (now_month === 11 && now_date < 7) seoson = '가을';
        else seoson = '겨울';
    }
    
    const make_array = ['봄', '여름', '가을','겨울'];
    const correct = make_array.indexOf(seoson);
    
    return [make_array, correct];
}

//치매문제3, 월
export function funcGetMonth() {
    const date = new Date().getMonth();
    const now_month = (date+1);
  
    const n = first_loop(now_month, 12, 1);

    const correct = n.indexOf(now_month);
    const makeMonth = n.map(month => {
        return month+'월';
    });

    return [makeMonth, correct];    
}

//치매 문제4, 며칠
export function funcGetDate(){
    const date = new Date().getDate();

    const n = first_loop(date, 31, 1);
    
    const correct = n.indexOf(date);
    const makeDate = n.map(d => {
      return d+'일';
    });
    
    return [makeDate, correct];
}

//치매문제 5, 요일
export function funcGetDay() {
    const day = new Date().getDay();  
    const n = first_loop(day, 6, 0);
//    console.log('n :',n);
  //  console.log('n type :', typeof n);
    const correct = n.indexOf(day);

    const makeDay = n.map(val => {
        const chg = change_day(val);
        return chg+'요일';
    });
  
    return [makeDay, correct];
  }

//치매 문제 6, 하고 있는 것
export function funcGetSomething(some) {
    let doing = '';
    let something = [];

    if (some === 'do') {
        doing = '치매 검사';
        something = ['수영', '운전', '등산', '운동', '치매 검사', '그림', '줄넘기', '독서', '청소', '공부', '게임', '시험', '정리'];
    } else if (some === 'look') {
        doing = '스마트폰';
        something = ['바다', '들판', '꽃밭', '건물', '텔레비전', '그림', '컴퓨터', '책', '음식', '전문 서적', '문서', '스마트폰', '한라산', '뉴스', '드라마', '영화', '올림픽', '월드컵'];
    } else if (some === 'posture') {
        doing = '스마트폰 응시';
        something = ['달리는 자세', '악기 연주', '수영 자세', 'TV 시청', '탁구 자세', '책읽는 자세', '스마트폰 응시'];
    } else if(some === 'gps') {
        doing = '건물';
        something = ['동굴', '사막', '화산', '들판', '건물','개울', '갯벌'];
    } else if(some === 'country') {
        doing = '대한민국';
        something = ['아프가니스탄', '호주', '방글라데시', '보츠와나', '캄보디아','캐나다', '중앙아프리카공화국', '칠레', '과테말라', '그리스','나이지리아','남아프리카공화국','네덜란드','덴마크', '대만', '라오스','도미니카 공화국', '러시아','루마니아','마케도니아','이집트', '대한민국', '피지','프랑스','독일','헝가리','인도','케냐','몰디브','미국','베네수엘라', '사우디아라비아','세르비아','조선민주주의인민공화국','이탈리아', '필리핀', '터키','우크라이나','짐바브웨','핀란드','우즈베키스탄'];
    } else if( some === 'proverb') {
        doing = '작은 것이라도 모이면 큰 것이 된다';
        something = ['뜻하지 않은 일이 우연히 들어 맞다','내가 남에게 좋게 대해야 남도 내게 잘 한다', '자식 많은 사람은 걱정이 끊이지 않는다', '음식을 조금밖에 먹지 못해 제 양에 차지 않다', '작은 것이라도 모이면 큰 것이 된다', '겁이 몹시 나서 두려워진다.', '어려운 일을 당하면 당할 수록 점점 더 어려운 일이 닥쳐 온다', '지위가 높아지면 전날의 미천하던 때의 생각을 잃어버린다', '먹을 수도 없고 가질 수도 없어 아무 소용이 없다', '먹지 않고는 좋은 줄 모른다', '쓰려는 것이 없을 때 그와 비슷한 것으로 대신한다', '한 가지 일을 하고 두가지 이익을 본다', '쓸데없이 남의 일에 간섭한다', '글자라고는 아무것도 모르는 무식한 사람', '내 사정이 급해서 남의 사정까지 돌볼 수가 없다', '제게 이로우면 이용하고, 필요하지 않으면 버린다', '뜻밖에 입은 재난', '믿던 일이 뜻밖에 실패한다', '일이 안 되도록 방해하고는 도와주는 척한다', '겉만 번지르하고 실속이 없다', '어려서부터 좋은 버릇을 들여야 한다.','이미 일을 그르치고 난 뒤에 뉘우쳐도 소용 없다', '어떤 일이 아주 하기 쉽다', '여름철 감기 걸린 사람을 조롱하는 말', '윗사람이 잘못하면 아랫사람도 따라서 잘못하게 된다', '무엇에 한 번 혼난 사람이 그와 비슷한 것만 보아도 깜짝 놀란다', '아무리 보잘것 없는 사람이라도 너무나 업신여기면 성을 낸다', '모든 일은 원인에 따라 결과가 생긴다','지극히 어려운 일', '아무리 큰 재난에 부딪히더라도 그것에서 벗어날 길은 있다', '어떤 일로 심부름 간 사람이 아무 소식이 없다'];
    } else if( some === 'emergencyCar') {
        doing = '구급차';
        something = ['트럭', '소방차', '경찰차', '화학차', '구급차', '물탱크차', '콜밴','비행기', '기차', '버스', '택시', 'SUV', '리무진', '화물자동차'];
    } else if( some === 'sound') {
        doing = '간장공장 공장장';
        something = ['간장장공 장장공', '공장간장 공장간', '간장공장 공장장', '간장간장 간장장', '장간공장 공장장', '장공간장 공장장', '간장공장 장장공','공장공장 공장장'];
    }

    const n = first_loop(something.indexOf(doing), something.length-1, 0);

    const makeDoing = n.map((val) => {
        return something[val];
    });
    const correct = makeDoing.indexOf(doing);

    return [makeDoing, correct];
}

export function funcSetImages(qn) {
    let initialImages = original_array(qn);

    let ary_key;
    if ((qn !== 21) && (qn !== 23)) {
        const crt_ary = initialImages.filter((obj) => {//차,돌,모자 문제
            if (obj.correct === true) {
                return obj
            }
        });
        ary_key = crt_ary.map(a => {
            return a.id
        });

        if (qn !== 12 && qn !== 18) {//차,돌,모자 문제 아닌
            ary_key = Number(ary_key);
        }

        return [initialImages, ary_key]; //배열로 담긴 이미지 정보, 배열 정답 번호
    } else {//21번이 숫자 순서, 23번이 과일 순서
        ary_key = [0, 1, 2, 3];
        return [initialImages, ary_key];
    }

}

export function original_array(qnbr) {//그림 선택 문제 배열 객체 초기화
    let return_aray = new Array();
    //모자, 돌, 자동차
    if( (qnbr === 12) || (qnbr === 18)) {
        return_aray = [
            {
                name: 'object_choice6_pen',
                src:'object6_pen',
                alt : "펜",
                id:0
            },
            {
                name: 'object_choice6_cap',
                src:'object6_cap',
                alt : "모자",
                id:1,
                correct:true
            },
            {
                name: 'object_choice6_tree',
                src:'object6_tree',
                alt: "나무",
                id:2
            },
            {
                name: 'object_choice6_car',
                src:'object6_car',
                alt: "차",
                id:3,
                correct:true
            },
            {
                name: 'object_choice6_airplane',
                src:'object6_airplane',
                alt: "비행기",
                id:4
            },
            {
                name: 'object_choice6_rock',
                src:'object6_rock',
                alt: "돌",
                id:5,
                correct:true
            }
        ];
    }

    if( qnbr === 19 ) {
        return_aray = [
            {
                name: 'flag_choice',
                src:'flag_korea.svg',
                alt : "태극기",
                id:0,
                correct:true
            },
            {
                name: 'flag_choice',
                src:'flag_china.svg',
                alt : "중국 국기",
                id:2
            },
            {
                name: 'flag_choice',
                src:'flag_us.svg',
                alt : "미국 국기",
                id:1
            },
            {
                name: 'flag_choice',
                src:'flag_japan.svg',
                alt : "일본 국기",
                id:3
            },
        ]    
    }

    if( qnbr === 20 ) {
        return_aray = [
            {
                name: 'fruit_choice4',
                src:'fruit6_strawberry.png',
                alt : "딸기",
                id:0,
                correct:true
            },
            {
                name: 'fruit_choice4',
                src:'fruit6_tomato.png',
                alt : "토마토",
                id:1
            },
            {
                name: 'fruit_choice4',
                src:'fruit6_banana.png',
                alt : "바나나",
                id:2
            },
            {
                name: 'fruit_choice4',
                src:'fruit6_apple.png',
                alt : "사과",
                id:3
            },
            {
                name: 'fruit_choice4',
                src:'fruit6_kiwi.png',
                alt : "키위",
                id:4
            },
            {
                name: 'fruit_choice4',
                src:'fruit6_lemon.png',
                alt : "레몬",
                id:5
            },
        ]    
    }

    if( qnbr === 21 ) {
        return_aray = [
            {
                name: 'number_choice1',
                src:'numbers_one.svg',
                alt : "숫자 1",
                id:0
            },
            {
                name: 'number_choice2',
                src:'numbers_two.svg',
                alt : "숫자 2",
                id:1
            },
            {
                name: 'number_choice3',
                src:'numbers_three.svg',
                alt : "숫자 3",
                id:2
            },
            {
                name: 'number_choice4',
                src:'numbers_four.svg',
                alt : "숫자 4",
                id:3
            },
        ]    
    }

    //id 값이 정답 순서
    if( qnbr === 23 ) {
        return_aray = [
            {
                name: 'fruit_choice4_strawberry',
                src:'fruit4_strawberry.png',
                alt : "딸기",
                id:0
            },
            {
                name: 'fruit_choice4_tomato',
                src:'fruit4_tomato.png',
                alt : "토마토",
                id:2
            },
            {
                name: 'fruit_choice4_banana',
                src:'fruit4_banana.png',
                alt : "바나나",
                id:1
            },
            {
                name: 'fruit_choice4_apple',
                src:'fruit4_apple.png',
                alt : "사과",
                id:3
            },
        ]    
    }

    return return_aray;
}

export function funcGetCalMinus(qnbr) {
   //console.log("여기",qnbr);
  let correct_temp = 0;
  switch (qnbr) {
    case 13:
      correct_temp = 93;
      break;
    case 14:
      correct_temp = 86;
      break;
    case 15:
      correct_temp = 79;
      break;
    case 16:
      correct_temp = 72;
      break;
    case 17:
      correct_temp = 65;
      break;
    default:
      correct_temp = 99;
      break;
  }

  const limit_nbr = correct_temp+7 > 100 ? 99 : correct_temp+7;
  const n = first_loop(correct_temp, limit_nbr, correct_temp-7);
  
  const correct = n.indexOf(correct_temp);
//  console.log('n',n);
  return [n, correct];
}
//공통 반복문
function first_loop(crt, rd1, rd2) {
    let n = [];
    n.push(crt);

    var i=0;
    firstLoop: while (i<3) {
        const maked_nbr = makeRandomNbr(rd1, rd2);      

        for (var j=0; j < n.length; j++) {
             if (maked_nbr === n[j]) continue firstLoop;
        }

        ++i;
        n.push(maked_nbr);
    }

    n.sort(function(a, b) {
        return a - b;
    });

    return n;
}


//랜덤 숫자 추출 함수
export function makeRandomNbr(max, min) {
    const random_nbr = Math.random();
    const make_nbr = random_nbr * (max - min) + min;
    const to_int = Math.floor(make_nbr);

    return to_int;
}

//숫자 date를 요일 글자로 변환
function change_day(d) {
    switch(d) {
        case 0: return "일";
        case 1: return '월';
        case 2: return '화';
        case 3: return '수';
        case 4: return '목';
        case 5: return '금';
        case 6: return '토';
        default : return "일";
    }
}

//우울증, 스트레스 문제 랜덤으로 초기 셋팅
export function shuffle(sourceArray) {
    for (var i=0; i<sourceArray.length-1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length-i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}