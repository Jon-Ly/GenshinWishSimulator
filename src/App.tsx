import React, { useState } from "react"
import {
  ChakraProvider,
  Box,
  Button,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Wish from "./components/Wish";
import { BANNER_CODES } from "./constants/Banners";
import WISH_TYPE from "./constants/WishType";

export const App = () => {
  const InitialWish = {wishes: 0, type: WISH_TYPE.CHARACTER, banner: BANNER_CODES.NONE}
  const [wish, setWish] = useState(InitialWish);

  const toggleView = () => setWish(InitialWish);

  const oneWish = () => {
    setWish({
      wishes: 1,
      type: WISH_TYPE.CHARACTER,
      banner: BANNER_CODES.ALBEDO,
    });
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          {wish.wishes > 0 ? <Wish toggleView={toggleView} {...wish}/> : null}
          {/* null should become BannerView */}
          <Button onClick={oneWish}>Wish 1</Button>
          <Button onClick={oneWish}>Wish 10</Button>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
