import React, { Suspense, useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BannerSelect from "./pages/banner-select/banner-select";
import PATHS from "./constants/paths";
import './App.css';

export const App = () => {
  const [isWishing, setIsWishing] = useState(false);
  const [isMuted, setIsMuted] = useState(localStorage.getItem('muted') === 'true');
  const audioRef = React.createRef<HTMLAudioElement>();

  useEffect(() => {
    if (!localStorage.getItem('muted')) {
      localStorage.setItem('muted', 'true');
      setIsMuted(true);
    }
    audioRef.current?.play();
  }, [audioRef])

  const toggleMute = (mute?: boolean) => {
    if (mute === true || mute === false) {
      localStorage.setItem('muted', `${mute}`);
      setIsMuted(mute);
    } else {
      localStorage.setItem('muted', `${!isMuted}`);
      setIsMuted(isMuted => !isMuted);
    }
  }

  const Wish = React.memo(React.lazy(() => import('./pages/wish/wish')), (prevProps, nextProps) => prevProps.setIsWishing === nextProps.setIsWishing);
  // TODO: Causes re-render of BannerSelect when isMute changes
  // const BannerSelect = React.memo(React.lazy(() => import('./pages/banner-select/banner-select')), (prevProps, nextProps) => prevProps.isWishing === nextProps.isWishing);
  const BannerDetail = React.memo(React.lazy(() => import('./pages/banner-detail/banner-detail')));
  const BannerHistory = React.memo(React.lazy(() => import('./pages/banner-history/banner-history')));
  const Inventory = React.memo(React.lazy(() => import('./pages/inventory/inventory')));
  const Shop = React.memo(React.lazy(() => import('./pages/shop/shop')));

  return (
    <ChakraProvider>
      <Router>
        <Suspense fallback={<div></div>}>
          <audio style={{display: 'none'}} muted={isMuted} loop preload='auto' ref={audioRef}>
            <source src={`${PATHS.MUSIC}/statue_of_the_seven.ogg`} type="audio/ogg"/>
            <source src={`${PATHS.MUSIC}/statue_of_the_seven.wav`} type="audio/wav"/>
            <source src={`${PATHS.MUSIC}/statue_of_the_seven.mp3`} type="audio/mp3"/>
            Your browser does not support the audio element.
          </audio>
          <Switch>
            <Route exact path='/'>
                {isWishing ? <Wish setIsWishing={setIsWishing}/> : <BannerSelect setIsWishing={setIsWishing} isWishing={isWishing} isMuted={isMuted} toggleMute={toggleMute}/>}
            </Route>
            <Route path='/details'>
              <BannerDetail/>
            </Route>
            <Route path='/history'>
              <BannerHistory/>
            </Route>
            <Route path='/inventory'>
              <Inventory/>
            </Route>
            <Route path='/shop'>
              <Shop/>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </ChakraProvider>
  );
}
