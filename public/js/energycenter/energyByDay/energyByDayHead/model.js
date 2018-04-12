v.pushComponent({
    name: "energybyday",
    el: "energyByDayHead",
    data: {},
    methods: {
        // here
        backEnergyByproject: function () {
            chart.chart != null ? chart.chart.destroy() : void 0;
            v.initPage('energybyproject');
        },
        //头部时间选择
        DTimeSel: function () {
            this.Dactivate({
                timeFrom: (new Date($("#energyByDayHead_ptime").psel().startTime)).format("yyyy-M-d h:m:s")
            })
        },
        DEnergyDayDownload: function () {
            var argu = {
                buildingName: this.projectUserSel.projectName,
                buildingId: this.projectUserSel.buildingId,
                timeFrom: new Date($("#energyByDayHead_ptime").psel().startTime).format("yyyy-M-d h:m:s"),
                energyItemId: this.DItemSel.id,
                energyItemName: this.DItemSel.name,
                isBudgetNode: this.DSelBudgetItem ? 1 : 0,
            }
            downLoadPdf(this.DSelBudgetItem ? 'daytotal' : 'dayterm', argu);
        }
    },
    beforeMount: function () {
        var paramObj = {
            // timeFrom:this.projectUserSel.timeDay,
            timeFrom: this.getToday().format("yyyy-M-d h:m:s"),
            buildingId: this.projectUserSel.buildingId
        }
        //激活日能耗详情页面
        this.Dactivate(paramObj);
        this.$nextTick(function () {
            // 进入本页默认选择本日,修改时间控件
            cantSelectFutureDay($("#energyByDayHead_ptime").psel().startTime, 'energyByDayHead_ptime');
        })
    }
})