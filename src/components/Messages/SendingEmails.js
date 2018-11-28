import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';

//keeps user form spam-clicking "send"

const SendingEmails = props => {
    return (
        <div>
            <Dialog open={props.messagesReducer.sendingEmail}>
                <div className="generalDialog">
                    <h3>Sending Invites</h3>
                </div>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ messagesReducer }) => ({ messagesReducer });

export default connect(mapStateToProps)(SendingEmails);
