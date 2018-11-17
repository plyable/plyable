import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';

class NextButton extends Component {

    handleClick = () => {
        this.props.handleSubmit();
        //handleSubmit changes redux state, and changes the local state of BehaviorCard
        this.props.switchCard(this.props.number, 'next');
        //swichCard changes the local state of Survey.
    }

  render() {
    return (
        <Button 
            size="small" 
            color="primary" 
            onClick={this.handleClick}
            disabled={this.props.disabled}
        >
            Next
        </Button>
  )}
}

export default connect()(NextButton);
