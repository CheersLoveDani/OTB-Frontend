/* eslint-disable eqeqeq */
import React from 'react'
import { getTeams } from '../../lib/api'
import TeamListing from './TeamListing'
import { getCurrentUserId, isAuthenticated, isOwner } from '../../lib/auth'

import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'



function Teams() {
  const [teams, setTeams] = React.useState(null)
  const id = getCurrentUserId()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const teamsPromise = getTeams()
        const teams = await teamsPromise
        setTeams(teams.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <Box m={{ base: 2, lg: 10 }}>
      {isAuthenticated() &&
        <Flex direction='column' flex={1} ml={{ base: 0, md: 2, lg: 4 }}>
          <Text fontSize='3xl'>Owned Teams:</Text>
          {
            teams ?
              teams.map(team => {
                if (
                  isOwner(team.owner)
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
          <Text fontSize='3xl'>My Teams:</Text>
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
        </Flex>}
      <Flex direction='column' flex={1} ml={{ base: 0, md: 2, lg: 4 }}>
        <Text fontSize='3xl'>Teams:</Text>
        {
          teams ?
            teams.map(team => {
              if (!(
                (team.dps1 && team.dps1.id == id) ||
                (team.dps2 && team.dps2.id == id) ||
                (team.tank1 && team.tank1.id == id) ||
                (team.tank2 && team.tank2.id == id) ||
                (team.support1 && team.support1.id == id) ||
                (team.support2 && team.support2.id == id))
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
    </Box>
  )
}

export default Teams