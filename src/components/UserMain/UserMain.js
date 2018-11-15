// Scope: Organization Page (for user)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class UserMain extends Component {
    componentDidMount = () => {
        if(this.props.user.security_level===0){
            this.props.history.push('/adminmain');
        } else {
            if(this.props.user.survey_week < 0){
                this.props.history.push('/survey');
            } else {
                this.props.dispatch({ type: 'USER_ORG_CHART' });
            }
        }
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

export default connect(mapStateToProps)(withRouter(UserMain));