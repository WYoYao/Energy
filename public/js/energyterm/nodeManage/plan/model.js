
v.pushComponent({
    name: 'plan',
    data: {
        PlanNodeEditTree: [],//计划节点管理列表
        suboptiontop: {},
    },
    methods: {
        // 定位树的位置
        postionTree: function () {

            var _that = this;

            _that.$nextTick(function () {
                _that.suboptiontop = {
                    top: $(".plan_content .title").height() + $(".plan_content .nodes").height() + 76 + 'px',
                };
            })
        },
        handlerclick: function (item) {

            if (!item.childs.length && item.isplanNode) return false;

            // 未被选中的节点被选中的处理事件
            if (!item.isplanNode) {

                function deep(item) {

                    var deep = arguments.callee;

                    item.isplanNode = false;

                    item.childs.forEach(function (info) {

                        deep(info);
                    })
                };

                deep(item);

                item.isplanNode = true;
            } else {
                //被选中的状态移出状态
                // if (item.childs.length)
                item.isplanNode = false;

                item.childs.map(function (info) {

                    info.isplanNode = true;
                    return info;
                })
            }

        },
        // 保存计划节点
        savePlanNode: function () {

            var _that = this;

            var planItemIds = _that.IsCheckedList.map(function (item) {
                return item.energyItemId;
            });

            var req = {
                "buildingId": _that.NodeManageModel.buildingId,                //类型：String  必有字段  备注：建筑id
                "operation": "save",                //类型：String  必有字段  备注：操作类型 save query
                "planItemIds": planItemIds,
            };

            plan_controller.saveNodeManagementService(req)
                .then(function () {

                    setTimeout(function () {
                        _that.isCenter ? v.initPage("energybyproject") : v.initPage("subOption")
                    }, 500);

                    $("#globalnotice").pshow({ text: "保存成功！", state: "success" });

                }).catch(function () {
                    $("#globalnotice").pshow({ text: "保存失败！", state: "failure" });
                })

        }
    },
    computed: {
        // 已经被选中的集合
        IsCheckedList: function () {

            var _that = this;

            setTimeout(function () {
                _that.postionTree();
            }, 0);

            return this.PlanNodeEditTree.filter(function (item) {
                return item.isplanNode;
            })
        },
        // 带选中装填的数组集合
        PlanNodeEditTreeArray: function () {

            var _that = this;
            // 空处理
            if (!_that.PlanNodeEditTree.length) return {
                childs: []
            };

            // 获取所有的Id 集合
            var selectedArr = _that.NodeManageModel.nodes.plan.map(function (item) {

                return item.id;
            })

            // 附加 附加所有的选中状态
            _that.PlanNodeEditTree = _that.PlanNodeEditTree.map(function (item) {

                item.isplanNode = (selectedArr.indexOf(item.energyItemId) != -1) ? true : false;

                return item;
            })

            _that.arr2tree(_that.PlanNodeEditTree, 'energyItemId', 'parentId', 'childs');

            // if (!selectedArr.length) {

            //     _that.PlanNodeEditTree = _that.PlanNodeEditTree.map(function (item) {

            //         if (!item.childs.length) {
            //             item.isplanNode = true;
            //         }

            //         return item;
            //     })
            // }

            try {
                // 直接缺最顶级的预算节点

                var obj = _that.PlanNodeEditTree.filter(function (item) {

                    return item.energyItemId == _that.NodeManageModel.nodes.budget[0].id;

                })[0] || {};

                if (!selectedArr.length) {

                    var deepFn = function (obj) {
                        if (obj.childs.length) obj.childs.forEach(deepFn);
                        else obj.isplanNode = true;
                    }

                    deepFn(obj);
                }

                return obj;


            } catch (error) {

                return {};
            }

            return _that.PlanNodeEditTree;
        }
    },
    beforeMount: function () {

        var _that = this;

        plan_controller.queryPlanNodeEditTree({
            buildingId: _that.NodeManageModel.buildingId,
        }).then(function (res) {




            _that.PlanNodeEditTree = res.map(function (item) {
                item.isplanNode = false;
                return item;
            });
        })
    }
})

