import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import securityLevel from '../../constants/securityLevel';
/*----Material UI---*/
import {
    Table, TableBody, TableCell, TableHead, TableRow, TablePagination,
    Paper, Typography, TextField, withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/*----Material UI---*/

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 24,
    },
    body: {
        fontSize: 20,
        textTransform: 'upperCase'
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    buttons: {
        background: 'linear-gradient(45deg, #00868b 30%, #aaa 90%)',
        borderRadius: 2,
        border: 0,
        color: 'white',
        height: 24,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    deactivate: {
        background: 'linear-gradient(45deg, #192343 30%, red  90%)',
        borderRadius: 2,
        border: 0,
        color: 'white',
        height: 24,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
        fontSize: 14,
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});


class AdminMain extends Component {
    state = {
        emailList: '',
        org_id: 0,
        deactivateDialog: false,
        addManager: false,
        editDialog: false,
        organization: {},
        orgName: '',
        page: 0,
        rowsPerPage: 6,
    };

    componentDidMount() {
        if (this.props.reduxState.user.security_level !== securityLevel.ADMIN_ROLE) {
            this.props.history.push('/main');
        } else {
            this.props.dispatch({ type: 'FETCH_ORGANIZATIONS', payload: this.props.reduxState.adminMainReducer })
        }
    };//this will fetch all organizations from the database upon page load

    handleAddNewOrganizationClick = () => {
        this.props.history.push('/adminmain/createneworganization');
    }; //this button will take the admin to a form to add a new organization

    handleViewOrgClick = (id) => {
        this.props.history.push(`/adminmain/organization/${id}`);
    }//this button will take the admin to an organization-specific admin page

    //this button will deactivate the organization, thereby stop the collection of data, but the data will still be viewable
    handleDeactivateClick = (org_id) => {
        this.setState({ deactivateDialog: true, org_id: org_id }) // open dialog box
    }

    handleDeactivateConfirm = (org_id) => {
        this.props.dispatch({ type: 'DEACTIVATE_ORGANIZATION', payload: org_id });
        this.setState({ ...this.state, deactivateDialog: false })
        this.props.dispatch({ type: 'CONFIRM_DEACTIVATE_SNACKBAR' })//this will dispatch an action type which triggers a SnackBar alert
    }

    handleCancelDeactivate = () => {
        this.setState({ ...this.state, deactivateDialog: false })
    }

    // show edit dialog and store organization's name in state
    handleEditOrgClick = organization => () => {
        this.setState({
            org_id: organization.id,
            orgName: organization.name,
            editDialog: true
        });
    }

    // change orgName in state
    handleChangeOrgName = event => {
        this.setState({ orgName: event.target.value });
    }

    // close dialog when cancel button is clicked
    handleEditCancelClick = () => {
        this.setState({ editDialog: false });
    }

    // close dialog and update organization name
    handleUpdateOrgClick = () => {
        this.setState({ editDialog: false });
        this.props.dispatch({
            type: 'UPDATE_ORGANIZATION',
            payload: {
                id: this.state.org_id,
                name: this.state.orgName,
            }
        });
    }

    handleAddManagers = id => () => {
        this.setState({
            ...this.state,
            org_id: id,
            addManager: true
        });
    }

    handleCancelAddManager = () => {
        this.setState({
            ...this.state,
            emailList: '',
            org_id: 0,
            addManager: false
        });
    }

    sendInvitationEmails = () => {
        let splitList = this.state.emailList.split('\n'); // creates comma separate array  
        this.props.dispatch({ type: 'ADD_EMPLOYEES', payload: { ...this.state, emailList: splitList } });
        this.handleCancelAddManager();
    }

    handleChange = event => {
        this.setState({
            ...this.state,
            emailList: event.target.value,
        });
    }
    handleChangeRowsPerPage = event => {
        this.setState({
            ...this.state,
            rowsPerPage: event.target.value
        });
    };
    handleChangePage = (event, page) => {
        this.setState({
            ...this.state,
            page,
        });
    };

    render() {
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.reduxState.adminMainReducer.length - page * rowsPerPage);
        const { classes } = this.props;
        return (
            <div>
                <h1>Welcome, {this.props.reduxState.user.email}!</h1>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Organization Name</CustomTableCell>
                                <CustomTableCell>Survey Results Page</CustomTableCell>
                                <CustomTableCell>Update Information</CustomTableCell>
                                <CustomTableCell>Cycle Status</CustomTableCell>
                                <CustomTableCell>Add Manager</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.reduxState.adminMainReducer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(organization => (
                                    <TableRow key={organization.id} organization={organization}>
                                        <CustomTableCell>{organization.name}</CustomTableCell>
                                        <CustomTableCell>
                                            <Button
                                                classes={{
                                                    root: classes.buttons,
                                                    label: classes.label,
                                                }}
                                                variant="contained"
                                                onClick={() => this.handleViewOrgClick(organization.id)}>
                                                View
                                            </Button>
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            <Button
                                                classes={{
                                                    root: classes.buttons,
                                                    label: classes.label,
                                                }}
                                                variant="contained"
                                                onClick={this.handleEditOrgClick(organization)}>
                                                Edit
                                            </Button>
                                        </CustomTableCell>
                                        {/* Ternary Function to render button or text */}
                                        <CustomTableCell>
                                            {
                                                organization.collecting_data ?
                                                    <Button
                                                        classes={{
                                                            root: classes.deactivate,
                                                        }}
                                                        variant="contained"
                                                        onClick={() => this.handleDeactivateClick(organization.id)}>
                                                        Deactivate
                                                    </Button> :
                                                    <p>Deactivated</p>
                                            }
                                        </CustomTableCell>
                                        {/* Ternary Function to disable   */}
                                        <CustomTableCell>
                                            <Button
                                                classes={{
                                                    root: classes.buttons,
                                                    label: classes.label,
                                                }}
                                                variant="contained"
                                                onClick={this.handleAddManagers(organization.id)}
                                                disabled={!organization.collecting_data}
                                            >
                                                Send Invite
                                    </Button>
                                        </CustomTableCell>
                                    </TableRow>
                                    //this for each loop will map through available organizations in the database and display them 
                                    //on the DOM in a table
                                ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <CustomTableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
                <TablePagination
                    rowsPerPageOptions={[6, 12, 24]}
                    component="div"
                    count={this.props.reduxState.adminMainReducer.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <Button color="primary" onClick={this.handleAddNewOrganizationClick}
                    classes={{
                        root: classes.buttons,
                        label: classes.label,
                    }}>Add New Organization</Button>

                {/* Dialog box for editing organization */}
                <Dialog open={this.state.editDialog}>
                    <DialogTitle>Edit Organization</DialogTitle>
                    <DialogContent>

                        <TextField
                            id="orgName"
                            label="Name"
                            className={classes.textField}
                            value={this.state.orgName}
                            onChange={this.handleChangeOrgName}
                            margin="normal"
                            variant="outlined"
                        />
                    </DialogContent>
                    <br />
                    <Button color="primary" onClick={this.handleUpdateOrgClick}>Update</Button>
                    <Button color="secondary" onClick={this.handleEditCancelClick}>Cancel</Button>
                </Dialog>

                {/* Dialog box for deactivating */}
                <Dialog open={this.state.deactivateDialog}>
                    <DialogTitle>Are you sure you want to deactivate this company?</DialogTitle>
                    <Button color="primary" onClick={() => this.handleDeactivateConfirm(this.state.org_id)}>Yes</Button>
                    <Button color="secondary" onClick={this.handleCancelDeactivate}>No</Button>
                </Dialog>

                {/* Dialog box for inviting managers */}
                <Dialog open={this.state.addManager}>
                    <DialogTitle>Add Managers</DialogTitle>
                    <DialogContent>
                        <Typography>1 email per line</Typography>
                        {/* Large Input Box */}
                        <TextField
                            id="outlined-multiline-static"
                            label="No Commas"
                            multiline
                            rows="4"
                            placeholder='Email Addresses'
                            className={classes.textField}
                            value={this.state.emailList}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.sendInvitationEmails}>Send Invitations</Button>
                        <Button color="secondary" onClick={this.handleCancelAddManager}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

AdminMain.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    reduxState,
});

const adminMainRouter = withRouter(AdminMain);

const adminMainRouterStyles = connect(mapStateToProps)(adminMainRouter);

export default withStyles(styles)(adminMainRouterStyles);


