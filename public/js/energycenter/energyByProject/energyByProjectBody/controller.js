var energyByProController = {
    POSTAJAX : function(url,paramObj,success,err,complete){
        pajax.post({
            url:url,
            data:paramObj,
            success:success,
            error:err,
            complete:complete
        })
    },
    //获取项目日分项与节点能耗   童话回忆换了一个遇到傻逼
    GetEnergyDataForDayAndItem : function(paramObj,success,err,complete){
        console.log(JSON.stringify(paramObj))
        this.POSTAJAX('FNCT_GetEnergyDataForDayAndItem',paramObj,success,err,complete);
    },
    //获取项目月能耗详细信息
    GetMonthEnergyData : function(paramObj,success,err,complete){
        console.log(JSON.stringify(paramObj))
        this.POSTAJAX('FNCT_GetMonthEnergyDataInfo',paramObj,success,err,complete);
    },
}