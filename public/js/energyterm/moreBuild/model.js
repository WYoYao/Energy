var Datehistorys = [new Date().format("yyyy-MM-dd hh:mm:ss")];

v.pushComponent({
  name: "more_build",
  data: {
    Buildings: [], // 获取的城市列表
    BuildingEnergyOutlines: [], // 多建筑的建筑能耗信息
    alarmwindow: false, // 预警报警开关
    AlarmAndWarning: [], // 查询报警预警的信息
    onBlock: "more", // 控制单楼多楼的显示
    currentBuild: {
      buildingId: "all",
      buildingName: "全部",
      isMain: 0
    },
    hover: false,
    //  卡片直接设置预算管理
    isSettingbudget: ""
  },
  methods: {
    //  设置预算管理节点
    Settingbudget: function(item) {
      var _that = this,
        argu = {};

      // 保存当前的时间
      argu.SettingbudgetDate = $("#divCalendar").psel().startTime;
      argu.buildingId = item.buildingId;

      // 跳转预算管理页面
      v.initPage("budget_manage", item.buildingId, argu);
    },
    // 下载日能耗报告
    downLoadDayPDF: function() {
      _that = this;
      var argu = {};
      // 是否是日总或分项报告
      argu.isBudgetNode = +!!_that.DAllItems.filter(function(item) {
        if (item.clicked) {
          argu.energyItemId = item.id;
          argu.energyItemName = item.name;
        }
        return item.clicked && item.budgetNode;
      }).length;

      // 绑定基础查询参数
      argu.buildingName = _that.currentBuild.buildingName;
      argu.buildingId = _that.currentBuild.buildingId;
      argu.timeFrom = new Date($("#daterightdate").psel().startTime).format(
        "yyyy-MM-dd hh:mm:ss"
      );

      downLoadPdf(argu.isBudgetNode ? "daytotal" : "dayterm", argu);
    },
    // 下载月能耗报告
    downLoadMonthPDF: function() {
      var planDate = new Date($("#divCalendar").psel().startTime);

      //  月总参数
      var argu = {
        buildingName: v.instance.currentBuild.buildingName,
        buildingId: v.instance.currentBuild.buildingId,
        timeFrom: planDate.format("yyyy-MM-dd hh:mm:ss"),
        timeTo: new Date(
          planDate.getFullYear(),
          planDate.getMonth() + 1,
          1
        ).format("yyyy-MM-dd hh:mm:ss")
      };

      downLoadPdf("monthtotal", argu);
    },
    //头部时间选择
    DTimeSel: function() {
      this.Dactivate({
        timeFrom: new Date($("#daterightdate").psel().startTime).format(
          "yyyy-M-d h:m:s"
        )
      });
    },
    handler_block_click: function(item) {
      var index = this.BuildingsCed.reduce(function(con, info, index) {
        if (item.buildingId == info.buildingId) {
          return index;
        }
        return con;
      }, 0);

      $("#build_select").psel(index, true);
    },
    // 建筑下拉菜单选项
    handler_build_select: function(item) {
      var _that = this;

      _that.currentBuild = item;

      if (item.buildingId == "all") {
        _that.onBlock = "more";
        var value = $("#divCalendar").psel();

        _that.queryBuildingEnergy(
          new Date(value.startTime).format("yyyy-M-d h:m:s"),
          new Date(value.endTime).format("yyyy-M-d h:m:s")
        );
        // 初始化全部列表
      } else {
        var value = $("#divCalendar").psel();

        _that.onBlock = "list";

        _that.energyByProjectActivate({
          buildingId: item.buildingId,
          timeFrom: new Date(value.startTime).format("yyyy-M-d h:m:s"),
          NowModel: "term"
        });
      }
    },
    // 日历选择事件
    handler_date_select: function(item) {
      var _that = this,
        val = $("#divCalendar").psel(),
        start = new Date(val.startTime).format("yyyy-MM") + "-01 00:00:00",
        end = new Date(val.realEndTime).format("yyyy-MM-dd hh:mm:ss");

      if (+new Date() < +new Date(TC(start))) {
        $("#globalnotice").pshow({
          text: "请选择当前及历史月份",
          state: "failure"
        });

        // 恢复成历史信息
        $("#divCalendar").psel(
          {
            startTime: new Date(TC(Datehistorys.slice(-1)[0])).format(
              "yyyy/MM/dd 00:00:00"
            )
          },
          false
        );

        return;
      }

      var _el = $("#divCalendar")
        .find(".per-squarebutton-grayBorder")
        .eq(1);
      _el.attr(
        "pdisabled",
        +new Date(new Date().format("yyyy/MM/") + "01 00:00:00") ==
          +new Date(start)
      );

      Datehistorys.push(+new Date(start));

      if (_that.onBlock == "more") {
        _that.currentBuild = _that.BuildingsCed[0];
      }

      if (_that.currentBuild.buildingId == "all") {
        _that.handler_build_select(_that.currentBuild);
      } else {
        _that.energyByProChange({ timeFrom: start });
      }
    },
    // 查询多个建筑的能耗信息
    queryBuildingEnergy: function() {
      var _that = this;

      var val = $("#divCalendar").psel(),
        start = new Date(val.startTime).format("yyyy-MM-dd hh:mm:ss"),
        end = new Date(val.realEndTime).format("yyyy-MM-dd hh:mm:ss");

      argu = {
        timeFrom: start,
        timeTo: end
      };

      // 查询当前项目下面的能耗
      return more_build_controller
        .FNPJ_GetBuildingEnergyOutline(argu)
        .then(function(res) {
          _that.BuildingEnergyOutlines = res;

          // 返回的Promise 对象
          return new Promise(function(resolve) {
            resolve(res);
          });
        });
    },
    // 查询多个建筑下拉菜单
    queryBuildingsOfProject: function(timeFrom, timeTo) {
      var _that = this;

      // 查询所有建筑的能耗信息F
      return more_build_controller
        .FNPJ_GetBuildingsOfProject()
        .then(function(res) {
          _that.Buildings = res;

          // 返回的Promise 对象
          return new Promise(function(resolve) {
            _that.$nextTick(function() {
              resolve(_that.Buildings);
            });
          });
        })
        .catch(function() {
          // 容错处理
          _that.Buildings = [];

          // 返回的Promise 对象
          return new Promise(function(resolve) {
            resolve([]);
          });
        });
    },
    // 修改报警预警提示
    handle_change_alarm: function(model) {
      model.switch = !+model.switch;

      model.sensitive.SELECTED = null;
    },
    // 修改报警预警等级
    handle_change_level: function(index, model) {
      model.SELECTED = index;
    },
    saveAlarm: function() {
      var _that = this,
        model = _that.AlarmAndWarning[0],
        argu;

      argu = {
        switchAlarm: +model.alarm.switch,
        switchWarning: +model.warning.switch,
        sensitiveAlarm: +model.alarm.sensitive.SELECTED,
        sensitiveWaring: +model.warning.sensitive.SELECTED
      };

      more_build_controller
        .AlarmAndWarningSave(argu)
        .then(function(res) {
          $("#globalnotice").pshow({ text: "保存成功！", state: "success" });
          $("#build_setting").precover("基础设置");
          _that.alarmwindow = false;

          //  如果当前在列表页面重新获取数据
          if (_that.onBlock == "list") _that.createGetProjectEnergyParam();
        })
        .catch(function() {
          $("#globalnotice").pshow({ text: "保存失败！", state: "failure" });
          _that.alarmwindow = false;
        });
    }
  },
  computed: {
    // 是否能点击保存预警报警
    disabled: function() {
      var _that = this;
      //  没有加载的时候直接返回 True
      if (!_that.AlarmAndWarning.length) return true;

      var bool =
        (+_that.AlarmAndWarning[0].alarm.switch &&
          _that.AlarmAndWarning[0].alarm.sensitive.SELECTED == null) ||
        (+_that.AlarmAndWarning[0].warning.switch &&
          _that.AlarmAndWarning[0].warning.sensitive.SELECTED == null)
          ? true
          : false;

      $("#alarm").pdisable(bool);

      return bool;
    },
    // 建筑名称下拉菜单添加 全部
    BuildingsCed: function() {
      return [
        {
          buildingId: "all",
          buildingName: "全部",
          isMainisMain: 0
        }
      ].concat(this.Buildings);
    },
    // 用于页面渲染的 建筑列表
    BuildingEnergyOutlinesCed: function() {
      var _that = this;

      return _that.BuildingEnergyOutlines.map(function(item) {
        // 添加是否是本月的记录
        item.isToMonth =
          +new Date(new Date().format("yyyy/MM/1 00:00:00")) ==
          $("#divCalendar").psel().startTime;

        // 报警预警百分比转换
        item.alarmRatio = item.alarmRatio
          ? item.alarmRatio.toFixed(1) + "%"
          : "";
        item.warningRatio = item.warningRatio
          ? item.warningRatio.toFixed(1) + "%"
          : "";

        // 计算出百分比
        item.proportion = item.monthBudgetData
          ? (item.monthEnergyData / item.monthBudgetData || 0).toFixed(5) || 0
          : 0;

        // 实际能耗 和 目标能耗的 千位转换
        item.monthEnergyData = item.monthEnergyData
          ? _that.toThousands(item.monthEnergyData)
          : item.monthEnergyData;

        item.monthBudgetData = item.monthBudgetData
          ? _that.toThousands(item.monthBudgetData)
          : item.monthBudgetData;

        // 百分比数字
        item.proportionNumber =
          +item.proportion > 0.01
            ? +_that.convertPercentage(+item.proportion).toFixed(1)
            : +item.proportion != 0
              ? +_that.convertPercentage(+item.proportion).toFixed(3)
              : 0;

        item.proportionNumber =
          item.proportionNumber == Infinity ? 100 : item.proportionNumber;
        // 百分比显示的文字
        item.proportionName =
          item.proportionNumber == Infinity ? "0" : item.proportionNumber + "%";

        item.proportionNumberBai =
          item.proportionNumber > 100 ? 100 : item.proportionNumber;

        return item;
      });
    }
  },
  watch: {
    alarmwindow: function(bool) {
      var _that = this;

      // 根据值展示或隐藏框内容

      if (bool) {
        more_build_controller
          .FNPJ_AlarmAndWarningQuery({
            projectId: _that.projectId
          })
          .then(function(res) {
            _that.AlarmAndWarning = res;

            _that.$nextTick(function() {
              $("#modalWindow").pshow();
            });
          });
      } else {
        $("#modalWindow").phide();

        setTimeout(function() {
          _that.AlarmAndWarning = [];
        }, 500);
      }
    },
    onBlock: function(newValue) {
      if (newValue == "detail") {
        setTimeout(function() {
          canNotSelectFutureDay(
            +new Date($("#daterightdate").psel().startTime),
            "daterightdate"
          );
        }, 0);
      }
    }
  },
  beforeMount: function() {
    var _that = this;

    _that.$nextTick(function() {
      //默认查询建筑下拉菜单
      _that.queryBuildingsOfProject().then(function(res) {
        if (res.length > 1) {
          // 多楼情况
          // 默认查询建筑能耗信息
          _that.queryBuildingEnergy();
          // 默认选中全部
          $("#build_select").psel(0, false);
        } else {
          //单楼情况
          $("#build_select").psel(1, true);
          loadding.remove("FNPJ_GetBuildingsOfProject");
        }
      });
    });

    // 将一些 Vue 上面的方法直接挂到Windows 对象上面
    more_build_init();

    this.proInitChart();

    // 定时限制选择
    setTimeout(function() {
      canNotSelectFutureDay(
        $("#divCalendar").psel().startTime,
        "divCalendar",
        true
      );
    }, 0);
  }
});
