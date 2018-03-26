v.pushComponent({
  name: "budget_manage",
  data: {
    energyBudgetList: [], //月预算
    selEnergyBudget: {}, //查看备注的月预算
    enerBudgetListCopy: [],
    buildArea: 1,
    isNextHint: true, //下次是否提示

    setPlanBudget: {}, //设置计划的月
    historyFirstDate: null, //历史数据的第一天
    leftArrowActive: false, //左右箭头
    rightArrowActive: true,
    arrowLoadState: false, //如果列表加载中

    currentPage: 0, //预算的翻页
    budgetBuildSel: null
  },
  methods: {
    hideModifyRecordFloat: function(bool) {
      if (bool !== true) $(".budgetPop").hide();
      $("#modifyRecordFloat").phide();
    },
    showSetPlanWindow: function() {
      var bool = eval(window.localStorage.getItem("hintStore"));
      $("#nextHintCheck").psel(bool, false);
      $("#plan_managenextHintCheck").psel(bool, false);
      $("#setPlanWindow").pshow();
    },
    // 点击其他的内容的时候的也需要关闭是否关闭的内容
    ideItem: function(event, item) {
      var _that = this;

      var filter = _that.energyBudgetList.filter(function(info) {
        return (
          info == item &&
          (item.showPage == "editPage" || item.showPage == "changeWarn")
        );
      })[0];

      // 点击事件是从当前窗口传出的不做任何的操作
      if (item == filter) {
        event.stopPropagation();
        event.preventDefault();
        return false;
      } else {
        // 点击其他的窗口直接关闭内容
        _that.PopClick();
      }
    },
    // 冒泡到最低层,如果用户在编辑状态下点击其他功能关闭编辑状态
    PopClick: function() {
      var _that = this;
      if (_.isArray(_that.energyBudgetList)) {
        _that.energyBudgetList.forEach(function(item, index) {
          if (item.showPage == "editPage" || item.showPage == "changeWarn") {
            _that.enerBudgetListCopy[index].showPage = getPageType(
              _that.enerBudgetListCopy[index]
            );
            v.instance.closeEditPanel(item, index);
          }

          return item;
        });
      }
      chartBackNormal();
    },
    downMonthReport: function(item) {
      var enum_path = {
        monthtotal: "monthtotal"
      };
      var planDate = new Date(item.planDate.replace(/-/g, "/"));
      //  月总参数
      var argu = {
        buildingName: v.instance.budgetBuildSel.buildingName,
        buildingId: v.instance.budgetBuildSel.buildingId,
        timeFrom: item.planDate,
        timeTo: new Date(
          planDate.getFullYear(),
          planDate.getMonth() + 1,
          1
        ).format("yyyy-MM-dd hh:mm:ss")
      };

      downLoadPdf(enum_path.monthtotal, argu);
    },
    planInfoCheck: function(item) {
      var paramObj = {
        projectId: v.instance.projectId,
        buildingId: v.instance.budgetBuildSel.buildingId,
        projectName: v.instance.currentBuild.buildingName,
        startDate: item.planDate,
        download: false
      };
      var a = "/lookplan?query=" + psecret.create(JSON.stringify(paramObj));
      window.open(a);
    },
    planInfoDown: function(item) {
      var projectTime = item.planDate.substring(0, 7);
      var paramObj = {
        buildingId: v.instance.budgetBuildSel.buildingId,
        startDate: item.planDate,
        download: true,
        excelName:
          v.instance.currentBuild.buildingName + projectTime + "能耗计划"
      };
      budgetController.downMonthEnergyPlan(paramObj);
    },
    backNowBudget: function() {
      if (this.currentPage == 0) return;
      // 隐藏同月的Tips
      historyChartEnter();
      // 隐藏同月比较的线
      chartBackNormal();

      budgetController.getEnergyBudgetList(0);
    },
    leftArrowClick: function() {
      var pageNum = this.currentPage - 1;
      this.selectDateByPageNum(pageNum);
    },
    rightArrowClick: function() {
      var pageNum = this.currentPage + 1;
      this.selectDateByPageNum(pageNum);
    },
    selectDateByPageNum: function(pageNum) {
      budgetController.getEnergyBudgetList(pageNum);
      chartBackNormal(); //chart恢复默认
    },
    showEditPanel: function(item, e) {
      var _that = this;

      //编辑预算显示
      if (item.state == 0) {
        return;
      }
      // 找到相对的项关闭对应的窗口
      _that.energyBudgetList.forEach(function(info) {
        if (info == item) {
          // 判断节点是否更新
          if (!info.isBudgetUpdated) {
            // 编辑预算
            beforeEditOperate(info);
            info.showPage = "editPage";
            info.operate = "编辑预算";
          } else {
            //判断是否更新节点
            info.showPage = "changeWarn";
          }
        } else {
          // 不是相关的全部的修改的
          info.showPage = getPageType(info);
        }
      });
    },
    createNewBudget: function(item, event) {
      var _that = this;

      //创建预算显示
      item.showPage = "editPage";
      item.operate = "创建预算";
      beforeEditOperate(item);

      // 20180326  leo 修改新建预算弹窗不添加验证事件
      _that.$nextTick(function() {
        _that.changeOnRemarkInput(item, {
          currentTarget: $(event.currentTarget).parents(".itemBlock")
        });
      });
    },
    againCreate: function(item, event) {
      //有更新 重新创建预算
      item.showPage = "editPage";
      item.operate = "编辑预算";
      beforeEditOperate(item, true);

      var $this = $(event.currentTarget);
      var $budgetPop = $this.parents(".budgetPop");
      $budgetPop && $budgetPop.hide();
      //将预算值清空
      item.energyDataBudget = null;
      item.energyDataBudgetPerSquare = null;
      item.newRemark = "";
      item.ifHasPlan = false; //不显示提示

      item.againCreateBudget = true; //是重新创建预算

      // 20180326  leo 修改新建预算弹窗不添加验证事件
      var _that = this;
      _that.$nextTick(function() {
        _that.changeOnRemarkInput(item, {
          currentTarget: $(event.currentTarget).parents(".itemBlock")
        });
      });
    },
    continueEdit: function(item) {
      //不更新 继续编辑
      item.showPage = "editPage";
      item.operate = "编辑预算";
      beforeEditOperate(item);
    },
    closeEditPanel: function(item, index) {
      //取消编辑预算
      var copyObj = JSON.parse(
        JSON.stringify(v.instance.enerBudgetListCopy[index])
      );
      Vue.set(v.instance.energyBudgetList, index, copyObj); //恢复备份

      chartBackNormal(); //chart恢复默认
    },
    sureSaveBudget: function(item, event, index) {
      //保存预算
      var $this = $(event.currentTarget);
      var $budegtInput = $this.parents(".blockEdit").find(".bInput");
      var wrong = false;
      $budegtInput.each(function(num, element) {
        wrong = inputBlur(element); //看看input框是否有错 为空
        if (wrong) return false;
      });
      if (wrong) return;
      //if ((typeof item.newRemark) == 'string' && item.newRemark.length > 100) {
      //    return;
      //}
      var _this = this;
      function callback() {
        chartBackNormal(); //chart恢复默认
        budgetController.getEnergyBudgetList(_this.currentPage);
      }
      budgetController.saveEditBudget(item, callback); //保存预算
    },
    showModifyRecord: function(item) {
      bodyClick();
      //备注信息 todo  名字
      var month = item.planDateStr.replace(".", "年") + "月";
      var titleStr =
        $("#budgetBuildList").psel().text + month + " 预算修改记录";
      // leo 20180305 重置状态
      $("#newRemarkText").precover();

      $("#newRemarkText").pval("");
      $("#remarkSaveButton").pdisable(true);
      $("#modifyRecordFloat").pshow({ title: titleStr });
      budgetController.getEnergyBudgetHistory(item);
    },
    budgetRemarkSave: function() {
      if (!$("#newRemarkText").pverifi()) return;
      var rtext = $("#newRemarkText").pval();
      var _this = this;
      _this.selEnergyBudget.operate = "批注";
      _this.selEnergyBudget.newRemark = rtext;
      function callback() {
        $("#newRemarkText").pval("");
        $("#remarkSaveButton").pdisable(true);
        budgetController.getEnergyBudgetHistory(_this.selEnergyBudget);
      }
      budgetController.saveEditBudget(this.selEnergyBudget, callback, "remark"); //保存备注
    },
    showEditPlan: function(item, event) {
      //  未来月没有更新节点的时候点击无效
      if (item.isBudgetUpdated && !item.isNowMonth && !item.ifHasPlan) return;
      //显示编辑计划
      var _this = this;
      _this.setPlanBudget = item;
      // if (item.isBudgetUpdated && !item.ifHasPlan) {
      //   //如果预算节点有更新 且没有计划
      //   // return;
      // }

      //  根据localStorage 保存值显示隐藏 弹窗
      var hintStore = window.localStorage.getItem("hintStore");
      //   hintStore  true不显示 false null 显示
      if (hintStore && hintStore == "true") {
        _this.go_plan_manage(1, _this.setPlanBudget);
      } else {
        _this.showSetPlanWindow();
      }
    },
    // 跳转到编辑计划的页面
    go_plan_manage: function(allocatePlanType, item) {
      // this.allocatePlanType = allocatePlanType;
      item.allocatePlanType = allocatePlanType;
      v.initPage("plan_manage", item);
    },
    // 提示框  显示按分项拆分 1  显示按日期拆分0
    AllocateShow: function(type) {
      var _that = this;

      $("#setPlanWindow").phide();
      _that.go_plan_manage(type, _that.setPlanBudget);
    },
    setStorageOption: function(bool) {
      window.localStorage.setItem("hintStore", bool);
    },
    budgetGoBackMain: function() {
      v.goBack("more_build");
      var calenderTime = $("#divCalendar").psel();
      // 列表状态时不重新查询
      if (v.instance.currentBuild.buildingId == "all") return;

      v.instance.energyByProjectActivate({
        buildingId: v.instance.currentBuild.buildingId,
        timeFrom: new Date(calenderTime.startTime).format("yyyy-M-d h:m:s"),
        NowModel: "term"
      });
    },
    // changeAllInput: function (item, event) {//改变总预算 Input
    //     var resObj = verifyBudegtInput(event);
    //     item.energyDataBudget = resObj.invalue;
    //     item.energyDataBudgetPerSquare = item.energyDataBudget === '' ? '' : Math.round(Number(item.energyDataBudget) / this.buildArea);
    //     var $this = $(event.currentTarget);
    //     if (item.energyDataBudgetPerSquare !== '') {
    //         $this.parents(".blockEdit").find(".bInputBox").removeClass("error");
    //     }
    // },
    // changePerInput: function (item, event) {//改变单位平米预算 Input
    //     var resObj = verifyBudegtInput(event);
    //     item.energyDataBudgetPerSquare = resObj.invalue;
    //     item.energyDataBudget = item.energyDataBudgetPerSquare === '' ? '' : Math.round(Number(item.energyDataBudgetPerSquare) * this.buildArea);
    //     var $this = $(event.currentTarget);
    //     if (item.energyDataBudget !== '') {
    //         $this.parents(".blockEdit").find(".bInputBox").removeClass("error");
    //     }
    // },
    changeAllInput: function(item, event) {
      var $this = $(event.currentTarget);
      item.energyDataBudget =
        item.energyDataBudget == null ? NaN : Number(item.energyDataBudget);
      if (item.energyDataBudget != NaN && item.energyDataBudget > 0) {
        item.energyDataBudgetPerSquare = Math.ceil(
          item.energyDataBudget / this.buildArea
        );
      } else {
        item.energyDataBudget = null;
      }
      this.changeInputWarnAndSave(item, $this.parents(".blockEdit"));
    },
    changePerInput: function(item, event) {
      var $this = $(event.currentTarget);
      item.energyDataBudgetPerSquare =
        item.energyDataBudgetPerSquare == null
          ? NaN
          : Number(item.energyDataBudgetPerSquare);
      if (
        item.energyDataBudgetPerSquare != NaN &&
        item.energyDataBudgetPerSquare > 0
      ) {
        item.energyDataBudget = Math.floor(
          item.energyDataBudgetPerSquare * this.buildArea
        );
      } else {
        item.energyDataBudgetPerSquare = null;
      }
      this.changeInputWarnAndSave(item, $this.parents(".blockEdit"));
    },
    changeOnRemarkInput: function(item, event) {
      var $this = $(event.currentTarget);
      var $el = $this.find("textarea");
      $el.off("input");
      $el.on("input", function() {
        v.instance.changeInputWarnAndSave(item, $this.find(".blockEdit"));
      });
    },
    changeInputWarnAndSave: function(item, el) {
      var $total = el
        .find(".bInputBox")
        .eq(0)
        .find(".error-tip");
      var $square = el
        .find(".bInputBox")
        .eq(1)
        .find(".error-tip");
      var $remark = el.find(".leo .errortip");
      item.energyDataBudget == null ? $total.show() : $total.hide();
      item.energyDataBudgetPerSquare == null ? $square.show() : $square.hide();
      item.newRemark.toString().length < 101 ? $remark.hide() : $remark.show();
      item.canSave =
        item.energyDataBudget != null &&
        item.energyDataBudgetPerSquare != null &&
        item.newRemark.toString().length < 101
          ? true
          : false;

      // 是否可以保存
      // $("#btn" + item.planDateStr.replace('.', '')).pdisable(!item.canSave);
    }
  },
  beforeMount: function() {
    v.instance.planBackPage = "budget_page";
    var argu = arguments[0];
    var Settingbudget = arguments[1];
    // 保存是否是编辑状态的功能
    v.instance.isSettingbudget = Settingbudget;

    this.$nextTick(function() {
      budgetController.init(argu);
    });
  },
  mounted: function() {},
  watch: {},
  computed: {}
});

function beforeEditOperate(item, isNew) {
  //编辑之前的操作
  var editNum = -1; //上一个处于编辑的月
  var month = new Date(item.planDate.replace(/-/g, "/")).getMonth() + 1;

  // 取消前一个编辑框的内容 Start
  v.instance.energyBudgetList.forEach(function(ele, index) {
    if (ele.showPage == "editPage" && ele.planDate !== item.planDate) {
      editNum = index;
    }
  });
  if (editNum !== -1) {
    var copyObj = JSON.parse(
      JSON.stringify(v.instance.enerBudgetListCopy[editNum])
    );
    Vue.set(v.instance.energyBudgetList, editNum, copyObj); //取消之前的编辑状态
  }
  // 取消前一个编辑框的内容 End

  //去设置平均值 修改下面的柱状图
  budgetController.getMonthEnergyRealAndBudget(month, function() {
    //在柱图上加标注
    var chartDataObj = getChartDataObj(budgetController.chartDataList, month);
    try {
      budgetController.historyEnergyChart.series[0] &&
        budgetController.historyEnergyChart.series[0].setData(
          chartDataObj.enerBudgetList
        );
      budgetController.historyEnergyChart.series[1] &&
        budgetController.historyEnergyChart.series[1].setData(
          chartDataObj.enerRealList
        );

      //  修改移入平均框闪烁状态
      ["onmouseover"].forEach(function(param) {
        $("#historyEnergyChart .budgetDataLabel")[0][param] = function(e) {
          window.onmouseoverRecord = true;

          $.each(
            $(
              ".highcharts-label.highcharts-tooltip.highcharts-color-undefined"
            ),
            function(index, item) {
              _.isFunction($(item).css) && $(item).css({ display: "none" });
            }
          );
        };
      });

      ["onmouseout"].forEach(function(param) {
        $("#historyEnergyChart .budgetDataLabel")[0][param] = function(e) {
          window.onmouseoverRecord = false;

          $.each(
            $(
              ".highcharts-label.highcharts-tooltip.highcharts-color-undefined"
            ),
            function(index, item) {
              _.isFunction($(item).css) && $(item).css({ display: "block" });
            }
          );
        };
      });
    } catch (error) {}
  });

  budgetController.getBuildingItemArea(
    isNew ? item.newBudgetItemId : item.budgetItemId
  ); //获取面积
}
function chartBackNormal() {
  // here
  if (
    budgetController.historyEnergyChart &&
    budgetController.historyEnergyChart.yAxis &&
    budgetController.historyEnergyChart.yAxis[0].plotLinesAndBands[0]
  ) {
    budgetController.historyEnergyChart.yAxis[0].removePlotLine("averPlotLine");
  }

  //在柱图上去掉标注
  var chartDataObj = getChartDataObj(budgetController.chartDataList, "renew");

  try {
    window.testArr
      ? window.testArr.push("填充数据" + new Date().getTime())
      : (window.testArr = []);
    budgetController.historyEnergyChart.series[0] &&
      budgetController.historyEnergyChart.series[0].setData(
        chartDataObj.enerBudgetList
      );
    budgetController.historyEnergyChart.series[1] &&
      budgetController.historyEnergyChart.series[1].setData(
        chartDataObj.enerRealList
      );
  } catch (error) {}
}
