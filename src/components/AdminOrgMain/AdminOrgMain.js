// Scope: Organization Specific Data (charts)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink, CSVDownload } from "react-csv";

let headers = [
    { label: "Time in weeks", key: "week" },
    { label: "positive avg. score", key: "positive" },
    { label: "negative avg. score", key: "negative" },
    { label: "# of response", key: "count" }
  ];

class AdminOrgMain extends Component {

    componentDidMount = () => {
        const arr = window.location.hash.split('/');
        const id = arr[arr.length - 1] === '' ? arr[arr.length - 2] : arr[arr.length - 1];

        this.props.dispatch({ type: 'AVG_DATA', payload: { id: id } });
    }

    getFileName = () => {
        return 'behavior_average_'+Date.now()+'.csv';
    }

    render() {
        return (
            <div>
                <div style={{ height: '50vh', width: '70vw' }}>
                    <canvas id="myChart1" style={{ height: '100%', width: '100%' }}></canvas>
                </div>
                <div id="downloadCsv">
                    {
                        this.props.avgData.length>0 &&
                        <CSVLink
                            data={this.props.avgData}
                            headers={headers}
                            asyncOnClick={true}
                            filename={this.getFileName()}
                            target="_blank"
                        >
                            Download me
                        </CSVLink>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ avgData }) => ({ avgData });

export default connect(mapStateToProps)(AdminOrgMain);