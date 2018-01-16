v.pushComponent({
    name: 'budget_manage',
    data: {
        energyBudgetList: [],
        enerBudgetListCopy: [],
    },
    methods: {
        showEditPanel: function (item) {//编辑预算显示
            if (item.isBudgetUpdated) {//如果更新了
                item.changeWarnShow = true;
                return;
            }
            item.editBudgetShow = true;
            //item.editCopyObj = JSON.parse(JSON.stringify(item));//备份
            //item.editCopyObj = {
            //    energyDataBudget: item.energyDataBudget,
            //    energyDataBudgetPerSquare: item.energyDataBudgetPerSquare,
            //    remark: item.remark,
            //    ifHasBudget: item.ifHasBudget,
            //};
        },
        createNewBudget: function (item) {//创建预算显示
            item.editBudgetShow = true;
        },
        againCreate: function (item, event) {//有更新重新创建预算
            item.editBudgetShow = true;
            item.changeWarnShow = false;

            var $this = $(event.currentTarget);
            var $budgetPop = $this.parents(".budgetPop");
            $budgetPop && $budgetPop.hide();

            item.energyDataBudget = null;//将预算值清空
            item.energyDataBudgetPerSquare = null;
            item.remark = '';
            item.ifHasPlan = false;//不显示提示
        },
        continueEdit: function (item) {//不更新 继续编辑
            item.editBudgetShow = true;
            item.changeWarnShow = false;
        },
        closeEditPanel: function (item, index) {//取消编辑预算
            item.editBudgetShow = false;
            var copyObj = JSON.parse(JSON.stringify(v.instance.enerBudgetListCopy[index]));//恢复备份
            Vue.set(v.instance.energyBudgetList, index, copyObj);
        },
        sureSaveBudget: function (item) {

        }
    },
    beforeMount: function () {
        budgetController.init();
    },
    watch: {

    },
    computed: {

    }
});
