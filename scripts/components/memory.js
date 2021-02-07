const os = require("os");

let toGb = (num) => {
    return parseFloat(num / 1073741824);
}

exports.memInfo = (win) => {
    setInterval(() => {
        let data = {
            total: toGb(os.totalmem()),
            free: toGb(os.freemem()),
            using: toGb(os.totalmem() - os.freemem())
        }
        console.log(data)
        win.webContents.send('memory-usage', data);
    }, 1000)
}