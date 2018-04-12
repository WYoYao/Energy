var more_build_init = function() {
  // 将Vue 实例上面的方法的绑定到　Windows 对象上面
  ["handler_build_select", "handler_date_select"].forEach(function(key) {
    window[key] = v.instance[key].bind(v.instance);
  });
};

var build_select_sel = function(item) {
  if (item.index == 1) {
    v.instance.isIndexGoF = true;
    v.initPage("subOption");
    $("#build_setting").precover("基础设置");
  } else if (item.index == 0) v.instance.alarmwindow = true;
};

var DTimeSelhistorys = [new Date().format("yyyy-MM-dd hh:mm:ss")];

window.DTimeSel = function() {
  var val = $("#daterightdate").psel(),
    start = new Date(val.startTime).format("yyyy-MM-dd hh:mm:ss"),
    end = new Date(val.realEndTime).format("yyyy-MM-dd hh:mm:ss");

  if (+new Date() < +new Date(TC(start))) {
    $("#globalnotice").pshow({
      text: "该日未发生能耗",
      state: "failure"
    });

    var date = new Date(TC(v.instance.DbaseMessage.timeFrom));
    // 恢复成历史信息
    $("#daterightdate").psel(
      {
        startTime: +date
      },
      false
    );

    return;
  }

  DTimeSelhistorys.push(TC(start));

  // 判断
  canNotSelectFutureDay(
    +new Date($("#daterightdate").psel().startTime),
    "daterightdate"
  );
  v.instance.DTimeSel();
};
