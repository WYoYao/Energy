function budgetController() {}
budgetController.init = function(argu) {
  var selIndex = 0;
  v.instance.Buildings.forEach(function(ele, index) {
    if (ele.buildingId == argu) {
      selIndex = index;
    }
  });

  $("#budgetBuildList").psel(selIndex);

  v.instance.currentBuild = v.instance.Buildings[selIndex];
};

// 获取能展示的个数
function getItemNumber() {
  var allWidth = $("#monthBudgets").width();
  var num = 1;
  var marRight = 8;
  var sign = true;
  var itemWidth;
  while (sign) {
    itemWidth = (allWidth + marRight - 1) / num - marRight;
    if (itemWidth >= 276) {
      //小于276 的上一个
      num = num + 1;
    } else {
      sign = false;
    }
  }
  // 保存数量和宽度
  return {
    num: num,
    itemWidth: (allWidth + marRight - 1) / (num - 1) - marRight
  };
}

function getBockParam(page) {
  var allWidth = $("#monthBudgets").width();
  var num = 1;
  var marRight = 8;
  //  展示的个数
  var block = getItemNumber();
  var blockNum = block.num - 1;
  var now = new Date();
  // 当前月份
  var nowMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  var thisMonth = nowMonth.getMonth();
  //最晚的月份
  var futureMonth = new Date(now.getFullYear(), thisMonth + 12, 1);

  // 开始查询的第一个月份
  var firstMonth = new Date(
    now.getFullYear(),
    thisMonth - 1 + blockNum * page,
    1
  ); //查询的时候的最后一个月份
  var lastMonth = new Date(
    now.getFullYear(),
    thisMonth + blockNum - 2 + blockNum * page,
    1
  );
  if (
    v.instance.historyFirstDate &&
    firstMonth.getTime() < v.instance.historyFirstDate.getTime()
  ) {
    //如果第一个月大于历史数据第一个月
    var firstMonth = v.instance.historyFirstDate;
    var lastMonth = new Date(
      firstMonth.getFullYear(),
      firstMonth.getMonth() + blockNum - 1,
      1
    );
  }
  if (lastMonth.getTime() > futureMonth.getTime()) {
    //如果最后一个月超过12个月以后
    var lastMonth = futureMonth;
    var firstMonth = new Date(
      now.getFullYear(),
      thisMonth + 12 - (blockNum - 1),
      1
    );
  }
  var lastMonthParam = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth() + 1,
    1
  ); //为了配合传数

  return {
    futureMonth: futureMonth, //最未来的日期
    blockWidth: block.itemWidth,
    firstMonth: firstMonth,
    lastMonth: lastMonth,
    lastMonthParam: lastMonthParam,
    blockNum: blockNum
  };
}
//预算滚动列表查询
budgetController.getEnergyBudgetList = function(pageNum, cb) {
  //预算列表
  // $("#budgetLoading").pshow();
  v.instance.arrowLoadState = true; //此时箭头不能点击

  // 计算的时间，宽度
  var bockParam = getBockParam(pageNum);
  var budgetList = [];
  for (var i = 0; i < bockParam.blockNum; i++) {
    var firstDate = new Date(bockParam.firstMonth);
    budgetList.push({
      planDateStr: new Date(
        firstDate.getFullYear(),
        firstDate.getMonth() + i,
        1
      ).format("yyyy.MM"),
      blockWidth: bockParam.blockWidth,
      showPage: "blockLoad"
    });
  }
  v.instance.energyBudgetList = budgetList;

  function operateArrow() {
    //成功后改变状态的方法 左右箭头的能否点击处理
    if (
      v.instance.historyFirstDate &&
      v.instance.historyFirstDate.getTime() < bockParam.firstMonth.getTime()
    ) {
      //  放在请求结束
      v.instance.leftArrowActive = true;
    } else {
      v.instance.leftArrowActive = false;
    }
    if (bockParam.futureMonth.getTime() > bockParam.lastMonth.getTime()) {
      //  放在请求结束  还有页数的切换
      v.instance.rightArrowActive = true;
    } else {
      v.instance.rightArrowActive = false;
    }
    v.instance.currentPage = pageNum;
  }

  pajax.post({
    url: "FNPJ_GetEnergyBudgetList",
    data: {
      buildingId: v.instance.budgetBuildSel.buildingId,
      timeFrom: bockParam.firstMonth.format("yyyy-MM-dd hh:mm:ss"),
      timeTo: bockParam.lastMonthParam.format("yyyy-MM-dd hh:mm:ss")
    },
    success: function(res) {
      var energyBudgetList = res[0].budgetList || [];
      v.instance.historyFirstDate =
        res[0].firstBudgetDate &&
        new Date(res[0].firstBudgetDate.replace(/-/g, "/"));
      operateArrow();

      // 返回的每项处理
      energyBudgetList.forEach(function(item) {
        // 原数据不做任何处理
        // item.energyDataBudget = item.energyDataBudget && Math.round(item.energyDataBudget);
        // item.energyDataBudgetPerSquare = item.energyDataBudgetPerSquare && Math.round(item.energyDataBudgetPerSquare);
        // item.energyDataReal = item.energyDataReal && Math.round(item.energyDataReal);
        // item.realOccupyBudgetRatio = to3(item.realOccupyBudgetRatio);

        item.planDateStr = new Date(item.planDate.replace(/-/g, "/")).format(
          "yyyy.MM"
        );
        var now = new Date();
        var nowMonth = new Date(now.getFullYear(), now.getMonth(), 1); //本月第一天
        item.isNowMonth =
          new Date(item.planDate.replace(/-/g, "/")).getTime() ==
          nowMonth.getTime();
        item.isPastMonth =
          new Date(item.planDate.replace(/-/g, "/")).getTime() <
          nowMonth.getTime(); //历史月份
        item.isNextMonth =
          new Date(item.planDate.replace(/-/g, "/")).getTime() >
          nowMonth.getTime(); //未来月份
        item.historyList = []; //历史备注
        item.newRemark = ""; //需要填写的批注
        item.operate = ""; //保存的操作
        item.blockWidth = bockParam.blockWidth;
        item.againCreateBudget = false; //是否重新创建预算
        item.showPage =
          item.ifHasBudget || item.isPastMonth ? "dataPage" : "newCreate";
      });
      v.instance.energyBudgetList = energyBudgetList;
      // 用于取消编辑
      v.instance.enerBudgetListCopy = JSON.parse(
        JSON.stringify(energyBudgetList)
      ); //备份
    },
    error: function(errObj) {
      console.error("FNPJ_GetEnergyBudgetList err");
    },
    complete: function() {
      _.isFunction(cb) && cb();
      // $("#budgetLoading").phide();
      v.instance.arrowLoadState = false;
    }
  });
};

budgetController.saveEditBudget = function(item, funcb, opercb) {
  //保存预算
  loadding.set("saveEditBudget");
  if (opercb == "remark") {
    var params = {
      buildingId: v.instance.budgetBuildSel.buildingId, //类型：String  必有字段  备注：建筑id
      budgetItemId: item.budgetItemId, //类型：String  必有字段  备注：预算节点id
      planDate: item.planDate, //类型：String  必有字段  备注：定额预算设定月份

      operate: item.operate, //类型：String  可有字段  备注：操作
      operateUser: "persagyAdmin", //类型：String  可有字段  备注：操作类型
      remark: item.newRemark //类型：String  可有字段  备注：填写的批注信息
    };
  } else {
    var params = {
      buildingId: v.instance.budgetBuildSel.buildingId, //类型：String  必有字段  备注：建筑id
      budgetItemId: item.againCreateBudget
        ? item.newBudgetItemId
        : item.budgetItemId, //类型：String  必有字段  备注：预算节点id
      planDate: item.planDate, //类型：String  必有字段  备注：定额预算设定月份

      operate: item.operate, //类型：String  可有字段  备注：操作
      operateUser: "persagyAdmin", //类型：String  可有字段  备注：操作类型
      energyDataBudget: item.energyDataBudget, //类型：Number  可有字段  备注：能耗预算值
      energyDataBudgetPerSquare: item.energyDataBudgetPerSquare, //类型：Number  可有字段  备注：单平米能耗
      remark: item.newRemark //类型：String  可有字段  备注：填写的批注信息
    };
  }

  pajax.update({
    url: "FNPJ_EnergyBudgetSave",
    data: params,
    success: function(res) {
      if (typeof funcb == "function") {
        funcb();
      }
      $("#globalnotice").pshow({ text: "保存成功！", state: "success" });
    },
    error: function(errObj) {
      $("#globalnotice").pshow({ text: "保存失败！", state: "failure" });
      console.error("FNPJ_EnergyBudgetSave err");
    },
    complete: function() {
      loadding.remove("saveEditBudget");
    }
  });
};
budgetController.downMonthEnergyPlan = function(argu) {
  pajax.post({
    url: "FNCT_EnergyPlanEntranceService",
    data: argu,
    success: function(res) {
      var resdata = res[0] || "";
      pajax.download(resdata);
    },
    error: function(errObj) {
      console.error("FNCT_EnergyPlanEntranceService Error");
      $("#globalnotice").pshow({ text: "下载失败！", state: "failure" });
    },
    complete: function() {}
  });
};
budgetController.getBuildingItemArea = function(itemId) {
  //获取节点面积
  pajax.post({
    url: "FNPJ_GetBuildingItemArea",
    data: {
      buildingId: v.instance.budgetBuildSel.buildingId, //类型：String  必有字段  备注：建筑id
      itemId: itemId //类型：String  必有字段  备注：分项id
    },
    success: function(res) {
      var data = res[0] || {};
      v.instance.buildArea = data.area || 1;
    },
    error: function(errObj) {
      console.error("getBuildingItemArea err");
    },
    complete: function() {}
  });
};
budgetController.getEnergyBudgetHistory = function(item) {
  //保存备注信息
  pajax.post({
    url: "FNPJ_GetEnergyBudgetHistory",
    data: {
      buildingId: v.instance.budgetBuildSel.buildingId, //类型：String  必有字段  备注：建筑id
      budgetItemId: item.budgetItemId, //类型：String  必有字段  备注：预算管理节点
      planDate: item.planDate //类型：String  必有字段  备注：预算月份
    },
    success: function(res) {
      item.historyList = res || [];
      v.instance.selEnergyBudget = JSON.parse(JSON.stringify(item));
    },
    error: function(errObj) {
      console.error("getEnergyBudgetHistory err");
    },
    complete: function() {}
  });
};

budgetController.historyEnergyChart = null;
budgetController.chartPlotLine = null;
budgetController.chartDataList = [];
budgetController.getMonthEnergyRealAndBudget = function(monparam, cb) {
  //预算和实际能耗chart
  //loadding.set('getMonthEnergyRealAndBudget');
  $("#historyLoading").pshow();
  pajax.post({
    url: "FNPJ_GetMonthEnergyRealAndBudget",
    data: {
      buildingId: v.instance.budgetBuildSel.buildingId, //类型：String  必有字段  备注：建筑id
      month: monparam == "create" ? null : monparam
    },
    success: function(res) {
      var resData = res[0] || {};

      if (monparam == "create") {
        budgetController.historyEnergyChart &&
          budgetController.historyEnergyChart.destroy();
        budgetController.chartDataList = resData.dataList || [];

        var chartDataObj = getChartDataObj(
          budgetController.chartDataList,
          monparam
        );

        if(v.instance.onPage == 'budget_manage'){
          budgetController.historyEnergyChart = columnComparisonChart(
            "historyEnergyChart",
            "month"
          );
          // 添加预算节点
          budgetController.historyEnergyChart.addSeries({
            color: "#D9E2E8",
            states: {
              select: {
                color: "#C3CDD0",
                borderColor: "rgba(0,0,0,0)"
              }
            },
            data: chartDataObj.enerBudgetList
          });
          // 添加实际节点
          budgetController.historyEnergyChart.addSeries({
            data: chartDataObj.enerRealList
          });
        }

      } else {
        budgetController.historyEnergyChart.yAxis &&
          budgetController.historyEnergyChart.yAxis[0].removePlotLine(
            "averPlotLine"
          );
        if (resData.samePriodHistoryDataAvg == null) {
          return;
        }
        resData.samePriodHistoryDataAvg = Math.round(
          resData.samePriodHistoryDataAvg
        );

        budgetController.historyEnergyChart.yAxis &&
          budgetController.historyEnergyChart.yAxis[0].addPlotLine({
            value: resData.samePriodHistoryDataAvg,
            color: "#6d6d6d",
            dashStyle: "ShortDash",
            width: 2,
            id: "averPlotLine",
            label: {
              align: "right",
              text:
                "历史同期能耗均值：" +
                toThousands(resData.samePriodHistoryDataAvg) +
                "kWh",
              x: -10,
              y: -10,
              color: "#333333"
            },
            zIndex: 3
          });
      }
    },
    error: function(errObj) {
      console.error("getMonthEnergyRealAndBudget err");
    },
    complete: function() {
      $("#historyLoading").phide();
      //loadding.remove('getMonthEnergyRealAndBudget');
      cb();
    }
  });
};
function getChartDataObj(dataList, monparam) {
  //处理数据
  var enerRealList = [];
  var enerBudgetList = [];
  dataList.forEach(function(item) {
    var thisMonth = new Date(item.time.replace(/-/g, "/")).getMonth() + 1;
    //  大于 1% 直接百分比   小于 1% 再保留三位小数
    // leo 2018 03 08
    // var radioUnd = item.energyDataBudget ? (item.energyDataReal / item.energyDataBudget * 100) : 0;
    // var radio = radioUnd > 100 ? Math.round((item.energyDataReal / item.energyDataBudget) * 1000) / 10 : radioUnd > 0 ? (radioUnd / 100000).toFixed(5) : 0;

    var radio = item.energyDataBudget
      ? to3(item.energyDataReal / item.energyDataBudget * 100)
      : 0;
    var thishtml =
      '<div class="budgetDataLabel"><div>' +
      new Date(item.time.replace(/-/g, "/")).format("y.M") +
      "</div><div>预算管理节点：" +
      item.budgetItemName +
      "</div><div>能耗预算：" +
      (item.energyDataBudget ? toCom(item.energyDataBudget) + "kWh" : "--") +
      "</div><div>实际能耗：" +
      (item.energyDataReal ? toCom(item.energyDataReal) + "kWh" : "--") +
      "</div><div>实际能耗占预算比：" +
      (radio ? radio + "%" : "--") +
      "</div></div>";
    var disLabelObj = {
      enabled: false
    };
    var enLabelObj = {
      enabled: true,
      formatter: function() {
        return thishtml;
      }
    };
    var labelSign = false;
    if (thisMonth === monparam) {
      //如果是选中月份 则添加dabtalabel
      labelSign = true;
    }
    var budgetObj = {
      x: new Date(item.time.replace(/-/g, "/")).getTime(),
      y: toCom(item.energyDataBudget),
      name: "能耗预算",
      realradio: radio,
      budgetItemName: item.budgetItemName,
      dataLabels:
        labelSign && item.energyDataBudget >= item.energyDataReal
          ? enLabelObj
          : disLabelObj,
      selected: labelSign ? true : false
    };
    var realObj = {
      x: new Date(item.time.replace(/-/g, "/")).getTime(),
      y: toCom(item.energyDataReal),
      color:
        item.energyDataReal && item.energyDataBudget
          ? item.energyDataReal > item.energyDataBudget ? "#FCA471" : "#48BEDA"
          : "#02a9d1",
      name: "实际能耗",
      realradio: radio,
      budgetItemName: item.budgetItemName,
      states: {
        select: {
          color:
            item.energyDataReal > item.energyDataBudget ? "#FF8640" : "#02A9D1",
          borderColor: "rgba(0,0,0,0)"
        }
      },
      dataLabels:
        labelSign && item.energyDataReal > item.energyDataBudget
          ? enLabelObj
          : disLabelObj,
      selected: labelSign ? true : false
    };
    enerRealList.push(realObj);
    enerBudgetList.push(budgetObj);
  });
  return {
    enerRealList: enerRealList,
    enerBudgetList: enerBudgetList
  };
}

Highcharts.setOptions({ global: { useUTC: false } }); //解决highchart时间少8个小时的问题
//创建线性图表 buildLineChart
function columnComparisonChart(itemId, dateType, callback) {
  var chart = new Highcharts.Chart(
    {
      chart: {
        renderTo: itemId,
        backgroundColor: "rgba(0,0,0,0)",
        spacingTop: 10,
        spacingRight: 20,
        type: "column"
      },
      exporting: {
        enabled: false //导出模块
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      title: {
        text: null
      },
      xAxis: {
        //startOnTick: false,//是否强制轴线在标线处开始
        //endOnTick: false,//结束于标线；是否强制轴线在标线处结束
        //lineWidth: 1, //刻度线整条线的长度
        //tickColor: '#ccc',
        //tickLength: 6,
        //tickmarkPlacement: 'on',
        //minorTickLength: 1,
        labels: {
          style: {
            fontFamily: 'Arial,"微软雅黑",sans-serif'
          },
          formatter: function() {
            if (this.value == null) return null;
            var xdate = new Date(this.value);
            return dateType == "day"
              ? xdate.format("M.d")
              : xdate.format("y.M");
          },
          enabled: true
        },
        type: "datetime"
        //showFirstLabel: false
      },
      yAxis: [
        {
          title: {
            text: null
          },
          gridLineColor: "#dddddd",
          gridLineDashStyle: "ShortDash", //x轴网格线的样式
          gridLineWidth: 1,
          endOnTick: true,
          labels: {
            style: {
              fontFamily: 'Arial,"微软雅黑",sans-serif'
            }
          }
        }
      ],
      tooltip: {
        enabled: true,
        hideDelay: 0,
        borderColor: null,
        borderWidth: 0,
        shadow: false,
        backgroundColor: null,
        useHTML: true,
        shared: true,
        style: {
          fontFamily: 'Arial,"微软雅黑",sans-serif'
        },
        formatter: function() {
          var html = "",
            name = "",
            val = "",
            unit = "",
            realradio = void 0,
            budgetItemName = void 0;

          this.points = this.points.sort(function(a, b) {
            return a.key < b.key? 1 : -1;
          });

          for (var i = 0; i < this.points.length; i++) {
            //name = this.points[i].series.name;
            name = this.points[i].point.name;
            val = this.points[i].y;
            color = this.points[i].color;
            if (dateType == "day") {
              html +=
                "<span>" +
                name +
                "：" +
                (val ? val + "kWh" : "0kWh") +
                "</span>";
            } else {
              html +=
                "<span>" + name + "：" + (val ? val + "kWh" : "--") + "</span>";
            }

            realradio = this.points[i].point.realradio;
            budgetItemName = this.points[i].point.budgetItemName;
          }
          html =
            (dateType == "month"
              ? "<span>预算管理节点：" + budgetItemName + "</span>"
              : "") + html;
          // 月能耗添加
          html =
            html +
            (dateType == "month"
              ? "<span>实际能耗占预算比：" +
                (realradio ? realradio + "%" : "--") +
                "</span>"
              : "");
          // 根据传入的类型生成对应的时间格式
          var currDate =
            dateType == "day"
              ? new Date(this.x).format("M.d")
              : new Date(this.x).format("y.M");
          return "<span>" + currDate + "</span>" + html;
        }
      },
      plotOptions: {
        //绘图区选项
        column: {
          //==========20180314 修改柱状图边距 leo
          //pointPadding: 0,
          grouping: true,
          //=================
          states: {
            hover: {
              halo: {
                opacity: 0.5
              }
            }
          }
        },

        series: {
          //==========20180314 修改柱状图边距 leo
          pointPadding: 0,
          // pointPlacement: -0.09,
          groupPadding: 0.3125,
          //=================
          dataLabels: { 
            shared: true,
            useHTML: true,
            crop: false, //允许溢出
            overflow: "none",
            allowOverlap: true,
            formatter: function() {
              return "";
            },
            x: -10
          }
        }
      },
      series: []
    },
    callback
  );
  return chart;
}

function createPieChart(itemId) {
  var chart = new Highcharts.Chart({
    chart: {
      type: "pie",
      renderTo: itemId
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
        cursor: "pointer",
        dataLabels: {
          enabled: false
        },
        // 图例
        showInLegend: false,
        point: {
          events: {
            legendItemClick: function(e) {
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
      formatter: function() {
        var html = "",
          name = "",
          val = "";
        name = this.point.name;
        val = this.y;
        html += "<span><b>计划能耗：" + val + "kWh</b></span>";

        return "<span>" + name + "</span>" + html;

        //var realData = this.y ? this.y.toFixed(1).toLocaleString() : '--';
        //return this.key + '<br>' + realData + 'kWh';
      }
    },
    labels: {
      enabled: false
    },
    series: [{}]
  });
  return chart;
}
