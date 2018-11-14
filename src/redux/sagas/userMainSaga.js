import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Chart from 'chart.js';

let chart1;

function* userOrgChart() {
    try {
        const response = yield call(axios.get, `/api/main/chart`);
        const chartList = response.data;

        console.log(chartList);

        if(chart1) {
            chart1.destroy();
        }

        chart1 = new Chart(document.getElementById('userViewChart'), {
            type: 'line',
            data: {
                labels: chartList.map(avg => avg.week),
                datasets: [{
                    label: 'Negative',
                    data: chartList.map(avg => avg.negative),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                }, {
                    label: 'Positive',
                    data: chartList.map(avg => avg.positive),
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
    } catch (error) {
        console.log('Error getting organization chart data :', error);
    }
}

function* userMainSaga() {
    yield takeLatest('USER_ORG_CHART', userOrgChart);
}

export default userMainSaga;