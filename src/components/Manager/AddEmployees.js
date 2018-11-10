// Add Employees input box

import React, { Component } from 'react';

class AddEmployees extends Component {
  state = {}
  render() {
    return (
      <div>
        <h2>Add Employees</h2>
        <h3>1 email per line</h3>
        {/* Large Input Box */}
        <textarea></textarea>
        {/* OnClick rather than submit, to allow enter for new line */}
        <button>Send Invitations</button>

      </div>
    );
  }
}

export default AddEmployees;