function budgetController() {
}
budgetController.init = function () {

    budgetController.getEnergyBudgetList();
}
budgetController.getEnergyBudgetList = function () { //预算列表
    var energyBudgetList = [{
        "budgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        "budgetItemName": "总能耗",                //类型：String  必有字段  备注：预算管理节点名称
        isBudgetUpdated: true,
        "newBudgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        "newBudgetItemName": "总能耗33",                //类型：String  必有字段  备注：预算管理节点名称
        "planDate": "2018-01-01 00:00:00",                //类型：String  必有字段  备注：计划月
        "energyDataBudget": 26952,                //类型：Number  必有字段  备注：能耗预算
        "energyDataBudgetPerSquare": 80,                //类型：Number  必有字段  备注：预算单平米能耗
        "remark": "地方的发送到发送到",                //类型：String  必有字段  备注：批注信息
        "ifHasPlan": false,                //类型：Boolean  必有字段  备注：是否拥有计划
        "energyDataReal": 3265,                //类型：Number  必有字段  备注：实际发生能耗
        "realOccupyBudgetRatio": 25,                //类型：Number  必有字段  备注：实际能耗占预算比
        "state": 1,             //类型：Number  必有字段  备注：状态 0-冻结 1-未冻结}
        "ifHasBudget": true,
    }, {
        "budgetItemId": "VOEi1101010002898",                //类型：String  必有字段  备注：预算管理节点
        "budgetItemName": "总能耗dfds",                //类型：String  必有字段  备注：预算管理节点名称
        "planDate": "2017-01-01 00:00:00",                //类型：String  必有字段  备注：计划月
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
        "planDate": "2018-01-01 00:00:00",                //类型：String  必有字段  备注：计划月
        "energyDataBudget": 310000,                //类型：Number  必有字段  备注：能耗预算
        "energyDataBudgetPerSquare": 8,                //类型：Number  必有字段  备注：预算单平米能耗
        "remark": "的发送到发送到发光飞碟个",                //类型：String  必有字段  备注：批注信息
        "ifHasPlan": false,                //类型：Boolean  必有字段  备注：是否拥有计划
        "energyDataReal": null,                //类型：Number  必有字段  备注：实际发生能耗
        "realOccupyBudgetRatio": null,                //类型：Number  必有字段  备注：实际能耗占预算比
        "state": 0,             //类型：Number  必有字段  备注：状态 0-冻结 1-未冻结}
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
        item.editBudgetShow = false;//是否是编辑状态
        item.changeWarnShow = false;//更新警告状态

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

//
spaceInfoController.saveEditBudget = function () { //添加楼层信息
    $("#globalloading").pshow();
    pajax.update({
        url: 'FNPJ_EnergyBudgetManagement',
        data: {
            "buildingId": "Bd1101010003001",                //类型：String  必有字段  备注：建筑id
            "budgetItemId": "VOEi11010100020008",                //类型：String  必有字段  备注：预算节点id
            "planDate": "2017-10-01 00:00:00",                //类型：String  必有字段  备注：定额预算设定月份
            "energyDataBudget": 310000,                //类型：Number  可有字段  备注：能耗预算值
            "energyDataBudgetPerSquare": 80,                //类型：Number  可有字段  备注：单平米能耗
            "operate": "操作",                //类型：String  可有字段  备注：操作
            "operateUser": "张三",                //类型：String  可有字段  备注：操作类型
            "state": 0,                //类型：Number  可有字段  备注：状态 0-冻结 1-未冻结
            "remark": "填写的批注信息"                //类型：String  可有字段  备注：填写的批注信息
        },
        success: function (res) {

            $("#globalnotice").pshow({ text: "添加楼层成功！", state: "success" });
        },
        error: function (errObj) {
            $("#globalnotice").pshow({ text: "添加楼层失败！", state: "failure" });
            console.error('addFloor err');
        },
        complete: function () {
            $("#globalloading").phide();
        }
    });
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
            {
                type: 'column',
                color: '#C3CDD0',
                name: '实际能耗'
            }, {
                type: 'column',
                color: '#02A9D1',
                name: '能耗预算'
            }
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

