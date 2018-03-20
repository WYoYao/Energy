function createRoute(app, isLogin) {
    var path = require('path');
    var fileOper = require('./attachmentOper');
    var realRestClient = _config.isMiddle == true ? require('./middleRestClient') : require('./executeRequest');
    var customRestClient = require('./request');
    var responseTool = require('./responseTool');

    //解决eot、woff、ttf、svg跨域不能访问的问题
    app.all(/.+\.(eot|woff|ttf|svg)/g, function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    app.get('/', function (req, res, next) {
        if (isLogin == true) {
            if (req.session.puser)
                responseTool.renderMain(res, req.session.puser);
            else responseTool.renderLogin(res);
        } else {
            /*根据用户id获取用户信息*/
            var userId = req.query.uid || '';
            var persagyCloudUrl = psecret.parser(req.query.pul);
            if (!userId || !persagyCloudUrl) return noAccess();
            customRestClient.sendGet({
                url: persagyCloudUrl,
                isParserResult: false,
                isParserCriteria: false,
                criteria: { id: userId },
                fn: 'getuserbyid',
                call: function (err, result) {
                    var objResult = result ? JSON.parse(result) : {};
                    if (!objResult.id) return noAccess();
                    res.cookie(pconst.puser, psecret.create(result));
                    responseTool.renderMain(res, objResult);
                }
            });
        }

        function noAccess() {
            responseTool.sendDecline(res, '无权访问');
        };
    });

    if (isLogin == true) {
        app.all('*', function (req, res, next) {
            var reqUrl = req.url;
            if (reqUrl.indexOf(pconst.requestNoValidUrl) > -1 || reqUrl.indexOf('.') > -1 || reqUrl.indexOf(pconst.requestType.plogin) > -1)
                return next();
            if (req.session && req.session.puser) {
                req.session._garbage = Date();
                req.session.touch();
                return next();
            }
            responseTool.redirectMain();
        });
    }
    if (typeof pconst != 'undefined') {
        /*导航点击时验证session*/
        app.get('/' + pconst.requestType.pvalidse, function (req, res) {
            if (isLogin === true) {
                if (req.session && req.session.puser)
                    return res.send(200);
                return responseTool.sendRedirect(res, '/');
            }
            res.send(200);
        });

        /*文件上传，只是临时保存在网站应用程序服务器上*/
        app.post('/' + pconst.requestType.pupload, function (req, res, next) {
            function errSend(err) {
                console.error('文件上传错误：' + (err.stack || JSON.stringify(err)));
                return responseTool.sendServerException(res);
            }
            if (req.files) {
                var proArr = Object.getOwnPropertyNames(req.files || {});
                var file = req.files[proArr[0]];

                var filePath = file.path;
                var fileName = file.name || '';
                var name = fileName.substring(0, fileName.lastIndexOf('.'));
                var suffix = fileName.substring(fileName.lastIndexOf('.') + 1);

                var tempName = path.basename(filePath);
                var showUrl = '/' + fileOper.tempDirName + '/' + tempName;
                responseTool.sendSuccess(res, { showUrl: showUrl, name: name, suffix: suffix, result: 1 });
            }
            else {
                errSend('文件丢失');
            }
        });

        /*附件下载，参数
        *id 必须，附件对应的资源ID
        */
        app.get('/' + pconst.requestType.pdownload + '/:id', function (req, res, next) {
            var id = psecret.parser(req.params.id);
            if (!id) return responseTool.sendDecline(res, '文件标识符不正确');
            req.query = {
                data: { id: id },
                fn: pconst.requestType.pdownload,
                _ptype: pconst.requestType.pdownload
            };
            parseRequest(req, res, next, realRestClient.requestTypes.down);
        });

        /*根据不同参数来进行附件下载
        */
        app.post('/' + pconst.requestType.pdownloadByParam, function (req, res, next) {
            var paramStr = psecret.parser(req.body.data);
            if (!paramStr) return responseTool.sendDecline(res, '参数不正确');
            var paramObj = JSON.parse(paramStr);
            var fn = paramObj.url;
            delete paramObj.url;

            if (_config.isMiddle === true) {
                req.query = {
                    data: paramObj,
                    fn: fn,
                    _ptype: pconst.requestType.pdownloadByParam
                };
                parseRequest(req, res, next, realRestClient.requestTypes.down);
                return;
            }

            realRestClient.sendPost({
                fn: fn,
                isParserResult: true,
                isToDataMap: false,
                isParserCriteria: true,
                criteria: paramObj,
                call: function (err, result) {
                    if (err) return responseTool.sendServerException(res);
                    result = (result || [])[0] || {};
                    if (!result.id) return responseTool.sendServerException(res, '无效的文件标识符');
                    var secretId = psecret.create(result.id);
                    res.redirect('/' + pconst.requestType.pdownload + '/' + secretId);
                }
            });
        });

        /*登录*/
        app.post('/' + pconst.requestType.plogin, function (req, res, next) {
            req.body = {
                data: { name: req.body.name, pass: req.body.pass },
                fn: pconst.requestType.plogin,
                _ptype: pconst.requestType.plogin
            };
            parseRequest(req, res, next, realRestClient.requestTypes.post);
        });

        /*注销*/
        app.get('/' + pconst.requestType.ploginOut, function (req, res, next) {
            req.session.puser = null;
            req.session.destroy();
            responseTool.redirectMain(res);
        });

        /*get请求*/
        app.get(pconst.requestUrl, function (req, res, next) {
            parseRequest(req, res, next, realRestClient.requestTypes.get);
        });

        /*post请求*/
        app.post(pconst.requestUrl, function (req, res, next) {
            parseRequest(req, res, next, realRestClient.requestTypes.post);
        });

        /*get请求*/
        app.get(pconst.requestNoValidUrl, function (req, res, next) {
            parseRequest(req, res, next, realRestClient.requestTypes.get);
        });

        /*post请求*/
        app.post(pconst.requestNoValidUrl, function (req, res, next) {
            parseRequest(req, res, next, realRestClient.requestTypes.post);
        });

    }
    //请求中转
    function parseRequest(req, res, next, requestType) {
        var restClient = realRestClient;
        var requestParamFather = requestType == realRestClient.requestTypes.get || requestType == realRestClient.requestTypes.down ? 'query' : 'body';
        var objParam = req[requestParamFather];
        var ptype = objParam._ptype;
        var ptypeFn = restClient[ptype];
        if (typeof ptypeFn == 'function') return restClient[ptype](req, res, next, requestType, objParam);
        responseTool.sendDecline(res, '无效的请求');
    };
};

module.exports = createRoute;