

// 路径枚举
var enum_path = {
    monthtotal: 'monthtotal',   // 月总
    daytotal: 'daytotal',       // 日总
    dayterm: 'dayterm',         // 日分项
}

//  日总 日分享 参数
var argu = {
    buildingName: "日总日分享建筑名",
    buildingId: "Bd1101010001001",
    timeFrom: "2018-02-01 00:00:00",
    energyItemId: "VOEi11010100010002",
    isBudgetNode: 0,
}

//  月总参数
var argu1 = {
    buildingName: "月总建筑名",
    buildingId: "VOBd11010100050001",
    timeFrom: "2018-02-01 00:00:00",
    timeTo: "2018-02-02 00:00:00",
}

downLoadPdf('daytotal', {
    buildingName: "日总日分享建筑名",
    buildingId: "Bd1101010001001",
    timeFrom: "2018-02-01 00:00:00",
    energyItemId: "VOEi11010100010002",
    isBudgetNode: 0,
});

// /**
//  * 下载PDF 
//  */
function downLoadPdf(type, argu) {

    // 需要跳转的路径参数
    var url = '/' + type + '?query=' + psecret.create(JSON.stringify(argu));

    if ($("#iframeDownload").length) {

        // 有的情况直接的跳转链接
        $("#iframeDownload").attr("src", url);
    } else {

        $('<iframe id="iframeDownload" src="' + url + '" style="display:none" frameborder="0"></iframe>').appendTo("body");
    }

}

fn(enum_path.monthtotal, argu1);

v.instance.BuildingEnergyOutlinesCed.map(item => {
    item.width = '' + item.proportionNumber > 100 ? 100 : item.proportionNumber + '%';
    return item;
})