import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import securityLevel from '../../constants/securityLevel';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">Plyable</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link"
        to={props.user.security_level === securityLevel.ADMIN_ROLE ? "/adminmain" : "/main"}>
        {props.user.id ? 'Main' : 'Login'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && props.user.security_level === securityLevel.ADMIN_ROLE ? (
        <>
          <LogOutButton className="nav-link" />
        </>
      ) : props.user.id && (
        <>
          {props.user.security_level === securityLevel.MANAGER_ROLE ? (
            <>
              <Link className="nav-link" to="/viewparticipation">
                Survey Status
            </Link>
              <Link className="nav-link" to="/addemployees">
                Add Employees
            </Link>
            </>
          ) : null}
          <LogOutButton className="nav-link" />
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
