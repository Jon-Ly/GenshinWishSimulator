import React, { useState } from "react";
import Wish from "./pages/wish/wish";
import BannerSelect from "./pages/banner-select/banner-select";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BannerDetail from "./pages/banner-detail/banner-detail";
import BannerHistory from "./pages/banner-history/banner-history";
import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import Inventory from "./pages/inventory/inventory";
import Shop from "./pages/shop/shop";
import PATHS from "./constants/paths";

export const App = () => {
  const [isWishing, setIsWishing] = useState(false);
  const [isMuted, setIsMuted] = useState(localStorage.getItem('muted') === 'true');

  const toggleMute = (mute?: boolean) => {
    if (mute === true || mute === false) {
      localStorage.setItem('muted', `${mute}`);
      setIsMuted(mute);
    } else {
      localStorage.setItem('muted', `${!isMuted}`);
      setIsMuted(isMuted => !isMuted);
    }
  }

  return (
    <ChakraProvider>
      <Router>
        <audio style={{display: 'none'}} autoPlay muted={isMuted} loop>
          <source src={`${PATHS.MUSIC}/statue_of_the_seven.ogg`} type="audio/ogg"/>
          <source src={`${PATHS.MUSIC}/statue_of_the_seven.wav`} type="audio/wav"/>
          <source src={`${PATHS.MUSIC}/statue_of_the_seven.mp3`} type="audio/mp3"/>
          Your browser does not support the audio element.
        </audio>
        <Switch>
          <Route exact path='/'>
            {isWishing ? <Wish setIsWishing={setIsWishing} toggleMute={toggleMute}/> : <BannerSelect setIsWishing={setIsWishing} isWishing={isWishing} isMuted={isMuted} toggleMute={toggleMute}/>}
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
      </Router>
    </ChakraProvider>
  );
}
