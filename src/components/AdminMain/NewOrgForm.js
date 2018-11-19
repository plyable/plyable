import React, { Component } from 'react';
import { connect } from 'react-redux';
/*----Material UI----*/
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

class NewOrgForm extends Component {
    state = {
        newOrganization: {
            name: '',
        }
    };//this is the local state for creating new organizations

    handleChangeFor = propertyName => event => {
        console.log('event logging');
        this.setState({
            newOrganization: {
                ...this.state.newOrganization,
                [propertyName]: event.target.value
            }
        });
    };//currying function that can handle many inputs--currently only handling newOrganization.name

    handleOrgSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_NEW_ORGANIZATION', payload: this.state.newOrganization }) //upon submit, action sends info to newOrgSaga
        this.setState({
            ...this.state.newOrganization,
            newOrganization: {
                name: '',
                // managerName: '',
                // managerEmail: '',
            }
        });//spread operator holds former state, setState alters state to make a new organization
        this.props.dispatch({ type: 'ADD_NEW_ORGANIZATION_SNACKBAR' })//this will dispatch an action type which triggers a SnackBar alert
    };//end handleOrgSubmit

    render() {
        const { classes } = this.props;
        return (
            <div >
                <h1>Add a New Organization</h1>
                <form>
                    <FormControl className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="New Organization"
                            className={classes.textField}
                            value={this.state.newOrganization.name}
                            onChange={this.handleChangeFor('name')}
                            margin="normal"
                        />
                        <Button onClick={this.handleOrgSubmit} type="submit" value='Submit' color="primary">Submit</Button>
                    </FormControl>
                </form>
            </div >
        );
    }
}

NewOrgForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    reduxState,
});

const newOrgFormStyles = withStyles(styles)(NewOrgForm)

export default connect(mapStateToProps)(newOrgFormStyles);

