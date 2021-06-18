import React from 'react'
import { useHistory } from 'react-router'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import useForm from '../../hooks/useForm'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  FormHelperText,
  Heading
} from '@chakra-ui/react'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'




function Login() {
  const history = useHistory()
  const [showPass, setShowPass] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  const { formData, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handlePassShowClick = () => setShowPass(!showPass)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser(formData)
      setToken(data.token)
      history.push('/teams')
      location.reload()
      console.log('success')
    } catch (err) {
      setIsError(true)
      console.log('failure')
    }
  }
  return (
    <Box p={2} flex='1'>
      <form onSubmit={handleSubmit}>
        <FormControl pb={2} id='email' colorScheme='blackAlpha'>
          <Heading pb={5}>Login</Heading>
          <FormLabel>Email Address</FormLabel>
          <Input
            type='email'
            placeholder='example@email.com'
            onChange={handleChange}
            value={formData.email}
            name='email'
          />
          <FormHelperText>Enter a valid email address</FormHelperText>
        </FormControl>

        <FormControl pb={5} id='password'>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPass ? 'text' : 'password'}
              placeholder='Password'
              onChange={handleChange}
              value={formData.password}
              name='password'
            />
            <InputRightElement width="2.8rem">
              <Button size="sm" onClick={handlePassShowClick}>
                {showPass ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {
            isError ?
              <FormHelperText color='red'> Incorrect Email or Password!</FormHelperText>
              :
              <FormHelperText> Enter your Password</FormHelperText>
          }

        </FormControl>

        <Button type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default Login