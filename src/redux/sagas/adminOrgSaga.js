import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Chart from 'chart.js';

let avgChart;
let specificChart;
const MIN_PERCENT = 60;

function* avgData(action) {
    try {
        const orgId = action.payload.id;
        const response = yield call(axios.get, `/api/adminorg/average/chart/${orgId}`);
        const avgList = response.data;

        // remove previous data
        if(avgChart) {
            avgChart.destroy();
        }

        let positiveData = avgList.filter(avg => avg.percent >= MIN_PERCENT).map(avg => ({ x: avg.week, y: avg.positive }));
        let negativeData = avgList.filter(avg => avg.percent >= MIN_PERCENT).map(avg => ({ x: avg.week, y: avg.negative }));

        // draw chart
        avgChart = new Chart(document.getElementById('adminAverageChart'), {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Negative',
                    data: negativeData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    lineTension: 0
                }, {
                    label: 'Positive',
                    data: positiveData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    lineTension: 0
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
                    xAxes: [{ 
                        type: 'linear',
                        ticks: {
                            stepSize: 1,
                            callback: function (dataLabel, index) {
                                if(dataLabel > -1){
                                    return 'week'.concat(' ', dataLabel);
                                }
                            }
                        }
                    }],
                    yAxes: [{
                        position: 'left',
                        display: true,
                        scaleLabel: {
                            display: false,
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

        const response = yield call(axios.get, `/api/adminorg/specific/chart/${id}/${behaviorId}`);
        const specificList = response.data;

        if(specificChart) {
            specificChart.destroy();
        }

        const chartData = specificList.filter(data => data.percent >= MIN_PERCENT).map(data => ({ x: data.week, y: data.avg }));
        const expectData = specificList.filter(data => data.percent >= MIN_PERCENT).map(data => ({ x: data.week, y: data.expect_avg }));

        specificChart = new Chart(document.getElementById('adminSpecificChart'), {
            type: 'line',
            data: {
                labels: specificList.map(data => 'week'.concat(' ', data.week)),
                datasets: [{
                    label: 'Score',
                    data: chartData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },{
                    label: 'Expectation',
                    data: expectData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
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
                    xAxes: [{ 
                        type: 'linear',
                        ticks: {
                            stepSize: 1,
                            callback: function (dataLabel, index) {
                                if(dataLabel > -1){
                                    return 'week'.concat(' ', dataLabel);
                                }
                            }
                        }
                    }],
                    yAxes: [{
                        position: 'left',
                        display: true,
                        scaleLabel: {
                            display: false,
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

function* downloadData(action) {
    try {
        const id = action.payload.id;
        const behaviorResponse = yield call(axios.get, `/api/adminorg/specific/all/${id}`);
        const averageResponse = yield call(axios.get, `/api/adminorg/average/all/${id}`);
        const downloadBehavior = behaviorResponse.data;
        const downloadAverage = averageResponse.data;

        yield put({ type: 'GET_DOWNLOAD_BEHAVIOR_DATA', payload: downloadBehavior });
        yield put({ type: 'GET_DOWNLOAD_AVERAGE_DATA', payload: downloadAverage });
    } catch (error) {
        console.log('Error getting behavior data :', error);
    }
}

function* adminOrgSaga() {
    yield takeLatest('AVG_DATA', avgData);
    yield takeLatest('SPECIFIC_DATA', specificData);
    yield takeLatest('BEHAVIOR_DATA', behaviorData);
    yield takeLatest('DOWNLOAD_DATA', downloadData);
}

export default adminOrgSaga;