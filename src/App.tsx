import React, { useState } from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Wish from "./pages/wish/wish";
import BannerSelectMenu from "./pages/banner-select/banner-select";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BannerDetail from "./pages/banner-detail/banner-detail";
import './App.css';

export const App = () => {
  const [isWishing, setIsWishing] = useState(false);

  return (
    <ChakraProvider>
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
