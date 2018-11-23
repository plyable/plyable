import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Chart from 'chart.js';

let specificChart;
const MIN_PERCENT = 60;

function* userOrgChart(action) {
    try {
        const behaviorId = action.payload.behaviorId;

        if(behaviorId === 0) {
            yield put({ type: 'BEHAVIOR_DATA' });
        }

        const response = yield call(axios.get, `/api/main/chart/${behaviorId}`);
        const specificList = response.data;

        if(specificChart) {
            specificChart.destroy();
        }

        const chartData = specificList.filter(data => data.percent >= MIN_PERCENT).map(data => ({ x: data.week, y: data.avg }));
        const expectData = specificList.filter(data => data.percent >= MIN_PERCENT).map(data => ({ x: data.week, y: data.expect_avg }));

        specificChart = new Chart(document.getElementById('userViewChart'), {
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
                aspectRatio: 1.3,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false,
                    text: 'Behavior Specific Averages',
                    fontSize: 20
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
                        ticks: {
                            beginAtZero: true,
                            max: 3,
                            fontSize: 10,
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
    } catch (error) {
        console.log('Error getting organization chart data :', error);
    }
}

function* userMainSaga() {
    yield takeLatest('USER_ORG_CHART', userOrgChart);
}

export default userMainSaga;