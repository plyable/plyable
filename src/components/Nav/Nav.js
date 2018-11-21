import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
/*----Material-UI----*/
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import Divider from '@material-ui/core/Divider';
/*----Material-UI----*/
import Logo from '../../images/Logo.png';
import NavDrawer from './NavDrawer';

const styles = {
  root: {
    // flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#00868b",
    textAlign: "center",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Nav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar} >
          <Toolbar>
            <Typography variant="h5" color="inherit" className={classes.grow}>
              <Link className="nav-title" to="/adminmain">
                <img src={Logo} height="60" alt="logo" />
              </Link>
            </Typography>
            <Typography variant="h6">
              {this.props.user.id && <NavDrawer />}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Nav.propTypes = { classes: PropTypes.object.isRequired };

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });

const mapStateToProps = ({ user }) => ({ user });
const navStyles = withStyles(styles)(Nav);

export default connect(mapStateToProps)(navStyles);


