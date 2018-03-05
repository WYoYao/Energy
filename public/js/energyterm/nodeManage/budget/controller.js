

var budget_controller = {
    // 获取带状态的能耗模型树（预算节点为根节点）
    queryBudgetNodeEditTree: function (argu) {

        // return new Promise(resolve => {
        //     // 唯一的 预算管理节点总数
        //     let MAX_number = _.random(5, 10);

        //     function energyItem(index, parentId = 1) {

        //         let key = _.random(1, 10000) + (+new Date());

        //         var item = {
        //             "energyItemId": key,                //类型：String  必有字段  备注：无
        //             "energyItemCode": "mock",                //类型：String  必有字段  备注：无
        //             "energyItemName": "mock" + index,                //类型：String  必有字段  备注：无
        //             "parentId": parentId,                //类型：String  必有字段  备注：无
        //             "isBudgetNode": index == MAX_number ? true : false,                //类型：Boolean  必有字段  备注：无
        //         };

        //         item.childs = _.range(index - 1).map(function (item, index) {

        //             return energyItem(index, key);
        //         });

        //         return item;
        //     }

        //     let tree = energyItem(MAX_number);

        //     function fn(arr, con) {

        //         return arr.reduce((con, item) => {

        //             if (_.isArray(item.childs) && item.childs.length) {

        //                 con = fn(item.childs, con)
        //             }

        //             delete item.childs;
        //             con.push(item);

        //             return con;
        //         }, con)
        //     }


        //     setTimeout(() => {
        //         resolve(fn([tree], []))
        //     }, _.random(500, 1000));

        // })

        loadding.set('FNPJ_BudgetNodeEditTree');

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

                    loadding.remove('FNPJ_BudgetNodeEditTree');
                }
            });
        })
    },
    saveNodeManagementService: function (argu) {

        // return new Promise(function (resolve) {

        //     setTimeout(() => {

        //         resolve({
        //             "version": "1.0",
        //             "result": "success",
        //             "reason": null,
        //             "content": []
        //         });
        //     }, _.random(1, 1000));

        // })

        return new Promise(function (resolve) {

            pajax.post({
                url: 'FNPJ_NodeManagementService',
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