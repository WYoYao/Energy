

var budget_controller = {
    // 获取带状态的能耗模型树（预算节点为根节点）
    queryBudgetNodeEditTree: function (argu) {

        return new Promise(resolve => {



            setTimeout(() => {
                resolve()
            }, _.random(500, 1000));

        })

        return new Promise(function (resolve) {

            pajax.post({
                url: 'FNPJ_BudgetNodeEditTree',
                data: argu,
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    console.error('FNPJ_BudgetNodeEditTree Error');
                },
                complete: function () {

                }
            });
        })
    }
}