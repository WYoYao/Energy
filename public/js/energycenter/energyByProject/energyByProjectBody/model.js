v.pushComponent({
    name: "energybyprojectbody",
    el: "PBBody",
    data: {
        PBaseMessage: {},
        PprojectInfo: {},
        PproDayAndItemInfo: {},
        PprojectSomeInfo: {
            ifHasBudget: true,
            ifHasPlan: true,
            ifHasPlanItems: true
        },
        PprojectGridPage: true,
        PsectorData: {
            energyPlanPercent: [],
            energyTodayPlanPercent: []
        },
        Ploading: null,
        PPL: null,
        PChartTooltip: {
            x: null,
            y: null,
            index: null,
            show: false
        },
        planBackPage: 'more_build',
    },
    methods: {
        // 激活该页
        // buildingId,timeFrom NowModel
        energyByProjectActivate: function (paramObj) {
            this.Ploading = 2;
            $("#globaloadng").pshow();
            window.PChartHoverNum = undefined;
            // this.proInitChart();
            this.PBaseMessage = paramObj;
            this.PBaseMessage.timeTo = this.getMonthLastDay(new Date(TC(paramObj.timeFrom))).format("yyyy-M-d h:m:s");
            //获取数据
            this.createGetProjectEnergyParam();
            setTimeout(function () {
                v._instance.proInitChart();
                // createRatioDiagram('PB_pointer', 0, 4, 8, 65, '#DBE6EA');
            }, 0)
        },

        //头部更改参数  buildingId,timeFrom
        energyByProChange: function (paramObj) {
            if (paramObj.buildingId == undefined) {
                this.PBaseMessage.timeFrom = paramObj.timeFrom;
                this.PBaseMessage.timeTo = this.getThisMonth().format("yyyy-M-d h:m:s") == paramObj.timeFrom ? this.getToday().format("yyyy-M-d h:m:s") : this.getMonthLastDay(new Date(TC(paramObj.timeFrom))).format("yyyy-M-d h:m:s");
            } else {
                this.PBaseMessage.buildingId = paramObj.buildingId;
            }
            this.createGetProjectEnergyParam();
        },

        //组装参数
        createGetProjectEnergyParam: function () {
            this.Ploading == 0 ? $("#Ppartloading").pshow() : void 0;
            this.Ploading == 0 ? this.PPL = 2 : void 0;
            var paramObj1 = {
                buildingId: this.PBaseMessage.buildingId,
                timeFrom: this.PBaseMessage.timeFrom,
                timeTo: this.PBaseMessage.timeTo
            }
            var paramObj2 = {
                buildingId: this.PBaseMessage.buildingId,
                timeFrom: this.PBaseMessage.timeFrom,
                isDownload: false
            }
            this.GetEnergyDataForDayAndItem(paramObj1);
            this.GetMonthEnergyData(paramObj2);
        },

        //获取项目日分项与节点能耗
        GetEnergyDataForDayAndItem: function (paramObj) {
            var _this = this;
            window.PChartHoverNum = undefined;
            energyByProController.GetEnergyDataForDayAndItem(paramObj, function (data) {
                data = JSON.parse(JSON.stringify(data));
                data[0].items.sort(function (a, b) {
                    return b.energyItemId > a.energyItemId ? -1 : 1
                })
                _this.PproDayAndItemInfo = data[0];
                _this.PprojectSomeInfo.ifHasPlanItems = data[0].items.length == 0 ? false : true;

                // 处理图表
                setTimeout(function () {
                    if (v._instance.onPage == 'energybyproject' || v._instance.onBlock == 'list') {
                        if (v.instance.PprojectSomeInfo.ifHasPlanItems) {
                            v._instance.PprojectSomeInfo.ifHasPlan ? v._instance.ProjectSectorReady() : void 0;
                            v._instance.ProjectBarReady();
                        }
                        v._instance.ProjectChartReady();
                    }
                }, 0)

            }, function () {
                $("#globalnotice").pshow({ text: "无法连接服务器", state: "failure" });
            }, function () {
                _this.Ploading != 0 ? _this.Ploading-- : void 0;
                _this.PPL--;
            })

        },

        //处理图表
        ProjectChartReady: function () {
            var energyPlan = [], energyReal = [], energyProxAxis = [];
            this.PproDayAndItemInfo.day.forEach(function (item, index) {
                energyPlan.push(item.planData != null ? [FON(item.planData), "energyplan" + index] : [0, "energyplan" + index]);
                energyReal.push(item.energyData == null ? [0, "energyreal" + index, "#02A9D1"] : item.energyData > item.planData && item.planData != null ? [FON(item.energyData), "energyreal" + index, "#F89054"] : [FON(item.energyData), "energyreal" + index, "#02A9D1"]);
                var t = item.time.split(" ");
                var x = t[0].split("-");
                energyProxAxis.push(x[1] + "." + x[2]);
                //拿到今天在图表中的index
                item.time == this.getToday().format("yyyy-M-d h:m:s") ? window.PChartHoverNum = index : void 0;
            })
            chart.InitChart('PB_chart');
            // //填充数据刷新图表
            chart.update('energyPlan', energyPlan);
            chart.update('energyReal', energyReal);
            chart.xAxisUpdate(energyProxAxis);
            setTimeout(function(){
                v._instance.chartLeave(PChartHoverNum);
            },0)
        },
        //处理小扇形
        ProjectSectorReady: function () {
            var _this = v._instance;
            this.PsectorData.energyPlanPercent = [];
            this.PsectorData.energyTodayPlanPercent = [];
            this.PproDayAndItemInfo.items.forEach(function (item) {
                _this.PsectorData.energyPlanPercent.push(item.planRatio);
                _this.PsectorData.energyTodayPlanPercent.push(item.planRatioToday);
            })
            window.sectorGather = [];
            //填充小扇形
            this.PItemsPageSel(0);
        },
        // 处理横柱
        ProjectBarReady: function () {
            var widthArr = [], energyMax = 0;
            this.PproDayAndItemInfo.items.forEach(function (item) {
                item.energyData > energyMax ? energyMax = item.energyData : void 0;
            })
            widthArr = energyMax != 0 ? this.PproDayAndItemInfo.items.map(function (item) {
                return item.energyData / energyMax * 100
            }) : this.PproDayAndItemInfo.items.map(function (item) {
                return 0
            })
            //填充横柱
            GiveEnergyDataWidth('PB_items_bar', widthArr);
        },
        //获取项目月能耗详细信息
        GetMonthEnergyData: function (paramObj) {
            var _this = this;
            energyByProController.GetMonthEnergyData(paramObj, function (data) {
                data = JSON.parse(JSON.stringify(data));
                _this.PprojectSomeInfo.ifHasPlan = data[0].ifHasPlan;
                _this.PprojectSomeInfo.ifHasBudget = data[0].monthBudgetData == null ? false : true;
                _this.PprojectSomeInfo.isBudgetUpdated = data[0].isBudgetUpdated;
                _this.PprojectInfo = data[0];

                setTimeout(function () {

                    if (v._instance.onPage == 'more_build' || v._instance.onPage == 'energybyproject') {
                        //画圆圈
                        v._instance.PprojectSomeInfo.ifHasPlan ? ProjectDrawCircle() : void 0;
                        //分段横条填充
                        if (v._instance.PprojectSomeInfo.ifHasBudget) {
                            var wid1 = v._instance.PprojectInfo.passedTimeRatio != null ? v._instance.PprojectInfo.passedTimeRatio * 100 : 0;
                            wid1 = wid1 > 100 ? 100 : wid1;
                            var wid2 = v._instance.PprojectInfo.energyOccupyBudgetRatio != null ? v._instance.PprojectInfo.energyOccupyBudgetRatio * 100 : 0;
                            wid2 = wid2 > 100 ? 100 : wid2;
                            wid2 == 100 ? $(".PB_LT_div5item2").css("background", "#FF7B7B") : $(".PB_LT_div5item2").css("background", "#02A9D1");
                            getTimeUsedPercent("PB_LT_div5item1", wid1);
                            getTimeUsedPercent("PB_LT_div5item2", wid2);
                        }
                    }
                }, 0)

            }, function () {
                $("#globalnotice").pshow({ text: "无法连接服务器", state: "failure" });
            }, function () {
                _this.Ploading != 0 ? _this.Ploading-- : void 0;
                _this.PPL--;
            })
        },
        proInitChart: function () {
            window.chart = new chartControl();
            chart.options.xAxis.visible = true;
            chart.options.xAxis.tickWidth = 0;
            chart.options.yAxis[0].gridLineDashStyle = "Dash";
            chart.options.chart.plotBackgroundColor = "#fff";
            chart.options.tooltip.useHTML = true;
            chart.options.tooltip.style = { opacity: 0 }
            chart.options.tooltip.formatter = function () {
                var left = this.points[0].point.shapeArgs.x;
                var widthC = document.body.clientWidth - 377;
                var widthT = $("#PB_CTooltip").width() || 140;
                v._instance.PChartTooltip.x = (widthC - left) > widthT ? left - 30 : widthC - widthT - 60;
                v._instance.PChartTooltip.x < 40 ? v._instance.PChartTooltip.x = 40 : void 0;
                console.log(left,widthC,widthT)
                v._instance.PChartTooltip.show = true;
                v._instance.PChartTooltip.index = this.points[0].point.index;
                v._instance.PChartTooltip.y = this.points[0].point.shapeArgs.y > 250 ? 300 : this.points[0].point.shapeArgs.y + 70;
            },

                Highcharts.setOptions({
                    lang: {
                        thousandsSep: ','
                    }
                });
            chart.options.yAxis.push({
                title: {
                    text: ''
                },
                gridLineWidth: 0,
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                },
                min: 0,
                opposite: true //第二根Y轴在页面右边

            })
            var chartEnergyPlan = {
                name: "计划能耗",
                type: "column",
                id: "energyPlan",
                keys: ['y', 'id'],
                data: [],
                color: "#C3CDD0",
                pointPadding: 0.35,
                pointPlacement: -0.09,
                yAxis: 0
            }
            var chartEnergyReal = {
                name: "实际能耗",
                type: "column",
                id: "energyReal",
                keys: ['y', 'id', 'color'],
                data: [],
                pointPadding: 0.35,
                pointPlacement: 0.09,
                yAxis: 0,
            }
            chart.addSeries(chartEnergyPlan);
            chart.addSeries(chartEnergyReal);
        },

        //编辑能耗计划 here 只有项目版有这个按钮
        PenergyByProEditPlan: function () {
            var _that = this;
            _that.planBackPage = "more_build";
            // 编辑计划
            _that.setPlanBudget = {
                budgetItemId: _that.PprojectInfo.budgetItemId,
                budgetItemName: _that.PprojectInfo.budgetItemName,
                planDate: _that.PBaseMessage.timeFrom,
                ifHasPlan: true,//是否有计划
                isNowMonth: new Date(TC(_that.PBaseMessage.timeFrom)).isToMonth() === 0 ? true : false,//是否是本月
            }
            _that.allocatePlanType = 1;//按分项拆分
            v.initPage('plan_manage', _that.setPlanBudget);
        },

        //创建能耗计划
        PenergyByProCreatePlan: function () {
            _that = this;
            _that.planBackPage = this.PBaseMessage.NowModel == "center" ? "centerindex" : "more_build";
            _that.currentBuild = {};
            _that.currentBuild.buildingId = _that.PBaseMessage.buildingId;
            _that.setPlanBudget = {
                budgetItemId: _that.PprojectInfo.budgetItemId,
                budgetItemName: _that.PprojectInfo.budgetItemName,
                planDate: _that.PBaseMessage.timeFrom,
                ifHasPlan: false,//是否有计划
                isNowMonth: new Date(TC(_that.PBaseMessage.timeFrom)).isToMonth() === 0 ? true : false,//是否是本月
            }
            _that.allocatePlanType = 1;//按分项拆分
            v.initPage('plan_manage', _that.setPlanBudget);
        },
        //跳转至日能耗详情页面
        PproToDayEnergy: function (model) {
            // this.projectItemIdUserSel = model ? undefined : model.energyItemId;
            this.projectItemIdUserSel = model == undefined ? undefined : model.energyItemId;
            window.chart.chart ? window.chart.chart.destroy() : void 0;
            if (this.PBaseMessage.NowModel == 'center') {
                v.initPage('energybyday');
            } else {
                // 跳转到的详情的页面
                this.onBlock = 'detail';
                // 初始化的表格的控件
                var value = $("#divCalendar").psel();
                this.Dactivate({ timeFrom: this.getToday().format("yyyy-M-d h:m:s"), buildingId: this.currentBuild.buildingId })
            }
        },
        //设置月预算
        PbudgetEdit: function () {
            if (this.PBaseMessage.NowModel == "center") {
                this.projectSel.projectInfoReady = this.projectUserSel;
                this.projectSel.projectInfoReady.timeFrom = this.projectUserSel.timeDay;
                this.projectSel.projectInfoReady.timeTo = this.getNextMonth(new Date(TC(this.projectUserSel.timeDay))).format("yyyy-M-d h:m:s");
                this.BudgetWindowOpen();
            } else {
                // 预算列表
                v.initPage("budget_manage", v.instance.currentBuild.buildingId);
            }
        },
        //设置计划节点
        PtoPlanItemEdit: function () {

            var _that = this;

            if (this.PBaseMessage.NowModel == "center") {

                // 编辑计划节点
                subOption_controller.NodeManagementService({
                    buildingId: this.PBaseMessage.buildingId,
                    operation: "query",
                }).then(function (res) {

                    _that.NodeManageModel = {};

                    _that.isCenter = true;

                    _that.NodeManageModel.buildingName = _that.projectUserSel.projectName;

                    _that.NodeManageModel.buildingId = _that.PBaseMessage.buildingId;

                    _that.NodeManageModel.nodes = res;

                    v.initPage('plan');

                })


            } else {

                // 编辑计划节点
                subOption_controller.NodeManagementService({
                    buildingId: this.currentBuild.buildingId,
                    operation: "query",
                }).then(function (res) {

                    _that.NodeManageModel.buildingName = _that.currentBuild.buildingName;

                    _that.NodeManageModel.buildingId = _that.currentBuild.buildingId;

                    _that.NodeManageModel.nodes = res;

                    v.initPage('plan');

                })
            }
        },



        //切换分项表格显示并刷新扇形图表
        PItemsPageSel: function (a) {
            this.PprojectGridPage = a == 0 ? true : false;
            if (this.PprojectSomeInfo.ifHasPlanItems && this.PprojectSomeInfo.ifHasPlan) {
                this.PprojectGridPage ? this.PsectorDraw(true) : this.PsectorDraw(false);
            }

        },
        //绘制小扇形图表
        PsectorDraw: function (type) {
            var data = type ? this.PsectorData.energyPlanPercent : this.PsectorData.energyTodayPlanPercent;
            data.forEach(function (item, index) {
                window.sectorGather[index] = new sectorChart;
                item = typeof item == 'number' ? item < 0 ? null : item : null;
                if(item != null){
                    if (item >= 2) {
                        window.sectorGather[index].options.series[0].data = [{y: 1,color: "#FF7B7B"}, {y: null,color: "#02A9D1"}];
                    } else if (item > 1) {
                        window.sectorGather[index].options.series[0].data = [{y: item - 1,color: "#FF7B7B"}, {y: 2 - item,color: "#02A9D1"}];
                    } else {
                        window.sectorGather[index].options.series[0].data = [{y: item,color: "#02A9D1"}, {y: 1 - item,color: "#EFF2F5"}];
                    }
                    setTimeout(function () {
                        if(v._instance.onPage=='energybyproject' || v._instance.onBlock == 'list'){
                            var name = "PB_sectorCanvas" + index;
                            window.sectorGather[index].chart != null ? window.sectorGather[index].chart.destroy() : void 0;
                            window.sectorGather[index].chart = Highcharts.chart(name, window.sectorGather[index].options);
                        }
                    }, 0)
                }
            })
        },
        chartLeave: function (index) {
            if (index != undefined) {
                if (chart.chart && chart.chart.tooltip && chart.chart.tooltip.refresh)
                    chart.chart.tooltip.refresh([chart.chart.series[0].points[index], chart.chart.series[1].points[index]]);
            } else {
                this.PChartTooltip.show = false;
            }
        }
    },
    watch: {
        Ploading: function (N, O) {
            this.onPage=='energybyproject' || this.onBlock == 'list' ? N == 0 ? $("#globaloadng").phide() : void 0 : void 0;
        },
        PPL: function (N, O) {
            this.onPage=='energybyproject' || this.onBlock == 'list' ? N == 0 ? $("#Ppartloading").phide() : void 0 : void 0;
        },
    }
})