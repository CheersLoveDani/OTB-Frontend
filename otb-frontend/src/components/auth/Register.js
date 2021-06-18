import React from 'react'
import { useHistory } from 'react-router'
import { loginUser, registerUser } from '../../lib/api'
import { setToken, getCurrentUserId } from '../../lib/auth'
import useForm from '../../hooks/useForm'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Heading,
  InputRightElement,
  InputGroup
} from '@chakra-ui/react'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'


function Register() {
  const history = useHistory()
  const [showPass, setShowPass] = React.useState(false)
  const { formData, formErrors, setFormErrors, handleChange } = useForm({
    email: '',
    username: '',
    battletag: '',
    password: '',
    passwordConfirmation: '',
  })

  const handlePassShowClick = () => setShowPass(!showPass)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerUser(formData)
      const { data } = await loginUser(formData)
      setToken(data.token)
      history.push(`/profile/${getCurrentUserId()}`)
      location.reload()
    } catch (err) {
      setFormErrors(err.response.data)
      console.log('formerrors: ', err.response.data)
    }
  }

  return (
    <Box p={2} flex='1'>
      <form onSubmit={handleSubmit}>
        <FormControl pb={2} id='email'>
          <Heading pb={5}>Register</Heading>
          <FormLabel>Email Address</FormLabel>
          <Input
            type='email'
            placeholder='example@email.com'
            onChange={handleChange}
            value={formData.email}
            name='email'
          />
          {
            formErrors.email ?
              <FormHelperText color='red'>{formErrors.email[0]}</FormHelperText>
              :
              <FormHelperText>Enter a valid email address</FormHelperText>
          }

        </FormControl>

        <FormControl pb={5} id='username'>
          <FormLabel>Username</FormLabel>
          <Input
            type='text'
            placeholder='Username'
            onChange={handleChange}
            value={formData.username}
            name='username'
          />
          {
            formErrors.username ?
              <FormHelperText color='red'>{formErrors.username[0]}</FormHelperText>
              :
              <FormHelperText>Enter a Username</FormHelperText>
          }
        </FormControl>

        <FormControl pb={5} id='battleTag'>
          <FormLabel>Overwatch Battle Tag</FormLabel>
          <Input
            type='text'
            placeholder='example#12345'
            onChange={handleChange}
            value={formData.battletag}
            name='battletag'
          />
          {
            formErrors.battletag ?
              <FormHelperText color='red'>{formErrors.battletag[0]}</FormHelperText>
              :
              <FormHelperText>Enter a Battletag</FormHelperText>
          }
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
            formErrors.password ?
              <FormHelperText color='red'>{formErrors.password[0]}</FormHelperText>
              :
              <FormHelperText>Enter a Password</FormHelperText>
          }
        </FormControl>

        <FormControl pb={5} id='passwordConfirmation'>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showPass ? 'text' : 'password'}
              placeholder='Password'
              onChange={handleChange}
              value={formData.passwordConfirmation}
              name='passwordConfirmation'
            />
            <InputRightElement width="2.8rem">
              <Button size="sm" onClick={handlePassShowClick}>
                {showPass ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {
            formErrors.passwordConfirmation ?
              <FormHelperText color='red'>{formErrors.passwordConfirmation[0]}</FormHelperText>
              :
              <FormHelperText>Confirm your password</FormHelperText>
          }
        </FormControl>

        <Button type='submit'>
          Submit
        </Button>
      </form>
    </Box >
  )
}

export default Register