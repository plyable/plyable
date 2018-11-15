// Scope: Organization Specific Data (charts)
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSVLink } from "react-csv";

let arr = window.location.hash.split('/');
let id = arr[arr.length - 1] === '' ? arr[arr.length - 2] : arr[arr.length - 1];
let headersForAverage = [
    { label: "Time in weeks", key: "week" },
    { label: "positive avg. score", key: "positive" },
    { label: "negative avg. score", key: "negative" },
    { label: "# of response", key: "user_count" }
];

class AdminOrgMain extends Component {

    convertArrayOfObjectsToCSV = (args) => {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data, title;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        title = args.title || null;
        if (title == null || !title.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);
        keys.shift();

        result = '';
        result += title;
        result += lineDelimiter;
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(item => {
            ctr = 0;
            if (title === item.value) {
                keys.forEach(key => {
                    if (ctr > 0) result += columnDelimiter;

                    if (item[key] !== item.value) {
                        result += item[key];
                        ctr++;
                    }
                });
                result += lineDelimiter;
            }
        });

        return result += lineDelimiter;
    }

    downloadCSV = () => {
        var data, filename, link, csv = '';

        let valueList = [];
        const dataList = this.props.downloadBehaviorData.map(data => ({
            value: data.value, "Time_in_weeks": data.week, "Avg._Score": data.avg, "#_of_responses": data.user_count
        }));

        for (let data of this.props.downloadBehaviorData) {
            let str = data.value;
            if (valueList.indexOf(str) < 0) {
                valueList.push(data.value);
            }
        }

        for (let value of valueList) {
            csv += this.convertArrayOfObjectsToCSV({
                title: value,
                data: dataList
            });
        }

        if (csv == null) return;

        filename = this.getFileName();

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    getFileName = () => {
        return 'behavior_average_' + Date.now() + '.csv';
    }

    handleChangeBehavior = event => {
        this.props.dispatch({ type: 'SPECIFIC_DATA', payload: { id: id, behaviorId: event.target.value } });
    }

    goBack = () => {
        this.props.history.goBack();
    }

    componentDidMount = () => {
        arr = window.location.hash.split('/');
        id = arr[arr.length - 1] === '' ? arr[arr.length - 2] : arr[arr.length - 1];

        this.props.dispatch({ type: 'AVG_DATA', payload: { id: id } });
        this.props.dispatch({ type: 'SPECIFIC_DATA', payload: { id: id, behaviorId: 0 } });
        this.props.dispatch({ type: 'DOWNLOAD_BEHAVIOR_DATA', payload: { id: id } });
        this.props.dispatch({ type: 'FETCH_PARTICIPATION', payload: id });
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.goBack}>Back</button>
                </div>
                <div style={{ width: '70vw' }}>
                    <canvas id="myChart1"></canvas>
                </div>
                <div style={{ textAlign: 'right' }}>
                    {
                        this.props.avgData.length > 0 &&
                        <CSVLink
                            data={this.props.avgData}
                            headers={headersForAverage}
                            asyncOnClick={true}
                            filename={this.getFileName()}
                            target="_blank"
                        >
                            Download me
                        </CSVLink>
                    }
                </div>
                <div style={{ width: '70vw', textAlign: 'center' }}>
                    <select onChange={this.handleChangeBehavior} style={{ width: '70%', height: '50px', fontSize: '30px' }}>
                        {this.props.behaviorData.map(behavior => <option key={behavior.id} value={behavior.id}>{behavior.value}</option>)}
                    </select>
                    <canvas id="myChart2"></canvas>
                </div>
                <div className="downloadCsv" id="specificData" style={{ textAlign: 'right' }}>
                    <button onClick={this.downloadCSV}>Download CSV</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ adminChartData }) => ({
    avgData: adminChartData.avgData,
    specificData: adminChartData.specificData,
    behaviorData: adminChartData.behaviorData,
    downloadBehaviorData: adminChartData.downloadBehaviorData
});

export default connect(mapStateToProps)(withRouter(AdminOrgMain));