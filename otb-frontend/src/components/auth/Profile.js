import React from 'react'
import { getSingleUser } from '../../lib/api'
import useForm from '../../hooks/useForm'
import { useParams } from 'react-router-dom'

import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  HStack
} from '@chakra-ui/react'

import {
  EditIcon
} from '@chakra-ui/icons'



function Profile() {
  const { id } = useParams()
  const { formData, setFormData, formErrors, setFormErrors, handleChange } = useForm({
    username: '',
    email: '',
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
        const response = await getSingleUser(id)
        setFormData(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id, setFormData])

  console.log(formData)
  return (
    <Box m={{ base: 4, md: 10 }}>
      <Heading>Profile</Heading>
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <Box m={{ base: 0, md: 2 }} flex='1'>
          <Box mt={10} mb={10}>
            <HStack>
              <Text fontSize='2xl'>
                Username: {formData.username ? formData.username : 'None'}
              </Text>
              <EditIcon _hover={{ color: 'teal' }} />
            </HStack>
            <HStack>
              <Text fontSize='2xl'>
                Battletag: {formData.battletag ? formData.battletag : 'None'}
              </Text>
              <EditIcon _hover={{ color: 'teal' }} />
            </HStack>
            <HStack>
              <Text fontSize='2xl'>
                Rank: {formData.sr ? formData.sr : 'None'}
              </Text>
              <EditIcon _hover={{ color: 'teal' }} />
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

        <Box flex={1} m={2}>
          <Text fontSize='3xl'>Teams:</Text>
          <Box border='2px' height='4em' borderColor='gray.600' rounded='5px'>
          </Box>
        </Box>
      </Flex>
    </Box >
  )
}

function BannerHeroImg({ heroformData }) {
  console.log(heroformData)
  return (<Image
    w='32%'
    m={{ base: 0.5, md: 1 }} border='1px'
    rounded='5px'
    borderColor='whiteAlpha.300'
    src={heroformData ? heroformData.imgBanner : ''}
    _hover={{
      borderColor: 'gray.600',
    }}
  />
  )
}

export default Profile