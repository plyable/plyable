import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';


class AlertSnackBar extends React.Component {

    handleClose = () => {
        this.props.dispatch({ type: 'CLOSE_NEW_ORGANIZATION_SNACKBAR' });
        this.props.dispatch({ type: 'CLOSE_SURVEY_COMPLETED_SNACKBAR' });
    };


    render() {
        // const vertical = 'top';
        // const horizontal = 'right'
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
            </div>
        );
    }
}
const mapStateToProps = ({ messagesReducer }) => ({ messagesReducer });

export default connect(mapStateToProps)(AlertSnackBar);

// anchorOrigin={{ vertical, horizontal }}