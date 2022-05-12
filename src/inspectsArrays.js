const stress = [
  {
    id: 1,
    correct: 'reverse',
    question_txt:
      '일상의 일들이 당신의 생각대로 진행되고 있다는 느낌을 얼마나 자주 경험하셨습니까?',
  },
  {
    id: 2,
    correct: true,
    question_txt:
      '어려운 일이 너무 많이 쌓여서 극복하지 못할 것 같은 느낌을 얼마나 자주 경험하셨습니까?',
  },
  {
    id: 3,
    correct: true,
    question_txt:
      '신경이 예민해지고 스트레스를 받고 있다는 느낌을 얼마나 자주 경험하셨습니까?',
  },
  {
    id: 4,
    correct: true,
    question_txt:
     '예상치 못한 일 때문에 당황한 적이 얼마나 있으십니까?',
  },
  {
    id: 5,
    correct: true,
    question_txt:
      '인생에서 중요한 일들을 조절할 수 없다는 느낌을 얼마나 자주 경험하셨습니까?',
  },
  {
    id: 6,
    correct: true,
    question_txt:
      '당신이 꼭 해야 하는 일을 처리할 수 없다고 생각한 적이 얼마나 자주 있으셨습니까?',
  },
  {
    id: 7,
    correct: true,
    question_txt:
      '당신이 통제할 수 없는 일 때문에 화가 난 경험이 얼마나 자주 있으셨습니까?',
  },
  {
    id: 8,
    correct: 'reverse',
    question_txt:
      '당신이 개인적 문제들을 다루는 데 있어서 얼마나 자주 자신감을 느끼셨습니까?'
  },
  {
    id: 9,
    question_txt:
     '나는 현재 최상의 컨디션이라고 얼마나 자주 느끼십니까?',
    correct: 'reverse',
  },
  {
    id: 10,
    question_txt:
      '일상 생활에서 짜증이 날 경우 얼마나 자주 잘 다스릴 수 있으십니까?',
    correct: 'reverse',
  },
];

const depression = [
  {
    id: 1,
    question_txt: '별일 없이 얼굴이 화끈거리거나 진땀이 날 때가 자주 있다.',
    correct: true,
  },
  {
    id: 2,
    question_txt: '내 체력이 지쳐버리지나 않을까 걱정이 될 때가 많다.',
    correct: true,
  },
  {
    id: 3,
    question_txt: '나는 정말 자신이 없다고 자주 생각한다.',
    correct: true,
  },
  {
    id: 4,
    question_txt: '사람들이 나를 싫어한다고 자주 느낀다.',
    correct: true,
  },
  {
    id: 5,
    question_txt: '전부 다 화가 나고 짜증이 날 때가 많다.',
    correct: true,
  },
  {
    id: 6,
    question_txt: '인생은 즐거운 것이라고 생각한다.',
    correct: 'reverse',
  },
  {
    id: 7,
    question_txt: '예전처럼 정신이 맑다고 생각한다.',
    correct: 'reverse',
  },
  {
    id: 8,
    question_txt: '아무것도 할 수 없을 것처럼 무기력함을 자주 느낀다.',
    correct: true,
  },
  {
    id: 9,
    question_txt: '예전에 좋아하던 일들을 여전히 즐기고 있다.',
    correct: 'reverse',
  },
  {
    id: 10,
    question_txt: '나는 현재 즐겁고 행복하다고 생각한다.',
    correct: 'reverse',
  },
  {
    id: 11,
    question_txt: '지금 내가 살아있다는 사실이 참 기쁘다고 느낀다.',
    correct: 'reverse',
  },
  {
    id: 12,
    question_txt: '내 기억력은 현재 괜찮은 것 같다.',
    correct: 'reverse',
  },
  {
    id: 13,
    question_txt: '아직 이성에 대해 관심이 많다.',
    correct: 'reverse',
  },
  {
    id: 14,
    question_txt: '전보다 내 모습이 추해졌다고 생각할 때가 많다.',
    correct: true,
  },
  {
    id: 15,
    question_txt: '나는 항상 기분이 좋은 편이다.',
    correct: 'reverse',
  },
  {
    id: 16,
    question_txt: '앞날에 대하여 걱정을 할 때가 많다.',
    correct: true,
  },
  {
    id: 17,
    question_txt: '내 나이 때의 다른 사람들 못지 않게 건강하다고 생각한다.',
    correct: 'reverse',
  },
  {
    id: 18,
    question_txt: '안절부절 못하고 초조함을 느낄 때가 자주 있다.',
    correct: true,
  },
  {
    id: 19,
    question_txt: '요즘 나의 몸무게가 많이 줄었다.',
    correct: true,
  },
  {
    id: 20,
    question_txt: '나의 판단력은 여전히 좋다고 생각한다.',
    correct: 'reverse',
  },
  {
    id: 21,
    question_txt: '어떤 일을 시작하려면 예전보다 힘이 많이 든다.',
    correct: true,
  },
  {
    id: 22,
    question_txt: '나의 잘못에 대하여 나 자신을 자주 탓할 때가 있다.',
    correct: true,
  },
  {
    id: 23,
    question_txt: '나는 사람들과 잘 어울린다고 생각한다.',
    correct: 'reverse',
  },
  {
    id: 24,
    question_txt: '나는 항상 앞날에 대해 희망적으로 느낀다.',
    correct: 'reverse',
  },
  {
    id: 25,
    question_txt: '현재 나의 건강에 대해서 별로 걱정을 하지 않는다.',
    correct: 'reverse',
  },
  {
    id: 26,
    question_txt: '무슨 일을 하든지 곧 피로함을 느낀다.',
    correct: true,
  },
  {
    id: 27,
    question_txt: '농담을 들어도 별로 재미가 없다.',
    correct: true,
  },
  {
    id: 28,
    question_txt: '아침에 잠자리에서 일어날 때 기분이 좋다.',
    correct: 'reverse',
  },

  {
    id: 29,
    question_txt: '밖에 나가기보다는 주로 집에만 있으려고 한다.',
    correct: true,
  },
  {
    id: 30,
    question_txt: '쓸데없는 생각들이 자주 떠올라 괴로움을 느낀다.',
    correct: true,
  },
];

const dementia = [
  {
    id: 1,
    question_txt: '올해는 몇 년도입니까?',
    answer_type: 'four',
    choice_fnc: 'year',
  },
  {
    id: 2,
    question_txt: '지금은 무슨 계절입니까?',
    answer_type: 'four',
    choice_fnc: 'season',
  },
  {
    id: 3,
    question_txt: '지금은 몇 월입니까?',
    answer_type: 'four',
    choice_fnc: 'month',
  },
  {
    id: 4,
    question_txt: '오늘은 며칠입니까?',
    answer_type: 'four',
    choice_fnc: 'date',
  },
  {
    id: 5,
    question_txt: '오늘은 무슨 요일입니까?',
    answer_type: 'four',
    choice_fnc: 'day',
  },
  {
    id: 6,
    question_txt: '현재 하고 있는 것은 무엇입니까?',
    answer_type: 'four',
    choice_fnc: 'do',
  },
  {
    id: 7,
    question_txt: '현재 보고 있는 것은 무엇입니까?',
    answer_type: 'four',
    choice_fnc: 'look',
  },
  {
    id: 8,
    question_txt: '현재 당신의 자세는 무엇입니까?',
    answer_type: 'four',
    choice_fnc: 'posture',
  },
  {
    id: 9,
    question_txt: '현재 당신의 위치는 어디입니까?',
    answer_type: 'four',
    choice_fnc: 'gps',
  },
  {
    id: 10,
    question_txt: '우리나라를 선택해주세요.',
    answer_type: 'four',
    choice_fnc: 'country',
  },
  {
    id: 11,
    question_txt:
      '지금 3가지 물체가 화면에 나타납니다. 잘 보고 기억해주세요. 기억하셨습니까?',
      answer_type: 'view',
    choice_fnc: 'null',
  },
  {
    id: 12,
    question_txt: '조금 전에 기억하라고 한 물체가 무엇인지 전부 선택해주세요.',
    answer_type: 'multiImage',
    choice_fnc: 'thirdChoice',
  },
  {
    id: 13,
    question_txt: '100에서 7을 빼면 얼마가 됩니까?',
    answer_type: 'four',
    choice_fnc: 'calculate',
  },
  {
    id: 14,
    question_txt: '거기에서 7을 빼면 얼마가 됩니까?',
    answer_type: 'four',
    choice_fnc: 'calculate',
  },
  {
    id: 15,
    question_txt: '거기에서 7을 빼면 얼마가 됩니까?',
    answer_type: 'four',
    choice_fnc: 'calculate',
  },
  {
    id: 16,
    question_txt: '거기에서 7을 빼면 얼마가 됩니까?',
    answer_type: 'four',
    choice_fnc: 'calculate',
  },
  {
    id: 17,
    question_txt: '거기에서 7을 빼면 얼마가 됩니까?',
    answer_type: 'four',
    choice_fnc: 'calculate',
  },
  {
    id: 18,
    question_txt: '조금 전에 기억하라고 한 물체가 무엇인지 전부 선택해주세요.',
    answer_type: 'multiImage',
    choice_fnc: 'thirdChoice',
  },
  {
    id: 19,
    question_txt: '우리나라 국기를 선택해주세요',
    answer_type: 'onceImage',
    choice_fnc: 'oneChoice',
  },
  {
    id: 20,
    question_txt: '딸기를 선택해주세요.',
    answer_type: 'onceImage',
    choice_fnc: 'oneChoice',
  },
  {
    id: 21,
    question_txt: '주어진 보기를 순서대로 선택해 주세요.',
    answer_type: 'indexImage',
    choice_fnc: 'numbersIndex',
  },
  {
    id: 22,
    question_txt: '종이를 쓰레기통에 버려주세요.',
    answer_type: 'move',
    choice_fnc: 'paperMove',
  },
  {
    id: 23,
    question_txt: '주어진 보기를 순서대로 선택해 주세요.',
    answer_type: 'indexImage',
    choice_fnc: 'fruitsIndex',
  },
  {
    id: 24,
    question_txt: '현재 나오는 말이 무슨 말인지 선택하세요.',
    answer_type: 'sound',
    choice_fnc: 'sound',
  },
  {
    id: 25,
    question_txt: '삼각형을 움직여 겹쳐보세요.',
    answer_type: 'move',
    choice_fnc: 'triangleMove',
  },
  {
    id: 26,
    question_txt: "'티끌 모아 태산'은 무슨 뜻입니까?",
    answer_type: 'four',
    choice_fnc: 'proverb',
  },
  {
    id: 27,
    question_txt: '응급환자 발생 시 어떤 차를 이용하나요?',
    answer_type: 'four',
    choice_fnc: 'emergencyCar',
  },
];

export { stress, depression, dementia };
