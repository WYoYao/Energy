// 兼容日期的格式
if (Date) {
  var Bak = Date;
  window.Date = function(param) {
    return /\-/g.test(param)
      ? new Bak(param.replace(/\-/g, "/"))
      : param ? new Bak(param) : new Bak();
  };
}

// 乘以100
function x100(num) {
  return _.isNumber(num) ? num * Math.pow(10, 2) : num;
}

//  向下去整
function floor(num) {
  return _.isNumber(num) ? _.floor(num) : num;
}

// 大于1保留1位 小于1保留3位
function v3(num) {
  var f = num < 0 ? -1 : 1;
  return _.isNumber(num)
    ? Math.abs(num) < 1
      ? _.floor(Math.abs(num), 3) * f
      : _.floor(Math.abs(num), 1) * f
    : num;
}

function cs(real, budget) {
  var _that = this;
  return {
    color: this.fcolor(real, budget)
  };
}
function fcolor(real, budget) {
  return _.isNumber(real) && _.isNumber(budget)
    ? real > budget ? "#FF7B7B" : "#02A9D1"
    : "#02A9D1";
}

function color(bool) {
  return {
    color: bool ? "#FF7B7B" : "#02A9D1"
  };
}

var monthtotal_controller = {
  // 获取能耗预算概述
  FNCT_GetMonthEnergyDataInfo: function(argu) {
    return new Promise(function(resolve, reject) {
      pajax.post({
        url: "/FNCT_GetMonthEnergyDataInfo",
        data: argu,
        success: function(res) {
          //   res[0].sameRatio = v3(res[0].sameRatio);
          //   res[0].alarmRatio = v3(res[0].alarmRatio);
          //   res[0].circleRatioData = v3(res[0].circleRatioData);
          //   res[0].sameRatioData = v3(res[0].sameRatioData);
          //   res[0].circleRatio = v3(res[0].circleRatio);
          //   res[0].energyOccupyBudgetRatio = v3(res[0].energyOccupyBudgetRatio);
          //   res[0].passedTimeRatio = v3(res[0].passedTimeRatio);
          //   res[0].monthEnergyData = v3(res[0].monthEnergyData);
          //   res[0].energyOccupyPlanRatio = v3(res[0].energyOccupyPlanRatio);
          //   res[0].warningRatio = v3(res[0].warningRatio);
          //   res[0].monthBudgetData = floor(res[0].monthBudgetData);
          resolve(res);
        },
        error: reject,
        complete: function() {}
      });
    });
  },
  // 逐日能耗统计 和 分项能耗统计
  FNCT_GetEnergyDataForDayAndItem: function(argu) {
    return new Promise(function(resolve, reject) {
      pajax.post({
        url: "/FNCT_GetEnergyDataForDayAndItem",
        data: argu,
        success: function(res) {

          //res[0].day = res[0].day.concat(JSON.parse(JSON.stringify(res[0].day)))

          // res[0].day = res[0].day.map(function(item) {
          //   // 计划数向下取整
          //   item.planData = floor(item.planData);
          //   // 实际能耗向下去整
          //   item.energyData = v3(item.energyData);

          //   return item;
          // });

          //res[0].items = res[0].items.concat(JSON.parse(JSON.stringify(res[0].items)))
          // res[0].items = res[0].items.map(function(item) {
          //   item.planRatio = v3(item.planRatio);
          //   item.energyData = v3(item.energyData);
          //   item.monthTodayEnergyPlan = floor(item.monthTodayEnergyPlan);
          //   item.monthEnergyPlan = floor(item.monthEnergyPlan);
          //   return item;
          // });

          resolve(res);
        },
        error: reject,
        complete: function() {}
      });
    });
  },
  FNCT_DayEnergyDataInfo: function(argu) {
    return new Promise(function(resolve, reject) {
      pajax.post({
        url: "/FNCT_DayEnergyDataInfo",
        data: argu,
        success: resolve,
        error: reject,
        complete: function() {}
      });
    });
  }
};
