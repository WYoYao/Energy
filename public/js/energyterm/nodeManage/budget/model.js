

v.pushComponent({
    name: 'budget',
    data: {
        BudgetNodeEditTree: [], //预算管理列表
    },
    methods: {

    },
    computed: {
        // 带装填的预算管理节点树
        BudgetNodeTree: function () {

            // 唯一的 预算管理节点总数
            var MAX_number = _.random(10, 20);

            function energyItem(index) {

                var item = {
                    "energyItemId": "mock",                //类型：String  必有字段  备注：无
                    "energyItemCode": "mock",                //类型：String  必有字段  备注：无
                    "energyItemName": "mock" + index,                //类型：String  必有字段  备注：无
                    "parentId": "mock",                //类型：String  必有字段  备注：无
                    "isBudgetNode": index == MAX_number ? true : false,                //类型：Boolean  必有字段  备注：无
                };

                item.childs = _.range(index - 1).map(function (item, index) {

                    return energyItem(index);
                });

                return item;
            }

            return energyItem(MAX_number);

        }
    },
    beforeMount() {

        var _that = this;

        subOption_controller.NodeManagementService({ buildingId: _that.NodeManageModel.buildingId })

    }
})

