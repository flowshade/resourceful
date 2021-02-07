// const electron = require('electron');
// const server = electron.ipcRenderer;
// const remote = require("electron").remote
// const { makeLabels, createChart, updateChart } = remote.require("./functions");

// Set the options and the data
let options = {
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

let data = {
    labels: makeLabels(60),
    datasets: [{
        label: 'CPU',
        backgroundColor: 'rgba(13, 109, 253, 0.5)',
        borderColor: '#0d6dfd',
        fill: true,
        lineTension: 0.37377,
        data: []
    }]
}

// Create the chart
let chart = createChart('#linechart', 'line', data, options);

// Make chart come in from right
chart.data.datasets[0].data.length = 60;
chart.data.datasets[0].data.fill(null);
chart.update();

// Update CPU info
server.on('cpu-utilization', (event, data) => {
    updateChart(chart, data);
    $(".cpu-utilization-percent").text(Math.ceil(data) + "%");
})

server.on('cpu-info', (event, data) => {
    $(".cpu-info").text(data.model);
    $(".cpu-speed").text(data.speed);
})

// server.on('cpu-info', (event, data) => {
//     console.log(data);
// })