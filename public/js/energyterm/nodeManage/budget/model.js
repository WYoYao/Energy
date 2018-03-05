

v.pushComponent({
    name: 'budget',
    data: {
        BudgetNodeEditTree: [], //预算管理列表
    },
    methods: {
        handler_selected: function (item) {
            var _that = this;

            _that.BudgetNodeEditTree.forEach(function (element) {
                if (item == element)
                    element.isBudgetNode = true;
                else
                    element.isBudgetNode = false;
            });
        },
        BudgetNodeEditSubmit: function () {
            var _that = this,
                res;

            res = _that.BudgetNodeEditTree.filter(function (item) {
                return item.isBudgetNode;
            })[0];

            //深Copy
            // res = JSON.parse(JSON.stringify(res));

            // 后台提交修改
            return budget_controller.saveNodeManagementService({
                buildingId: _that.NodeManageModel.buildingId,
                operation: "save",
                budgetItemId: res.energyItemId,
            }).then(function () {

                $("#globalnotice").pshow({ text: "保存成功！", state: "success" });

                return new Promise(function (resolve) {

                    resolve();
                })

            }).catch(function () {
                $("#globalnotice").pshow({ text: "保存失败！", state: "failure" });
            })
        }
    },
    computed: {
        // 带装填的预算管理节点树
        BudgetNodeTree: function () {

            var _that = this;

            if (!_that.BudgetNodeEditTree.length) return {
                childs: []
            };

            return _that.arr2tree(_that.BudgetNodeEditTree, 'energyItemId', 'parentId', 'childs');
        }
    },
    beforeMount:function() {

        var _that = this;

        // 查询结构树数组
        budget_controller.queryBudgetNodeEditTree({ buildingId: _that.NodeManageModel.buildingId })
            .then(function (res) {
                _that.BudgetNodeEditTree = res;
            })

    }
})

