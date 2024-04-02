import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { setCredientials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import {useProfileMutation} from "../../redux/api/usersApiSlice"

import React from 'react'

const Profile = () => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector(state => state.auth)

    const [updateProfile, {isLoading : loadingUpdateProfile}] = useProfileMutation()

    useEffect(() => {
        setUserName(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.email, userInfo.username]) ;

    const dispatch = useDispatch();


    const submitHandler = async (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            toast.error('Passwords do not match')
        }else {
            try {
                const res = await updateProfile({ _id: userInfo._id, username , email, password}).unwrap();
                dispatch(setCredientials({...res}))
                toast.success('Profile updated successfully')
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }

    return (
        <div className="container mx-auto p-4 mt-[10rem]">
            <div className="flex justify-center align-cenetr md:flex md:space-x-4">
                <div className="md:w-1/3">
                    <h2 className="text-4xl font-semibold mb-10">Update Profile</h2>
                    
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className ='block text-2xl mb-2 text-white'>
                                Name                            
                            </label>
                            <input 
                                type='text'
                                className='form-input p-4 border bg-black text-white rounded-sm w-full'
                                placeholder='Enter name'
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className ='block text-2xl mb-2 text-white'>
                                Email                            
                            </label>
                            <input 
                                type='email'
                                className='form-input p-4 bg-black text-white border rounded-sm w-full'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className ='block text-2xl mb-2 text-white'>
                                Password                          
                            </label>
                            <input 
                                type='password'
                                className='form-input p-4 bg-black text-white border rounded-sm w-full'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className ='block text-2xl mb-2 text-white'>
                                Confirm Password                           
                            </label>
                            <input 
                                type='password'
                                className='form-input p-4 border bg-black text-white rounded-sm w-full'
                                placeholder='Enter confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-pink-500 text-white px-4 py-2 mt-4 rounded hover:bg-pink-600">
                                    Update
                                </button>
                        
                            <Link 
                                to='/user-orders' 
                                className="bg-pink-600 text-white px-4 py-2 mt-4 rounded hover:bg-pink-700">
                                My Orders
                            </Link>

                            {loadingUpdateProfile && <Loader />}

                        </div>
                    </form>
                </div>   
            </div>
        </div>
    )
}

export default Profile