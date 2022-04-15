import {useState} from "react";
import styled from "styled-components";
import {Button, Heading, Input, InputGroup, InputRightElement, Link} from '@chakra-ui/react'
import {Link as RouterLink} from "react-router-dom";

import {useField} from "hooks";
import {Wrapper} from "components/auth/section/Wrapper";

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
    username: '',
    password: '',
}

export const Login = () => {
    const {fields, handleChange, reset} = useField(initialState);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <Wrapper>
        <StyledForm>
            <Heading as='h4' size='md'>
                Sign in
            </Heading>
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
            <Button isLoading={loading}
                    loadingText='Logging'
                    colorScheme='teal'
                    size='lg'
            >
                Login
            </Button>
            <Link as={RouterLink}  to='/register'>
                Don't have account?
            </Link>
        </StyledForm>
        </Wrapper>
    )
}