

v.pushComponent({
    name: 'budget',
    data: {
        BudgetNodeEditTree: [], //预算管理列表
        BaseEnergyItemId: '', // 第一次从服务器中查询出的预算节点ID
    },
    methods: {
        // 验证是否修改过预算节点，如果没有修改过直接保存提交
        valiteChange: function () {

            //深Copy
            // res = JSON.parse(JSON.stringify(res));
            var _that = this;

            if (_that.BaseEnergyItemId == _that.currentEnergyItem.energyItemId) {
                return new Promise(function (resolve) {

                    $("#globalnotice").pshow({ text: "保存成功！", state: "success" });

                    setTimeout(function () {

                        _that.onPage = "subOption";

                        resolve();
                    }, 500);
                })
            } else {
                $('#confirmWindow').pshow({ title: '您修改了预算管理节点', subtitle: '修改预算管理节点后，默认选择新节点下的所有叶子节点为计划管理节点，是否继续保存' })
            }
        },
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

            res = _that.currentEnergyItem;

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
        },
        currentEnergyItem: function () {
            var _that = this;

            if (_.isArray(_that.BudgetNodeEditTree)) {
                return _that.BudgetNodeEditTree.filter(function (item) {
                    return item.isBudgetNode;
                })[0] || {};
            }

            return {};
        }
    },
    beforeMount: function () {

        var _that = this;

        // 查询结构树数组
        budget_controller.queryBudgetNodeEditTree({ buildingId: _that.NodeManageModel.buildingId })
            .then(function (res) {
                _that.BudgetNodeEditTree = res;

                // 保存最初的预算节点ID
                for (var index = 0; index < _that.BudgetNodeEditTree.length; index++) {
                    var element = _that.BudgetNodeEditTree[index];

                    if (element.isBudgetNode) {
                        _that.BaseEnergyItemId = element.energyItemId;
                        break;
                    }
                }
            })

    }
})

