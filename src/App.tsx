import React, { Suspense, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

export const App = () => {
  const [isWishing, setIsWishing] = useState(false);

  const BannerSelect = React.memo(React.lazy(() => import('./pages/banner-select/banner-select')), (prevProps, nextProps) => prevProps.isWishing === nextProps.isWishing);
  const BannerDetail = React.memo(React.lazy(() => import('./pages/banner-detail/banner-detail')));
  const BannerHistory = React.memo(React.lazy(() => import('./pages/banner-history/banner-history')));
  const Inventory = React.memo(React.lazy(() => import('./pages/inventory/inventory')));
  const Shop = React.memo(React.lazy(() => import('./pages/shop/shop')));
  const Wish = React.memo(React.lazy(() => import('./pages/wish/wish')), (prevProps, nextProps) => prevProps.setIsWishing === nextProps.setIsWishing);

  return (
    <ChakraProvider>
      <Router>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path='/'>
              <BannerSelect setIsWishing={setIsWishing} isWishing={isWishing}/>
            </Route>
            <Route exact path='/wishing'>
              <Wish setIsWishing={setIsWishing} isWishing={isWishing}/>
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
