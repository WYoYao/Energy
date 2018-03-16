function planManController() {}
planManController.init = function(argu) {
  planManController.getEnergyPlanInfo(argu, "wai");
};

planManController.getEnergyPlanInfo = function(bitem, autoType) {
  //创建或 编辑计划
  if (autoType == "wai") {
    $("#globaloadng").pshow();
  } else {
    $("#planContLoading").pshow();
  }

  var ifHasPlan = bitem.ifHasPlan;

  if (ifHasPlan && autoType != "auto") {
    //有计划  编辑
    var url = "FNPJ_GetEnergyPlanInfo";
  } else {
    //创建 自动分配接口
    var url = "FNPJ_EnergyPlanAutoAllocate";
  }

  var pindex = v.instance.allocatePlanType;

  if (pindex == 1) {
    //按分项
    var timeFrom = bitem.planDate;
  } else {
    var planDate = new Date(bitem.planDate.replace(/-/g, "/"));
    var firstDay = planDate.getDay();
    var timeFrom = new Date(
      planDate.getFullYear(),
      planDate.getMonth(),
      planDate.getDate() - firstDay - 7
    ).format("yyyy-MM-dd hh:mm:ss");
    var timeTo = new Date(
      planDate.getFullYear(),
      planDate.getMonth() + 1,
      1
    ).format("yyyy-MM-dd hh:mm:ss");
  }

  pajax.post({
    url: url,
    data: {
      buildingId:
        v.instance.planBackPage != "budget_page"
          ? v.instance.currentBuild.buildingId
          : v.instance.budgetBuildSel.buildingId, //类型：String  必有字段  备注： 建筑id
      budgetItemId: bitem.budgetItemId, //类型：String  必有字段  备注：能耗预算节点
      planType: pindex, //类型：Number  必有字段  备注：计划类型: 0-日总,1-月分项
      timeFrom: timeFrom, //类型：String  必有字段  备注：月开始时间
      timeTo: timeTo || null
    },
    success: function(res) {
      var resData = res[0] || {};

      var nowday = new Date();
      var yesterday = new Date(
        nowday.getFullYear(),
        nowday.getMonth(),
        nowday.getDate() - 1
      ); //昨天
      var planDate = new Date(bitem.planDate.replace(/-/g, "/"));
      var lastDate = new Date(
        planDate.getFullYear(),
        planDate.getMonth() + 1,
        0
      ); //计划月的最后一天

      var monthDays = lastDate.getDate(); //一个月多少天
      var planFirDay = planDate.getDay();
      var lineNum = 4;
      switch (monthDays) {
        case 28:
          if (planFirDay > 0) {
            //大于周天
            lineNum = 5;
          }
          break;
        case 29:
          lineNum = 5;
          break;
        case 30:
          if (planFirDay > 5) {
            lineNum = 6;
          } else {
            lineNum = 5;
          }
          break;
        case 31:
          if (planFirDay > 4) {
            lineNum = 6;
          } else {
            lineNum = 5;
          }
          break;
      }

      if (bitem.isNowMonth) {
        //如果本月
        var dateObj = {
          pdateStr:
            planDate.getFullYear() + "年" + (planDate.getMonth() + 1) + "月",
          monthStr: planDate.format("MM.dd") + "~" + lastDate.format("MM.dd"),
          passMonthStr:
            nowday.getDate() > 1
              ? planDate.format("MM.dd") + "~" + yesterday.format("MM.dd")
              : "",
          afterMonthStr: nowday.format("MM.dd") + "~" + lastDate.format("MM.dd")
        };
      } else {
        var dateObj = {
          pdateStr:
            planDate.getFullYear() + "年" + (planDate.getMonth() + 1) + "月",
          monthStr: planDate.format("MM.dd") + "~" + lastDate.format("MM.dd"),
          passMonthStr: "",
          afterMonthStr:
            planDate.format("MM.dd") + "~" + lastDate.format("MM.dd")
        };
      }

      resData.monthBudgetData = Math.round(resData.monthBudgetData);
      resData.monthRealData = Math.round(resData.monthRealData);
      resData.monthRemainData = Math.round(resData.monthRemainData);
      if (pindex == 1) {
        //按分项
        var totalData = 0;
        resData.itemPlan.forEach(function(ele) {
          //计算比例
          // ele.energyOccurredRatio =
          //   ele.energyOccurredRatio &&
          //   Math.round(ele.energyOccurredRatio * 10) / 10;
          ele.energyOccurredRatio != null ? ele.energyOccurredRatio = FBI(ele.energyOccurredRatio) : void 0;
          var percent =
            resData.monthRemainData > 0
              ? ele.energyDataPlan / resData.monthRemainData
              : 0;
          ele.energyPlanRatio = Math.round(percent * 1000) / 10;
          totalData += ele.energyDataPlan;
          ele.energyDataPlan =
            ele.energyDataPlan && Math.round(ele.energyDataPlan);
          ele.energyDataReal =
            ele.energyDataReal && Math.round(ele.energyDataReal);
        });
      } else {
        //按日期
        var totalData = 0;
        resData.dayPlan.forEach(function(ele) {
          //样式属性
          ele.isLastMonth =
            new Date(ele.time.replace(/-/g, "/")).getTime() <
            new Date(bitem.planDate.replace(/-/g, "/")).getTime()
              ? true
              : false; //是不是上个月
          ele.isThisMonth = !ele.isLastMonth;
          ele.isPassDay =
            new Date(ele.time.replace(/-/g, "/")).getTime() <=
            yesterday.getTime()
              ? true
              : false; //是不是过去的日子
          ele.showDate = new Date(ele.time.replace(/-/g, "/")).getDate();
          ele.height = 100 / (lineNum + 1);
          if (ele.isThisMonth && !ele.isPassDay) {
            totalData += ele.energyDataPlan;
          }
          ele.energyDataPlan =
            ele.energyDataPlan && Math.round(ele.energyDataPlan);
          ele.energyDataReal =
            ele.energyDataReal && Math.round(ele.energyDataReal);
        });
        var appendNum = 6 - lastDate.getDay(); //追加的
        for (var i = 0; i < appendNum; i++) {
          resData.dayPlan.push({
            isThisMonth: false,
            height: 100 / (lineNum + 1)
          });
        }
      }

      resData.totalPlanData = Math.round(totalData);
      resData.allotOverData = Math.round(totalData - resData.monthRemainData);

      resData.planDate = bitem.planDate;
      resData.budgetItemId = bitem.budgetItemId;
      resData.budgetItemName = bitem.budgetItemName;
      v.instance.monthPlanInfo = Object.assign({}, resData, dateObj);
      v.instance.firstPlanInfo = true; //给计划赋值
      setTimeout(function() {
        $("#choosePlanButton").psel(pindex == 1 ? 0 : 1, false); //选中
      }, 0);
    },
    error: function(errObj) {
      console.error("getEnergyPlanInfo err");
      $("#globalnotice").pshow({ text: "获取数据失败！", state: "failure" });
    },
    complete: function() {
      $("#globaloadng").phide();
      $("#planContLoading").phide();
    }
  });
};

planManController.saveEnergyPlan = function(pinfo, pindex) {
  //保存计划
  $("#globaloadng").pshow();
  var planMap = {};
  if (pindex == 1) {
    //按分项
    var planArr = pinfo.itemPlan;
    planArr.forEach(function(ele) {
      planMap[ele.planItemId] = Number(ele.energyDataPlan);
    });
  } else {
    var planArr = pinfo.dayPlan;
    planArr.forEach(function(ele) {
      if (ele.isThisMonth && !ele.isPassDay) {
        planMap[ele.time] = Number(ele.energyDataPlan);
      }
    });
  }
  var params = {
    planType: pindex, //类型：Number  必有字段  备注：无
    buildingId:
      v.instance.planBackPage != "budget_page"
        ? v.instance.currentBuild.buildingId
        : v.instance.budgetBuildSel.buildingId,
    budgetItemId: pinfo.budgetItemId, //类型：String  必有字段  备注：无
    planDate: pinfo.planDate, //类型：String  必有字段  备注：无
    energyPlanMap: planMap
  };
  pajax.update({
    url: "FNPJ_EnergyPlanSave",
    data: params,
    success: function(res) {
      $("#globalnotice").pshow({ text: "保存成功！", state: "success" });
      if (v.instance.planBackPage == "budget_page") {
        //从预算进来
        v.initPage("budget_manage", v.instance.budgetBuildSel.buildingId);
      } else {
        v.goBack("more_build");
        var calenderTime = $("#divCalendar").psel();
        v.instance.energyByProjectActivate({
          buildingId: v.instance.currentBuild.buildingId,
          timeFrom: new Date(calenderTime.startTime).format("yyyy-M-d h:m:s"),
          NowModel: "term"
        });
      }
    },
    error: function(errObj) {
      $("#globalnotice").pshow({ text: "保存失败！", state: "failure" });
      console.error("saveEnergyPlan err");
    },
    complete: function() {
      $("#globaloadng").phide();
    }
  });
};
planManController.planDayChart = null;
planManController.planItemChart = null;
planManController.getPlanTotalChart = function(pinfo, pindex) {
  //获取日总计划chart  分项总计划chart
  var chartArr = [];
  if (pindex == 1) {
    //按分项
    planManController.planItemChart &&
      planManController.planItemChart.destroy();
    var planArr = pinfo.itemPlan;
    planArr.forEach(function(ele, num) {
      var colorNum = num > 31 ? num - 32 : num;
      var dobj = {
        name: ele.planItemName,
        y: Number(ele.energyDataPlan),
        color: pcolor.cd[colorNum]
      };
      chartArr.push(dobj);
    });
    planManController.planItemChart = createPieChart("dayItemChart");
    planManController.planItemChart.series[0].setData(chartArr);

    v.instance.itemChartData = chartArr;
    $("#itemPlanFloat").pshow({ title: pinfo.afterMonthStr + "分项计划能耗" });
  } else {
    try {
      planManController.planDayChart &&
        planManController.planDayChart.destroy();
    } catch (error) {}
    var planArr = pinfo.dayPlan;
    planArr.forEach(function(ele) {
      if (ele.isThisMonth) {
        var dobj = {
          x: new Date(ele.time.replace(/-/g, "/")).getTime(),
          y: ele.isPassDay ? ele.energyDataReal : Number(ele.energyDataPlan),
          color: ele.isPassDay ? "#C3CDD0" : "#02a9d1",
          name: ele.isPassDay ? "实际能耗" : "计划能耗"
        };
        chartArr.push(dobj);
      }
    });
    planManController.planDayChart = columnComparisonChart(
      "itemDayChart",
      "day"
    );

    //  
    chartArr = chartArr.map(function(item) {
      item.y = +item.y;
      return item;
    });

    planManController.planDayChart.addSeries({
      data: chartArr
    });
    $("#dayPlanFloat").css({ bottom: "0px" });
    $("#dayPlanFloat .floatTitle").text("逐日计划能耗");
  }
};

planManController.generateDayPlanByItemSum = function(planDate, pitem) {
  //
  pajax.post({
    url: "FNPJ_GenerateDayPlanByItemSum",
    data: {
      buildingId: v.instance.currentBuild.buildingId, //类型：String  必有字段  备注：无
      planItemId: pitem.planItemId, //类型：String  必有字段  备注：无
      planData: pitem.energyDataPlan, //类型：Number  必有字段  备注：无
      planDate: planDate //类型：String  必有字段  备注：每月开始的时间
    },
    success: function(res) {
      try {
        planManController.planDayChart &&
          planManController.planDayChart.destroy();
      } catch (error) {}
      var planArr = res || [];
      var chartArr = [];
      planArr.forEach(function(ele) {
        var nowday = new Date();
        var yesterday = new Date(
          nowday.getFullYear(),
          nowday.getMonth(),
          nowday.getDate() - 1
        ); //昨天
        var isPassDay =
          new Date(ele.time.replace(/-/g, "/")).getTime() <=
          yesterday.getTime(); //过去
        var dobj = {
          x: new Date(ele.time.replace(/-/g, "/")).getTime(),
          y: isPassDay ? _.isNull(ele.realData) ? 0 : _.floor(ele.realData) : _.isNull(ele.planData) ? 0 : _.floor(ele.planData),
          color: isPassDay ? "#C3CDD0" : "#02a9d1",
          name: isPassDay ? "实际能耗" : "计划能耗"
        };
        chartArr.push(dobj);
      });
      planManController.planDayChart = columnComparisonChart(
        "itemDayChart",
        "day"
      );
      planManController.planDayChart.addSeries({
        data: chartArr
      });
      $("#dayPlanFloat").css({ bottom: "0px" });
      $("#dayPlanFloat .floatTitle").text(pitem.planItemName + "逐日计划能耗");
    },
    error: function(errObj) {
      console.error("generateDayPlanByItemSum err");
      $("#globalnotice").pshow({ text: "获取数据失败！", state: "failure" });
    },
    complete: function() {}
  });
};

planManController.generateItemPlanByDaySum = function(budgetItemId, pitem) {
  //
  pajax.post({
    url: "FNPJ_GenerateItemPlanByDaySum",
    data: {
      buildingId: v.instance.currentBuild.buildingId, //类型：String  必有字段  备注：无
      budgetItemId: budgetItemId,
      planData: pitem.energyDataPlan, //类型：Number  必有字段  备注：无
      planDate: pitem.time //类型：String  必有字段  备注：无
    },
    success: function(res) {
      planManController.planItemChart &&
        planManController.planItemChart.destroy();
      var planArr = res[0] || [];
      var chartArr = [];
      planArr.forEach(function(ele, num) {
        var colorNum = num > 31 ? num - 32 : num;
        var dobj = {
          name: ele.itemName,
          y: Math.round(Number(ele.planData)),
          color: pcolor.cd[colorNum]
        };
        chartArr.push(dobj);
      });
      planManController.planItemChart = createPieChart("dayItemChart");
      planManController.planItemChart.series[0].setData(chartArr);

      v.instance.itemChartData = chartArr;
      var timeStr = new Date(pitem.time.replace(/-/g, "/")).format("MM.dd");
      $("#itemPlanFloat").pshow({ title: timeStr + "分项计划能耗" });
    },
    error: function(errObj) {
      console.error("generateItemPlanByDaySum err");
      $("#globalnotice").pshow({ text: "获取数据失败！", state: "failure" });
    },
    complete: function() {}
  });
};
