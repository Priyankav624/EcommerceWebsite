import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div style={{ marginTop: "200px", display: "grid", color: "", border: "1px solid black",  backgroundColor: "rgb(64, 82, 64)", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px" }}>
        <Container style={{ marginLeft: "200px", marginTop: "5px" }}>
          <Typography style={{ marginLeft: "180px" }} variant='h1'>Eva</Typography>
        </Container>

        <Container style={{ textAlign: "center" }}>
          <Typography variant='h6'>
            At Eva Store, we are committed to providing the best shopping experience for our customers.
          </Typography>

          <Typography style={{ marginTop: "-10px" }} variant='h3'>
            <Link
              to="/"
              style={{ padding: "10px", fontWeight: "bold" }}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            >
              Get Started
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </Typography>
        </Container>

        <Container style={{ marginTop: "30px", position: "relative" }}>
          <div className="flex items-center">
            <Typography variant='h4' style={{marginLeft:"200px", }} className="mr-2 text-white">
              Shop
            </Typography>
            <button onClick={toggleDropdown} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div style={{marginTop:"-20px"}} className="absolute bg-gray-400 text-black rounded-md shadow-md right-60 w-20">
              <a href="/register" className="block px-4 py-2 text-sm hover:bg-gray-800">Register</a>
              <a href="/home" className="block px-4 py-2 text-sm hover:bg-gray-800">Home</a>
              <a href="/shop" className="block px-4 py-2 text-sm hover:bg-gray-800">Shop</a>
            </div>
          )}
        </Container>


      </div>

      <div style={{ backgroundColor: "white" }} >
        <hr></hr>
      </div>

      <footer className='text-pink flex justify-center items-center' style={{ height: "30px" , backgroundColor:"black"}}>
        <h6 style={{ margin: '0' }}>
          Copyright &copy; 2024 Eva .
        </h6>
      </footer>
    </>
  );
}

export default Footer;
