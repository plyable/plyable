import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Chart from 'chart.js';

let bgColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(0,0,0, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];
let bdColors = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(0,0,0, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

const data1 = [1, 2, 3, 4, 2.3];
const data2 = [3, 2, 1, 3, 2.3];

function* avgData(action) {
    try {
        const id = action.payload.id;
        const response = yield call(axios.get, `/api/adminorg/${id}`);
        const avgList = response.data;

        let chart1 = new Chart(document.getElementById('myChart1'), {
            type: 'line',
            data: {
                labels: avgList.map(avg => avg.week),
                datasets: [{
                    label: 'Negative',
                    data: avgList.map(avg => avg.negative),
                    backgroundColor: bgColors[0],
                    borderColor: bdColors[0],
                    borderWidth: 1,
                },{
                    label: 'Positive',
                    data: avgList.map(avg => avg.positive),
                    backgroundColor: bgColors[1],
                    borderColor: bdColors[1],
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
                            max: 5,
                            callback: function(dataLabel, index) {
                                if(dataLabel === 5) {
                                    return 'Consistently';
                                } else if(dataLabel === 0){
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

        yield put({ type: 'GET_AVG_DATA', payload: response.data });
    } catch (error) {
        console.log(error);
    }
}

function* adminOrgSaga() {
    yield takeLatest('AVG_DATA', avgData);
}

export default adminOrgSaga;