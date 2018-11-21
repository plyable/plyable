// Scope: Organization Specific Data (charts)
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CompletedFeedback from '../CompletedFeedback/CompletedFeedback';
import { Button, withStyles, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

let arr = window.location.hash.split('/');
let id = arr[arr.length - 1] === '' ? arr[arr.length - 2] : arr[arr.length - 1];

const styles = () => ({
    buttons: {
        background: 'linear-gradient(45deg, #4680fb 40%, #aaa 90%)',
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 24,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 185, .3)',
    },
})

class AdminOrgMain extends Component {
    state = {
        dialogOpen: false,
    }

    convertArrayOfObjectsToCSV = (args) => {
        let result, ctr, keys, columnDelimiter, lineDelimiter, data, title;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        title = args.title || '';

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

    downloadCSV = keyword => () => {
        let data, link, csv = '', valueList = [];

        if (keyword === 'behaviors') {
            const dataList = this.props.downloadBehaviorData.map(data => ({
                value: data.value,
                "Time_in_Weeks": data.week,
                "Avg_Score": data.avg,
                "#_of_Responses": data.user_count,
                "Total_Users": data.total_count,
                "%_of_Responses": data.percent
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
                    data: dataList,
                    keyword: keyword
                });
            }
        } else if (keyword === 'average') {
            const dataList = this.props.downloadAverageData.map(data => ({
                value: 'Behavior Average Data',
                "Time_in_Weeks": data.week,
                "Positive_Avg_Score": data.positive,
                "Negative_Avg_Score": data.negative,
                "#_of_Responses": data.user_count,
                "Total_Users": data.total_count,
                "%_of_Responses": data.percent
            }));

            csv = this.convertArrayOfObjectsToCSV({
                title: 'Behavior Average Data',
                data: dataList,
                keyword: keyword
            });
        }

        if (csv === '' || csv === null || csv === undefined) {
            this.setState({ dialogOpen: true });
            return;
        }

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', this.getFileName(keyword));
        link.click();
    }

    getFileName = keyword => {
        let filename = 'noname.csv';

        if (keyword === 'behaviors') {
            filename = 'behavior_specific_' + Date.now() + '.csv';
        } else if (keyword === 'average') {
            filename = 'behavior_average_' + Date.now() + '.csv';
        }

        return filename;
    }

    handleChangeBehavior = event => {
        this.props.dispatch({ type: 'SPECIFIC_DATA', payload: { id: id, behaviorId: event.target.value } });
    }

    goBack = () => {
        this.props.history.goBack();
    }

    handleCancel = () => {
        this.setState({
            dialogOpen: false,
        });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'AVG_DATA', payload: { id: id } });
        this.props.dispatch({ type: 'SPECIFIC_DATA', payload: { id: id, behaviorId: 0 } });
        this.props.dispatch({ type: 'DOWNLOAD_DATA', payload: { id: id } });
    }

    render() {
        arr = window.location.hash.split('/');
        id = arr[arr.length - 1] === '' ? arr[arr.length - 2] : arr[arr.length - 1];
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Button
                        onClick={this.goBack}
                        classes={{
                            root: classes.buttons,
                        }}>
                        Back
                    </Button>
                </div>
                <CompletedFeedback />
                <div style={{ width: '70vw' }}>
                    <canvas id="adminAverageChart"></canvas>
                </div>
                <div className="downloadCsv" style={{ textAlign: 'right' }}>
                    <Button
                    onClick={this.downloadCSV('average')}
                    classes={{
                        root: classes.buttons,
                    }}>Download CSV</Button>
                </div>
                <div style={{ width: '70vw', textAlign: 'center' }}>
                    <select onChange={this.handleChangeBehavior} style={{ width: '70%', height: '50px', fontSize: '30px' }}>
                        {this.props.behaviorData.map(behavior => <option key={behavior.id} value={behavior.id}>{behavior.value}</option>)}
                    </select>
                    <canvas id="adminSpecificChart"></canvas>
                </div>
                <div className="downloadCsv" style={{ textAlign: 'right' }}>
                    <Button
                    onClick={this.downloadCSV('behaviors')}
                    classes={{
                        root: classes.buttons,
                    }}>Download CSV</Button>
                </div>
                <Dialog open={this.state.dialogOpen}>
                    <DialogTitle>No Data</DialogTitle>
                    <DialogContent>
                        <Typography component="p">There is no data to download.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleCancel}>Okay</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({ adminChartData }) => ({
    avgData: adminChartData.avgData,
    specificData: adminChartData.specificData,
    behaviorData: adminChartData.behaviorData,
    downloadBehaviorData: adminChartData.downloadBehaviorData,
    downloadAverageData: adminChartData.downloadAverageData,
});

export default connect(mapStateToProps)(withStyles(styles)(withRouter(AdminOrgMain)));