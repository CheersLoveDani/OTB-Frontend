
import { Link, useHistory } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import { isAuthenticated, removeToken, getCurrentUserId } from '../../lib/auth'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spacer
} from '@chakra-ui/react'
import { createTeam } from '../../lib/api'

function Nav() {
  const isLoggedIn = isAuthenticated()
  const history = useHistory()
  const { formData, handleChange } = useForm({
    name: '',
    private: false,
    icon: '',
  })


  const handleLogout = () => {
    removeToken()
    history.push('/')
    location.reload()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await createTeam(formData)
      history.push(`/teams/${data.data.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box w='100%' p={2} borderBottom='2px' borderColor='black'>
      <Flex>
        <Link to='/' ><Button mr={1}>Home</Button></Link>
        <Link to='/teams'><Button mr={1}>Teams</Button></Link>
        <Spacer />

        {
          isLoggedIn ?
            <>
              <Link to={`/profile/${getCurrentUserId()}`} >
                <Button
                  colorScheme='orange'
                  variant='outline'
                  mr={1}
                >
                  Profile
                </Button>
              </Link>
              <Popover>
                <PopoverTrigger>
                  <Button
                    mr={1} colorScheme='green'
                    variant='outline'
                  >
                    Create Team
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>Create a new team!</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <form onSubmit={handleSubmit}>
                        <FormControl pb={2} id='name' colorScheme='blackAlpha'>
                          <FormLabel>Name</FormLabel>
                          <Input
                            type='text'
                            placeholder='Extra Awesome Team Name'
                            onChange={handleChange}
                            value={formData.name}
                            name='name'
                          />
                          <FormHelperText>What is your team called?</FormHelperText>
                        </FormControl>
                        <FormControl pb={4} id='icon' colorScheme='blackAlpha'>
                          <FormLabel>Icon</FormLabel>
                          <Input
                            type='text'
                            placeholder='AwesomeIcon.png'
                            onChange={handleChange}
                            value={formData.icon}
                            name='icon'
                          />
                          <FormHelperText>Enter your teams icon url!</FormHelperText>
                        </FormControl>
                        <Button type='submit' colorScheme='green'>
                          Submit
                        </Button>
                      </form>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>

              <Button
                onClick={handleLogout}
                colorScheme='red'
                variant='outline'
              >
                Logout
              </Button>
            </>
            :
            <>
              <Link to='/'><Button colorScheme='orange' variant='outline'>Register/Login</Button></Link>
            </>
        }

      </Flex>
    </Box>
  )
}

export default Nav