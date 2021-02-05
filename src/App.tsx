import React, { useState } from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Wish from "./features/wish/Wish";
import BannerSelectMenu from "./features/banner-select-menu/BannerSelectMenu";

export const App = () => {
  const [isWishing, setIsWishing] = useState(false);

  return (
    <ChakraProvider theme={theme}>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        {isWishing ? <Wish setIsWishing={setIsWishing}/> : <BannerSelectMenu setIsWishing={setIsWishing}/>}
    </ChakraProvider>
  );
}
