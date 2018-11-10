// Scope: Organization Specific Data (charts)
import React, { Component } from 'react';
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

const data = [1, 2, 3, 4, 2.3];

class AdminOrgMain extends Component {

    componentDidMount = () => {
        const arr = window.location.hash.split('/');
        const id = arr[arr.length-1]===''?arr[arr.length-2]:arr[arr.length-1];
        console.log(id);
        let chart1 = new Chart(document.getElementById('myChart1'), {
            type: 'line',
            data: {
                labels: ['one', 'two', 'three', 'four', 'five'],
                datasets: [{
                    label: 'Registered Users',
                    data: data,
                    backgroundColor: bgColors,
                    borderColor: bdColors,
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

export default AdminOrgMain;