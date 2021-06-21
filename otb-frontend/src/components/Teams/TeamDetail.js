import React from 'react'
import { getSingleTeam } from '../../lib/api'
import { useHistory, useParams } from 'react-router-dom'

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text
} from '@chakra-ui/react'
import { isOwner } from '../../lib/auth'

function TeamDetail() {
  const [team, setTeam] = React.useState(null)
  const { id } = useParams()


  React.useEffect(() => {
    const getData = async () => {
      try {
        const teamPromise = getSingleTeam(id)
        const team = await teamPromise
        setTeam(team.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])



  return (
    <Box m={{ base: 2, lg: 10 }}>
      <Heading>{team && team.name}</Heading>
      {
        team ?
          <Flex direction={{ base: 'column', sm: 'row' }}>
            {team.dps1 ?
              <PlayerCard
                user={team.dps1}
                hero1={team.dps1.dps1}
                hero2={team.dps1.dps2}
                hero3={team.dps1.dps3}
              />
              :
              <MissingPlayerCard />
            }
            {team.dps2 ?
              <PlayerCard
                user={team.dps2}
                hero1={team.dps2.dps1}
                hero2={team.dps2.dps2}
                hero3={team.dps2.dps3}
              />
              :
              <MissingPlayerCard />
            }
            {team.tank1 ?
              <PlayerCard
                user={team.tank1}
                hero1={team.tank1.tank1}
                hero2={team.tank1.tank2}
                hero3={team.tank1.tank3}
              />
              :
              <MissingPlayerCard />
            }
            {team.tank2 ?
              <PlayerCard
                user={team.tank2}
                hero1={team.tank2.tank1}
                hero2={team.tank2.tank2}
                hero3={team.tank2.tank3}
              />
              :
              <MissingPlayerCard />
            }
            {team.support1 ?
              <PlayerCard
                user={team.support1}
                hero1={team.support1.support1}
                hero2={team.support1.support2}
                hero3={team.support1.support3}
              />
              :
              <MissingPlayerCard />
            }
            {team.support2 ?
              <PlayerCard
                user={team.support2}
                hero1={team.support2.support1}
                hero2={team.support2.support2}
                hero3={team.support2.support3}
              />
              :
              <MissingPlayerCard />
            }

          </Flex>
          :
          <Text>Loading...</Text>
      }

    </Box>
  )
}

function PlayerCard({ user, hero1, hero2, hero3 }) {
  const history = useHistory()

  const handleUserClick = (id) => {
    history.push(`/profile/${id}`)
  }

  return (
    <Box
      m={1}
      flex={1}
      width={{ base: '100%', sm: '15%' }}
      rounded='5px'
      border='1px'
      onClick={() => handleUserClick(user.id)}
    >
      <Flex direction={{ base: 'row', sm: 'column' }}>
        <Box flex={1}>
          <Image rounded='5px' src={hero1 ? hero1.imgLarge : 'https://res.cloudinary.com/sirdancloud/image/upload/v1624032399/OTB/missing-img-large_qgxabc.png'} />
        </Box>
        <Box flex={2}>
          <Text m={2} mb={0.5} fontSize={{ base: '6vw', sm: '3vw' }} isTruncated={true} >{user.username}</Text>
          <Text ml={2} fontSize={{ base: '3vw', sm: '1.2vw' }} isTruncated={true} >{user.battletag}</Text>
          <Text ml={2} fontSize={{ base: '4vw', sm: '2vw' }} isTruncated={true} >SR: {user.sr}</Text>
          <Image rounded='5px' mt={2} src={hero2 ? hero2.imgBanner : 'https://res.cloudinary.com/sirdancloud/image/upload/v1624032691/OTB/missing-img-banner_d0r4lz.png'} />
          < Image rounded='5px' mt={2} src={hero3 ? hero3.imgBanner : 'https://res.cloudinary.com/sirdancloud/image/upload/v1624032691/OTB/missing-img-banner_d0r4lz.png'} />
        </Box>


      </Flex>
      {isOwner(user.id) &&
        <Center>
          <Button
            w='95%'
            m={3}
            colorScheme='red'
            fontSize='1vw'
            isTruncated={true}
          >
            Leave team?
          </Button>
        </Center>
      }
    </Box >

  )
}

function MissingPlayerCard() {
  return (
    <Box m={1} flex={1} width={{ base: '100%', sm: '15%' }} rounded='5px' border='1px'>
      <Flex direction={{ base: 'row', sm: 'column' }}>
        <Box flex={1}>
          <Image rounded='5px' src='https://res.cloudinary.com/sirdancloud/image/upload/v1624032399/OTB/missing-img-large_qgxabc.png' />
        </Box>
        <Box flex={2}>
          <Text m={2} mb={0.5} fontSize='x-large' textAlign='center' >Player Needed</Text>
          <Center>
            <Button
              w='90%'
              m={3}
              fontSize={{ base: '4vw', sm: '1.5vw' }}
              isTruncated={true}
            >
              Join this spot?
            </Button>
          </Center>
        </Box>
      </Flex>
    </Box>

  )
}

export default TeamDetail