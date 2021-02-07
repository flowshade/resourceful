const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

function getLabels() {
    let labels = [];
    for (let i = 60; i >= 0; i--) {
        labels.push(i);
    }
    return labels;
}

var ctx = document.getElementById('linechart').getContext('2d');

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: getLabels(),
        datasets: [{
            label: 'CPU',
            backgroundColor: '#0d6dfd',
            borderColor: '#0d6dfd',
            fill: true,
            lineTension: 0.3,
            data: []
        }]
    },
    options: {
        legend: {
            display: false
        },
        elements: {
            point:{
                radius: 0
            }
        },
        animation: {
            duration: 0
        }
    }
});

chart.data.datasets[0].data.length = 60;
chart.data.datasets[0].data.fill(null);
chart.update();

function updateChart(cpuUtilization) {
    if (chart.data.datasets[0].data.length >= 61) {
        chart.data.datasets[0].data.shift();
    }
    chart.data.datasets[0].data.push(cpuUtilization);
    chart.update();
}

ipcRenderer.on('cpu-utilization',(event, data) => {
    updateChart(data);
});