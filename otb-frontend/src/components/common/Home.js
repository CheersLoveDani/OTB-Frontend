import {
  Box,
  Flex
} from '@chakra-ui/react'
import Login from '../auth/Login'
import Register from '../auth/Register'


function Home() {

  return (
    <Box m={{ base: 4, md: 10 }}>
      <Flex direction={{ base: 'column-reverse', md: 'row' }}>
        <Register />
        <Login />
      </Flex>
    </Box>
  )
}

export default Home