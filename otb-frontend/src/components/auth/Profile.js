/* eslint-disable eqeqeq */
import React from 'react'
import { editUser, getSingleUser, getHeroes, getTeams } from '../../lib/api'
import useForm from '../../hooks/useForm'
import { useParams } from 'react-router-dom'
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
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
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
  const [unsavedChanges, setUnsavedChanges] = React.useState(false)
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
    e && e.preventDefault()
    try {
      await editUser(id, formData)
      setUnsavedChanges(false)
      onClose()
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

  const handleHeroChange = async (heroData, name) => {
    const data = { target: { name: name, value: heroData } }
    console.log(name, data)
    setUnsavedChanges(true)
    handleChange(data)
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

              <Text display='inline' fontSize='2xl'>Dps</Text>

              <Flex direction='row'>
                <BannerHeroImg
                  handleHeroChange={handleHeroChange}
                  heroformData={formData.dps1}
                  heroesData={heroes}
                  name={'dps1'}
                />
                <BannerHeroImg
                  handleHeroChange={handleHeroChange}
                  heroformData={formData.dps2}
                  heroesData={heroes}
                  name={'dps2'}
                />
                <BannerHeroImg
                  handleHeroChange={handleHeroChange}
                  heroformData={formData.dps3}
                  heroesData={heroes}
                  name={'dps3'}
                />
              </Flex>
            </Box>
            <Box flex={1} m={0}>
              <Text fontSize='2xl'>Tank</Text>

              <Flex direction='row'>
                <BannerHeroImg
                  handleHeroChange={handleHeroChange}
                  heroformData={formData.tank1}
                  heroesData={heroes}
                  name={'tank1'}
                />
                <BannerHeroImg
                  handleHeroChange={handleHeroChange}
                  heroformData={formData.tank2}
                  heroesData={heroes}
                  name={'tank2'}
                />
                <BannerHeroImg
                  handleHeroChange={handleHeroChange}
                  heroformData={formData.tank3}
                  heroesData={heroes}
                  name={'tank3'}
                />
              </Flex>
            </Box>
            <Box flex={1} m={0}>
              <Text fontSize='2xl'>Support</Text>
              <Flex direction='row'>
                <BannerHeroImg
                  handleHeroChange={handleHeroChange}
                  heroformData={formData.support1}
                  heroesData={heroes}
                  name={'support1'}
                />
                <BannerHeroImg
                  handleHeroChange={handleHeroChange}
                  heroformData={formData.support2}
                  heroesData={heroes}
                  name={'support2'}
                />
                <BannerHeroImg
                  handleHeroChange={handleHeroChange}
                  heroformData={formData.support3}
                  heroesData={heroes}
                  name={'support3'}
                />
              </Flex>
            </Box>
          </Flex>
          {isOwner(id) &&
            <Button
              mt={3}
              colorScheme='green'
              onClick={handleSave}
              size='lg'
              variant='outline'
            >
              Save
            </Button>}
          {unsavedChanges ?
            <Text color='red.400' ml={5} display='inline' >Warning! Unsaved Changes!</Text>
            : ''
          }
        </Box>

        <Flex direction='column' flex={1} ml={{ base: 0, md: 2, lg: 4 }}>
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

function BannerHeroImg({ heroformData, heroesData, handleHeroChange, name }) {
  const { id } = useParams()
  return (
    <Menu w='32%' gutter={-300}>
      <MenuButton >
        <Image
          m={{ base: 0.5, md: 1 }}
          border='1px'
          rounded='5px'
          borderColor='whiteAlpha.300'
          src={heroformData ? heroformData.imgBanner : 'https://res.cloudinary.com/sirdancloud/image/upload/v1624032691/OTB/missing-img-banner_d0r4lz.png'}
          _hover={{
            borderColor: 'gray.400',
          }}
        />
      </MenuButton>
      {
        isOwner(id) &&
        <MenuList w='2%'>
          {
            heroesData.map(hero => {
              if (heroformData && hero.role === heroformData.role) {
                return (
                  <MenuItem
                    key={hero.id}
                    onClick={() => handleHeroChange(hero, name)}
                    name='hero'
                  >
                    <Text>
                      {hero ? hero.name : 'loading...'}
                    </Text>
                    {/* <Image
                rounded='5px'
                src={hero ? hero.imgBanner : 'https://res.cloudinary.com/sirdancloud/image/upload/v1624032691/OTB/missing-img-banner_d0r4lz.png'}
              /> */}
                  </MenuItem>
                )
              }
            })
          }
        </MenuList>
      }

    </Menu >
  )
}

export default Profile