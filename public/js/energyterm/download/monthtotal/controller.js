// 兼容日期的格式
if (Date) {
    var Bak = Date;
    window.Date = function (param) {

        return /\-/g.test(param) ? new Bak(param.replace(/\-/g, '/')) : param ? new Bak(param) : new Bak();
    }
}


var monthtotal_controller = {
    // 获取能耗预算概述
    FNCT_GetMonthEnergyDataInfo: function (argu) {

        return new Promise(function (resolve, reject) {
            pajax.post({
                url: "/FNCT_GetMonthEnergyDataInfo",
                data: argu,
                success: resolve,
                error: reject,
                complete: function () { }
            })
        })

    },
    // 逐日能耗统计 和 分项能耗统计
    FNCT_GetEnergyDataForDayAndItem: function (argu) {

        return new Promise(function (resolve, reject) {
            pajax.post({
                url: "/FNCT_GetEnergyDataForDayAndItem",
                data: argu,
                success: resolve,
                error: reject,
                complete: function () { }
            })
        })
    },
    FNCT_DayEnergyDataInfo: function (argu) {
        return new Promise(function (resolve, reject) {
            pajax.post({
                url: "/FNCT_DayEnergyDataInfo",
                data: argu,
                success: resolve,
                error: reject,
                complete: function () { }
            })
        })
    }
}