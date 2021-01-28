import React, { useContext } from "react"
import {
  ChakraProvider,
  Box,
  Button,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Wish from "./features/wish/Wish";
import { StoreContext } from './app/Store';

export const App = () => {
  // const [state, dispatch] = useContext(StoreContext);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          {/* {state.isWishing ? <Wish/> : null} */}
          {/* null should become BannerView */}
          {/* <Button onClick={() => dispatch(wish({wishes: 1, banner: bannerState.banner}))}>Wish 1</Button>
          <Button onClick={() => dispatch(wish({wishes: 10, banner: bannerState.banner}))}>Wish 10</Button> */}
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
