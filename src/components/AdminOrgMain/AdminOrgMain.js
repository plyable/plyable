// Scope: Organization Specific Data (charts)
import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminOrgMain extends Component {

    componentDidMount = () => {
        const arr = window.location.hash.split('/');
        const id = arr[arr.length-1]===''?arr[arr.length-2]:arr[arr.length-1];
        console.log(id);

        this.props.dispatch({ type: 'AVG_DATA', payload: { id: id } });
    }

    render() {
        return (
            <div>
                <div style={{height: '50vh', width: '70vw'}}>
                    <canvas id="myChart1" style={{height: '100%', width: '100%'}}></canvas>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ avgData }) => ({ avgData });

export default connect(mapStateToProps)(AdminOrgMain);