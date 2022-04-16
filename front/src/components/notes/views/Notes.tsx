import styled from "styled-components";

import {useGetNotesQuery} from "redux/slices/notes/NotesApi";
import {Note} from "components/notes/items/Note";
import {AddNote} from "components/notes/sections/AddNote";

const StyledNotesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 1rem;
  padding: 2rem;
`;

export const Notes = () => {
    const {data, isLoading} = useGetNotesQuery();

    return (
        <StyledNotesWrapper>
            <AddNote/> 
            {isLoading ?
                <h1>Loading</h1>
                :
                data?.map(({id, content, important, user, date}) =>
                    <Note
                        id={id}
                        key={id}
                        content={content}
                        important={important}
                        user={user ?? {}}
                        date={date}/>)}
        </StyledNotesWrapper>
    )
}