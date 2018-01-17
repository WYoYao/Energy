v.pushComponent({
    name:"energybyday",
    el:"energyByDayHead",
    data:{},
    methods:{
        DTimeSel:function(){
            this.Dactivate({
                timeFrom:(new Date($("#energyByDayHead_ptime").psel().startTime)).format("yyyy-M-d h:m:s")
            })
        }
    },
    beforeMount:function(){
        this.$nextTick(function(){
            // this.DChartInit();
            this.Dactivate({timeFrom:this.projectUserSel.timeDay,buildingId:this.projectUserSel.buildingId})
        })
    }
})