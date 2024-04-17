import { Link, useParams } from "react-router-dom"
import { useGetProductsQuery } from "../redux/api/productApiSlice"
import Loader from'../components/Loader'
import Message from '../components/Message'
import Header from "../components/Header"
import Product from "./Products/Product"
import NavHead from "./NavHead"

const Home = () => {
    const {keyword } =useParams()
    const {data, isLoading, isError} =   useGetProductsQuery({ keyword })

    return (
        <>
        <NavHead />
            {!keyword ? <Header/ > : null}
            {isLoading? (<Loader />) : isError ? (<Message variant='danger'>
                {isError?.data.message || isError.error}
            </Message>) : (
                <> 

                    <div style={{marginTop:"-100px"}} className="flex justify-between items-center">
                        <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
                            Special Products
                        </h1>
                    <Link 
                       to="/shop"
                       className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
                       >
                        Shop
                    </Link>
                    </div>

                    <div>
                    <div className="flex justify-center flex-wrap mt-[2rem]">
                        {data.products.map((product) => (
                            <div key={product._id}>
                                <Product product={product} />
                                </div>
                        ))}
                    </div>
                    </div>
                </>
            )}
              <div style={{ marginLeft:"1800px", marginTop:"50px", marginBottom:"-100px"}}>
                    <Link to="https://landbot.online/v3/H-2193145-LC2XPNFLI6Y25JOR/index.html">
                    <img 
                        style={{height:"100px", width:"100px"}}
                        src='https://imgs.search.brave.com/XX6NSg0_GDh4ftGvffgIZeGFmhAEkn92xGK0gjWdxJE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/c3ZnLm9yZy9pbWcv/MTUzODI5ODgyMi5w/bmc' alt='' ></img>
                        <h3 style={{marginLeft:"20px"}}>Chatbot</h3>
                    </Link>

                </div>
        </>
    )
}

export default Home