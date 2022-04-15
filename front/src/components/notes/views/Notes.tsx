import {Note, NoteProps} from "../items/Note";
import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const StyledNotesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 1rem;
  padding: 2rem;
`;

export const Notes = () => {
    const [notes, setNotes] = useState<NoteProps[]>([]);
    const token = localStorage.getItem('token')

    useEffect(() => {

        if (token) {
            axios.get(
                'http://localhost:3000/notes',
                {headers: {'authorization': `bearer ${token}`}}).then(resp => {
                if (resp.data) {
                    setNotes(resp.data)
                }
            })
        }
    }, [])


    return (
        <StyledNotesWrapper>
            {notes.map(({id, content, important, user, date}) =>
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