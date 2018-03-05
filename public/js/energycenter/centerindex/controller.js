var indexController = {
    POSTAJAX : function(url,paramObj,success,err,complete){
        pajax.post({
            url:url,
            data:paramObj,
            success:success,
            error:err,
            complete:complete
        })
    },
    //获取所有项目节点
    getAllItemInfo : function(success,err,complete){
        this.POSTAJAX('FNCT_NodeManagementService',"",success,err,complete);
        // success(
        //     [
        //         {
        //           "name": "sdfsdf",
        //           "isBudget": 1,
        //           "logicId": "A1-1-001"
        //         },
        //         {
        //           "name": "租户总用电",
        //           "isBudget": 0,
        //           "logicId": "A1-10101-001"
        //         }
        //       ]
        // )
    },
    //获取项目筛选信息
    getProjectScreenInfo : function(paramObj,success,err,complete){         
        this.POSTAJAX('FNCT_GetProjectScreeningInfo',paramObj,success,err,complete)
    },
    //获取用户项目信息
    getList : function(paramObj,success,err,complete){ 
        console.log(JSON.stringify(paramObj));
        this.POSTAJAX('FNCT_GetProjectBasicInfo',paramObj,success,err,complete)
    },
    //获取项目预算信息
    getProjectSelInfo :  function(paramObj,success,err,complete){
        console.log(JSON.stringify(paramObj));
        this.POSTAJAX('FNPJ_GetEnergyBudgetList',paramObj,success,err,complete);
    },
    // 获取项目历史能耗信息
    getProjectHistoryBudget : function(paramObj,success,err,complete){
        console.log(JSON.stringify(paramObj));
        this.POSTAJAX('FNPJ_GetMonthEnergyRealAndBudget',paramObj,success,err,complete);
    },
    //获取项目面积
    getProjectArea : function(paramObj,success,err,complete){
        console.log(JSON.stringify(paramObj));
        this.POSTAJAX('FNPJ_GetBuildingItemArea',paramObj,success,err,complete);
    },
    // 获取项目预算批注信息
    getProjectBudgetRemark : function(paramObj,success,err,complete){
        console.log(JSON.stringify(paramObj));
        this.POSTAJAX('FNPJ_GetEnergyBudgetHistory',paramObj,success,err,complete);
    },
    //用户预算信息更改
    projectBudgetMessageEdit : function(paramObj,success,err,complete){
        console.log(JSON.stringify(paramObj));
        this.POSTAJAX('FNPJ_EnergyBudgetSave',paramObj,success,err,complete);
    },
    download : function(paramObj,success,err,complete){
        console.log(JSON.stringify(paramObj));
        this.POSTAJAX('download',paramObj,success,err,complete);
    }
}