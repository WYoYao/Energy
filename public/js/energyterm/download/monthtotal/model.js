$(function () {
    //  转换成为地方特色的数字单位
    function toThousands(num) {

        if (!_.isNumber(num)) return 0;

        if (_.isNaN(num)) return 0;

        if (!num) return 0;

        num = num.toFixed(1);
        // 转换为数字
        num = +num;
        if (Object.prototype.toString.call(num).slice(8, -1) != 'Number') throw new TypeError('arguments must be Number');

        // 转换为字符
        num = num.toString();

        // 正常函数直接返回本地的方法
        if (!/\./.test(num)) return (+num).toLocaleString();

        // 小数点分割
        num = num.split(/\./);
        return (+num[0]).toLocaleString() + '.' + num[1];
    }

    /**
     * 依次执行多个会返回Promise的方法,并行执行
     * @param {一个数组 数组里面每一项都是一个方法,每个方法可以返回一个Promise 对象 } arr 
     */
    function PromiseConcurrent(arr) {

        var result = [];

        return new Promise(function (resolve) {

            // 全部执行发送请求
            arr.map(function (item) {

                return item();
            }).reduce(function (a, b, i) {

                return function () {

                    b.then(function (one) {

                        result.push(one);

                        return new Promise(function (re) {

                            re(i == 0 ? result.reverse() : one)
                        })

                    }).then(a)
                }
            }, resolve)();
        })
    }

    // 去掉这里的注释就是类似 Apple Watch 上的效果了
    if (!Highcharts.theme) {
        Highcharts.setOptions({
            chart: {
                backgroundColor: '#FFFFFF'
            },
            colors: ['#02A9D1'],
            title: {
                style: {
                    color: 'silver'
                }
            }
        });
    }

    // 生成饼状图
    /**
     * 创建表盘DOM 需要创建的实例
     * @param {*} el 挂在的DOM
     * @param {*} color 当前项的颜色 
     * @param {*} backgroundColor 整个表盘框的颜色 
     * @param {*} startAngle   开始的坐标
     * @param {*} endAngle  结束的坐标
     */
    function Solidgauge(el, color, backgroundColor, start, end, func) {



        start = start * 2.5 + 260;

        end = end * 2.5 + 260;

        backgroundColor = backgroundColor || '#FFFFFF';

        return {
            chart: {
                type: 'solidgauge',
                marginTop: 50,
                renderTo: el,
                backgroundColor: 'rgba(0,0,0,0)'
            },
            // 去版权
            credits: {
                enabled: false,
            },
            // 标题为空
            title: {
                text: '',
            },
            // 去下载信息
            exporting: {
                enabled: false,
            },
            // 去掉悬停提示框
            tooltip: {
                enabled: false
            },
            pane: {
                startAngle: start,
                endAngle: end,
                background: [{ // Track for Move
                    outerRadius: '112%',
                    innerRadius: '88%',
                    backgroundColor: backgroundColor,
                    borderWidth: 0
                }]
            },
            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },
            plotOptions: {
                solidgauge: {
                    borderWidth: '10px',
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false
                }
            },
            series: [{
                name: '　',
                // borderColor: Highcharts.getOptions().colors[1],
                borderColor: color,
                data: [{
                    color: Highcharts.getOptions().colors[0],
                    // color:'yellow',
                    radius: '100%',
                    innerRadius: '100%',
                    y: 80
                }]
            }]
        }
    }

    var app = new Vue({
        el: "#monthtotal",
        data: {
            //  前台传入的参数 Start
            buildingName: query.buildingName,
            buildingId: query.buildingId,
            timeFrom: query.timeFrom,
            timeTo: query.timeTo,

            //  前台传入的参数 End

            // 日能耗分析
            // DayEnergyDataInfo: {},

            // 能耗预算描述
            MonthEnergyDataInfo: {},

            // 逐日能耗统计 和 分项能耗统计
            EnergyDataForDayAndItem: {},
        },
        methods: {
            // 排序
            sort: function (arr, key) {

                if (_.isArray(arr)) {
                    var arr = JSON.parse(JSON.stringify(arr));

                    return arr.sort(function (item) {
                        return item[key];
                    })
                } else {
                    return [];
                }
            },
            init: function () {

                var _that = this;

                // 获取能耗预算概述
                var cooky = monthtotal_controller.FNCT_GetMonthEnergyDataInfo({
                    buildingId: _that.buildingId,
                    timeFrom: _that.timeFrom,
                    isDownload: false
                }).then(function (res) {

                    _that.MonthEnergyDataInfo = _.isArray(res) && res.length && res[0] || {};

                    //===============================  生成饼状图Start   =========================================

                    var num = _that.$options.filters['convertPercentage'](_that.MonthEnergyDataInfo.energyOccupyPlanRatio);
                    // num = num / 150 * 100;

                    return PromiseConcurrent([function () {

                        return new Promise(function (resolve) {

                            var a = new Highcharts.chart(new Solidgauge('parent', '#F0F3F6', '#FFFFFF', 0, 100), resolve)
                        })
                    }, function () {

                        return new Promise(function (resolve) {

                            var start, end;
                            if (num > 50) {
                                start = 40;
                                end = num - 10;
                            } else {
                                start = num;
                                end = 50;
                            }

                            var b = new Highcharts.chart(new Solidgauge('child', '#02A9D1', 'rgba(0,0,0,0)', start, end), resolve);
                        })
                    }])


                });

                // 逐日能耗统计 和 分项能耗统计
                var table = monthtotal_controller.FNCT_GetEnergyDataForDayAndItem({
                    buildingId: _that.buildingId,
                    timeFrom: _that.timeFrom,
                    timeTo: _that.timeTo,
                }).then(function (res) {

                    _that.EnergyDataForDayAndItem = _.isArray(res) && res.length && res[0] || {};

                    // ==============================  生成柱状图 Start =========================================
                    return new Promise(function (resolve) {

                        Highcharts.chart("tio", {
                            "chart": {
                                "type": "column",
                                "zoomType": "xy",
                                "plotBackgroundColor": "#F8F8F8"
                            },
                            "title": {
                                "text": ""
                            },
                            "xAxis": {
                                "categories": _that.EnergyDataForDayAndItem.day.map(function (item) { return new Date(item.time).format('MM.dd') }),
                                "visible": true

                            },
                            "yAxis": [
                                {
                                    "title": { "text": "" },
                                    "gridLineWidth": 0,
                                    "gridLineDashStyle": "Dash"
                                }, {
                                    "title": { "text": "" },
                                    "gridLineWidth": 0, "labels": {}, "min": 0, "opposite": true
                                }],
                            "legend": { "enabled": false },
                            "tooltip": {
                                enabled: false,
                            },
                            "labels": {},
                            "plotOptions": {
                                "column": {
                                    "grouping": false, "shadow": false, "borderWidth": 0
                                }
                            }, "series": [
                                {
                                    "name": "计划能耗",
                                    "type": "column",
                                    "id": "energyBudget",
                                    "keys": ["y", "color", "id"],
                                    // "data": _.range(30).map((item, index) => {
                                    //     return {
                                    //         id: index,
                                    //         y: (index + _.random(1, 30)) * 100,
                                    //         color: '#C3CDD0',
                                    //     }
                                    // }),
                                    "data": _that.EnergyDataForDayAndItem.day.map(function (item, index) {
                                        return {
                                            id: index,
                                            y: item.planData ? item.planData : 0,
                                            color: '#C3CDD0',
                                        }
                                    }),
                                    "color": "#C3CDD0",
                                    "pointPadding": 0.2,
                                    "pointPlacement": -0.18,
                                    "tooltip": { "valueSuffix": " kWh" },
                                    "events": {},
                                    "yAxis": 0
                                }, {
                                    "name": "实际能耗",
                                    "type": "column",
                                    "id": "energyReal",
                                    "keys": ["y", "color", "id"],
                                    // "data": _.range(30).map((item, index) => {
                                    //     return {
                                    //         id: index,
                                    //         y: (index + _.random(1, 30)) * 100,
                                    //         color: index % 2 ? '#02A9D1' : '#F89054',
                                    //     }
                                    // }),
                                    "data": _that.EnergyDataForDayAndItem.day.map(function (item, index) {
                                        return {
                                            id: index,
                                            y: item.energyData ? +item.energyData.toFixed(2) : 0,
                                            color: item.planData ? (item.energyData > item.planData ? '#FABB97' : '#02A9D1') : '#02A9D1',
                                        }
                                    }),
                                    "color": "#02A9D1",
                                    "pointPadding": 0.2,
                                    "pointPlacement": 0.18,
                                    "tooltip": { "valueSuffix": " kWh" },
                                    "events": {},
                                    "yAxis": 0
                                }
                            ],
                            "credits": { "enabled": false },
                            "annotations": [{ "labels": [], "labelOptions": {} }],
                            "exporting": { "enabled": false }
                        }, resolve)
                    })

                    // ==============================  生成柱状图 End   =========================================

                });

                return PromiseConcurrent([function () {
                    return cooky;
                }, function () {
                    return table;
                }])

            },
            convertPercentageFn: function (num) {
                if (!_.isNumber(num)) return 0;
                return (num * Math.pow(10, 2)).toFixed(2);
            },
            src: function (path) {

                return window.location.origin + path;
            },
            width: function (energyData, monthEnergyPlan) {
                return { width: ((energyData / monthEnergyPlan) * 100) + 'px' };
            },
        },
        computed: {
            eDate: function () {

                var date = new Date(this.timeFrom);

                return {
                    y: date.format('yyyy'),
                    m: date.format('MM'),
                    d: date.format('dd'),
                }
            },
            rotated: function () {

                var _that = this;

                // 本分比数值
                var route = _that.convertPercentageFn(_that.MonthEnergyDataInfo.energyOccupyPlanRatio);

                route = Math.floor(route * 1.03) - 148;

                return {
                    transform: 'rotate(' + route + 'deg)'
                };
            }
        },
        watch: {

        },
        filters: {
            //转换成为百分比的内容
            convertPercentage: function (num) {
                if (!_.isNumber(num)) return 0;
                return (num * Math.pow(10, 2)).toFixed(2);
            },
            // 千分位加点
            toThousands: function (num) {

                if (!_.isNumber(num)) return 0;

                if (_.isNaN(num)) return 0;

                if (!num) return 0;

                num = num.toFixed(1);
                // 转换为数字
                num = +num;
                if (Object.prototype.toString.call(num).slice(8, -1) != 'Number') throw new TypeError('arguments must be Number');

                // 转换为字符
                num = num.toString();

                // 正常函数直接返回本地的方法
                if (!/\./.test(num)) return (+num).toLocaleString();

                // 小数点分割
                num = num.split(/\./);

                return (+num[0]).toLocaleString() + '.' + num[1];
            }
        }
    });

    app.init().then(function () {

        setTimeout(function () {

            var arr = createHtml('#monthtotal')

            pajax.post({
                url: '/FNPJ_GetReportResource',
                data: {
                    "htmlDOM": arr,                //类型：String  必有字段  备注：报告页面html dom源码
                    "fileName": app.buildingName + '建筑' + app.eDate.y + '年' + app.eDate.m + '月能耗分析报告'                 //类型：String  必有字段  备注：pdf文件名
                },
                success: function (res) { pajax.download(res[0]) },
                // error: err,
                // complete: complete
            })

        }, 1000);
    });

    window.app = app;

    //  下载


    /**
     * 
     * @param {* DOM内容的父级} el 
     * @param {* 引用静态地址的链接} el 
     */
    window.createHtml = function createHtml(body, link) {

        body = body || document.body;
        link = link || document;
        var origin = window.location.origin;

        var bodyHtml = $(body).prop("outerHTML") || '',
            linkHtml = Array.prototype.slice.call(link ? $(link).find("link") : $("link")).reduce(function (con, item) {

                con += /http/.test(item.outerHTML) ? item.outerHTML : (item.outerHTML.replace(/href\=\"/, 'href="' + origin));
                return con;
            }, '');

        return "<!DOCTYPE html>\n    <html lang=\"en\">\n    \n    <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n        <title>Document</title>\n        " + linkHtml + "\n    </head>\n    \n    <body>\n    " + bodyHtml + "\n    </body>\n    \n    </html>";

    }



});