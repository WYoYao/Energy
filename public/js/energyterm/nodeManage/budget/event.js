

window.BudgetNodeEditSubmit = function () {

    $('#confirmWindow').phide();

    v.instance.BudgetNodeEditSubmit()
        .then(function () {

            // 跳转到列表管理页面
            setTimeout(function () {
                v.initPage('subOption');
            }, CONST_LADYTIME);
        });
}

window.BudgetNodeEditSubmitAndPlan = function () {
    $('#confirmWindow').phide();

    v.instance.BudgetNodeEditSubmit()
        .then(function () {

            // 重新更新数据
            v.beforeMount['subOption'].call(v.instance).then(function () {
                v.instance.NodeManageModel = v.instance.NodeManages.filter(function (item) {
                    return item.buildingId == v.instance.NodeManageModel.buildingId;
                })[0];

                v.initPage('plan', { NodeManageModel: v.instance.NodeManageModel });

            })

            //v.initPage('plan', { NodeManageModel: v.instance.NodeManageModel });
        });
}