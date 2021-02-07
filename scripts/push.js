const { utilization, info } = require("./components/cpu");
const { memInfo } = require("./components/memory");

module.exports = (app) => {
    utilization(app);
    info(app);
    memInfo(app);
}