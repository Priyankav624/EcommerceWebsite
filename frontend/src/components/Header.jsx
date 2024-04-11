import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProducts from "../pages/Products/SmallProducts"
import ProductCarousel from "../pages/Products/ProductCarousel";


const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div style={{marginTop:"140px"}} className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProducts product={product} />
              </div>
            ))}
          </div>
        </div>
         <ProductCarousel />
      </div>
    </>
  );
};

export default Header;