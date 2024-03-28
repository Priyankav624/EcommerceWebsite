import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword   ] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {        //already have redirect
            navigate(redirect);
        }
     }, [navigate, redirect, userInfo]); //dependency error

     const submitHandler = async (e) => {
        e.preventDefault()
        
        try {
            const res = await login({email, password}).unwrap()
            console.log(res)
            dispatch(setCredientials({...res}))
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
     }

    return (
        <div>
            <section className='pl-[15rem] flex flex-wrap '>
                <div className='mr-[4rem] mt-[5rem]'>
                    <h1 className="text-4xl font-semibold mb-4">
                        Sign In
                    </h1>
                    <form onSubmit={submitHandler} className ='container w-[40rem] text-white'>
                        <div className ='my-[2rem]'>
                            <label htmlFor='email' className ='block text-xl font-medium text-white '>
                                Email Address
                            </label>
                            <input 
                                type='email'
                                id='email'
                                className='ml-1 m-2 p-2 border rounded w-full'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </div>
                        <div className ='my-[2rem]'>
                            <label htmlFor='password' className ='block text-xl font-medium text-white '>
                                Password
                            </label>
                            <input 
                                type='password'
                                id='password'
                                className='ml-1 p-2 m-2 border rounded w-full'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </div>

                        <button disabled={isLoading} type="submit" className='bg-pink-500 text-white text-lg px-4 py-2 rounded cursor-pointer my=[1rem]'>
                            {isLoading? "Signing In..." : "Sign In"}
                        </button>
                        {isLoading && <Loader/>}
                    </form>

                    <div className='mt-4'>
                        <p className='text-white'>
                            New Customer ? {" "}
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}
                            className='text-pink-500 hover:underline'>
                                Register
                            </Link>
                        </p>
                    </div>
                </div> 
                <img 
                    src="https://imgs.search.brave.com/TbtBK5RrwvLoQG7ZKwNb0-M4VhQyREgRk6emhoMjuHw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NjQyMDE4/ODk5MjItNjZiYzNj/Nzc4YzFlP3E9ODAm/dz0xMDAwJmF1dG89/Zm9ybWF0JmZpdD1j/cm9wJml4bGliPXJi/LTQuMC4zJml4aWQ9/TTN3eE1qQTNmREI4/TUh4elpXRnlZMmg4/T1h4OFpXTnZiVzFs/Y21ObGZHVnVmREI4/ZkRCOGZId3c"
                    alt=""
                    className='h-[58rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg'
                    />
            </section>
        </div>
    )
}

export default Login