import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Chart from 'chart.js';

function* avgData(action) {
    try {
        const id = action.payload.id;
        const response = yield call(axios.get, `/api/adminorg/${id}`);
        const avgList = response.data;

        new Chart(document.getElementById('myChart1'), {
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
        console.log(error);
    }
}

function* adminOrgSaga() {
    yield takeLatest('AVG_DATA', avgData);
}

export default adminOrgSaga;