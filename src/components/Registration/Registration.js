import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    withStyles,
    Button, 
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Typography,
    createMuiTheme, 
    MuiThemeProvider
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00868b'
    }
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
        backgroundColor: '#00868b',
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

function stringToParams(string) {
    let objectToSend = {};
    let paramArray;
    //takes a query string and breaks it out into local parameters
    string.replace('?', '').split('&')
        .forEach(param => {
            paramArray = param.split('=');
            if (paramArray.length > 1) {
                objectToSend[paramArray[0]] = decodeURIComponent(paramArray[1]); //decodes escape characters to make email human readable
            }
        });
    return objectToSend;
}

class Registration extends Component {
    state = {
        email: stringToParams(this.props.location.search).email,
        password: '',
        confirmPassword: '',
        dialogOpen: false,
    };

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            this.props.dispatch({ 
                type: 'REGISTER_INVITED', 
                payload: { 
                    password: this.state.password, 
                    ...stringToParams(this.props.location.search) 
                } 
            });
        } else {
            this.setState({ dialogOpen: true });
        }
    }

    handleCancel = () => {
        this.setState({ dialogOpen: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.outFrame}>
                    <form onSubmit={this.handleSubmit} className={classes.cardFrame}>
                        <div className={classes.title}>
                            <span>Register</span>
                        </div>
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
                                    disabled
                                    required 
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
                                    required 
                                />
                            </div>
                            <div className={classes.inputDiv}>
                                <div className={classes.label}>
                                    <label>Confirm Password</label>
                                </div>
                                <input 
                                    className={classes.textField}
                                    type="password" 
                                    placeholder="Password"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword} 
                                    onChange={this.handleInputChangeFor('confirmPassword')} 
                                    required 
                                />
                            </div>
                            <div className={classes.buttonDiv}>
                                <Button onClick={this.login} variant="contained" type="submit" color="primary">Register</Button>
                            </div>
                        </div>
                    </form>
                </div>
                <Dialog open={this.state.dialogOpen}>
                    <DialogTitle>Password</DialogTitle>
                    <DialogContent>
                        <Typography component="p">Your password doesn't match.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleCancel}>Okay</Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

export default connect()(withRouter(withStyles(styles)(Registration)));