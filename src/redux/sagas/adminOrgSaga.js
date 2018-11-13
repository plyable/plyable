import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Chart from 'chart.js';
import { CSVLink } from "react-csv";

let chart1;
let chart2;

function* avgData(action) {
    try {
        const id = action.payload.id;
        const response = yield call(axios.get, `/api/adminorg/average/${id}`);
        const avgList = response.data;

        if(chart1) {
            chart1.destroy();
        }

        chart1 = new Chart(document.getElementById('myChart1'), {
            type: 'line',
            data: {
                labels: avgList.map(avg => avg.week),
                datasets: [{
                    label: 'Negative',
                    data: avgList.map(avg => avg.negative),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                }, {
                    label: 'Positive',
                    data: avgList.map(avg => avg.positive),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Behavior Assessment Averages',
                    fontSize: 30
                },
                scales: {
                    yAxes: [{
                        position: 'left',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Request State'
                        },
                        ticks: {
                            beginAtZero: true,
                            max: 3,
                            callback: function (dataLabel, index) {
                                if (dataLabel === 3) {
                                    return 'Consistently';
                                } else if (dataLabel === 0) {
                                    return 'Rarely'
                                } else {
                                    return '';
                                }
                            }
                        }
                    }]
                }
            }
        });

        yield put({ type: 'GET_AVG_DATA', payload: avgList });
    } catch (error) {
        console.log('Error getting average data :', error);
    }
}

function* specificData(action) {
    try {
        const id = action.payload.id;
        const behaviorId = action.payload.behaviorId;

        if(behaviorId === 0) {
            yield put({ type: 'BEHAVIOR_DATA' });
        }

        const response = yield call(axios.get, `/api/adminorg/specific/${id}/${behaviorId}`);
        const specificList = response.data;

        if(chart2) {
            chart2.destroy();
        }

        chart2 = new Chart(document.getElementById('myChart2'), {
            type: 'line',
            data: {
                labels: specificList.map(data => data.week),
                datasets: [{
                    label: 'Data',
                    data: specificList.map(data => data.avg),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Behavior Specific Averages',
                    fontSize: 30
                },
                scales: {
                    yAxes: [{
                        position: 'left',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Request State'
                        },
                        ticks: {
                            beginAtZero: true,
                            max: 3,
                            callback: function (dataLabel, index) {
                                if (dataLabel === 3) {
                                    return 'Consistently';
                                } else if (dataLabel === 0) {
                                    return 'Rarely'
                                } else {
                                    return '';
                                }
                            }
                        }
                    }]
                }
            }
        });

        yield put({ type: 'GET_SPECIFIC_DATA', payload: specificList });
    } catch(error) {
        console.log('Error getting specific data :', error);
    }
}

function* behaviorData() {
    try {
        const response = yield call(axios.get, '/api/adminorg/behavior');
        const behaviorList = response.data;

        yield put({ type: 'GET_BEHAVIOR_DATA', payload: behaviorList });
    } catch (error) {
        console.log('Error getting behavior data :', error);
    }
}

function* downloadBehaviorData(action) {
    try {
        const id = action.payload.id;
        const response = yield call(axios.get, `/api/adminorg/specific/all/${id}`);
        const downloadBehavior = response.data;

        console.log(downloadBehavior);

        yield put({ type: 'GET_DOWNLOAD_BEHAVIOR_DATA', payload: downloadBehavior });
    } catch (error) {
        console.log('Error getting behavior data :', error);
    }
}

function* adminOrgSaga() {
    yield takeLatest('AVG_DATA', avgData);
    yield takeLatest('SPECIFIC_DATA', specificData);
    yield takeLatest('BEHAVIOR_DATA', behaviorData);
    yield takeLatest('DOWNLOAD_BEHAVIOR_DATA', downloadBehaviorData);
}

export default adminOrgSaga;