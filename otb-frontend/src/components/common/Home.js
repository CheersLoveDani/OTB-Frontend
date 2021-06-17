import {
  Box,
  Flex
} from '@chakra-ui/react'
import Login from '../auth/Login'
import Register from '../auth/Register'

function Home() {
  return (
    <Box p={10}>
      <Flex>
        <Register />
        <Login />
      </Flex>
    </Box>
  )
}

export default Home