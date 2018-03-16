var energyByDayBodyController = {
    POSTAJAX : function(url,paramObj,success,err,complete){
        pajax.post({
            url:url,
            data:paramObj,
            success:success,
            error:err,
            complete:complete
        })
    },
    //获取项目所有节点
    getManagementNodeList : function(paramObj,success,err,complete){
        // console.log(JSON.stringify(paramObj))
        this.POSTAJAX('FNCT_ManagementNodeList',paramObj,success,err,complete);
    },
    getItemEnergyByDayData : function(paramObj,success,err,complete){
        // console.log(JSON.stringify(paramObj))
        this.POSTAJAX('FNCT_DayEnergyDataInfo',paramObj,success,err,complete);
    }
}
