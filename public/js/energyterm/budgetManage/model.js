v.pushComponent({
    name: 'budget_manage',
    data: {
        energyBudgetList: [],
        selEnergyBudget: {},
        enerBudgetListCopy: [],
        buildArea: null,
        budgetRealChart: [],
        planAllocateShow: false,
        itemPlanShow: true,
    },
    methods: {
        showEditPanel: function (item) {//编辑预算显示
            if (item.isBudgetUpdated) {//如果更新了
                item.changeWarnShow = true;
                return;
            }
            item.editBudgetShow = true;
            item.operate = '编辑预算';
            budgetController.getBuildingItemArea(item.budgetItemId);
        },
        createNewBudget: function (item) {//创建预算显示
            item.editBudgetShow = true;
            item.operate = '创建预算';
            budgetController.getBuildingItemArea(item.budgetItemId);
        },
        againCreate: function (item, event) {//有更新 重新创建预算
            item.editBudgetShow = true;
            item.operate = '编辑预算';
            budgetController.getBuildingItemArea(item.newBudgetItemId);
            item.changeWarnShow = false;

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
            item.editBudgetShow = true;
            item.operate = '编辑预算';
            budgetController.getBuildingItemArea(item.budgetItemId);
            item.changeWarnShow = false;
        },
        closeEditPanel: function (item, index) {//取消编辑预算
            item.editBudgetShow = false;
            var copyObj = JSON.parse(JSON.stringify(v.instance.enerBudgetListCopy[index]));
            Vue.set(v.instance.energyBudgetList, index, copyObj);//恢复备份
        },
        sureSaveBudget: function (item) {//保存预算
            function callback() {
                item.editBudgetShow = false;
                item.againCreateBudget = false;
                item.ifHasBudget = true;
            }
            budgetController.saveEditBudget(item, callback);//保存预算
        },
        showModifyRecord: function (item) {//备注信息 todo  名字
            var month = item.planDateStr.replace('.', '年') + '月';
            var titleStr = '北京博锐尚格广场 ' + month + ' 预算修改记录';

            $("#modifyRecordFloat").pshow({ title: titleStr });
            budgetController.getEnergyBudgetHistory(item);
        },
        budgetRemarkSave: function () {
            var rtext = $("#newRemarkText").pval();
            this.selEnergyBudget.operate = '批注';
            this.selEnergyBudget.newRemark = rtext;
            budgetController.saveEditBudget(this.selEnergyBudget, 'remark');//保存备注
        },
        showEditPlan: function (item, event) {//显示编辑计划
            event.stopPropagation();
            $("#setPlanWindow").pshow();
        },
        itemAllocateShow: function () {//显示按分项拆分
            $("#setPlanWindow").phide();
            this.planAllocateShow = true;
            $("#choosePlanButton").psel(0);
        },
        dayAllocateShow: function () {//显示按日期拆分
            $("#setPlanWindow").phide();
            this.planAllocateShow = true;
            $("#choosePlanButton").psel(1);
        },
        backMainClick: function () {//回到主页
            this.planAllocateShow = false;
        }
    },
    beforeMount: function () {
        budgetController.init();
    },
    watch: {
        energyBudgetList: {
            handler: function (newQuestion, oldQuestion) {
                var ss = 1;
            },
            //deep: true
        }
    },
    computed: {

    }
});
