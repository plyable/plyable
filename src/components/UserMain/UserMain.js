// Scope: Organization Page (for user)
import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserMain extends Component {
    componentDidMount = () => {
        this.props.dispatch({ type: 'USER_ORG_CHART' });
    }

    render() {
        return (
            <div>
                <h2>User Main</h2>
                <div style={{width: '70vw'}}>
                    <canvas id="userViewChart"></canvas>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(UserMain);