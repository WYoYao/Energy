v.pushComponent({
  name: "plan_manage",
  data: {
    monthPlanInfo: {}, //获取的月计划信息
    firstPlanInfo: false, //给plan赋值
    allocatePlanType: 1, //计划分配类型 1 分项拆分 2 日期拆分
    countMachineShow: false,
    countParams: { countInterval: null, countClick: false },
    planCountPlus: true, //计算方式
    countItemPlan: null, //计算的分项计划 或者天计划
    itemChartData: [], //饼图列表数据
    budget_planDate: ""
  },
  methods: {
    planGoBack: function() {
      //返回
      if (v.instance.planBackPage == "budget_page") {
        v.initPage("budget_manage", v.instance.budgetBuildSel.buildingId);
      } else {
        v.goBack("more_build");
      }
    },
    autoAllocate: function() {
      //点击自动分配按钮
      planManController.getEnergyPlanInfo(this.setPlanBudget, "auto");
    },

    showItemDayChart: function(item, event) {
      event.stopPropagation();
      var planDate = this.monthPlanInfo.planDate;
      planManController.generateDayPlanByItemSum(planDate, item);
    },
    showDayItemChart: function(item, event) {
      $(".chartInfo").scrollTop(0);
      // event.stopPropagation();
      var budgetItemId = this.monthPlanInfo.budgetItemId;
      planManController.generateItemPlanByDaySum(budgetItemId, item);
    },
    saveAllocatePlan: function() {
      //保存计划
      if (this.allocatePlanType == 1) {
        //按分项
        var $planInput = $("#energyPlanWrap .itemPlan").find(".bInput");
      } else {
        var $planInput = $("#energyPlanWrap .dayPlan").find(".editDay .bInput");
      }
      var wrong = false;
      $planInput.each(function(num, element) {
        wrong = planInputBlur(element); //看看input框是否有错 为空
        if (wrong) return false;
      });
      if (wrong) return;

      planManController.saveEnergyPlan(
        this.monthPlanInfo,
        this.allocatePlanType
      );
    },
    showPlanTotalChart: function(event) {
      $(".chartInfo").scrollTop(0);
      event.stopPropagation();
      closePlanFloat();
      planManController.getPlanTotalChart(
        this.monthPlanInfo,
        this.allocatePlanType
      );
    },
    // 加减点击事件
    planEnergyUpDown: function(item, param) {
      //上下箭头 click
      var _this = this;
      if (_this.countParams.countClick) {
        _this.countParams.countClick = false;
        return;
      }
      if (param == "up") {
        item.energyPlanRatio =
          Math.round((item.energyPlanRatio + 0.1) * 10) / 10; //比例
      } else {
        item.energyPlanRatio =
          item.energyPlanRatio <= 0
            ? item.energyPlanRatio
            : Math.round((item.energyPlanRatio - 0.1) * 10) / 10;
      }
      item.energyDataPlan = Math.round(
        item.energyPlanRatio * v.instance.monthPlanInfo.monthRemainData / 100
      ); //计划

      // 3.21
      item.energyDataPlanDecimal = 0;
    },
    downCountNumber: function(item, param) {
      //长按时
      if (param == "down" && item.energyPlanRatio <= 0) {
        item.energyPlanRatio = 0;
        item.energyDataPlan = 0;
        return;
      }
      var _this = this;

      _this.countParams.startTime = +new Date();
      var num = 0;

      // item.energyPlanRatio == null ? item.energyPlanRatio = 0 : void 0;
      // var num = Math.round((item.energyPlanRatio - Math.floor(item.energyPlanRatio))*10);

      // param == 'up' ? num == 0 ? num = 0 : num = 10 - num : void 0;
      // 若是按上升箭头时为整数则先加10次0.1
      // param == 'up' ? num == 0 ? num = 10 : void 0 : void 0;

      function addorRemove(count) {
        _this.countParams.countClick = true;
        if (param == "up") {
          item.energyPlanRatio =
            Math.round((item.energyPlanRatio + count) * 10) / 10; //比例
        } else {
          item.energyPlanRatio =
            item.energyPlanRatio <= 0
              ? item.energyPlanRatio
              : Math.round((item.energyPlanRatio - count) * 10) / 10;
          item.energyPlanRatio < 0 ? (item.energyPlanRatio = 0) : void 0;
        }
        item.energyDataPlan = Math.round(
          item.energyPlanRatio * v.instance.monthPlanInfo.monthRemainData / 100
        ); //计划
      }

      _this.countParams.countInterval = setInterval(function() {
        var count = ++num > 3 ? 1 : 0.1;
        // var count = num-- > 0 ? 0.1 : 1;
        if (count == 1) {
          clearInterval(_this.countParams.countInterval);

          _this.countParams.countInterval = setInterval(function() {
            addorRemove(1);
          }, 500);

          addorRemove(1);
        } else {
          addorRemove(0.1);
        }
      }, 500);

      // 3.21
      item.energyDataPlanDecimal = 0;
    },

    // downCountNumber : function(item,type){
    //     if(type == 'down' && item.energyPlanRatio <= 0){
    //         item.energyPlanRatio = 0;
    //         item.energyPla
    //         return
    //     }
    //     item.energyDataPlan
    // },

    removeCount: function() {
      var _this = this;
      _this.countParams.countClick = false;
      clearInterval(_this.countParams.countInterval);
    },

    planEnergyChange: function(item, event) {
      //input 输入计划值
      var resObj = verifyInput(event);
      item.energyDataPlan = resObj.invalue;

      // debugger
      // 3.21
      item.energyDataPlanDecimal = 0;

      if (this.allocatePlanType == 0) {
        return;
      } //如果是按日分配 就不需要后面的了
      var percent =
        v.instance.monthPlanInfo.monthRemainData > 0
          ? Number(item.energyDataPlan) /
            v.instance.monthPlanInfo.monthRemainData
          : 0;
      item.energyPlanRatio = floor(percent * 1000) / 10;
    },
    showCountMachine: function(item, event, index) {
      //点开计算器
      event.stopPropagation();
      //如果点击的不是自己

      //开着 并且点击的是自己
      if (
        v.instance.countMachineShow &&
        ((this.allocatePlanType == 1 &&
          this.countItemPlan.planItemId == item.planItemId) ||
          (this.allocatePlanType == 0 && this.countItemPlan.time == item.time))
      ) {
        v.instance.countMachineShow = false;
      } else {
        v.instance.countMachineShow = true;
        $("#countMachine .bInput").val("");
        $("#countMachine .bInputBox").removeClass("error");

        this.planCountPlus = true;
        this.countItemPlan = item; //当前要计算的计划

        //  整个外部的高宽
        var wrapHeight = $(event.currentTarget)
          .offsetParent()
          .height();
        var wrapWidth = $(event.currentTarget)
          .offsetParent()
          .width();

        // 计算器本身的高和宽
        var countHeight = $("#countMachine").height();
        var countWidth = $("#countMachine").width();
        //  距离父级的偏移量
        var offsetLeft = $(event.currentTarget)[0].offsetLeft;
        var offsetTop = $(event.currentTarget)[0].offsetTop;

        var top = 0;
        var left = 0;

        // 在最低边的时候
        if (offsetTop + countHeight > wrapHeight) {
          top = offsetTop - countHeight;
        } else {
          top = offsetTop + 30;
        }

        // 最右边的时候
        if (offsetLeft + countWidth > wrapWidth) {
          left = offsetLeft - countWidth;
        } else {
          left = offsetLeft + 14;
        }

        // 不同的窗体定位的目标不同
        top += this.allocatePlanType == 1 ? 200 : 230;
        // 滚动的情况不同
        top -=
          this.allocatePlanType == 1
            ? $(".planTable")[0].scrollTop
            : $(event.currentTarget).offsetParent()[0].scrollTop;
        left -=
          this.allocatePlanType == 1
            ? $(".planTable")[0].scrollLeft
            : $(event.currentTarget).offsetParent()[0].scrollLeft;

        $("#countMachine").css({
          left: left + "px",
          //   right: cRight === null ? "auto" : cRight + "px",
          top: top + "px" // 定位对象不是父级
          //   bottom: cBottom === null ? "auto" : cBottom + "px"
        });

        var inputStr =
          this.allocatePlanType == 1
            ? "itemPInput" + index
            : "dayPInput" + index;
        $bInputBox = $("#" + inputStr).parent(".bInputBox");
        if ($bInputBox.hasClass("error")) {
          $bInputBox.removeClass("error");
          item.energyDataPlan = 0;
        }

        // //  整个外部的高宽
        // var wrapHeight = $("#energyPlanWrap").height();
        // var wrapWidth = $("#energyPlanWrap").width();
        // var wrapX = $("#energyPlanWrap").offset().left;
        // var wrapY = $("#energyPlanWrap").offset().top;
        // // 计算器本身的高和宽
        // var countHeight = $("#countMachine").height();
        // var countWidth = $("#countMachine").width();

        // var clientX = $(event.currentTarget).offset().left - wrapX + 16;
        // var clientY = $(event.currentTarget).offset().top - wrapY + 24;
        // var cBottom = null;
        // var cRight = null;
        // if (clientY + countHeight > wrapHeight) {
        //     cBottom = wrapHeight - ($(event.currentTarget).offset().top - wrapY) - 24;
        // }
        // if (clientX + countWidth > wrapWidth) {
        //     cRight = wrapWidth - ($(event.currentTarget).offset().left - wrapX) - 16;
        // }
        // $("#countMachine").css({ left: cRight === null ? clientX + 'px' : 'auto', right: cRight === null ? 'auto' : cRight + 'px', top: cBottom === null ? clientY + 'px' : 'auto', bottom: cBottom === null ? 'auto' : cBottom + 'px' });

        // var inputStr = this.allocatePlanType == 1 ? 'itemPInput' + index : 'dayPInput' + index;
        // $bInputBox = $("#" + inputStr).parent(".bInputBox");
        // if ($bInputBox.hasClass("error")) {
        //     $bInputBox.removeClass("error");
        //     item.energyDataPlan = 0;
        // }
      }
    },
    plusPlanChoose: function() {
      //选择加法
      this.planCountPlus = true;
    },
    minusPlanChoose: function() {
      this.planCountPlus = false;
    },
    sureCountResult: function() {
      //确定计算结果

      var $input = $("#plusPlanInput");

      var val = $input.val();
      if (this.planCountPlus) {
        this.countItemPlan.energyDataPlan =
          Number(this.countItemPlan.energyDataPlan) + Number(val);
      } else {
        this.countItemPlan.energyDataPlan =
          Number(this.countItemPlan.energyDataPlan) - Number(val);
        this.countItemPlan.energyDataPlan =
          this.countItemPlan.energyDataPlan < 0
            ? 0
            : this.countItemPlan.energyDataPlan;
      }
      v.instance.countMachineShow = false;

      // 3.21
      this.countItemPlan.energyDataPlanDecimal = 0;

      if (this.allocatePlanType == 0) {
        return;
      } //如果是按天计划
      var percent =
        v.instance.monthPlanInfo.monthRemainData > 0
          ? this.countItemPlan.energyDataPlan /
            v.instance.monthPlanInfo.monthRemainData
          : 0;
      this.countItemPlan.energyPlanRatio = Math.round(percent * 1000) / 10;
    }
  },
  beforeMount: function() {
    // here初始化切换计划拆分选项时的缓存
    window.planManageItemsCache = undefined;
    window.planManageDaysCache = undefined;

    var argu = arguments[0];
    this.budget_planDate = new Date(TC(argu.planDate)).getTime();
    this.$nextTick(function() {
      planManController.init(argu);
    });
  },
  mounted: function() {},
  watch: {
    monthPlanInfo: {
      handler: function(newData, oldData) {
        //要不要挪位置
        if (this.firstPlanInfo) {
          //如果是获取接口数据  就不需要计算了
          this.firstPlanInfo = false;
          return;
        }
        var totalData = 0;
        if (
          (this.allocatePlanType == 1 && !newData.itemPlan) ||
          (this.allocatePlanType == 0 && !newData.dayPlan)
        )
          return;
        if (this.allocatePlanType == 1) {
          newData.itemPlan.forEach(function(ele) {
            totalData += testNumber(ele.energyDataPlan)
              ? Number(ele.energyDataPlan)
              : 0;
          });
        } else {
          newData.dayPlan.forEach(function(ele) {
            if (ele.isThisMonth && !ele.isPassDay) {
              totalData += testNumber(ele.energyDataPlan)
                ? Number(ele.energyDataPlan)
                : 0;
            }
          });
        }
        newData.totalPlanData = totalData; //总的计划能耗
        newData.allotOverData = newData.totalPlanData - newData.monthRemainData;
      },
      deep: true
    }
  },
  computed: {}
});
