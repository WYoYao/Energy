$(function () {
    v.initPage('budget_manage');


    //budgetController.itemDayChart = columnComparisonChart('itemDayChart');
    //budgetController.itemDayChart.series[0].setData(columnDateArr);

    //var pieDataArr = [{ name: 'IE', y: 56.33, color: 'red' }, { name: 'Chrome', y: 24.03, color: 'red' }, { name: 'Firefox', y: 10.38, color: 'red' }, { name: 'Safari', y: 4.77 }, { name: 'Opera', y: 0.91 }, { name: 'Other', y: 0.2 }];
    //budgetController.dayItemChart = createPieChart('dayItemChart');
    //budgetController.dayItemChart.series[0].setData(pieDataArr);
    //$("#modifyRecordFloat").pshow();
    //$("#dayItemPlan").pshow();
    //$("#setPlanWindow").pshow();

    $(document).on('click', function () {

        $("#monthBudgets .budgetPop").css({ 'display': 'none' });
    });
});
var dataArr = [{ name: "按分项拆分" }, { name: "按日期拆分" }];
function showChangeWarn(event) {
    event.stopPropagation();
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
function eventStop(event) {
    event.stopPropagation();
}
function chooseAllocate(event) {
    var selIndex = event.pEventAttr.index;
    if (selIndex == 0) {
        v.instance.itemPlanShow = true;//分项
    } else {
        v.instance.itemPlanShow = false;//天
    }
}