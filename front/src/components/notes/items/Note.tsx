import styled from "styled-components";

const StyledNote = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export interface NoteProps {
    title: string,
    important: string,
    name: string,
    date: string
}

export const Note = ({title, important, name, date}: NoteProps) => {
    return (
        <StyledNote>
            {title}
            {important}
            {name}
            {date}
        </StyledNote>
    )
}