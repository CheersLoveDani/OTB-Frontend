import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'




function TeamListing({ team }) {
  return (
    <Box m={1}>
      <Box border='2px' height='4em' borderColor='gray.600' rounded='5px'>
        <Text m={1}>
          {team.name}
        </Text>
        <Flex direction='row' m={1} >
          <Text flex={1} fontSize='sm'>{team.dps1}</Text>
          <Text flex={1} fontSize='sm'>{team.dps2}</Text>
          <Text flex={1} fontSize='sm'>{team.tank1}</Text>
          <Text flex={1} fontSize='sm'>{team.tank2}</Text>
          <Text flex={1} fontSize='sm'>{team.support1}</Text>
          <Text flex={1} fontSize='sm'>{team.support2}</Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default TeamListing