function budgetController() {
}
budgetController.init = function () {

    budgetController.getEnergyBudgetList();
    budgetController.getMonthEnergyRealAndBudget();
}
budgetController.getEnergyBudgetList = function () { //预算列表
    var energyBudgetList = [{
        "budgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        "budgetItemName": "总能耗",                //类型：String  必有字段  备注：预算管理节点名称
        isBudgetUpdated: true,
        "newBudgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        "newBudgetItemName": "总能耗33",                //类型：String  必有字段  备注：预算管理节点名称
        "planDate": "2017-12-01 00:00:00",                //类型：String  必有字段  备注：计划月
        "energyDataBudget": 26952,                //类型：Number  必有字段  备注：能耗预算
        "energyDataBudgetPerSquare": 80,                //类型：Number  必有字段  备注：预算单平米能耗
        "remark": "地方的发送到发送到",                //类型：String  必有字段  备注：批注信息
        "ifHasPlan": true,                //类型：Boolean  必有字段  备注：是否拥有计划
        "energyDataReal": 3265,                //类型：Number  必有字段  备注：实际发生能耗
        "realOccupyBudgetRatio": 25,                //类型：Number  必有字段  备注：实际能耗占预算比
        "state": 1,             //类型：Number  必有字段  备注：状态 0-冻结 1-未冻结}
        "ifHasBudget": true,
    }, {
        "budgetItemId": "VOEi1101010002898",                //类型：String  必有字段  备注：预算管理节点
        "budgetItemName": "总能耗dfds",                //类型：String  必有字段  备注：预算管理节点名称
        "planDate": "2018-01-01 00:00:00",                //类型：String  必有字段  备注：计划月
        "energyDataBudget": 310000,                //类型：Number  必有字段  备注：能耗预算
        "energyDataBudgetPerSquare": 92,                //类型：Number  必有字段  备注：预算单平米能耗
        "remark": "挂号费和费个很反感和",                //类型：String  必有字段  备注：批注信息
        "ifHasPlan": true,                //类型：Boolean  必有字段  备注：是否拥有计划
        "energyDataReal": 768,                //类型：Number  必有字段  备注：实际发生能耗
        "realOccupyBudgetRatio": 102,                //类型：Number  必有字段  备注：实际能耗占预算比
        "state": 1,             //类型：Number  必有字段  备注：状态 0-冻结 1-未冻结}
        isBudgetUpdated: false,//是否更新了
        "newBudgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        "newBudgetItemName": "总能耗gfd",                //类型：String  必有字段  备注：预算管理节点名称
        "ifHasBudget": true,
    }, {
        "budgetItemId": "VOEi11010100056456",                //类型：String  必有字段  备注：预算管理节点
        "budgetItemName": "总能耗",                //类型：String  必有字段  备注：预算管理节点名称
        "planDate": "2018-02-01 00:00:00",                //类型：String  必有字段  备注：计划月
        "energyDataBudget": 310000,                //类型：Number  必有字段  备注：能耗预算
        "energyDataBudgetPerSquare": 8,                //类型：Number  必有字段  备注：预算单平米能耗
        "remark": "的发送到发送到发光飞碟个",                //类型：String  必有字段  备注：批注信息
        "ifHasPlan": false,                //类型：Boolean  必有字段  备注：是否拥有计划
        "energyDataReal": null,                //类型：Number  必有字段  备注：实际发生能耗
        "realOccupyBudgetRatio": null,                //类型：Number  必有字段  备注：实际能耗占预算比
        "state": 1,             //类型：Number  必有字段  备注：状态 0-冻结 1-未冻结}
        isBudgetUpdated: true,//是否更新了
        "newBudgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        "newBudgetItemName": "总能耗hgfg",                //类型：String  必有字段  备注：预算管理节点名称
        "ifHasBudget": true,
    }, {
        "budgetItemId": "VOEi11010100056456",                //类型：String  必有字段  备注：预算管理节点
        "budgetItemName": "总能耗",                //类型：String  必有字段  备注：预算管理节点名称
        "planDate": "2018-03-01 00:00:00",                //类型：String  必有字段  备注：计划月
        "energyDataBudget": 310000,                //类型：Number  必有字段  备注：能耗预算
        "energyDataBudgetPerSquare": 8,                //类型：Number  必有字段  备注：预算单平米能耗
        "remark": "的发送到发送到发光飞碟个",                //类型：String  必有字段  备注：批注信息
        "ifHasPlan": true,                //类型：Boolean  必有字段  备注：是否拥有计划
        "energyDataReal": null,                //类型：Number  必有字段  备注：实际发生能耗
        "realOccupyBudgetRatio": null,                //类型：Number  必有字段  备注：实际能耗占预算比
        "state": 1,             //类型：Number  必有字段  备注：状态 0-冻结 1-未冻结}
        isBudgetUpdated: true,//是否更新了
        "newBudgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        "newBudgetItemName": "总能耗hgfg",                //类型：String  必有字段  备注：预算管理节点名称
        "ifHasBudget": true,
    }, {
        "budgetItemId": "VOEi1101010034534",                //类型：String  必有字段  备注：预算管理节点
        "budgetItemName": "总能耗",                //类型：String  必有字段  备注：预算管理节点名称
        "planDate": "2018-04-01 00:00:00",                //类型：String  必有字段  备注：计划月
        "energyDataBudget": null,                //类型：Number  必有字段  备注：能耗预算
        "energyDataBudgetPerSquare": null,                //类型：Number  必有字段  备注：预算单平米能耗
        "remark": "",                //类型：String  必有字段  备注：批注信息
        "ifHasPlan": false,                //类型：Boolean  必有字段  备注：是否拥有计划
        "energyDataReal": null,                //类型：Number  必有字段  备注：实际发生能耗
        "realOccupyBudgetRatio": null,                //类型：Number  必有字段  备注：实际能耗占预算比
        "state": 1,             //类型：Number  必有字段  备注：状态 0-冻结 1-未冻结}
        isBudgetUpdated: true,//是否更新了
        "newBudgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        "newBudgetItemName": "总能耗",                //类型：String  必有字段  备注：预算管理节点名称
        "ifHasBudget": false,
    }];
    energyBudgetList.forEach(function (item) {
        item.planDateStr = new Date(item.planDate).format('yyyy.MM');
        var now = new Date();
        var nowMonth = new Date(now.getFullYear(), now.getMonth(), 1);//本月第一天
        item.isNowMonth = new Date(item.planDate).getTime() == nowMonth.getTime();
        item.isPastMonth = new Date(item.planDate).getTime() < nowMonth.getTime();//历史月份
        item.isNextMonth = new Date(item.planDate).getTime() > nowMonth.getTime();//未来月份
        item.editBudgetShow = false;//是否是编辑状态
        item.changeWarnShow = false;//更新警告显示否
        item.againCreateBudget = false;//是否重新创建预算
        item.historyList = [];
        item.newRemark = '';//需要填写的批注
        item.operate = '';//保存的操作
    });
    v.instance.energyBudgetList = energyBudgetList;
    v.instance.enerBudgetListCopy = JSON.parse(JSON.stringify(energyBudgetList));//备份
    //pajax.post({
    //    url: 'FNPJ_GetEnergyBudgetList',
    //    data: {
    //        "buildingId": "Bd1101010003001",
    //        "timeFrom": "2017-01-01 00:00:00",
    //        "timeTo": "2017-12-01 00:00:00"
    //    },
    //    success: function (res) {
    //        data = res.data || [];
    //        v.instance.energyBudgetList = data;
    //    },
    //    error: function (errObj) {
    //        console.error('FNPJ_GetEnergyBudgetList err');
    //    },
    //    complete: function () {

    //    }
    //});
}

budgetController.saveEditBudget = function (item, opercb) { //保存预算
    // $("#globalloading").pshow();
    if (opercb == 'remark') {
        var params = {
            "buildingId": "Bd1101010003001",                //类型：String  必有字段  备注：建筑id
            "budgetItemId": item.budgetItemId,                //类型：String  必有字段  备注：预算节点id
            "planDate": item.planDate,                //类型：String  必有字段  备注：定额预算设定月份

            "operate": "操作",                //类型：String  可有字段  备注：操作
            "operateUser": "张三",                //类型：String  可有字段  备注：操作类型
            "remark": item.newRemark                //类型：String  可有字段  备注：填写的批注信息
        };
    } else {
        var params = {
            "buildingId": "Bd1101010003001",                //类型：String  必有字段  备注：建筑id
            "budgetItemId": item.againCreateBudget ? item.newBudgetItemId : item.budgetItemId,                //类型：String  必有字段  备注：预算节点id
            "planDate": item.planDate,                //类型：String  必有字段  备注：定额预算设定月份

            "operate": "操作",                //类型：String  可有字段  备注：操作
            "operateUser": "张三",                //类型：String  可有字段  备注：操作类型
            "energyDataBudget": item.energyDataBudget,                //类型：Number  可有字段  备注：能耗预算值
            "energyDataBudgetPerSquare": item.energyDataBudgetPerSquare,                //类型：Number  可有字段  备注：单平米能耗
            "remark": item.newRemark                //类型：String  可有字段  备注：填写的批注信息
        };
    }

    pajax.update({
        url: 'FNPJ_EnergyBudgetManagement',
        data: params,
        success: function (res) {
            if (typeof opercb == "function") {
                opercb();
            }
            // $("#globalnotice").pshow({ text: "保存预算成功！", state: "success" });
        },
        error: function (errObj) {
            //  $("#globalnotice").pshow({ text: "保存预算失败！", state: "failure" });
            console.error('saveEditBudget err');

        },
        complete: function () {
            //   $("#globalloading").phide();
        }
    });
}
budgetController.getBuildingItemArea = function (itemId) { //获取节点面积
    //pajax.post({
    //    url: 'FNPJ_GetBuildingItemArea',
    //    data: {
    //        "buildingId": "Bd1101010003001",                //类型：String  必有字段  备注：建筑id
    //        "itemId": itemId                //类型：String  必有字段  备注：分项id
    //    },
    //    success: function (res) {
    //        data = res.data || {};
    //        v.instance.buildArea = data.area;
    //    },
    //    error: function (errObj) {
    //        console.error('getBuildingItemArea err');

    //    },
    //    complete: function () {

    //    }
    //});
}
budgetController.getEnergyBudgetHistory = function (item) { //保存备注信息
    item.historyList = [{
        "budgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        "planDate": "2017-10-01 00:00:00",                //类型：String  必有字段  备注：预算计划月份
        "energyDataBudget": 67657,                //类型：Number  必有字段  备注：能耗预算值
        "energyDataPerSquare": 8,                //类型：Number  必有字段  备注：单平米能耗
        "operateUser": "张三",                //类型：String  必有字段  备注：操作人
        "operate": "操作",                //类型：String  必有字段  备注：操作
        "remark": "个很返回和房管局",                //类型：String  必有字段  备注：批注信息
        "updateTime": "2018-01-03 18:37:42"                //类型：String  必有字段  备注：更新时间
    }, {
        "budgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        "planDate": "2017-10-01 00:00:00",                //类型：String  必有字段  备注：预算计划月份
        "energyDataBudget": 34543,                //类型：Number  必有字段  备注：能耗预算值
        "energyDataPerSquare": 8,                //类型：Number  必有字段  备注：单平米能耗
        "operateUser": "张三",                //类型：String  必有字段  备注：操作人
        "operate": "操作",                //类型：String  必有字段  备注：操作
        "remark": "地方刚发的丰东股份的",                //类型：String  必有字段  备注：批注信息
        "updateTime": "2018-01-03 18:37:42"                //类型：String  必有字段  备注：更新时间
    }];
    v.instance.selEnergyBudget = JSON.parse(JSON.stringify(item));

    //pajax.post({
    //    url: 'FNPJ_GetEnergyBudgetHistory',
    //    data: {
    //        "buildingId": "Bd1101010003001",                //类型：String  必有字段  备注：建筑id
    //        "budgetItemId": item.budgetItemId,                //类型：String  必有字段  备注：预算管理节点
    //        "planDate": item.planDate               //类型：String  必有字段  备注：预算月份
    //    },
    //    success: function (res) {
    //        data = res.data || [];
    //        item.historyList = data;
    //        v.instance.selEnergyBudget =JSON.parse(JSON.stringify(item));

    //    },
    //    error: function (errObj) {
    //        console.error('getEnergyBudgetHistory err');

    //    },
    //    complete: function () {

    //    }
    //});
}

budgetController.getMonthEnergyRealAndBudget = function () { //保存备注信息
    var dataList = [{                //类型：Object  必有字段  备注：无
        "time": "2017-01-01 00:00:00",                //类型：String  必有字段  备注：无
        "energyDataBudget": 131.01,                //类型：Number  必有字段  备注：无
        "energyDataReal": 123.5                //类型：Number  必有字段  备注：无
    }, {                //类型：Object  必有字段  备注：无
        "time": "2017-02-01 00:00:00",                //类型：String  必有字段  备注：无
        "energyDataBudget": 100,                //类型：Number  必有字段  备注：无
        "energyDataReal": 122               //类型：Number  必有字段  备注：无
    }, {                //类型：Object  必有字段  备注：无
        "time": "2017-03-01 00:00:00",                //类型：String  必有字段  备注：无
        "energyDataBudget": 151,                //类型：Number  必有字段  备注：无
        "energyDataReal": 140              //类型：Number  必有字段  备注：无
    }, {                //类型：Object  必有字段  备注：无
        "time": "2017-04-01 00:00:00",                //类型：String  必有字段  备注：无
        "energyDataBudget": 110,                //类型：Number  必有字段  备注：无
        "energyDataReal": 100               //类型：Number  必有字段  备注：无
    }, {                //类型：Object  必有字段  备注：无
        "time": "2017-05-01 00:00:00",                //类型：String  必有字段  备注：无
        "energyDataBudget": 131.01,                //类型：Number  必有字段  备注：无
        "energyDataReal": 123.5                //类型：Number  必有字段  备注：无
    }, {                //类型：Object  必有字段  备注：无
        "time": "2017-06-01 00:00:00",                //类型：String  必有字段  备注：无
        "energyDataBudget": 103,                //类型：Number  必有字段  备注：无
        "energyDataReal": 112                //类型：Number  必有字段  备注：无
    }, {                //类型：Object  必有字段  备注：无
        "time": "2017-07-01 00:00:00",                //类型：String  必有字段  备注：无
        "energyDataBudget": 141,                //类型：Number  必有字段  备注：无
        "energyDataReal": 112                //类型：Number  必有字段  备注：无
    }, {                //类型：Object  必有字段  备注：无
        "time": "2017-08-01 00:00:00",                //类型：String  必有字段  备注：无
        "energyDataBudget": 121,                //类型：Number  必有字段  备注：无
        "energyDataReal": 116              //类型：Number  必有字段  备注：无
    }, {                //类型：Object  必有字段  备注：无
        "time": "2017-09-01 00:00:00",                //类型：String  必有字段  备注：无
        "energyDataBudget": 131.01,                //类型：Number  必有字段  备注：无
        "energyDataReal": 123.5                //类型：Number  必有字段  备注：无
    },
    ];
    var enerBudgetList = [];
    var enerRealList = [];
    dataList.forEach(function (item) {
        var budgetObj = {
            x: new Date(item.time).getTime(),
            y: item.energyDataBudget,
        };
        var realObj = {
            x: new Date(item.time).getTime(),
            y: item.energyDataReal,
        };
        enerBudgetList.push(budgetObj);
        enerRealList.push(realObj);
    });
    budgetController.historyEnergyChart = columnComparisonChart('historyEnergyChart');
    budgetController.historyEnergyChart.addSeries({
        type: 'column',
        color: '#02a9d1',
        name: '能耗预算',
        data: enerBudgetList,
    });
    budgetController.historyEnergyChart.addSeries({
        type: 'column',
        color: '#C3CDD0',
        name: '实际能耗',
        data: enerRealList,
    });

    //v.instance.budgetRealChart = [];
    //pajax.post({
    //    url: 'FNPJ_GetMonthEnergyRealAndBudget',
    //    data: {
    //        "buildingId": "Bd1101010003001",                //类型：String  必有字段  备注：建筑id

    //    },
    //    success: function (res) {
    //        data = res.data || [];
    //        v.instance.budgetRealChart = data;
    //        var columnDateArr = [{ "x": 1483200000000, "y": 3200, }, { "x": 1485878400000, "y": 3300 }, { "x": 1488297600000, "y": 3100 }, { "x": 1490976000000, "y": 3185 }, { "x": 1493568000000, "y": 3080 }, { "x": 1496246400000, "y": 3111 }, { "x": 1498838400000, "y": 3310 }, { "x": 1501516800000, "y": 3210 }];
    //        var columnDateArr2 = [{ "x": 1483200000000, "y": 3000, }, { "x": 1485878400000, "y": 2300, }, { "x": 1488297600000, "y": 2100 }, { "x": 1490976000000, "y": 3185, "color": "#F89054" }, { "x": 1493568000000, "y": 3280 }, { "x": 1496246400000, "y": 2911 }, { "x": 1498838400000, "y": 3010 }, { "x": 1501516800000, "y": 2880 }];

    //        budgetController.historyEnergyChart = columnComparisonChart('historyEnergyChart');
    //        budgetController.historyEnergyChart.series[0].setData(columnDateArr);
    //        budgetController.historyEnergyChart.series[1].setData(columnDateArr2);
    //    },
    //    error: function (errObj) {
    //        console.error('getMonthEnergyRealAndBudget err');

    //    },
    //    complete: function () {

    //    }
    //});
}


//创建线性图表 buildLineChart
function columnComparisonChart(itemId) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: itemId,
            backgroundColor: "rgba(0,0,0,0)",
            spacingTop: 10,
            spacingRight: 20,
        },
        exporting: {
            enabled: false//导出模块
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false,
        },
        title: {
            text: null
        },
        xAxis: {
            startOnTick: false,//是否强制轴线在标线处开始
            endOnTick: false,//结束于标线；是否强制轴线在标线处结束
            lineWidth: 1, //刻度线整条线的长度
            tickColor: '#ccc',
            tickLength: 6,
            tickmarkPlacement: 'on',
            minorTickLength: 1,
            labels: {
                style: {
                    fontFamily: 'Arial,"微软雅黑",sans-serif'
                },
                formatter: function () {
                    if (this.value == null) return null;
                    var xdate = new Date(this.value);
                    return xdate.format('y.M');
                },
                enabled: true

            },
            type: 'datetime'
            //showFirstLabel: false
        },
        yAxis: [{
            title: {
                text: null
            },
            gridLineColor: '#dddddd',
            gridLineDashStyle: 'ShortDash',//x轴网格线的样式
            gridLineWidth: 1,
            endOnTick: true,
            labels: {
                style: {
                    fontFamily: 'Arial,"微软雅黑",sans-serif'
                }
            }
        }],
        tooltip: {
            enabled: true,
            animation: true,
            borderColor: null,
            borderWidth: 0,
            shadow: false,
            backgroundColor: null,
            useHTML: true,
            shared: true,
            style: {
                fontFamily: 'Arial,"微软雅黑",sans-serif'
            },
            formatter: function () {
                var html = '', name = '', val = '', unit = '', color = '', backstr = '';
                for (var i = 0; i < this.points.length; i++) {
                    name = this.points[i].series.name;
                    val = this.points[i].y;
                    color = this.points[i].color;
                    backstr = ' style="background:' + color + '"';
                    html += '<span><em' + backstr + '></em><b>' + name + '：' + val + 'kWh</b></span>';
                }
                var currDate = new Date(this.x).format('y.M');
                return '<span>' + currDate + '</span>' + html;
            }
        },
        plotOptions: {//绘图区选项
            column: {
                pointPadding: 0,
                //grouping: true
            },
        },
        series: [

        ]
    });
    return chart;
}
function createPieChart(itemId) {
    var chart = new Highcharts.Chart({
        chart: {
            type: 'pie',
            renderTo: itemId,
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                states: {
                    hover: {
                        halo: {
                            size: 0
                        }
                    }
                },
                size: 240,
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                // 图例
                showInLegend: false,
                point: {
                    events: {
                        legendItemClick: function (e) {
                            return false; // 直接 return false 即可禁用图例点击事件
                        }
                    }
                }
            }
        },
        title: {
            text: null
        },
        tooltip: {
            enabled: true,
            formatter: function () {
                var realData = this.y ? this.y.toFixed(1).toLocaleString() : '--';
                return this.key + '<br>' + realData + 'kWh';
            }
        },
        labels: {
            enabled: false
        },
        series: [{}]
    });
    return chart;
}

