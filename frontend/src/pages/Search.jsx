import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from './Products/Product';

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
  const { data, isLoading, isError, refetch } = useGetProductsQuery({ keyword });

  useEffect(() => {
    refetch();
  }, [keyword]);

  return (
    <div style={{marginLeft:"100px"}}>
      <h1>Search Results for "{keyword}"</h1>
      {isLoading && <Loader />}
      {isError && <Message variant="danger">{isError.error}</Message>}
      {data && data.products.length === 0 ? (
        <Message>No products found</Message>
      ) : (
        data && data.products.map(product => (
          <Product key={product._id} product={product} />
        ))
      )}
      {data && data.products.length === 0 && !isLoading && !isError && (
        <Message>No products found for "{keyword}"</Message>
      )}
    </div>
  );
};

export default Search;
