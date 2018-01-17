

v.pushComponent({
    name: 'subOption',
    data: {
        NodeManage: [], //预算管理列表
    },
    methods: {
        // 跳转预算管理节点管理页面
        redirectTobudget: function (NodeManageModel) {

            v.initPage('budget', { NodeManageModel: NodeManageModel });
        },
        // 跳转计划管理节点页面
        redirectToPlan: function (item) {

            v.initPage('plan', { NodeManageModel: NodeManageModel });
        },
    },
    computed: {
        // 管理分享列表
        NodeManages: function () {
            var _that = this;

            if (_that.Buildings.length && _that.NodeManage.length) {

                return _that.Buildings.map(function (item, index) {

                    return Object.assign({}, item, { nodes: _that.NodeManage[index] });;
                });

            } else {

                return [];
            }
        }
    },
    beforeMount() {

        var _that = this;

        //  默认查询完所有的建筑
        _that.queryBuildingsOfProject().then(function (res) {

            // 并行查询每个建筑的预算管理节点 和 计划管理节点
            PromiseConcurrent(
                res.map(function (item) {

                    return subOption_controller.NodeManagementService.bind(subOption_controller, {
                        buildingId: item.buildingId,
                        operation: "query",
                    })
                })
            ).then(function (arr) {

                _that.NodeManage = arr;
            })
        });
    }
})

