import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, withStyles } from '@material-ui/core';

const styles = () => ({
    buttons: {
        background: 'linear-gradient(45deg, #a640fb 40%, #aaa 90%)',
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 24,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 185, .3)',
    },
})
class FullList extends Component {

    state = {
        oldEmail: '',
        newEmail: '',
        editBox: false,
    }
    

    componentDidMount() {
        const id = this.props.reduxState.user.org_id
        this.props.dispatch({ type: 'FETCH_PARTICIPATION', payload: id });
    }

    handleClick = (email) => {
        console.log(email);
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

    handleEdit = employee => event => {
        this.setState({
            ...this.state,
            oldEmail: employee.email,
            editBox: true,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'EDIT_EMPLOYEE', payload: { ...this.state, org_id: this.props.reduxState.user.org_id } });
        this.handleCancel();
    }

    render() {
        const { classes } = this.props;
        let employees = this.props.reduxState.participationReducer;
        return (
            <div>
                <h4>{employees.length} registered {employees.length > 1 ? 'employees' : 'employee'}:</h4>
                <ul>
                    {employees.map(employee => <li key={employee.email}>{employee.email + ' '}
                        <Button onClick={() => this.handleClick(employee.email)}
                        classes={{
                            root: classes.buttons,
                        }}>resend invite</Button>
                        <Button onClick={this.handleEdit(employee)}
                        classes={{
                            root: classes.buttons,
                        }}>edit</Button>
                    </li>)}
                </ul>
                <dialog open={this.state.editBox}>
                    <p>enter new email</p>
                    <form onSubmit={this.handleSubmit} >
                        <input type="email" onChange={this.handleChange} value={this.state.newEmail} />
                        <input type="submit" value="send" />
                    </form>
                    <Button onClick={this.handleCancel}
                    classes={{
                        root: classes.buttons,
                    }}>cancel</Button>
                </dialog>
            </div >
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});


export default connect(mapStateToProps)(withStyles(styles)(FullList));

