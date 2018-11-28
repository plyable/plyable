import React from 'react';
import AlertSnackBar from './AlertSnackBar';
import SendingEmails from './SendingEmails';
import EmailError from './EmailError';
import RedundantEmail from './RedundantEmail';
import RegisterError from './RegisterError';
import './messages.css';

//sort of like an index.js, all the dialogues are put here, and opened when needed
//their primary purpose is to prevent the user from mucking around when important
//things are happening, like the transfering of files.
//they are opened and closed wherever they are needed, such as in a saga, or button click
const AllMessages = () => {
    return (
        <div>
            <AlertSnackBar />
            <SendingEmails />
            <EmailError />
            <RedundantEmail />
            <RegisterError />
        </div>
    );
}

export default AllMessages;
