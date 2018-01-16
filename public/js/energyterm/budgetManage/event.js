$(function () {
    v.initPage('budget_manage');
    //var columnDateArr = [{ "x": 1483200000000, "y": 3200, }, { "x": 1485878400000, "y": 3300 }, { "x": 1488297600000, "y": 3100 }, { "x": 1490976000000, "y": 3185 }, { "x": 1493568000000, "y": 3080 }, { "x": 1496246400000, "y": 3111 }, { "x": 1498838400000, "y": 3310 }, { "x": 1501516800000, "y": 3210 }];
    //var columnDateArr2 = [{ "x": 1483200000000, "y": 3000, "color": "#02a9d1" }, { "x": 1485878400000, "y": 2300, "color": "#02a9d1" }, { "x": 1488297600000, "y": 2100, "color": "#02a9d1" }, { "x": 1490976000000, "y": 3185, "color": "#F89054" }, { "x": 1493568000000, "y": 3280, "color": "#02a9d1" }, { "x": 1496246400000, "y": 2911, "color": "#02a9d1" }, { "x": 1498838400000, "y": 3010, "color": "#02a9d1" }, { "x": 1501516800000, "y": 2880, "color": "#02a9d1" }];

    //budgetController.historyEnergyChart = columnComparisonChart('historyEnergyChart');
    //budgetController.historyEnergyChart.series[0].setData(columnDateArr);
    //budgetController.historyEnergyChart.series[1].setData(columnDateArr2);

    //budgetController.itemDayChart = columnComparisonChart('itemDayChart');
    //budgetController.itemDayChart.series[0].setData(columnDateArr);

    //var pieDataArr = [{ name: 'IE', y: 56.33, color: 'red' }, { name: 'Chrome', y: 24.03, color: 'red' }, { name: 'Firefox', y: 10.38, color: 'red' }, { name: 'Safari', y: 4.77 }, { name: 'Opera', y: 0.91 }, { name: 'Other', y: 0.2 }];
    //budgetController.dayItemChart = createPieChart('dayItemChart');
    //budgetController.dayItemChart.series[0].setData(pieDataArr);
    //$("#modifyRecordFloat").pshow();
    //$("#dayItemPlan").pshow();
    //$("#setPlanWindow").pshow();


});
var dataArr = [{ name: "按分项拆分" }, { name: "按日期拆分" }];
function showChangeWarn(event) {
    var $this = $(event.currentTarget);
    var $budgetPop = $this.siblings(".budgetPop");
    if ($budgetPop.is(":visible")) {
        $budgetPop.hide();
    } else {
        $budgetPop.show();
    }
}
function hideChangeWarn(event) {//隐藏更新提示框
    var $this = $(event.currentTarget);
    var $budgetPop = $this.parents(".budgetPop");
    $budgetPop.hide();
}
function saveSureShow(event) {//弹出保存预算确认 
    var $this = $(event.currentTarget);
    var $buttonBox = $this.parents(".editButton");
    $buttonBox.find(".saveSurePop").show();
}
function cancelSaveSure(event) {//保存预算确认 取消
    var $this = $(event.currentTarget);
    var $saveSurePop = $this.parents(".saveSurePop");
    $saveSurePop.hide();
}