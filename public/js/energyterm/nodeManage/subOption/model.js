v.pushComponent({
  name: "subOption",
  data: {
    NodeManage: [], //预算管理列表
    subOptionTop: 0,
    checkboxModel: true
  },
  methods: {
    // 跳转预算管理节点管理页面
    redirectTobudget: function(NodeManageModel) {
      v.initPage("budget", { NodeManageModel: NodeManageModel });
    },
    // 跳转计划管理节点页面
    redirectToPlan: function(NodeManageModel) {
      v.initPage("plan", { NodeManageModel: NodeManageModel });
    },
    // 记录用户点击时间
    localStorage: function() {
      this.hover = false;
      if (window.localStorage.getItem("cooky") !== "true")
        v.instance.hover = true;
    },
    setStorage: function() {
      var _that = this;

      try {
        window.localStorage.setItem("cooky", _that.checkboxModel);
      } catch (error) {
      } finally {
        _that.hover = false;
      }
    },
    goPrevPage: function() {
      var id;
      this.BuildingsCed.forEach(function(item, index) {
        item.buildingId == v._instance.currentBuild.buildingId
          ? (id = index)
          : void 0;
      });
      this.onPage = "more_build";
      $(".build_select").psel(id, true);
    }
  },
  computed: {
    // 管理分享列表
    NodeManages: function() {
      var _that = this;

      if (_that.Buildings.length && _that.NodeManage.length) {
        return _that.Buildings.map(function(item, index) {
          _that.NodeManage[index].plan = _that.NodeManage[index].plan.sort(
            function(a, b) {
              return a.id < b.id ? 1 : -1;
            }
          );

          return Object.assign({}, item, {
            nodes: _that.NodeManage[index]
          });
        });
      } else {
        return [];
      }
    }
  },
  beforeMount: function() {
    var _that = this;

    //  默认查询完所有的建筑
    return _that.queryBuildingsOfProject().then(function(res) {
      // 并行查询每个建筑的预算管理节点 和 计划管理节点
      return PromiseConcurrent(
        res.map(function(item) {
          return subOption_controller.NodeManagementService.bind(
            subOption_controller,
            {
              buildingId: item.buildingId,
              operation: "query"
            }
          );
        })
      ).then(function(arr) {
        loadding.remove("FNPJ_GetBuildingsOfProject");
        _that.NodeManage = arr;

        return new Promise(function(resolve) {
          // 执行完接口之后的 判断是否弹窗显示
          _that.$nextTick(function() {
            _that.localStorage();

            resolve(arr);
          });
        });
      });
    });
  }
});
