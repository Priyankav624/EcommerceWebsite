import React from 'react'
import { useState } from 'react'
import { AiOutlineHome , AiOutlineShopping, AiOutlineLogin, 
AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import "./Navigation.css"
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { logout } from '../../redux/features/auth/authSlice'
import FavoritesCount from '../Products/FavoritesCount'

const Navigation = () => {

    const {userInfo} = useSelector(state => state.auth)
    const {cartItems} = useSelector(state => state.cart)
    //sidebar
    const [ dropdownOpen , setDropdownOpen ] = useState(false)
    const [ showSidebar , setShowSidebar ] = useState(false)

    const toogleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    // const toogleSidebar = () => {
    //     setShowSidebar(!showSidebar)
    // }

    // const closeSidebar = () => {
    //     setShowSidebar(false)
    // }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div 
            style={{zIndex: 999}}   //to be in top
            className={`${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden 
                sm:hidden flex-col justify-between p-4 text-white w-[4%] bg-black
                hover:w-[15%] h-[100vh] fixed`}
            id="navigation-container"
        > 
            <div className='flex flex-col bg-black justify-center space-y-4'>
                <Link 
                    to="/"
                    className='flex items-center bg-black transition-transform transform hover:translate-x-2'
                >
                    <AiOutlineHome className='mr-2 bg-black mt-[3rem]' size={26} />
                    <span className='hidden bg-black nav-item-name mt-[3rem]'>HOME</span>{" "}
                </Link>
                <Link 
                    to="/shop"
                    className='flex items-center bg-black  transition-transform transform hover:translate-x-2'
                >
                    <AiOutlineShopping className='mr-2 bg-black   mt-[3rem]' size={26} />
                    <span className='hidden bg-black nav-item-name mt-[3rem]'>SHOP</span>{" "}
                </Link>
                <Link 
                    to="/cart"
                    className='flex items-center bg-black transition-transform transform hover:translate-x-2'
                >
                    <AiOutlineShoppingCart className='mr-2 bg-black mt-[3rem]' size={26} />
                    <span className='hidden nav-item-name bg-black mt-[3rem]'>CART</span>{" "}

                    <div className="absolute top-9">
                        {cartItems.length > 0 && (
                        <span>
                            <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                            </span>
                        </span>
                        )}
                    </div>
                </Link>
                <Link 
                    to="/favorite"
                    className='flex items-center transition-transform bg-black transform hover:translate-x-2'
                >
                    <FaHeart className='mr-2 bg-black mt-[3rem]' size={26} />
                    <span className='hidden bg-black nav-item-name mt-[3rem]'>FAVORITE</span>{" "}
                    <FavoritesCount />
                </Link>
            </div>

            <div className='relative'>
                <button onClick={toogleDropdown} className='flex bg-black items-center text-gray-8000 focus:outline-none'>
                    {userInfo ? <span className='="text-white bg-black'>{userInfo.username}</span> : <></> }

                    {userInfo && (
                        <svg 
                            xmlns='http://www.w3.org/2000/svg'
                            className= {`h-4 bg-black w-4 ml-1 ${
                                dropdownOpen ? "transform rotate-180" : ""
                            }`}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='white'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth="2"
                                d={dropdownOpen ? 'M5 15l7-7 7 7' : "M19 9l-7 7-7-7"}
                            />
                        </svg>
                    )}
                </button>

                {dropdownOpen && userInfo && (
                    <ul className={`absolute  right-0 mt-2 mr-14 space-y-2 bg-grey text-gray-600 
                        ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}
                        >
                            {userInfo.isAdmin && (
                                <>
                                    <li>
                                        <Link to ='/admin/dashboard' className='block px-6 py-2 hover:bg-gray-500'>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to ='/admin/productlist' className='block px-6 py-2 hover:bg-gray-500'>
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to ='/admin/categorylist' className='block px-6 py-2 hover:bg-gray-500'>
                                            Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to ='/admin/orderlist' className='block px-6 py-2 hover:bg-gray-500'>
                                            Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to ='/admin/userlist' className='block px-6 py-2 hover:bg-gray-500'>
                                            Users
                                        </Link>
                                    </li>

                                </>
                            )} 

                            {/*  if user is not admin */}
                            <li>
                                <Link to ='/profile' className='block px-6 py-2 hover:bg-gray-500'>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to ='/logout' className='block px-6 py-2 hover:bg-gray-500' onClick={logoutHandler}>
                                    Logout                                    
                                </Link>
                            </li>
                    </ul>
                )}
            </div>
            {!userInfo && (
                <ul>
                    <li>
                    <Link 
                        to="/login"
                        className='flex items-center bg-black transition-transform transform hover:translate-x-2'
                    >
                        <AiOutlineLogin className ='mr-2 bg-black mt-[3rem]' size={26} />
                        <span className='hidden bg-black nav-item-name mt-[3rem]'>Login</span>{" "}
                    </Link>
                    </li>
                    <li>
                    <Link 
                        to="/register"
                        className='flex items-center bg-black transition-transform transform hover:translate-x-2'
                    >
                        <AiOutlineUserAdd className ='mr-2 bg-black mt-[3rem]' size={26} />
                        <span className='hidden nav-item-name bg-black mt-[3rem]'>Register</span>{" "}
                    </Link>
                    </li>
                </ul>
              )}
        </div>
    )
}

export default Navigation