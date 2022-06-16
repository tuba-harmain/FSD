import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Fragment } from 'react';

const Navbar = (  {auth: { isAuthenticated }, logout } ) => {
    const authLinks = (
      <ul>
        <li>
        <Link to ="/profiles">
          Developers
        </Link>
        <Link to ="/dashboard">
        < i className='fas fa-user' /> {' '}
        <span className='hide-sm'>Dashboard</span>
        </Link>
          <a onClick = {logout} href="#!">
          < i className='fas fa-sign-out-alt' /> {' '}
          <span className='hide-sm'>Logout</span>
          </a>
          </li>
      </ul>

    );

    const guestLinks = (
      <ul>
        <li>
        <Link to ="/profiles">Developers</Link>
        </li>
        <li>
        <Link to ="/register">Register</Link>
        </li>
        <li>
        <Link to ="/login">Login</Link>
        </li>
      </ul>

    );


  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to = '/'>
          <i className='fas fa-code' /> Social
        </Link>
        </h1>
         <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>
    </nav>
  )
};

Navbar.propTypes = {
  logout: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

 export default connect(mapStateToProps, { logout }) (Navbar);