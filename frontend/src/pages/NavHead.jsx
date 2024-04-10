import '../components/Header.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import logo from "../../images/logo.jpg"

const NavHead = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search?keyword=${searchTerm}`);
    }
  };

  return (
    <div className='header'>
      <div className='first'>
        <img className="icon1" src={logo} alt=""/>
      </div>
      <div className="center">
        <input
          className="search"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link>
        <button className="icons1" onClick={handleSearch}>
          <FaSearch/>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default NavHead;
