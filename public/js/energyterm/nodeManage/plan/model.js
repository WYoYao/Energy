

v.pushComponent({
    name: 'plan',
    data: {
        plan: [], //预算管理列表
    },
    methods: {

    },
    computed: {
        // 带装填的预算管理节点树
        PlanNodeTree: function () {

            // 唯一的 预算管理节点总数
            var isBudgetNode_number = _.random(1, 100),
                MAX_number = _.random(8, 15);

            function energyItem(index) {

                var item = {
                    "energyItemId": "mock",                //类型：String  必有字段  备注：无
                    "energyItemCode": "mock",                //类型：String  必有字段  备注：无
                    "energyItemName": "mock" + index,       //类型：String  必有字段  备注：无
                    "nodeType": 1,                //类型：Number  必有字段  备注：无
                    "parentId": "mock",                //类型：String  必有字段  备注：无
                    "isCenterBudgetNode": false,                //类型：Boolean  必有字段  备注：无
                    "isBudgetNode": index == MAX_number ? true : false,    //类型：Boolean  必有字段  备注：无
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


    }
})

