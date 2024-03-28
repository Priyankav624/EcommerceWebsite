 import {apiSlice} from "./apiSlice"
 import { USERS_URL } from "../features/constants"

 export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation            //only if changing data (mutation) if not query
        ({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),

        logout: builder.mutation({
            query:() => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        
        register: builder.mutation({
            query: data => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),

        profile: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),

        getUsers : builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),  
        
        deleteUser: builder.mutation({
            query: userId => ({
                url: `${USERS_URL}/${userId}`,
                method: "DELETE"
            })
        }),

        getUserDetails : builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`
            }),
            keepUnusedDataFor: 5,
        }),

        updateUser: builder.mutation({
            query: data => ({
                url:`${USERS_URL}/${data.userId}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['User'],
        })
    
    }),
 });

//  http://localhost:5000/api/users/auth 
 
 // to use redux             ... register endpoints ... it will be in use   // 'use${Login}Mutation'  //it checks
 
 export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation, useGetUsersQuery  } = userApiSlice;