import {Button, Checkbox, Heading, Input} from "@chakra-ui/react";
import styled from "styled-components";

import {useField} from "hooks";
import {useAddNoteMutation} from "redux/slices/notes/NotesApi";
import {SyntheticEvent, useEffect} from "react";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: .5rem;
`;

export interface AddNoteData {
    content: string,
    important?: boolean,
}

export interface AddNoteResponse {
    id: string,
    content: string,
    important: string,
    user: string,
    date: string
}

const initialState = {
    content: '',
    important: false,
}

export const AddNote = () => {
    const {fields, handleChange, setFields, reset} = useField(initialState);
    const [addNote, {isLoading, isSuccess}] = useAddNoteMutation();

    const checkboxHandler = () => {
        setFields({
            ...fields,
            important: !fields.important
        })
    }

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        fields.content.length > 0 && await addNote(fields)
    }
    
    useEffect(() => {
        isSuccess && reset()
    }, [isSuccess])

    return (
        <StyledForm onSubmit={onSubmitHandler}>
            <Heading as='h2' size='xl'>
                Add a note
            </Heading>
            <Input
                name='content'
                value={fields.content}
                onChange={handleChange}
                placeholder='medium size'
                size='md'
            />
            <Checkbox
                defaultChecked={initialState.important}
                onChange={checkboxHandler}
            >
                Important
            </Checkbox>
            <Button isLoading={isLoading} type='submit' size='sm' colorScheme='blue'>Save Note</Button>
        </StyledForm>
    )
}