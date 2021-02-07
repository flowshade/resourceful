const osUtils = require("os-utils");
const os = require("os");

function convertToPercentage(dec) {
    return dec.toFixed(2) * 100;
}

let toGHz = (num) => {
    return (num * 0.001) + " GHz";
}

exports.utilization = (win) => {
    setInterval(() => {
        osUtils.cpuUsage((result) => {
            console.log(convertToPercentage(result));
            win.webContents.send('cpu-utilization', convertToPercentage(result));
        })
    }, 1000);
}
let getCpuInfo = () => {
    let cpus = os.cpus();
    let data = {
        model: cpus[0].model,
        speed: toGHz(cpus[0].speed)
    }
    return data;
}

exports.info = (win) => {
    win.webContents.send('cpu-info', getCpuInfo());
    setInterval(() => {
        win.webContents.send('cpu-info', getCpuInfo());
    }, 5000)
}