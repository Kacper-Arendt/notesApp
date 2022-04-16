import {useState, SyntheticEvent, useEffect} from "react";
import styled from "styled-components";
import {Button, Heading, Input, InputGroup, InputRightElement, Link} from '@chakra-ui/react'
import {Link as RouterLink, useNavigate} from "react-router-dom";

import {useField} from "hooks";
import {Wrapper} from "components/auth/section/Wrapper";
import {useLoginMutation} from "redux/slices/auth/AuthApi";

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

export interface LoginCredentials {
    username: string;
    password: string;
}


const initialState: LoginCredentials = {
    username: '',
    password: '',
}

export const Login = () => {
    const {fields, handleChange} = useField(initialState);
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const [login, {data, isLoading, isSuccess}] = useLoginMutation()

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
             await login(fields)
        } catch (e) {
            console.log(e)
        }
    };
    
    useEffect(() => {
        if (isSuccess && data) {
            const {token, username, name, id} = data;
            
            localStorage.setItem('token', token)
            localStorage.setItem('username', username)
            localStorage.setItem('name', name)
            localStorage.setItem('id', id)
            
            navigate('/')
        }
    }, [isSuccess])

    return (
        <Wrapper>
            <StyledForm onSubmit={onSubmitHandler}>
                <Heading as='h4' size='md'>
                    Sign in
                </Heading>
                <Input
                    name='username'
                    value={fields.username}
                    onChange={handleChange}
                    placeholder='Username'
                    size='md'
                    minLength={5}
                    required
                />
                <InputGroup size='md'>
                    <Input
                        name='password'
                        value={fields.password}
                        onChange={handleChange}
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        minLength={5}
                        required
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button
                    type='submit'
                    isLoading={isLoading}
                    loadingText='Logging'
                    colorScheme='teal'
                    size='lg'
                >
                    Login
                </Button>
                <Link as={RouterLink} to='/register'>
                    Don't have account?
                </Link>
            </StyledForm>
        </Wrapper>
    )
}