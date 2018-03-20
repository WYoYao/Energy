$(function() {
  $(document).on("click", function() {
    $("#dayPlanFloat").css({ bottom: "-400px" }); //chart侧弹框消失
    $("#monthBudgets .budgetPop").css({ display: "none" }); //预算里面的气泡框
    v.instance.countMachineShow = false;
  });
  $(window).resize(function() {});
});

function tableScroll() {
  v.instance.countMachineShow = false;
}
var dataArr = [{ name: "按分项拆分" }, { name: "按日期拆分" }];
function showChangeWarn(event) {
  event.stopPropagation();
  var $this = $(event.currentTarget);
  var $budgetPop = $this.siblings(".budgetPop");
  $("#monthBudgets .budgetPop")
    .not($budgetPop)
    .css({ display: "none" }); //气泡弹框消失
  if ($budgetPop.is(":visible")) {
    $budgetPop.hide();
  } else {
    $budgetPop.show();
  }
}
function hideChangeWarn(event) {
  //隐藏更新提示框
  var $this = $(event.currentTarget);
  var $budgetPop = $this.parents(".budgetPop");
  $budgetPop.hide();
}
function saveSureShow(event) {
  //弹出保存预算确认

  var $this = $(event.currentTarget);

  // 添加注释的验证
  var id = $this.attr("datastr");

  if (!$(document.getElementById(id)).pverifi()) return;

  var $buttonBox = $this.parents(".editButton");
  var $saveSurePop = $buttonBox.find(".saveSurePop");
  var $layer = $buttonBox.find(".layer");
  $("#monthBudgets .budgetPop")
    .not($saveSurePop)
    .css({ display: "none" }); //气泡弹框消失
  if ($saveSurePop.is(":visible")) {
    $saveSurePop.hide();
    $layer.hide();
  } else {
    $saveSurePop.show();
    $layer.show();

    $layer.off().on("click", function() {
      $layer.prev().hide();
      $layer.hide();
    });
  }
}
function cancelSaveSure(event) {
  //保存预算确认 取消
  var $this = $(event.currentTarget);
  var $saveSurePop = $this.parents(".saveSurePop");
  $saveSurePop.hide();
  var $buttonBox = $this.parents(".editButton");
  var $layer = $buttonBox.find(".layer");
  $layer.hide();
}
function eventStop(event) {
  event.stopPropagation();
}
function chooseAllocate(event) {
  $("#dayPlanFloat").css({ bottom: "-400px" }); //chart侧弹框消失
  $("#itemPlanFloat").phide();
  var selIndex = event.pEventAttr.index;
  if (selIndex == 0) {
    v.instance.allocatePlanType = 1; //分配方式 0按时间分配，1按分项分配
  } else {
    v.instance.allocatePlanType = 0;
  }
  v.instance.countMachineShow = false;

  // 切换TAB保存已经输入的计划
  selIndex == 0
    ? (window.planManageDaysCache = JSON.parse(
        JSON.stringify(v.instance.monthPlanInfo)
      ))
    : (window.planManageItemsCache = JSON.parse(
        JSON.stringify(v.instance.monthPlanInfo)
      ));

  if (selIndex == 0) {
    window.planManageItemsCache == undefined
      ? planManController.getEnergyPlanInfo(v.instance.setPlanBudget, "nei")
      : (v.instance.monthPlanInfo = JSON.parse(
          JSON.stringify(window.planManageItemsCache)
        ));
  } else {
    window.planManageDaysCache == undefined
      ? planManController.getEnergyPlanInfo(v.instance.setPlanBudget, "nei")
      : (v.instance.monthPlanInfo = JSON.parse(
          JSON.stringify(window.planManageDaysCache)
        ));
  }

  //获取计划
  // planManController.getEnergyPlanInfo(v.instance.setPlanBudget, 'nei');
}
function closePlanFloat() {
  //关闭下面的侧弹框
  $("#dayPlanFloat").css({ bottom: "-400px" });
}

function verifyBudegtInput(event) {
  //改变值的时候  失去焦点的时候 保存的时候 都调用了
  var $input = $(event.currentTarget);
  var invalue = $input.val();
  invalue = invalue.replace(/[^0-9]/g, "").trim();
  invalue = invalue === "" ? invalue : Number(invalue);
  $input.val(invalue); //改变值
  return {
    invalue: invalue
  };
}

function verifyInput(event) {
  //改变值的时候  失去焦点的时候 保存的时候 都调用了
  var $input = $(event.currentTarget);
  var invalue = $input.val();
  invalue = invalue.replace(/[^0-9]/g, "").trim();
  invalue = Number(invalue);
  $input.val(invalue); //改变值
  return {
    invalue: invalue
  };
}
function inputBlur(eventParam) {
  var $input = eventParam.preventDefault
    ? $(eventParam.currentTarget)
    : $(eventParam);
  var invalue = $input.val();
  var wrong = false;
  if (invalue == "" || invalue === "0") {
    $input.parent(".bInputBox").addClass("error");
    wrong = true;
  } else {
    $input.parent(".bInputBox").removeClass("error");
    wrong = false;
  }
  return wrong;
}
function planInputBlur(eventParam) {
  var $input = eventParam.preventDefault
    ? $(eventParam.currentTarget)
    : $(eventParam);
  var invalue = $input.val();
  var wrong = false;
  if (invalue == "") {
    $input.parent(".bInputBox").addClass("error");
    wrong = true;
  } else {
    $input.parent(".bInputBox").removeClass("error");
    wrong = false;
  }
  return wrong;
}
function testNumber(val) {
  //todo 还有计算器的
  if (/^[1-9]\d*$/.test(val) || val.toString() === "0") {
    //0或正整数
    return true;
  } else {
    return false;
  }
}
function focusInput(evnet) {
    var $input = $(event.currentTarget);
    $input.parent(".bInputBox").removeClass('error');
}
var onmouseoverRecord;
function historyChartEnter(event) {
  //   $("#historyEnergyChart .budgetDataLabel").css({ opacity: 0 });

  //   $("#historyEnergyChart .budgetDataLabel").hover(
  //     function() {
  //       $("#historyEnergyChart .budgetDataLabel").css({ opacity: 1 });
  //     },
  //     function() {
  //       $("#historyEnergyChart .budgetDataLabel").css({ opacity: 0 });
  //     }
  //   );

  if (onmouseoverRecord) return true;

  $("#historyEnergyChart .budgetDataLabel").css({ display: "none" });
}
function historyChartLeave(event) {
  //   $("#historyEnergyChart .budgetDataLabel").css({ opacity: 1 });
  $("#historyEnergyChart .budgetDataLabel").css({ display: "block" });
}
// function stopEventBubble(e){
//   if (!e) var e = window.event;
//   e.cancelBubble = true;
//   if (e.stopPropagation) e.stopPropagation();
// }
function budgetBuildClick(currItem) {
  //楼层建筑的选择
  v.instance.budgetBuildSel = currItem;
  v.instance.currentBuild = currItem;

  //先加载图表
  //   budgetController.getEnergyBudgetList(0);
  //   budgetController.getMonthEnergyRealAndBudget("create");

  //    分别加载列表和图表，全部加载完后打开需要编辑的框
  PromiseConcurrent([
    function() {
      return new Promise(function(resolve) {
        budgetController.getEnergyBudgetList(0, resolve);
      });
    },
    function() {
      return new Promise(function(resolve) {
        budgetController.getMonthEnergyRealAndBudget("create", resolve);
      });
    }
  ]).then(function(param) {
    if (v.instance.isSettingbudget) {
      v.instance.energyBudgetList
        .filter(function(item) {
          return item.isNowMonth;
        })
        .forEach(function(item) {
          v.instance.createNewBudget(item);
        });
    }
  });
}
function newRemarkInput() {
  var val = $("#newRemarkText").pval();
  if (val !== "") {
    $("#remarkSaveButton").pdisable(false);
  } else {
    $("#remarkSaveButton").pdisable(true);
  }
}
