import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Button, withStyles } from '@material-ui/core';

//handles redundent users/emails and keeps them from being added

const styles = () => ({
    buttons: {
        background: 'linear-gradient(45deg, #86008b 40%, #aaa 90%)',
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 24,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 185, .3)',
    },
})

const RedundantEmail = props => {
    const { classes } = props;
    return (
        <div>
            <Dialog open={props.messagesReducer.emailRedundant}>
                <div className="generalDialog">
                    <h3>User Already Exists</h3>
                    <p>One or more of the emails sent already exist in our database.</p>
                    <Button
                        classes={{
                            root: classes.buttons,
                        }}
                        onClick={() => {
                            props.dispatch({ type: 'CONFIRM_EMAIL_ERROR' });
                        }}>Okay</Button>
                </div>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ messagesReducer }) => ({ messagesReducer });

export default connect(mapStateToProps)(withStyles(styles)(RedundantEmail));
