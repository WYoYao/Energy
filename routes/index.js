/*路由*/
module.exports = function (app) {
    var controller = require('../controller/controller');

    //app.get('/homePage', controller.homeRender());//首页

    // 中心版
    app.get('/energycenter', controller.energycenter());

    // 项目版
    app.get('/energyterm', controller.energyterm());
};
