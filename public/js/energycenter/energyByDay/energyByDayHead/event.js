function DTimeSel() {

    var _date = $("#energyByDayHead_ptime").psel().startTime;
    var TDate = v._instance.getToday().getTime();
    if (_date <= TDate) {
        v._instance.DTimeSel();
        canNotSelectFutureDay(_date, 'energyByDayHead_ptime');
    } else {
        $("#globalnotice").pshow({ text: "该日未发生能耗", state: "failure" });
        $("#energyByDayHead_ptime").psel({ startTime: TDate });
    }

}
function canNotSelectFutureDay(date, el) {
    el = window.document.getElementById(el);
    var _el = $(el).find(".per-squarebutton-grayBorder").eq(1);
    date == getTodayTime() ? _el.attr("pdisabled", "true") : _el.attr("pdisabled", "false");
}
function getTodayTime() {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.setMilliseconds(0);
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