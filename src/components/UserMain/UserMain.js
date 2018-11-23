import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import securityLevel from '../../constants/securityLevel';

const styles = () => ({
    title: {
        marginLeft: '15px',
        color: '#00868b',
        textAlign: 'center',
    },
    info: {
        marginLeft: '15px',
        color: 'black'
    },
    chartFrame: {
        margin: '0 10px',
    },
    cardFrame: {
        border: '1px solid #00868b',
        borderRadius: '20px',
        margin: '15px auto',
        maxWidth: '700px',
        backgroundColor: '#00868b',
    },
    chartTitle: {
        textAlign: 'center',
        color: 'white',
        fontSize: '20px',
        margin: '10px 0 10px 0',
    },
    subBackground: {
        backgroundColor: 'white',
        borderRadius: '19px',
        padding: '15px',
        textAlign: 'center',
    },
    selectBox: {
        width: '80%',
        height: '35px',
        fontSize: '20px',
        backgroundColor: '#00868bbb',
        color: 'white',
        border: '1px solid #00868b',
        outline: 'none',
        textAlign: 'center',
        textAlignLast: 'center',
        marginBottom: '15px',
    },
});

class UserMain extends Component {
    componentDidMount = () => {
        if (this.props.user.security_level === securityLevel.ADMIN_ROLE) {
            this.props.history.push('/adminmain');
        } else {
            if (this.props.user.survey_week < 0) {
                this.props.history.push('/survey');
            } else {
                this.props.dispatch({ type: 'FETCH_BEHAVIORS' });
                this.props.dispatch({ type: 'USER_ORG_CHART', payload: { behaviorId: 0 } });
            }
        }
    }

    handleChangeBehavior = event => {
        this.props.dispatch({ type: 'USER_ORG_CHART', payload: { behaviorId: event.target.value } });
    }

    // Messages to user based on 1) completed survey for the week 2) won't see data until next week
    renderMessage = () => {
        if (Number(this.props.user.survey_week) === 0) {
            return <h4>You will not see data in the graphs until next week.</h4>
        }
        else if (this.props.user.survey_week >= 0) {
            return <h4>You have completed your survey for this week.</h4>
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h2 className={classes.title}>{this.props.user.org_name}</h2>
                <div className={classes.info}>
                    {this.renderMessage()}
                    <h4>Note: Organization data will only be shown if 60% or more employees have responded.</h4>
                </div>
                <div className={classes.chartFrame}>
                    <div className={classes.cardFrame}>
                        <div className={classes.chartTitle}>Behavior Specific Averages</div>
                        <div className={classes.subBackground}>
                            <select
                                onChange={this.handleChangeBehavior}
                                className={classes.selectBox}
                            >
                                {this.props.behaviors.map(behavior => <option key={behavior.id} value={behavior.id}>{behavior.value}</option>)}
                            </select>
                            <canvas id="userViewChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ user, behaviorReducer }) => ({
    user,
    behaviors: behaviorReducer.behaviors,
});

export default connect(mapStateToProps)(withStyles(styles)(withRouter(UserMain)));