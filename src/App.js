
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
//import { SplashScreen } from '@capacitor/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { Login, SignUpA, SignUpB, SignUpC, Home, Option, Intro, Dementia, Stress, Depression, End, Result, PastResult, Advertisement } from './pages/index';

import './basic.css';
import './scss/Style.scss';

import { App as CApp } from "@capacitor/app";

//import { isMobile, MobileView } from 'react-device-detect'; 모바일과 태블릿 구분할 때 사용할 수 있을 것 같다 
// SplashScreen.show({
//   showDuration: 2000,
//   autoHide: true 
// });

ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);

const App = () => {
  let history = useHistory(); 
 
  const confirmExit = () => {
    const yn = window.confirm("정신건강테스트 앱을 종료할까요?");
    
    if (yn) {
      CApp.exitApp();
    }
  }

  CApp.addListener('backButton', () => {
    let current_path = history.location.pathname;

    if (current_path.indexOf("/option") == 0 || current_path.indexOf("/viewResultAll") == 0) {
      history.push("/home");
      return;
    }

    if (current_path.indexOf("/signup") == 0) {
      history.push("/");
      return;
    }

    confirmExit();    
 });


  return (
    <div id="INSPECTS_APP" className="inspects_container">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/signup1" component={SignUpA} />
        <Route path="/signup2" component={SignUpB} />
        <Route path="/signup3/:name/:birth?/:ocode?" component={SignUpC} />
        <Route path="/home" component={Home} />
        <Route path="/option/:name" component={Option} />
        <Route path="/viewResultAll/:type" component={PastResult}/>
        <Route path="/intro" component={Intro} />
        <Route path="/inspects/dementia" component={Dementia} />
        <Route path="/inspects/stress" component={Stress} />
        <Route path="/inspects/depression" component={Depression} />
        <Route path="/end/:type/:score/:stime" component={End} />
        <Route path="/result/:type/:score" component={Result}/>
        <Route path="/advt" component={Advertisement}/>    
      </Switch>
    </div>
  );
}

export default App;