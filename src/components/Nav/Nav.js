import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">Prime Solo Project</h2>
    </Link>
    <div className="nav-right">
      {
        props.user.id && (
          <Link className="nav-link"
            to={props.user.security_level === 0 ? "/adminmain" : "/main"}>
            {/* Show this link if they are logged in or not,
            but call this link 'Home' if they are logged in,
            and call this link 'Login / Register' if they are not */}
            {props.user.id ? 'Main' : 'Login / Register'}
          </Link>
        )
      }
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && props.user.security_level === 0 ? (
        <>
          {/* HM: Temporary Nav Link For Manager Add Employees */}
          <Link className="nav-link" to="/addemployees">
            Add Employees
          </Link>
          <LogOutButton className="nav-link" />
        </>
      ) : props.user.id && (
        <>
          <Link className="nav-link" to="/survey">
            Take Survey
          </Link>
          {props.user.security_level === 1 ? (
            <Link className="nav-link" to="/addemployees">
              Add Employees
            </Link>
          ) : null}
          <LogOutButton className="nav-link" />
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      {/* <Link className="nav-link" to="/about">
        About
      </Link> */}
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
