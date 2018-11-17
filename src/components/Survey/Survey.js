import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BehaviorCard from './BehaviorCard';

const styles = theme => ({
    title: {
        marginLeft: '10vw',
    },
});

class Survey extends Component {
    state = {
        openCard: 0, //this determines which of the cards is being rendered
    }

    componentDidMount = () => {
        //on mount, fetch data reguarding this weeks survey
        this.props.dispatch({ type: 'FETCH_BEHAVIORS' });
    }

    switchCard = (number, keyword) => {
        this.setState({ openCard: number });
        if(keyword === 'prev') {
            this.props.dispatch({ 
                type: 'REMOVE_BEHAVIOR', 
                payload: { 
                    id: this.props.behaviors[this.state.openCard-1].id 
                } 
            });
        }
    }

    render() {
        let cards = this.props.behaviors;
        const { classes } = this.props;
        return (
            <div>
                <h1 className={classes.title}>Survey</h1>
                <BehaviorCard
                    card={cards[this.state.openCard] || {value: 'Loading'}}
                    current={this.state.openCard}
                    switchCard={this.switchCard}
                    cardNumber={this.state.openCard}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ behaviorReducer }) => ({ 
    behaviors: behaviorReducer.behaviors,
});

export default connect(mapStateToProps)(withStyles(styles)(Survey));
