const electron = require('electron');
const server = electron.ipcRenderer;

let makeLabels = (end) => {
    let labels = [];
    for (let i = end; i >= 0; i--) {
        labels.push(i);
    }
    return labels;
}

let createChart = (id, type, data, options) => {
    let ctx = document.querySelector(id).getContext('2d');

    let chart = new Chart(ctx, {
        type: type,
        data: data,
        options: options
    })

    return chart;
}

let updateChart = (chart, data) => {
    if (chart.data.datasets[0].data.length >= 61) {
        chart.data.datasets[0].data.shift();
    }
    chart.data.datasets[0].data.push(data);
    chart.update();
}
