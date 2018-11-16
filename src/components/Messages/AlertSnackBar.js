import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { withRouter } from "react-router";


class AlertSnackBar extends React.Component {

    handleClose = () => {
        this.props.dispatch({ type: 'CLOSE_NEW_ORGANIZATION_SNACKBAR' });
    };


    render() {
        const vertical = 'top';
        const horizontal = 'right'
        return (
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={this.props.messagesReducer.addNewOrganizationSnackBar}
                autoHideDuration={3000}
                onClose={this.handleClose}
                message={"Added Organization"}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}

            />
        );
    }
}
const mapStateToProps = ({ messagesReducer }) => ({ messagesReducer });

export default connect(mapStateToProps)(AlertSnackBar);