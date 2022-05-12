# enInspectsApp

### 최종 출시 버전
- #appid = com.careyou.dementia
- #bundle_version = 32
- #user_version = 2.22
- #android keystore 비번: jj75316739

### 명령어
```
npm start
npm run build
npx cap open android
(테스트 버전은) build
(업로드 버전은) 버전코드 업데이트
npx cap sync android
generate bundle~ 
```


### package.json 관리 방법

$ npm cache verify : 캐시삭제<br>
$ npm install --force : 디스크에 사본이 있어도 무조건 다시 다운받게 한다<br>
$ npm install --legacy-peer-deps : 버전 충돌 dependencies 찾아 설치<br>
