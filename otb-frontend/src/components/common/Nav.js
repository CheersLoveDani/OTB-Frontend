import { Menu, Box, Button, Flex, Spacer } from "@chakra-ui/react"
import { Link } from 'react-router-dom'



function Nav() {
  return (
    <Box w='100%' p={4} color='white' bg='#43484c'>
      <Flex>
        <Link to='/'><Button colorScheme='dark'>Home</Button></Link>
        <Spacer />
        <Link to='/profile/123'><Button colorScheme='dark'>Profile</Button></Link>
      </Flex>
    </Box>
  )
}

export default Nav