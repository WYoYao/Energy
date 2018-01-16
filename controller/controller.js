/*路由控制的实现*/
function controller() {
};
module.exports = new controller();

//能耗综合排名  广场排名
controller.prototype.helloWorld = function () {
    var _this = this;
    return function (req, res) {
        res.render('energyRanking/squareRanking', {
            host: commonLibUrl
            , user: req.session.puser, powerUser: req.session.powerUser
        });
    };
};

// 能耗中心版
controller.prototype.energycenter = function () {

    var _that = this;

    return function (req, res) {

        res.render('energycenter/index', {
            host: commonLibUrl,
        })
    }
}

// 能耗项目版
controller.prototype.energyterm = function () {

    var _that = this;

    return function (req, res) {

        res.render('energyterm/nodeManage/index', {
            host: commonLibUrl,
        })
    }
}