

var plan_controller = {
    // 查询计划节点树
    queryPlanNodeEditTree: function (argu) {

        // return new Promise(resolve => {
        //     // 唯一的 预算管理节点总数
        //     let MAX_number = _.random(5, 10);

        //     let arrrrr = JSON.parse(JSON.stringify(v.instance.NodeManageModel.nodes.plan));

        //     function energyItem(index, parentId = 1) {

        //         var key = _.random(1, 10000) + (+new Date());

        //         if (index < 1 && arrrrr.length) {
        //             var {
        //                 id: key,
        //                 name: energyItemName
        //             } = arrrrr.shift();

        //         }

        //         var item = {
        //             "energyItemId": key,                //类型：String  必有字段  备注：无
        //             "energyItemCode": "mock",                //类型：String  必有字段  备注：无
        //             "energyItemName": energyItemName ? energyItemName : "mockleo" + index,                //类型：String  必有字段  备注：无
        //             "nodeType": "1",
        //             "parentId": parentId,                //类型：String  必有字段  备注：无
        //             "isCenterBudgetNode": index == MAX_number ? true : false,                //类型：Boolean  必有字段  备注：无
        //             "isCenterPlanNode": index % 2 == 0 ? true : false,
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

        //     var res = fn([tree], []);



        //     setTimeout(() => {
        //         resolve(res)
        //     }, _.random(500, 1000));

        // })

        loadding.set('FNPJ_PlanNodeEditTree');

        return new Promise(function (resolve) {

            pajax.post({
                url: 'FNPJ_PlanNodeEditTree',
                data: argu,
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    console.error('FNPJ_PlanNodeEditTree Error');
                },
                complete: function () {
                    loadding.remove('FNPJ_PlanNodeEditTree');
                }
            });
        })

    },
    // 保存计划节点
    saveNodeManagementService: function (argu) {

        loadding.set('saveNodeManagementService');
        return new Promise(function (resolve) {

            pajax.post({
                url: 'FNPJ_NodeManagementService',
                data: argu,
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    console.error('FNPJ_PlanNodeEditTree Error');
                },
                complete: function () {
                    loadding.remove('saveNodeManagementService');
                }
            });
        })

    }

}