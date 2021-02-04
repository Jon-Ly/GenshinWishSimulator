import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Wish from "./features/wish/Wish";
import { useWishDispatch } from "./state-management/store";
import { ACTION_TYPE } from "./state-management/reducer";

export const App = () => {
  const [isWishing, setIsWishing] = useState(false);
  const dispatch = useWishDispatch();

  const wishOne = () => {
    dispatch({type: ACTION_TYPE.WISH, payload: 1});
    setIsWishing(true);
  }

  const wishTen = () => {
    dispatch({type: ACTION_TYPE.WISH, payload: 10});
    setIsWishing(true);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          {isWishing ? <Wish setIsWishing={setIsWishing}/> : null}
          {/* null should become BannerView */}
          <Button onClick={wishOne}>Wish 1</Button>
          <Button onClick={wishTen}>Wish 10</Button>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
