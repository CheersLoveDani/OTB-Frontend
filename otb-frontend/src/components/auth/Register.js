import React from 'react'
import { useHistory } from 'react-router'
import { loginUser } from '../../lib/api'
import { setToken, getCurrentUserId } from '../../lib/auth'
import useForm from '../../hooks/useForm'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Heading
} from '@chakra-ui/react'


function Register() {
  const history = useHistory()
  const { formData, handleChange } = useForm({
    email: '',
    username: '',
    battletag: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ! Register the user then log in

    try {
      const { data } = await loginUser(formData)
      setToken(data.token)
      history.push(`/profile/${getCurrentUserId()}`)
      location.reload()
      console.log(data.token)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box p={2} flex='1'>
      <form onSubmit={handleSubmit}>
        <FormControl pb={2} id='email' isRequired>
          <Heading pb={5}>Register</Heading>
          <FormLabel>Email Address</FormLabel>
          <Input type='email' placeholder='example@email.com' />
          <FormHelperText>Enter a valid email address</FormHelperText>
        </FormControl>

        <FormControl pb={5} id='username' isRequired>
          <FormLabel>Username</FormLabel>
          <Input type='name' placeholder='Username' />
          <FormHelperText> Enter your username</FormHelperText>
        </FormControl>

        <FormControl pb={5} id='battleTag' isRequired>
          <FormLabel>Overwatch Battle Tag</FormLabel>
          <Input type='name' placeholder='Battle Tag' />
          <FormHelperText> Enter your Battle Tag</FormHelperText>
        </FormControl>

        <FormControl pb={5} id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <Input type='password' placeholder='Password' />
          <FormHelperText> Enter your Password</FormHelperText>
        </FormControl>

        <FormControl pb={5} id='passwordConfirmation' isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input type='password' placeholder='Password' />
          <FormHelperText> Confirm your Password</FormHelperText>
        </FormControl>

        <Button type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default Register