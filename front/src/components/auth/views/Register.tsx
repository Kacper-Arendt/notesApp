import {useState, SyntheticEvent} from "react";
import styled from "styled-components";
import {Button, Heading, Input, InputGroup, InputRightElement, Link} from '@chakra-ui/react'
import {Link as RouterLink, useNavigate} from "react-router-dom";

import {useField} from "hooks";
import {Wrapper} from "components/auth/section/Wrapper";
import axios from "axios";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  min-width: 25rem;
  align-self: center;
  background-color: white;
  row-gap: 1.5rem;
  padding: 3rem 2rem;
  max-width: 25rem;
`;

const initialState = {
    name: '',
    username: '',
    password: '',
}

export const Register = () => {
    const {fields, handleChange} = useField(initialState);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const request = await axios.post(`${process.env.REACT_APP_BASE_URL_DEV}/users`, fields)
            request.status === 201 && navigate('/login')
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Wrapper>
            <StyledForm onSubmit={onSubmitHandler}>
                <Heading as='h4' size='md'>
                    Sign up
                </Heading>
                <Input
                    name='name'
                    value={fields.name}
                    onChange={handleChange}
                    placeholder='Name'
                    size='md'
                />
                <Input
                    name='username'
                    value={fields.username}
                    onChange={handleChange}
                    placeholder='Username'
                    size='md'
                />
                <InputGroup size='md'>
                    <Input
                        name='password'
                        value={fields.password}
                        onChange={handleChange}
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button
                    type='submit'
                    isLoading={loading}
                    loadingText='Submitting'
                    colorScheme='teal'
                    size='lg'
                >
                    Submit
                </Button>
                <Link as={RouterLink} to='/login'>
                    Already have an account?
                </Link>
            </StyledForm>
        </Wrapper>
    )
}