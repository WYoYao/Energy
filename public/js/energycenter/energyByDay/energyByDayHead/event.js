function DTimeSel() {
    // var el = v._instance.onPage == 'energybyday' ? $("#energyByDayHead_ptime") : $("#daterightdate");
    var el = $("#energyByDayHead_ptime");
    var _date = el.psel().startTime;
    var TDate = v._instance.getToday().getTime();
    if (_date <= TDate) {
        v._instance.DTimeSel();
    } else {
        $("#globalnotice").pshow({ text: "该日未发生能耗", state: "failure" });
        el.psel({ startTime: TC(v._instance.DbaseMessage.timeFrom)},false);
    }
    cantSelectFutureDay(el.psel().startTime,'energyByDayHead_ptime');
}
function isToday(time) {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    var _date = date.getTime();
    var bak = time == _date ? 0 : time > date ? 1 : -1;
    return bak;
}