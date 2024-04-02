import {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'

const Register = () => {
    const [username, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()

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

        if(password != confirmPassword){
            toast.error('Passwords do not match')
        }else {
            try {
                const res = await register({username , email, password}).unwrap();
                dispatch(setCredientials({...res}));
                navigate(redirect)
                toast.success('User successfully registered')
            } catch (error) {
                console.log(error)
                toast.error(error.data.message)
            }
        }
     }

    return (
        <section className='pl-[15rem] flex flex-wrap'>
            <div className='mr-[4rem] mt-[5rem]'>
                <h1 className="text-2xl font-semibold mb-4">
                    Register
                </h1>

                <form onSubmit={submitHandler} className='container w-[40rem]'>
                    <div className ='my-[2rem]'>
                        <label htmlFor='name' className ='block text-xl font-medium text-white '>
                            Name                            
                        </label>
                        <input 
                            type='text'
                            id='name'
                            className='ml-1 m-2 p-2 bg-black text-white border rounded w-full'
                            placeholder='Enter name'
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className ='my-[2rem]'>
                        <label htmlFor='email' className ='block text-xl font-medium text-white '>
                            Email                           
                        </label>
                        <input 
                            type='email'
                            id='email'
                            className='ml-1 m-2 bg-black text-white p-2 border rounded w-full'
                            placeholder='Enter email'
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
                            className='ml-1 m-2 p-2 border bg-black text-white rounded w-full'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className ='my-[2rem]'>
                        <label htmlFor='confirmpassword' className ='block text-xl font-medium text-white '>
                            Confirm Password                           </label>
                        <input 
                            type='password'
                            id='confirmpassword'
                            className='ml-1 m-2 p-2 bg-black text-white border rounded w-full'
                            placeholder='Enter confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button disabled={isLoading} type="submit" className='bg-pink-500 text-white text-lg px-4 py-2 rounded cursor-pointer my=[1rem]'>
                            {isLoading? "Registering..." : "Register"}
                    </button>
                    {isLoading && <Loader/>}
                </form>

                <div className='mt-4'>
                        <p className='text-white'>
                            Already have an account ? {" "}
                            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}
                            className='text-pink-500 hover:underline'>
                                Login
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
    )
}
 
export default Register