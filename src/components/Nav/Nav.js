import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import securityLevel from '../../constants/securityLevel';
/*----Material-UI----*/
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
/*----Material-UI----*/
import Logo from '../../images/Plyable_Logo_v01_00.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    backgroundColor: "#00868b",
    textAlign: "center",

  }
};


class Nav extends Component {

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar} >
          <Toolbar>
            <Typography variant="h5" color="inherit" className={classes.grow}>
              <Link className="nav-title" to="/home"><img src={Logo} height="145" width="375" /></Link>
            </Typography>
            <div className="nav-right">
              <Typography variant="h6">
                <Link className="nav-link"
                  to={this.props.user.security_level === securityLevel.ADMIN_ROLE ? "/adminmain" : "/main"}>
                  {this.props.user.id ? 'Main' : 'Login'}
                </Link>
              </Typography>
              {/* Show the link to the info page and the logout button if the user is logged in */}
              {this.props.user.id && this.props.user.security_level === securityLevel.ADMIN_ROLE ? (
                <>
                  <LogOutButton className="nav-link" />
                </>
              ) : this.props.user.id && (
                <>
                  {this.props.user.security_level === securityLevel.MANAGER_ROLE ? (
                    <>
                      <Typography>
                        <Link className="nav-link" to="/viewparticipation">
                          Survey Status
            </Link>
                      </Typography>
                      <Typography>
                        <Link className="nav-link" to="/addemployees">
                          Add Employees
            </Link>
                      </Typography>
                    </>
                  ) : null}
                  <LogOutButton className="nav-link" />
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });

const mapStateToProps = state => ({
  user: state.user,
});

const navStyles = withStyles(styles)(Nav);

export default connect(mapStateToProps)(navStyles);


