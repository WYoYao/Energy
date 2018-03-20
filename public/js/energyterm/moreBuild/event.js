var more_build_init = function() {
  // 将Vue 实例上面的方法的绑定到　Windows 对象上面
  ["handler_build_select", "handler_date_select"].forEach(function(key) {
    window[key] = v.instance[key].bind(v.instance);
  });
};

var build_select_sel = function(item) {
  if (item.index == 1) {
    v.initPage("subOption");
    $("#build_setting").precover("基础设置");
  } else if (item.index == 0) v.instance.alarmwindow = true;
};

var DTimeSelhistorys = [new Date().format("yyyy-MM-dd hh:mm:ss")];

window.DTimeSel = function() {
  // 判断
  canNotSelectFutureDay(
    +new Date($("#daterightdate").psel().startTime),
    "daterightdate"
  );

  (val = $("#daterightdate").psel()),
    (start = new Date(val.startTime).format("yyyy-MM-dd hh:mm:ss")),
    (end = new Date(val.realEndTime).format("yyyy-MM-dd hh:mm:ss"));

  if (+new Date() < +new Date(TC(start))) {
    $("#globalnotice").pshow({
      text: "请选择当前及历史月份",
      state: "failure"
    });

    var date = new Date(TC(DTimeSelhistorys.slice(-1)[0]));
    // 恢复成历史信息
    $("#daterightdate").psel(
      {
        startTime: +date
      },
      false
    );

    return;
  }

  v.instance.DTimeSel();
};
