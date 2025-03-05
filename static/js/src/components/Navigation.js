import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import { useGlobal } from '../utils/GlobalContext';



const Navigation = () => {
    const { isAuthenticated } = useGlobal(); 
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Početna</Link>
          {!isAuthenticated && (<Link className="nav-link" to="/login">Login</Link>)}
          <Link className="nav-link" to="/about">O nama</Link>
          <a className="nav-link" href="/admin/" target="_blank" rel="noopener noreferrer">
            Admin Site
          </a>
        </div>
        {isAuthenticated && (
            <div className="navbar-nav ms-auto">
                <Logout />
            </div>
            )
        }
      </div>
    </nav>
  );
};

export default Navigation;