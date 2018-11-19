import React, { Component } from 'react';
import { connect } from 'react-redux';
/*----Material UI----*/
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
/*----Material UI----*/


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    minHeight: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'flex',
  },
});

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  login = (event) => {
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
    this.props.dispatch({ type: 'LOGIN_SNACKBAR' })//this will dispatch an action type which triggers a SnackBar alert
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form>
          <FormControl className={classes.container}>
            <Typography variant="h4" component="h3">
              Login
                     </Typography>
            <div>
              <Typography htmlFor="email">
                <TextField
                  className={classes.textField}
                  type="text"
                  label="Email Address"
                  name="Email Address"
                  margin="normal"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor('email')}
                />
              </Typography>
            </div>
            <div>
              <Typography htmlFor="password">
                <TextField
                  className={classes.textField}
                  type="password"
                  label="Password"
                  name="password"
                  margin="normal"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </Typography>
            </div>
            <Button onClick={this.login} type="submit" value='Submit' color="secondary">Login</Button>
          </FormControl>
        </form>
      </div>
    );
  }
}
LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

const logInPageStyles = withStyles(styles)(LoginPage)

export default connect(mapStateToProps)(logInPageStyles);
