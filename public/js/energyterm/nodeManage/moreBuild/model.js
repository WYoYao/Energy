

v.pushComponent({
    name: 'more_build',
    data: {
        Buildings: [],
        BuildingEnergyOutlines: [],
    },
    methods: {
        // 建筑下拉菜单选项
        handler_build_select: function (item) {
            if (item.buildingId == 'all') {

                // 初始化全部列表
                alert('初始化全部列表');
            } else {

                // 页面切换到的每个单一的页面
                alert('页面切换到的每个单一的页面');
            }

        },
        // 日历选择事件
        handler_date_select: function (item) {

            var val = $("#divCalendar").psel(),
                start = new Date(val.startTime).format('yyyy-MM-dd hh:mm:ss'),
                end = new Date(val.realEndTime).format('yyyy-MM-dd hh:mm:ss');

            console.log(start, end);

        },
        // 查询多个建筑的能耗信息
        queryBuildingEnergy: function () {

            var _that = this;

            // 查询当前项目下面的所有建筑
            return more_build_controller.FNPJ_GetBuildingEnergyOutline().then(res => {

                _that.BuildingEnergyOutlines = res;

                // 返回的Promise 对象
                return new Promise(function (resolve) {

                    resolve(res);
                })
            })
        },
        // 查询多个建筑下拉菜单
        queryBuildingsOfProject: function (timeFrom, timeTo) {

            var _that = this;

            // 获取的默认的月份
            if (!timeFrom || !timeTo) {
                var date = new Date(),
                    year = date.format('yyyy'),
                    month = date.format('MM');
                // 默认开始时间
                timeFrom = timeFrom || (year + '-' + month + '-01 00:00:00');
                // 默认结束时间
                timeTo = timeTo || ((month == 12 ? year + 1 : year) + '-' + (month == 12 ? 1 : +month + 1) + '-01 00:00:00');
            }

            // 查询所有建筑的能耗信息F
            return more_build_controller.FNPJ_GetBuildingsOfProject({
                timeFrom: timeFrom,
                timeTo: timeTo,
            }).then(function (res) {

                _that.Buildings = res;

                // 返回的Promise 对象
                return new Promise(function (resolve) {

                    resolve(res);
                })
            })

        }
    },
    computed: {
        // 建筑名称下拉菜单添加 全部
        BuildingsCed: function () {

            return [{
                buildingId: 'all',
                buildingName: '全部',
                isMain: 0,
            }].concat(this.Buildings);
        },
        // 用于页面渲染的 建筑列表
        BuildingEnergyOutlinesCed: function () {
            var _that = this;

            return _that.BuildingEnergyOutlines.map(function (item) {

                // 报警预警百分比转换
                item.alarmRatio = _that.convertPercentage(item.alarmRatio).toFixed(1) + '%';
                item.warningRatio = _that.convertPercentage(item.warningRatio).toFixed(1) + '%';

                // 实际能耗 和 目标能耗的 千位转换
                item.monthEnergyData = _that.toThousands(item.monthEnergyData);
                item.monthBudgetData = _that.toThousands(item.monthBudgetData);

                // 计算出百分比
                item.proportion = (item.monthEnergyData / item.monthBudgetData).toFixed(3);
                // 百分比数字
                item.proportionNumber = + _that.convertPercentage(+item.proportion).toFixed(1);
                // 百分比显示的文字
                item.proportionName = item.proportionNumber + '%';

                return item;
            });
        }
    },
    beforeMount() {
        var _that = this;

        // 默认查询建筑下拉菜单
        _that.queryBuildingEnergy();
        // 默认查询所有的建筑信息
        _that.queryBuildingsOfProject();

        // 将一些 Vue 上面的方法直接挂到Windows 对象上面
        more_build_init();
    }
})