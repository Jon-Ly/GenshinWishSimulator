import React, { useState } from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Wish from "./components/wish/Wish";
import BannerSelectMenu from "./components/banner-select-menu/banner-select-menu";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BannerDetail from "./components/banner-detail/banner-detail";
import './App.css';

export const App = () => {
  const [isWishing, setIsWishing] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Router>
        <Switch>
          <Route path='/details'>
            <BannerDetail/>
          </Route>
          <Route path='/'>
            {isWishing ? <Wish setIsWishing={setIsWishing}/> : <BannerSelectMenu setIsWishing={setIsWishing}/>}
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
