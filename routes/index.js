/*路由*/
module.exports = function (app) {
    var controller = require('../controller/controller');

    //app.get('/homePage', controller.homeRender());//首页

    // 中心版
    app.get('/energycenter', controller.energycenter());

    // 项目版
    app.get('/energyterm', controller.energyterm());

    // 查看计划
    app.get('/lookplan', controller.lookPlan());

    // 下载日分项
    app.get('/dayterm', controller.dayterm());
    // 下载日总
    app.get('/daytotal', controller.daytotal());
    //  下载月总
    app.get('/monthtotal', controller.monthtotal());
};
