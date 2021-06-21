import { Box, Button, Flex, Spacer } from '@chakra-ui/react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken, getCurrentUserId } from '../../lib/auth'



function Nav() {
  const isLoggedIn = isAuthenticated()
  const history = useHistory()


  const handleLogout = () => {
    removeToken()
    history.push('/')
    location.reload()
  }

  return (
    <Box w='100%' p={2} borderBottom='2px' borderColor='black'>
      <Flex>
        <Link to='/'><Button>Home</Button></Link>
        <Spacer />
        <Link to='/teams'><Button mr={1}>Teams</Button></Link>
        {
          isLoggedIn ?
            <>
              <Link to={`/profile/${getCurrentUserId()}`} ><Button mr={1}>Profile</Button></Link>
              <Button onClick={handleLogout} colorScheme='red'>Logout</Button>
            </>
            :
            <>
              <Link to='/'><Button colorScheme='orange'>Register/Login</Button></Link>
            </>
        }

      </Flex>
    </Box>
  )
}

export default Nav