import { useHistory } from 'react-router-dom'

import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'


function TeamListing({ name, dps1, dps2, tank1, tank2, support1, support2, teamid }) {
  const history = useHistory()
  return (
    <Box m={1} onClick={() => history.push(`/teams/${teamid}`)}>
      <Box
        bgColor='blue.800'
        border='1px'
        height='5em'
        borderColor='gray.700'
        rounded='5px'
        _hover={{
          borderColor: 'gray.400',
        }}
      >
        <Text m={2} fontSize='large'>
          {name}
        </Text>
        <Flex direction='row' m={1} >
          <Text align='center' flex={1} fontSize='1.2vw' isTruncated={true} >Dps: {dps1}</Text>
          <Text align='center' flex={1} fontSize='1.2vw' isTruncated={true} >Dps: {dps2}</Text>
          <Text align='center' flex={1} fontSize='1.2vw' isTruncated={true} >Tank: {tank1}</Text>
          <Text align='center' flex={1} fontSize='1.2vw' isTruncated={true} >Tank: {tank2}</Text>
          <Text align='center' flex={1} fontSize='1.2vw' isTruncated={true} >Sup: {support1}</Text>
          <Text align='center' flex={1} fontSize='1.2vw' isTruncated={true} >Sup: {support2}</Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default TeamListing