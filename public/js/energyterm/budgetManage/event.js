$(function () {

    $(document).on('click', function () {
        $("#dayPlanFloat").css({ bottom: '-400px' });//chart侧弹框消失
        $("#monthBudgets .budgetPop").css({ 'display': 'none' });//预算里面的气泡框
        v.instance.countMachineShow = false;
    });
    $(window).resize(function () {
        // if (v.instance.onPage == 'budget_manage') {//屏幕大小改变时调用
        //  budgetController.getEnergyBudgetList(v.instance.currentPage);
        // }
    });
});

function tableScroll() {
    v.instance.countMachineShow = false;

}
var dataArr = [{ name: "按分项拆分" }, { name: "按日期拆分" }];
function showChangeWarn(event) {
    event.stopPropagation();
    var $this = $(event.currentTarget);
    var $budgetPop = $this.siblings(".budgetPop");
    $("#monthBudgets .budgetPop").not($budgetPop).css({ 'display': 'none' });//气泡弹框消失
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

    // 添加注释的验证
    var id = $this.attr('datastr');

    if (!$(document.getElementById(id)).pverifi()) return;

    var $buttonBox = $this.parents(".editButton");
    var $saveSurePop = $buttonBox.find(".saveSurePop");
    var $layer = $buttonBox.find(".layer");
    $("#monthBudgets .budgetPop").not($saveSurePop).css({ 'display': 'none' });//气泡弹框消失
    if ($saveSurePop.is(":visible")) {
        $saveSurePop.hide();
        $layer.hide();
    } else {
        $saveSurePop.show();
        $layer.show();

        $layer.off().on("click", function () {
            $layer.prev().hide();
            $layer.hide();
        })
    }
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
    $("#dayPlanFloat").css({ bottom: '-400px' });//chart侧弹框消失
    $("#itemPlanFloat").phide();
    var selIndex = event.pEventAttr.index;
    if (selIndex == 0) {
        v.instance.allocatePlanType = 1;//分配方式
    } else {
        v.instance.allocatePlanType = 0;
    }
    v.instance.countMachineShow = false;
    //获取计划
    planManController.getEnergyPlanInfo(v.instance.setPlanBudget, 'nei');
}
function closePlanFloat() {//关闭下面的侧弹框
    $("#dayPlanFloat").css({ bottom: '-400px' });
}

function verifyBudegtInput(event) {//改变值的时候  失去焦点的时候 保存的时候 都调用了
    var $input = $(event.currentTarget);
    var invalue = $input.val();
    invalue = invalue.replace(/[^0-9]/g, '').trim();
    invalue = invalue === '' ? invalue : Number(invalue);
    $input.val(invalue);//改变值
    return {
        'invalue': invalue
    }
}

function verifyInput(event) {//改变值的时候  失去焦点的时候 保存的时候 都调用了
    var $input = $(event.currentTarget);
    var invalue = $input.val();
    invalue = invalue.replace(/[^0-9]/g, '').trim();
    invalue = Number(invalue);
    $input.val(invalue);//改变值
    return {
        'invalue': invalue
    }
}
function inputBlur(eventParam) {
    var $input = eventParam.preventDefault ? $(eventParam.currentTarget) : $(eventParam);
    var invalue = $input.val();
    var wrong = false;
    if (invalue == '' || invalue === '0') {
        $input.parent(".bInputBox").addClass('error');
        wrong = true;
    } else {
        $input.parent(".bInputBox").removeClass('error');
        wrong = false;
    }
    return wrong;
}
function planInputBlur(eventParam) {
    var $input = eventParam.preventDefault ? $(eventParam.currentTarget) : $(eventParam);
    var invalue = $input.val();
    var wrong = false;
    if (invalue == '') {
        $input.parent(".bInputBox").addClass('error');
        wrong = true;
    } else {
        $input.parent(".bInputBox").removeClass('error');
        wrong = false;
    }
    return wrong;
}
function testNumber(val) {//todo 还有计算器的
    if (/^[1-9]\d*$/.test(val) || val.toString() === '0') {//0或正整数
        return true;
    } else {
        return false;
    }
}
function focusInput(evnet) {
    var $input = $(event.currentTarget);
    $input.parent(".bInputBox").removeClass('error');
}
function historyChartEnter() {
    $("#historyEnergyChart .budgetDataLabel").css({ 'display': 'none' });
}
function historyChartLeave() {
    $("#historyEnergyChart .budgetDataLabel").css({ 'display': 'block' });
}
function budgetBuildClick(currItem) {//楼层建筑的选择
    v.instance.budgetBuildSel = currItem;
    budgetController.getEnergyBudgetList(0);
    budgetController.getMonthEnergyRealAndBudget('create');
}
function newRemarkInput() {
    var val = $("#newRemarkText").pval();
    if (val !== '') {
        $("#remarkSaveButton").pdisable(false);
    } else {
        $("#remarkSaveButton").pdisable(true);
    }
}
function showPlanHelp(event) {
    event.stopPropagation();
    $("#setPlanWindow").pshow();
    v.instance.planHelpType = 'help';
}
function closePlanHelp() {
    $("#setPlanWindow").phide();
}