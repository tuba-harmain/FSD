import React, {useEffect } from 'react'
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: {profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
  <Spinner /> 
  ): (
  <section className="container">
   <h1 className='large text-primary'> Dashboard</h1>
   <p className='lead'>
     <i className='fas fa-user'></i> Welcome {user && user.name } </p>
     { profile != null ? (
     <section className="container">has</section> 
     ): (
     <section className="container"> 
     <p>you have not yet setup a profile, please add some info</p>
     <Link to='/create-profile' className='btn btn-primary my-1'>
      Create Profile 
     </Link>
  </section> 
     )}
  </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile}) (Dashboard);