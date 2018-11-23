import React, { Component } from 'react';
import { connect } from 'react-redux';
/*----Material UI----*/
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
/*----Material UI----*/

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#00868b',
      sub: '#009688',
    },
    secondary: {
      main: '#EC407A',
    },
  }
});

const styles = () => ({
  outFrame: {
    margin: '10px 5px',
  },
  cardFrame: {
    border: '1px solid #00868b',
    borderRadius: '20px',
    margin: '0 auto',
    maxWidth: '400px',
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: '20px',
    margin: '10px 0 10px 0',
  },
  subBackground: {
    backgroundColor: 'white',
    borderRadius: '19px',
    padding: '15px',
    textAlign: 'center',
  },
  inputDiv: {
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    width: '60px',
    textAlign: 'right',
    fontSize: '13px',
  },
  textField: {
    boxSizing: 'border-box',
    margin: '15px 8px',
    flexGrow: '1',
    padding: '10px',
    borderRadius: '20px',
    outline: 0,
    border: '1px solid grey',
    '&:focus': {
      borderColor: '#00868b',
    }
  },
  buttonDiv: {
    margin: '15px',
  },
});

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  }

  login = event => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          email: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    this.props.dispatch({ type: 'LOGIN_SNACKBAR' }); //this will dispatch an action type which triggers a SnackBar alert
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {this.props.errors.loginMessage && (
            <h2 className="alert" role="alert">
              {this.props.errors.loginMessage}
            </h2>
          )}
          <div className={classes.outFrame}>
            <form className={classes.cardFrame}>
              <div className={classes.title}>Welcome to the Portal</div>
              <div className={classes.subBackground}>
                <div className={classes.inputDiv}>
                  <div className={classes.label}>
                    <label>Email</label>
                  </div>
                  <input
                    className={classes.textField}
                    type="text"
                    placeholder="Email Address"
                    name="Email Address"
                    value={this.state.email}
                    onChange={this.handleInputChangeFor('email')}
                  />
                </div>
                <div className={classes.inputDiv}>
                  <div className={classes.label}>
                    <label>Password</label>
                  </div>
                  <input
                    className={classes.textField}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                  />
                </div>
                <div className={classes.buttonDiv}>
                  <Button onClick={this.login} variant="contained" type="submit" color="primary">Log In</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

LoginPage.propTypes = { classes: PropTypes.object.isRequired };

const mapStateToProps = ({ errors }) => ({ errors });
const logInPageStyles = withStyles(styles)(LoginPage)

export default connect(mapStateToProps)(logInPageStyles);
