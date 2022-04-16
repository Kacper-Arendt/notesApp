import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

interface LoginCredentials {
    username: string;
    password: string;
}

interface RegisterCredentials extends LoginCredentials{
    name: string;
}

interface LoginResponse {
    token: string;
    username: string;
    name: string;
    id: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL_DEV
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginCredentials>({
            query(credentials) {
                return{
                    url: `/login`,
                    method: 'POST',
                    body: credentials,
                }
            },
        }),
        register: builder.mutation<void, RegisterCredentials>({
            query(credentials) {
                return{
                    url: `/users`,
                    method: 'POST',
                    body: credentials,
                }
            },
        })
    })
})

export const {useLoginMutation, useRegisterMutation} = authApi