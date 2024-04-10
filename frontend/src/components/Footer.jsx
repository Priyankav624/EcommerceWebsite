import React from 'react'
import Typography from '@mui/material/Typography';
import {Container } from '@mui/material'
import logo from "../../images/logo.jpg"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
        <div style={{marginTop:"100px", display: "grid", border:"1px solid black", backgroundColor: "Black", color:"white", gridTemplateColumns:"1fr 1fr 1fr", columnGap:"0px", padding:"30px"}}>
          
          
          <Container style={{textAlign:"center"}}>
            <Typography variant="h5" >Products</Typography><br />
            <Typography variant="body1" >Kids</Typography>
            <Typography variant="body1" >Women</Typography>
            <Typography variant="body1" >Men</Typography>
            <Typography variant="body1" >Electronics</Typography>
            <Typography variant="body1" >Books</Typography>
            <Typography variant="body1" >Bags</Typography>
          </Container>
          
          {/* <Container>
            <Typography variant="h6" >Contact us</Typography><br />
            <Typography variant="body1" >Help & Support</Typography>
            <Typography variant="body1" >Partner with us</Typography>
            <Typography variant="body1" >Ride with us</Typography>
            </Container> */}

            <Container style={{textAlign:"center"}} >
            < Link to="/">
            <Typography style={{marginTop:"15px"}} variant='h5'>Home</Typography>
            </ Link>
            < Link to="/favorite">
            <Typography style={{marginTop:"40px"}} variant='h5'>Favorite</Typography>
            <Typography  variant='body1' ></Typography>
            </ Link>
            < Link to="/">
            <Typography style={{marginTop:"40px"}}  variant='h5'>Shop</Typography>
            <Typography  variant='body1' ></Typography>
            </ Link>

          </Container>
          
          <Container style={{textAlign:"center"}}>
            <Typography variant="h5" >We deliver to:</Typography> <br />
            <Typography variant="body1" >Mumbai</Typography>
            <Typography variant="body1" >Bangalore</Typography>
            <Typography variant="body1" >Hyderabad</Typography>
            <Typography variant='body1' > Gurgaon</Typography>
            <Typography variant='body1' >Mumbai </Typography>
          </Container>
        </div>
        <div style={{ backgroundColor:"white"}} >
            <hr></hr>
        </div>
        <div style={{display:"flex", justifyContent:"center", fontSize:"15px", backgroundColor:"black", marginTop:"2px"}}> 
            <img style={{height: "50px", width:"50px", margin:"10px", marginLeft:"30px"}} src={logo} alt=""></img>  
            
        </div>
             
    </> 
    
  )
}

export default Footer