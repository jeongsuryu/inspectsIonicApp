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

######################################## 
1. npm install -g @ionic/cli
2. git clone xxx/inspectsIonicApp 
3. cd inspectsIonicApp
4. yarn install 
5. ionic —version
6. npm start  <- 실행 
7. npm run build
8. npx cap add android
9. npx cap copy && npx cap sync
10. npx cap open android
11. android/app/build.gradle file will need to be edited to increment the versionCode

	(테스트 버전은) build
	(업로드 버전은) 버전코드 업데이트 <- build.gradle 버전코드 수정해야 함 
	npx cap sync android
	generate bundle~ 

  547  npm run build
  549  npx cap copy && npx cap sync
  551  npx cap sync
  554  npx cap open android

	vscode > Ionic > Splash & Icon > Rebuild 
	위의 명령어 547 ~ 554 실행 

