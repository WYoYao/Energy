v.pushComponent({
    name: 'budget_manage',
    data: {
        energyBudgetList: [],//月预算
        selEnergyBudget: {},//查看备注的月预算
        enerBudgetListCopy: [],
        buildArea: 1,
        isNextHint: true,//下次是否提示

        setPlanBudget: {},//设置计划的月
        historyFirstDate: null,//历史数据的第一天
        leftArrowActive: false,//左右箭头
        rightArrowActive: true,
        arrowLoadState: false,//如果列表加载中

        currentPage: 0,//预算的翻页    
        budgetBuildSel: null,
        planHelpType: 'enter',
    },
    methods: {
        // 点击其他的内容的时候的也需要关闭是否关闭的内容
        ideItem: function (event, item) {

            var _that = this;

            if (!(_.isArray(_that.energyBudgetList) && _that.energyBudgetList.filter(function (info) {

                return (info == item && item.showPage == 'editPage');
            }).length)) {

                _that.PopClick();
            } else {

                event.stopPropagation();
                event.preventDefault();
            }
        },
        // 冒泡到最低层,如果用户在编辑状态下点击其他功能关闭编辑状态
        PopClick: function () {
            var _that = this;
            if (_.isArray(_that.energyBudgetList)) {
                _that.energyBudgetList = _that.energyBudgetList.map(function (item) {

                    if (item.showPage == "editPage") {
                        item.showPage = (item.ifHasBudget || item.isPastMonth) ? 'dataPage' : 'newCreate';
                    }

                    return item;
                })
            }
        },
        downMonthReport: function (item) {
            var enum_path = {
                monthtotal: 'monthtotal',
            }
            var planDate = new Date(item.planDate.replace(/-/g, '/'));
            //  月总参数
            var argu = {
                buildingName: v.instance.budgetBuildSel.buildingName,
                buildingId: v.instance.budgetBuildSel.buildingId,
                timeFrom: item.planDate,
                timeTo: new Date(planDate.getFullYear(), planDate.getMonth() + 1, 1).format("yyyy-MM-dd hh:mm:ss"),
            }

            downLoadPdf(enum_path.monthtotal, argu);
        },
        planInfoCheck: function (item) {
            var paramObj = {
                projectId: v.instance.projectId,
                buildingId: v.instance.budgetBuildSel.buildingId,
                projectName: v.instance.currentBuild.buildingName,
                startDate: item.planDate,
                download: false
            }
            var a = '/lookplan?query=' + psecret.create(JSON.stringify(paramObj));
            window.open(a);
        },
        planInfoDown: function (item) {
            var projectTime = item.planDate.substring(0, 7);
            var paramObj = {
                buildingId: v.instance.budgetBuildSel.buildingId,
                startDate: item.planDate,
                download: true,
                excelName: v.instance.currentBuild.buildingName + projectTime + "能耗计划",
            }
            budgetController.downMonthEnergyPlan(paramObj);
        },
        backNowBudget: function () {
            if (this.currentPage == 0) return;
            // 隐藏同月的Tips
            historyChartEnter();
            // 隐藏同月比较的线
            chartBackNormal();

            budgetController.getEnergyBudgetList(0);
        },
        leftArrowClick: function () {
            var pageNum = this.currentPage - 1;
            budgetController.getEnergyBudgetList(pageNum);
            chartBackNormal();//chart恢复默认
        },
        rightArrowClick: function () {
            var pageNum = this.currentPage + 1;
            budgetController.getEnergyBudgetList(pageNum);
            chartBackNormal();//chart恢复默认
        },
        showEditPanel: function (item) {//编辑预算显示
            if (item.state == 0) {
                return;
            }
            if (item.isBudgetUpdated) {//如果更新了
                item.showPage = 'changeWarn';
                return;
            }
            beforeEditOperate(item);

            item.showPage = 'editPage';
            item.operate = '编辑预算';
        },
        createNewBudget: function (item) {//创建预算显示
            item.showPage = 'editPage';
            item.operate = '创建预算';
            beforeEditOperate(item);
        },
        againCreate: function (item, event) {//有更新 重新创建预算
            item.showPage = 'editPage';
            item.operate = '编辑预算';
            beforeEditOperate(item);

            var $this = $(event.currentTarget);
            var $budgetPop = $this.parents(".budgetPop");
            $budgetPop && $budgetPop.hide();
            //将预算值清空
            item.energyDataBudget = null;
            item.energyDataBudgetPerSquare = null;
            item.newRemark = '';
            item.ifHasPlan = false;//不显示提示

            item.againCreateBudget = true;//是重新创建预算
        },
        continueEdit: function (item) {//不更新 继续编辑
            item.showPage = 'editPage';
            item.operate = '编辑预算';
            beforeEditOperate(item);
        },
        closeEditPanel: function (item, index) {//取消编辑预算
            var copyObj = JSON.parse(JSON.stringify(v.instance.enerBudgetListCopy[index]));
            Vue.set(v.instance.energyBudgetList, index, copyObj);//恢复备份

            chartBackNormal();//chart恢复默认
        },
        sureSaveBudget: function (item, event, index) {//保存预算
            var $this = $(event.currentTarget);
            var $budegtInput = $this.parents(".blockEdit").find(".bInput");
            var wrong = false;
            $budegtInput.each(function (num, element) {
                wrong = inputBlur(element);//看看input框是否有错 为空
                if (wrong) return false;
            });
            if (wrong) return;
            //if ((typeof item.newRemark) == 'string' && item.newRemark.length > 100) {
            //    return;
            //}
            var _this = this;
            function callback() {
                chartBackNormal();//chart恢复默认
                budgetController.getEnergyBudgetList(_this.currentPage);
            }
            budgetController.saveEditBudget(item, callback);//保存预算
        },
        showModifyRecord: function (item) {//备注信息 todo  名字
            var month = item.planDateStr.replace('.', '年') + '月';
            var titleStr = $("#budgetBuildList").psel().text + month + ' 预算修改记录';
            // leo 20180305 重置状态
            $("#newRemarkText").precover();

            $("#newRemarkText").pval('');
            $("#remarkSaveButton").pdisable(true);
            $("#modifyRecordFloat").pshow({ title: titleStr });
            budgetController.getEnergyBudgetHistory(item);
        },
        budgetRemarkSave: function () {
            if (!$("#newRemarkText").pverifi()) return;
            var rtext = $("#newRemarkText").pval();
            var _this = this;
            _this.selEnergyBudget.operate = '批注';
            _this.selEnergyBudget.newRemark = rtext;
            function callback() {
                $("#newRemarkText").pval('');
                $("#remarkSaveButton").pdisable(true);
                budgetController.getEnergyBudgetHistory(_this.selEnergyBudget);
            }
            budgetController.saveEditBudget(this.selEnergyBudget, callback, 'remark');//保存备注
        },
        showEditPlan: function (item, event) {//显示编辑计划  
            var _this = this;
            _this.setPlanBudget = item;
            var hintStore = window.localStorage.getItem('hintStore');
            if (item.isBudgetUpdated && !item.ifHasPlan) {//如果预算节点有更新 且没有计划
                return;
            }

            if (hintStore !== 'no' && _this.isNextHint && !item.ifHasPlan) {// 创建且下次提示
                event.stopPropagation();
                $("#setPlanWindow").pshow();
                _this.planHelpType = 'enter';
            } else {//不提示
                _this.allocatePlanType = 1;
                v.initPage('plan_manage', _this.setPlanBudget);
            }
        },
        itemAllocateShow: function () {//显示按分项拆分
            var nextHint = $("#nextHintCheck").psel();
            nextHint == true && window.localStorage.setItem('hintStore', 'no');
            $("#setPlanWindow").phide();
            this.allocatePlanType = 1;
            v.initPage('plan_manage', this.setPlanBudget);
        },
        dayAllocateShow: function () {//显示按日期拆分
            var nextHint = $("#nextHintCheck").psel();
            nextHint == true && window.localStorage.setItem('hintStore', 'no');
            $("#setPlanWindow").phide();
            this.allocatePlanType = 0;
            v.initPage('plan_manage', this.setPlanBudget);
        },
        budgetGoBackMain: function () {
            v.goBack("more_build");
            var calenderTime = $("#divCalendar").psel();
            // 列表状态时不重新查询
            if (v.instance.currentBuild.buildingId == 'all') return;

            v.instance.energyByProjectActivate({
                buildingId: v.instance.currentBuild.buildingId,
                timeFrom: new Date(calenderTime.startTime).format("yyyy-M-d h:m:s"),
                NowModel: "term",
            });
        },
        changeAllInput: function (item, event) {//改变总预算 Input
            var resObj = verifyBudegtInput(event);
            item.energyDataBudget = resObj.invalue;
            item.energyDataBudgetPerSquare = item.energyDataBudget === '' ? '' : Math.round(Number(item.energyDataBudget) / this.buildArea);
            var $this = $(event.currentTarget);
            if (item.energyDataBudgetPerSquare !== '') {
                $this.parents(".blockEdit").find(".bInputBox").removeClass("error");
            }
        },
        changePerInput: function (item, event) {//改变单位平米预算 Input
            var resObj = verifyBudegtInput(event);
            item.energyDataBudgetPerSquare = resObj.invalue;
            item.energyDataBudget = item.energyDataBudgetPerSquare === '' ? '' : Math.round(Number(item.energyDataBudgetPerSquare) * this.buildArea);
            var $this = $(event.currentTarget);
            if (item.energyDataBudget !== '') {
                $this.parents(".blockEdit").find(".bInputBox").removeClass("error");
            }
        },
    },
    beforeMount: function () {
        v.instance.planBackPage = 'budget_page';
        var argu = arguments[0];
        this.$nextTick(function () {
            budgetController.init(argu);
        });

    },
    mounted: function () {
    },
    watch: {


    },
    computed: {

    }
});


function beforeEditOperate(item) {//编辑之前的操作 
    var editNum = -1;//上一个处于编辑的月
    var month = new Date(item.planDate.replace(/-/g, '/')).getMonth() + 1;

    // 取消前一个编辑框的内容 Start
    v.instance.energyBudgetList.forEach(function (ele, index) {
        if (ele.showPage == 'editPage' && ele.planDate !== item.planDate) {
            editNum = index;
        }
    });
    if (editNum !== -1) {
        var copyObj = JSON.parse(JSON.stringify(v.instance.enerBudgetListCopy[editNum]));
        Vue.set(v.instance.energyBudgetList, editNum, copyObj);//取消之前的编辑状态
    }
    // 取消前一个编辑框的内容 End

    //去设置平均值 修改下面的柱状图
    budgetController.getMonthEnergyRealAndBudget(month, function () {
        //在柱图上加标注 
        var chartDataObj = getChartDataObj(budgetController.chartDataList, month);
        budgetController.historyEnergyChart.series[0] && budgetController.historyEnergyChart.series[0].setData(chartDataObj.enerBudgetList);
        budgetController.historyEnergyChart.series[1] && budgetController.historyEnergyChart.series[1].setData(chartDataObj.enerRealList);
    });

    budgetController.getBuildingItemArea(item.budgetItemId);//获取面积
}
function chartBackNormal() {
    budgetController.historyEnergyChart && budgetController.historyEnergyChart.yAxis[0].removePlotLine('averPlotLine');
    //在柱图上去掉标注 
    var chartDataObj = getChartDataObj(budgetController.chartDataList, 'renew');
    budgetController.historyEnergyChart.series[0] && budgetController.historyEnergyChart.series[0].setData(chartDataObj.enerBudgetList);
    budgetController.historyEnergyChart.series[1] && budgetController.historyEnergyChart.series[1].setData(chartDataObj.enerRealList);
}