import styled from "styled-components";
import {Badge, Heading, Text} from '@chakra-ui/react'

const StyledNote = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: 1rem;
  padding: 1rem;
  align-items: start;
  max-width: 22rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export interface NoteProps {
    id: string,
    content: string,
    important: string,
    user: {
        name: string,
        id: string
    },
    date: string
}

export const Note = ({content, important, user, date, id}: NoteProps) => {
    const userID = localStorage.getItem('id')
    console.log(userID)

    return (
        <StyledNote key={id}>
            {important && <Badge colorScheme='green'>Important</Badge>}

            {user?.id === userID && <Badge variant='outline' colorScheme='green'>Your Note</Badge>}

            {content && <Text fontSize='sm'>{content}</Text>}

            {user?.name && <Heading as='h6' size='lg'>{user.name}</Heading>}

            {date && <Text fontSize='sm'>{date}</Text>}
        </StyledNote>
    )
}