import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';
const RedundantEmail = props => {
    return (
        <div>
            <Dialog open={props.messagesReducer.emailRedundant}>
                <div className="generalDialog">
                    <h3>User Already Exists</h3>
                    <p>One or more of the emails sent already exist in our database.</p>
                    <button onClick={() => {
                        props.dispatch({ type: 'CONFIRM_EMAIL_ERROR' });
                    }}>Okay</button>
                </div>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ messagesReducer }) => ({ messagesReducer });

export default connect(mapStateToProps)(RedundantEmail);
