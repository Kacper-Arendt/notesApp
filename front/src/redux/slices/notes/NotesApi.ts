import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {NoteProps} from "components/notes/items/Note";
import {AddNoteData, AddNoteResponse} from "components/notes/sections/AddNote";

const token = localStorage.getItem('token');

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASE_URL_DEV}/notes`,
        prepareHeaders: (headers) => {
            if(token){
                headers.set('Authorization', `bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ["Notes"],
    endpoints: (builder) => ({
        getNotes: builder.query<NoteProps[], void>({
            query: () => '/',
            providesTags: [{type: 'Notes', id: 'LIST'}]
        }),
        deleteNote: builder.mutation<void, string>({
            query(id: string) {
                return{
                    url: `/${id}`,
                    method: 'DELETE',
                    body: id
                };
            },
            invalidatesTags: [{type: 'Notes', id: 'LIST'}]
        }),
        addNote: builder.mutation<AddNoteResponse, AddNoteData>({
            query(note) {
                return{
                    url: `/`,
                    method: 'POST',
                    body: note,
                };
            },
            invalidatesTags: [{type: 'Notes', id: 'LIST'}]
        })
    }),
})

export const { useGetNotesQuery, useDeleteNoteMutation, useAddNoteMutation } = notesApi
