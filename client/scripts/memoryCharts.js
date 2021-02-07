let memOptions = {
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

let memData = {
    labels: makeLabels(60),
    datasets: [{
        label: 'Memory',
        backgroundColor: 'rgba(13, 109, 253, 0.5)',
        borderColor: '#0d6dfd',
        fill: true,
        lineTension: 0.37377,
        data: []
    }]
}

let memPieData = {
    labels: ["Free (GB)", "In Use (GB)"],
    datasets: [{
        borderColor: '#0d6dfd',
        backgroundColor: [
            "#0d6dfd",
            "rgba(13, 109, 253, 0.5)"
        ],
        data: []
    }]
}

let memPieChart = createChart('#memory-pie', 'pie', memPieData, 
{
    title: {
        display: true,
        text: 'Memory Usage'
    }
});

memPieChart.data.datasets[0].data.length = 2;
memPieChart.data.datasets[0].data.fill(null);
memPieChart.update();


let memChart = createChart('#memory-chart', 'line', memData, memOptions);

memChart.data.datasets[0].data.length = 60;
memChart.data.datasets[0].data.fill(null);
memChart.update();

server.on('memory-usage', (event, data) => {
    console.log(data);
    updateChart(memChart, data.using);
    memPieChart.data.datasets[0].data[0] = data.free.toFixed(2);
    memPieChart.data.datasets[0].data[1] = data.using.toFixed(2);
})