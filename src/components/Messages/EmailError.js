import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';
const EmailError = props => {
    return (
        <div>
            <Dialog open={props.messagesReducer.emailError}>
                <div className="generalDialog">
                    <h3>Error sending emails</h3>
                    <p>There was an error sending invites.</p>
                    <button onClick={() => {
                        props.dispatch({ type: 'CONFIRM_EMAIL_ERROR' });
                    }}>Okay</button>
                </div>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ messagesReducer }) => ({ messagesReducer });

export default connect(mapStateToProps)(EmailError);
