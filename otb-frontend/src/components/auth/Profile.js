/* eslint-disable eqeqeq */
import React from 'react'
import { editUser, getSingleUser, getHeroes, getTeams } from '../../lib/api'
import useForm from '../../hooks/useForm'
import { useHistory, useParams } from 'react-router-dom'
import { isOwner } from '../../lib/auth'

import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  Select
} from '@chakra-ui/react'

import {
  EditIcon
} from '@chakra-ui/icons'
import TeamListing from '../Teams/TeamListing'



function Profile() {
  const { id } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [teams, setTeams] = React.useState(null)
  const [heroes, setHeroes] = React.useState([])
  const history = useHistory()
  const { formData, setFormData, formErrors, setFormErrors, handleChange } = useForm({
    username: '',
    battletag: '',
    sr: '',
    mainrole: '',
    dps1: '',
    dps2: '',
    dps3: '',
    tank1: '',
    tank2: '',
    tank3: '',
    support1: '',
    support2: '',
    support3: '',
  })

  React.useEffect(() => {
    const getData = async () => {
      try {
        const userPromise = getSingleUser(id)
        const teamsPromise = getTeams()
        const heroesPromise = getHeroes()
        const user = await userPromise
        const teams = await teamsPromise
        const heroes = await heroesPromise
        setFormData(user.data)
        setTeams(teams.data)
        setHeroes(heroes.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id, setFormData, setTeams])

  const handleCancel = async () => {
    try {
      const response = await getSingleUser(id)
      setFormData(response.data)
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await editUser(id, formData)
      onClose()
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }
  return (
    <Box m={{ base: 4, md: 10 }}>
      <HStack>
        <Heading>Profile</Heading>
        {
          isOwner(formData.id) ?
            <EditIcon onClick={onOpen} boxSize={6} _hover={{ color: 'teal' }} />
            : ''
        }
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={handleCancel}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your Details:</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                  ''
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
                  ''
              }
            </FormControl>

            <FormControl pb={5} id='sr'>
              <FormLabel>Rank</FormLabel>
              <Input
                type='number'
                placeholder='0-5000'
                onChange={handleChange}
                value={formData.sr}
                name='sr'
              />
              {
                formErrors.battletag ?
                  <FormHelperText color='red'>{formErrors.sr[0]}</FormHelperText>
                  :
                  ''
              }
            </FormControl>

            <FormControl pb={5} id='sr'>
              <FormLabel>Main Role</FormLabel>
              <Select
                value={formData.mainrole}
                onChange={handleChange}
                name='mainrole'
              >
                <option value="DPS">DPS</option>
                <option value="TANK">TANK</option>
                <option value="SUPPORT">SUPPORT</option>
              </Select>
              {
                formErrors.battletag ?
                  <FormHelperText color='red'>{formErrors.sr[0]}</FormHelperText>
                  :
                  ''
              }
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex direction={{ base: 'column', lg: 'row' }}>
        <Box m={{ base: 0, md: 2 }} flex='1'>
          <Box mt={10} mb={10}>
            <HStack>
              <Text fontSize='2xl'>
                Username: {formData.username ? formData.username : 'None'}
              </Text>

            </HStack>
            <HStack>
              <Text fontSize='2xl'>
                Battletag: {formData.battletag ? formData.battletag : 'None'}
              </Text>

            </HStack>
            <HStack>
              <Text fontSize='2xl'>
                Rank: {formData.sr ? formData.sr : 'None'}
              </Text>

            </HStack>
            <HStack>
              <Text fontSize='2xl'>
                Main Role: {formData.mainrole ? formData.mainrole : 'None'}
              </Text>

            </HStack>
          </Box>
          <Flex m={0} direction='column'>
            <Box flex={1} m={0}>
              <Text fontSize='2xl'>Dps</Text>
              <Flex direction='row'>
                {/* <Box flex={1} m={2}>{formData.dps1 ? formData.dps1.name : 'None'}</Box> */}
                <BannerHeroImg heroformData={formData.dps1} />
                {/* <Box flex={1} m={2}>{formData.dps2 ? formData.dps2.name : 'None'}</Box> */}
                <BannerHeroImg heroformData={formData.dps2} />
                {/* <Box flex={1} m={2}>{formData.dps3 ? formData.dps3.name : 'None'}</Box> */}
                <BannerHeroImg heroformData={formData.dps3} />
              </Flex>
            </Box>
            <Box flex={1} m={0}>
              <Text fontSize='2xl'>Tank</Text>
              <Flex direction='row'>
                {/* <Box flex={1} m={2}>{formData.tank1 ? formData.tank1.name : 'None'}</Box> */}
                <BannerHeroImg heroformData={formData.tank1} />
                {/* <Box flex={1} m={2}>{formData.tank2 ? formData.tank2.name : 'None'}</Box> */}
                <BannerHeroImg heroformData={formData.tank2} />
                {/* <Box flex={1} m={2}>{formData.tank3 ? formData.tank3.name : 'None'}</Box> */}
                <BannerHeroImg heroformData={formData.tank3} />
              </Flex>
            </Box>
            <Box flex={1} m={0}>
              <Text fontSize='2xl'>Support</Text>
              <Flex direction='row'>
                {/* <Box flex={1} m={2}>{formData.support1 ? formData.support1.name : 'None'}</Box> */}
                <BannerHeroImg heroformData={formData.support1} />
                {/* <Box flex={1} m={2}>{formData.support2 ? formData.support2.name : 'None'}</Box> */}
                <BannerHeroImg heroformData={formData.support2} />
                {/* <Box flex={1} m={2}>{formData.support3 ? formData.support3.name : 'None'}</Box> */}
                <BannerHeroImg heroformData={formData.support3} />
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Flex direction='column' flex={1} m={0}>
          <Text fontSize='3xl'>Teams:</Text>
          {
            teams ?
              teams.map(team => {
                if (
                  (team.dps1 && team.dps1.id == id) ||
                  (team.dps2 && team.dps2.id == id) ||
                  (team.tank1 && team.tank1.id == id) ||
                  (team.tank2 && team.tank2.id == id) ||
                  (team.support1 && team.support1.id == id) ||
                  (team.support2 && team.support2.id == id)
                ) {
                  return (
                    <TeamListing
                      key={team.id}
                      name={team.name ? team.name : 'TEAMNAME'}
                      dps1={team.dps1 ? team.dps1.username : '?'}
                      dps2={team.dps2 ? team.dps2.username : '?'}
                      tank1={team.tank1 ? team.tank1.username : '?'}
                      tank2={team.tank2 ? team.tank2.username : '?'}
                      support1={team.support1 ? team.support1.username : '?'}
                      support2={team.support2 ? team.support2.username : '?'}
                      teamid={team.id}
                    />
                  )
                }
              })
              : ''
          }
        </Flex>
      </Flex>
    </Box >
  )
}

function BannerHeroImg({ heroformData }) {
  return (<Image
    w='32%'
    m={{ base: 0.5, md: 1 }} border='1px'
    rounded='5px'
    borderColor='whiteAlpha.300'
    src={heroformData ? heroformData.imgBanner : 'https://res.cloudinary.com/sirdancloud/image/upload/v1624032691/OTB/missing-img-banner_d0r4lz.png'}
    _hover={{
      borderColor: 'gray.400',
    }}
  />
  )
}

export default Profile