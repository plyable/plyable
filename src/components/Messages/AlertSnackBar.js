import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

//this component handles SnackBar alerts for various actions on the site
//they are primarily for visual confirmation that an action (submit, login, deactivate, etc.)
//was successful
class AlertSnackBar extends React.Component {

    handleClose = () => {
        this.props.dispatch({ type: 'CLOSE_SNACKBAR' });
    };

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.props.messagesReducer.addNewOrganizationSnackBar}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={"Added Organization"}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.messagesReducer.surveyCompletedSnackBar}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={"Excellent! This week's survey is complete."}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.messagesReducer.confirmDeactivateSnackBar}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={"This Organization Has Been Deactivated"}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.messagesReducer.registrationCompletedSnackBar}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={"Great job, your Plyable registration is complete!"}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.messagesReducer.loginSnackbar}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={"Welcome to Plyable"}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.messagesReducer.emailSuccess}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={"Invites Sent"}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.messagesReducer.loginMistype}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    message={"Your Email and Password didn't match"}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.messagesReducer.loginError}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    message={"Something went wrong. Check your internet connection."}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.messagesReducer.loginInputError}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    message={"Please enter your email and password"}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                />
            </div>
        );
    }
}
const mapStateToProps = ({ messagesReducer }) => ({ messagesReducer });

export default connect(mapStateToProps)(AlertSnackBar);
