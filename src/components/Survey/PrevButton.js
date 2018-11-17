import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class PrevButton extends Component {

    handleClick = () => {
        this.props.switchCard(this.props.number, 'prev');
        //swichCard changes the local state of Survey.
    }

    render() {
        return (
            <Button
                size="small"
                color="secondary"
                onClick={this.handleClick}
                disabled={this.props.disabled}
            >
                Previous
            </Button>
        )
    }
}

export default connect()(PrevButton);
