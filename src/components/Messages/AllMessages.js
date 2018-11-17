import React from 'react';

//Daniel Imports Above, Eli Imports Below
import SendingEmails from './SendingEmails';
import './messages.css';

//sort of like an index.js, all the dialogues are put here, and opened when needed
//their primary purpose is to prevent the user from mucking around when important
//things are happening, like the transfering of files.
//they are opened and closed wherever they are needed, such as in a saga, or button click
const AllMessages = () => {
    return (
        <div>
            {/* Daniel Toasts Above, Eli Dialogs Below */}
            <SendingEmails />
        </div>
    );
}

export default AllMessages;
