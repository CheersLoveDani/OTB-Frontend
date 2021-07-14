import Login from '../auth/Login'
import Register from '../auth/Register'

import {
  Box,
  Center,
  Flex,
  Heading,
  Image
} from '@chakra-ui/react'
import { isAuthenticated } from '../../lib/auth'



function Home() {

  return (
    <Box m={{ base: 4, md: 10 }}>
      {
        isAuthenticated() ?
          <>
            <Center>
              <Heading>Welcome to the Overwatch Team Builder!</Heading>
            </Center>
            <Center>
              <Image m={20} height={500} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/600px-Overwatch_circle_logo.svg.png' />
            </Center>
          </>

          :
          <Flex direction={{ base: 'column-reverse', md: 'row' }}>
            <Register />
            <Login />
          </Flex>
      }
    </Box>
  )
}

export default Home