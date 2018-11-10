//this component holds all the behavior cards.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BehaviorCard from './BehaviorCard';


class Survey extends Component {

    state = {
        openCard: 0,//this determines which of the cards is being rendered
    }

    componentDidMount() {
        //on mount, fetch data reguarding this weeks survey
        this.props.dispatch({ type: 'FETCH_BEHAVIORS' });
    }

    switchCard = number => {
        this.setState({
            openCard: number,
        });
    }

    render() {
        let dummyCards = [
            { id: '1', value: 'goodness', definition: 'that which is good', context: 'it is good to be good', positive: true },
            { id: '2', value: 'horrification', definition: 'being horribly absurd', context: 'a terrible combination', positive: false },
            { id: '3', value: 'comfortude', definition: 'being comfortable at being comfortabld', context: 'it is not enough to simply be comfortable', positive: true },
            { id: '4', value: 'dreadedness', definition: 'ease at which something becomes dreaded', context: 'little should be dreaded', positive: false },
            { id: '5', value: 'evil', definition: 'a classic', context: 'don\'t be it', positive: false },
            { id: '6', value: 'succulent', definition: 'tastes really good', context: 'lunch is important too', positive: true }
        ]
        return (
            <div>
                <h1>Survey</h1>
                    <BehaviorCard
                        card={dummyCards[this.state.openCard]}
                        current={this.state.openCard}
                        switchCard={this.switchCard}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Survey);
