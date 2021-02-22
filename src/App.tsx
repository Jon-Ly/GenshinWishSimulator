import React, { useState } from "react";
import Wish from "./pages/wish/wish";
import BannerSelectMenu from "./pages/banner-select/banner-select";
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

export const App = () => {
  const [isWishing, setIsWishing] = useState(false);

  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            {isWishing ? <Wish setIsWishing={setIsWishing}/> : <BannerSelectMenu setIsWishing={setIsWishing} isWishing={isWishing}/>}
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
