v.pushComponent({
    name:"energybyproject",
    el:"energyByProjectHead",
    data:{

    },
    methods:{
        PBudgetWindowOpenReady : function(){
            this.PbudgetEdit();
        },
        PEnergyMonthDownload : function(){
            downLoadPdf('monthtotal',{
                buildingName: this.projectUserSel.projectName,
                buildingId: this.projectUserSel.buildingId,
                timeFrom: this.projectUserSel.timeDay,
                timeTo: this.getNextMonth(new Date(TC(this.projectUserSel.timeDay))).format("yyyy-M-d h:m:s")
            })
        }
    },
    beforeMount : function(){
        var paramObj = {
            NowModel:"center",
            buildingId:this.projectUserSel.buildingId,
            timeFrom:this.projectUserSel.timeDay,
        }
        //激活项目能耗详情页面
        this.energyByProjectActivate(paramObj);
    }
})