import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, withStyles } from '@material-ui/core';
import Mail from '@material-ui/icons/MailOutline';
import Edit from '@material-ui/icons/EditOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    outFrame: {
        margin: '10px 5px',
    },
    cardFrame: {
        border: '1px solid #00868b',
        borderRadius: '20px',
        margin: '0 auto',
        maxWidth: '710px',
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
        padding: '10px',
        maxHeight: '300px',
        overflow: 'scroll',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    emailTd: {
        border: 'none',
        paddingLeft: '10px',
        fontSize: '11px',
    },
    buttonTd: {
        border: 'none',
        textAlign: 'right',
    },
    emailInput: {
        width: '95%',
        padding: '10px',
        boxSizing: 'border-box',
        outline: '0',
        border: '1px solid #00868b',
        borderRadius: '5px',
    },
});

class FullList extends Component {
    state = {
        oldEmail: '',
        newEmail: '',
        editBox: false,
    }

    componentDidMount() {
        const id = this.props.user.org_id
        this.props.dispatch({ type: 'FETCH_PARTICIPATION', payload: id });
    }

    handleClick = email => () => {
        this.props.dispatch({ type: 'REINVITE', payload: email });
    }

    handleChange = event => {
        this.setState({
            ...this.state,
            newEmail: event.target.value
        });
    }

    handleCancel = () => {
        this.setState({
            oldEmail: '',
            newEmail: '',
            editBox: false,
        });
    }

    handleEdit = employee => () => {
        this.setState({
            ...this.state,
            oldEmail: employee.email,
            editBox: true,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'EDIT_EMPLOYEE', payload: { ...this.state, org_id: this.props.user.org_id } });
        this.handleCancel();
    }

    render() {
        const { classes } = this.props;
        const employees = this.props.participationReducer;
        return (
            <div>
                <div className={classes.outFrame}>
                    <div className={classes.cardFrame}>
                        <p className={classes.title}>
                            {employees.length} registered {employees.length > 1 ? 'employees' : 'employee'}
                        </p>
                        <div className={classes.subBackground}>
                            <table className={classes.table}>
                                <tbody>
                                {employees.map(employee =>
                                    <tr key={employee.email}>
                                        <td className={classes.emailTd}>{employee.email}</td>
                                        <td className={classes.buttonTd}>
                                            <Button
                                                onClick={this.handleClick(employee.email)}
                                                className={classes.buttons}
                                                color="primary"
                                            >
                                                re-invite<Mail />
                                            </Button>
                                            <Button
                                                onClick={this.handleEdit(employee)}
                                                className={classes.buttons}
                                                color="primary"
                                            >
                                                edit<Edit />
                                            </Button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.editBox}>
                    <DialogTitle>Enter New Email</DialogTitle>
                    <input 
                        type="email" 
                        onChange={this.handleChange} 
                        value={this.state.newEmail} 
                        className={classes.emailInput}
                        placeholder="email@email.net"
                    />
                    <DialogActions>
                        <Button color="primary" onClick={this.handleSubmit}>Send</Button>
                        <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

const mapStateToProps = ({ user, participationReducer }) => ({ user, participationReducer });

export default connect(mapStateToProps)(withStyles(styles)(FullList));