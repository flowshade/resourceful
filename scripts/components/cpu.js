const os = require("os-utils");

function convertToPercentage(dec) {
    return dec.toFixed(2) * 100;
}

exports.cpuUtilization = (win) => {
    setInterval(() => {
        os.cpuUsage((result) => {
            console.log(convertToPercentage(result));
            win.webContents.send('cpu-utilization', convertToPercentage(result));
        })
        
    }, 1000);
}