//this component holds all the behavior cards.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BehaviorCard from './BehaviorCard';


class Survey extends Component {

    state = {
        openCard: 0,
    }

    componentDidMount() {
        //on mount, fetch data reguarding this weeks survey
        this.props.dispatch({ type: 'FETCH_BEHAVIORS' });
    }

    render() {
        let dummyCards = [
            { id: '1', value: 'goodness', definition: 'that which is good', context: 'it is good to be good' },
            { id: '2', value: 'horrification', definition: 'being horribly absurd', context: 'a terrible combination' },
            { id: '3', value: 'comfortude', definition: 'being comfortable at being comfortabld', context: 'it is not enough to simply be comfortable' },
            { id: '4', value: 'dreadedness', definition: 'ease at which something becomes dreaded', context: 'little should be dreaded' },
            { id: '5', value: 'evil', definition: 'a classic', context: 'don\'t be it' },
            { id: '6', value: 'succulent', definition: 'tastes really good', context: 'lunch is important too' }
        ]
        return (
            <div>
                <h1>Survey</h1>
                    <BehaviorCard
                        card={dummyCards[this.state.openCard]}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Survey);
