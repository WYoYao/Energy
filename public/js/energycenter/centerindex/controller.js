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
        // this.POSTAJAX('FCT_NodeManagementService',"",success,err,complete);
        success({
            content:[
                {
                    "logicId":"mock",
                    "name":"mock",
                    "isBudget":0
                },{
                    "logicId":"mock",
                    "name":"rgsedfg",
                    "isBudget":0
                },{
                    "logicId":"mock",
                    "name":"dsfgaerg",
                    "isBudget":0
                },{
                    "logicId":"mock",
                    "name":"dfhgaergrae",
                    "isBudget":0
                },{
                    "logicId":"mock",
                    "name":"gerghser",
                    "isBudget":1
                }
            ]
        })
    },

    // 获取项目预算批注信息
    getProjectBudgetRemark : function(paramObj,success,err,complete){
        // this.POSTAJAX('FNPJ_GetEnergyBudgetHistory',paramObj,success,err,complete);
        success({
            content:[
                {
                    "id":"bb58a0f6-9ee3-4f21-aa2e-632a5a8d34f7",                //类型：String  必有字段  备注：无
                    "projectId":"Pj1101010003",                //类型：String  必有字段  备注：无
                    "buildingId":"Bd1101010003001",                //类型：String  必有字段  备注：无
                    "energyModelId":"415a1c8f-cdd9-4485-91d7-1212c5e59411",                //类型：String  必有字段  备注：能耗模型
                    "budgetItemId":"VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
                    "planDate":"2017-10-01 00:00:00",                //类型：String  必有字段  备注：预算计划月份
                    "energyDataBudget":310000,                //类型：Number  必有字段  备注：能耗预算值
                    "energyDataPerSquare":8,                //类型：Number  必有字段  备注：单平米能耗
                    "operateUser":"文化如果",                //类型：String  必有字段  备注：操作人
                    "operate":"编辑预算",                //类型：String  必有字段  备注：操作
                    "remark":"批注信息",                //类型：String  必有字段  备注：批注信息
                    "updateTime":"2018-01-03 18:37:42"                //类型：String  必有字段  备注：更新时间
                },{
                    "id":"bb58a0f6-9ee3-4f21-aa2e-632a5a8d34f7",                //类型：String  必有字段  备注：无
                    "projectId":"Pj1101010003",                //类型：String  必有字段  备注：无
                    "buildingId":"Bd1101010003001",                //类型：String  必有字段  备注：无
                    "energyModelId":"415a1c8f-cdd9-4485-91d7-1212c5e59411",                //类型：String  必有字段  备注：能耗模型
                    "budgetItemId":"VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
                    "planDate":"2017-10-01 00:00:00",                //类型：String  必有字段  备注：预算计划月份
                    "energyDataBudget":310000,                //类型：Number  必有字段  备注：能耗预算值
                    "energyDataPerSquare":8,                //类型：Number  必有字段  备注：单平米能耗
                    "operateUser":"张三是",                //类型：String  必有字段  备注：操作人
                    "operate":"批注",                //类型：String  必有字段  备注：操作
                    "remark":"批注信息",                //类型：String  必有字段  备注：批注信息
                    "updateTime":"2018-01-03 18:37:42"                //类型：String  必有字段  备注：更新时间
                },{
                    "id":"bb58a0f6-9ee3-4f21-aa2e-632a5a8d34f7",                //类型：String  必有字段  备注：无
                    "projectId":"Pj1101010003",                //类型：String  必有字段  备注：无
                    "buildingId":"Bd1101010003001",                //类型：String  必有字段  备注：无
                    "energyModelId":"415a1c8f-cdd9-4485-91d7-1212c5e59411",                //类型：String  必有字段  备注：能耗模型
                    "budgetItemId":"VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
                    "planDate":"2017-10-01 00:00:00",                //类型：String  必有字段  备注：预算计划月份
                    "energyDataBudget":310000,                //类型：Number  必有字段  备注：能耗预算值
                    "energyDataPerSquare":8,                //类型：Number  必有字段  备注：单平米能耗
                    "operateUser":"张三",                //类型：String  必有字段  备注：操作人
                    "operate":"锁定预算",                //类型：String  必有字段  备注：操作
                    "remark":"批注信息",                //类型：String  必有字段  备注：批注信息
                    "updateTime":"2018-01-03 18:37:42"                //类型：String  必有字段  备注：更新时间
                },{
                    "id":"bb58a0f6-9ee3-4f21-aa2e-632a5a8d34f7",                //类型：String  必有字段  备注：无
                    "projectId":"Pj1101010003",                //类型：String  必有字段  备注：无
                    "buildingId":"Bd1101010003001",                //类型：String  必有字段  备注：无
                    "energyModelId":"415a1c8f-cdd9-4485-91d7-1212c5e59411",                //类型：String  必有字段  备注：能耗模型
                    "budgetItemId":"VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
                    "planDate":"2017-10-01 00:00:00",                //类型：String  必有字段  备注：预算计划月份
                    "energyDataBudget":310000,                //类型：Number  必有字段  备注：能耗预算值
                    "energyDataPerSquare":8,                //类型：Number  必有字段  备注：单平米能耗
                    "operateUser":"张三",                //类型：String  必有字段  备注：操作人
                    "operate":"操作",                //类型：String  必有字段  备注：操作
                    "remark":"批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息批注信息",                //类型：String  必有字段  备注：批注信息
                    "updateTime":"2018-01-03 18:37:42"                //类型：String  必有字段  备注：更新时间
                }
            ]
        })
    },

    getProjectScreenInfo : function(paramObj,success,err,complete){         //获取项目筛选信息
        // this.POSTAJAX('FCT_GetProjectScreeningInfo',paramObj,success,err,complete)
        success({
            content:{
                climate:[
                    {name:"有预算有计划",code:0},
                    {name:"有预算有计划",code:1},
                    {name:"有预算有计划",code:2},
                    {name:"有预算有计划",code:3},
                    {name:"有预算有计划",code:4},
                    {name:"有预算有计划",code:5},
                    {name:"有预算有计划",code:6}
                ],
                buildingType:[
                    {name:"有预算有计划",code:0},
                    {name:"有预算有计划",code:1},
                    {name:"有预算有计划",code:2},
                    {name:"有预算有计划",code:3},
                    {name:"有预算有计划",code:4},
                    {name:"有预算有计划",code:5},
                    {name:"有预算有计划",code:6}
                ],
                areaType:[
                    {name:"有预算有计划",code:0},
                    {name:"有预算有计划",code:1},
                    {name:"有预算有计划",code:1},
                    {name:"有预算有计划",code:2},
                    {name:"有预算有计划",code:3},
                    {name:"有预算有计划",code:4},
                    {name:"有预算有计划",code:5}
                ]
            }
        })
    },

    // 获取项目历史能好信息
    getProjectHistoryBudget : function(paramObj,success,err,complete){
        // this.POSTAJAX('FNJP_GetEnergyRealAndBudgetData',paramObj,success,err,complete)
        success({
            content:[
                {
                    time:"2017-01-01 00:00:00",
                    energyDataBudget:3130,
                    energyDataReal:1350
                },
                {
                    time:"2017-02-01 00:00:00",
                    energyDataBudget:3800,
                    energyDataReal:2153
                },
                {
                    time:"2017-03-01 00:00:00",
                    energyDataBudget:7845,
                    energyDataReal:9353
                },
                {
                    time:"2017-04-01 00:00:00",
                    energyDataBudget:7852,
                    energyDataReal:6753
                },
                {
                    time:"2017-05-01 00:00:00",
                    energyDataBudget:3434,
                    energyDataReal:2121
                },
                {
                    time:"2017-06-01 00:00:00",
                    energyDataBudget:3434,
                    energyDataReal:2121
                },
                {
                    time:"2017-07-01 00:00:00",
                    energyDataBudget:3434,
                    energyDataReal:2121
                },
                {
                    time:"2017-08-01 00:00:00",
                    energyDataBudget:3434,
                    energyDataReal:2121
                },
                {
                    time:"2017-09-01 00:00:00",
                    energyDataBudget:3434,
                    energyDataReal:2121
                },
                {
                    time:"2017-10-01 00:00:00",
                    energyDataBudget:3434,
                    energyDataReal:2121
                },
                {
                    time:"2017-11-01 00:00:00",
                    energyDataBudget:3434,
                    energyDataReal:2121
                },
                {
                    time:"2017-12-01 00:00:00",
                    energyDataBudget:3434,
                    energyDataReal:2121
                }
            ]
        })
    },

    //获取用户项目信息
    getList : function(paramObj,success,err,complete){  
        console.log(paramObj);
        setTimeout(function(){
            success({
                content:[
                    {                //类型：Object  必有字段  备注：无
                        "projectInfo": [                //类型：Array  必有字段  备注：无
                            {                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京天安门广场",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":null,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":null,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":null,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":12423,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":null,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":false,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":2,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":1,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":99.3415,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            },{                //类型：Object  必有字段  备注：无
                                "area":1000,                //类型：Number  必有字段  备注：面积
                                "buildingTypeCode":"mock",                //类型：String  必有字段  备注：建筑类型编码
                                "buildingTypeName":"mock",                //类型：String  必有字段  备注：建筑类型名称
                                "buildingId":"BdVO123456",                //类型：String  必有字段  备注：主建筑
                                "climateZoneCode":"20",                //类型：String  必有字段  备注：气候区编码
                                "climateZoneName":"寒冷地区",                //类型：String  必有字段  备注：气候区名称
                                "projectId":"Pj1101010003",                //类型：String  必有字段  备注：项目id
                                "projectName":"北京市东城区0003号项目",                //类型：String  必有字段  备注：项目名称
                                "regionCode":"110101",                //类型：String  必有字段  备注：区域编码
                                "regionName":"东北",                //类型：String  必有字段  备注：区域名称
                                "energyBudget":45646.6454646,                //类型：Number  必有字段  备注：能耗预算
                                "enengyBudegetPerSquare":40,                //类型：Number  必有字段  备注：单平米能耗
                                "enengyOccupyBudegetPercent":100,                //类型：Number  必有字段  备注：能耗预算比
                                "energyReal":39736.61,                //类型：Number  必有字段  备注：真实能耗
                                "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：单平米能耗
                                "ifHasPlan":true,                //类型：Boolean  必有字段  备注：无
                                "dataStatus":0,                //类型：Number  必有字段  备注：数据状态 默认为0 0-正常 1-项目未上线无数据 2-数据质量有问题
                                "remark":"数据问题描述",                //类型：String  必有字段  备注：无
                                "sameRatio":1,                //类型：Number  必有字段  备注：预算同比
                                "sameRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算同比单平米
                                "circleRatio":"mock",                //类型：String  必有字段  备注：预算环比
                                "circleRatioPerSquare":"mock",                //类型：String  必有字段  备注：预算环比单平米
                                "bugdgetItemId":"mock",                //类型：String  必有字段  备注：无
                                "planItemIds": [                //类型：Array  必有字段  备注：无
                                    {                //类型：Object  必有字段  备注：无
                                        "itemId":"mock",                //类型：String  必有字段  备注：无
                                        "itemName":"mock"                //类型：String  必有字段  备注：无
                                    }
                                ]
                            }
                        ],
                        "energyBudgetAvg":45646.6454646,                //类型：Number  必有字段  备注：项目预测平均值
                        "enengyBudegetPerSquareAvg":40,                //类型：Number  必有字段  备注：预测单平米能耗
                        "energyRealAvg":31221,                //类型：Number  必有字段  备注：能耗平均值
                        "energyRealPerSquare":39.73,                //类型：Number  必有字段  备注：真实单平米能耗
                        "totalArea":21000,                //类型：Number  必有字段  备注：总面积
                        "totalEnergyBudget":231000,                //类型：Number  必有字段  备注：预测总能耗值
                        "totalEnergyReal":321000,                //类型：Number  必有字段  备注：总计真实能耗值
                        "totalEnengyOccupyBudegetPercent":102.2,                //类型：Number  必有字段  备注：总能耗占预算比
                        "totalProjects":100,                //类型：Number  必有字段  备注：项目总数量
                        "totalScreening":32                //类型：Number  必有字段  备注：筛选后项目数量
                    }
                ]
            })
        },1000)
        // this.POSTAJAX('GetProjectBasicInfo',paramObj,success,err,complete)
    },

    //用户预算信息更改
    projectBudgetMessageEdit : function(paramObj,success,err,complete){
    // this.POSTAJAX('FNPJ_EnergyBudgetManagement',"",success,err,complete);
    success({
        "version":"1.0",                //类型：String  必有字段  备注：无
        "result":"success",                //类型：String  必有字段  备注：无
        "reason":"mixed",                //类型：Mixed  必有字段  备注：无
        "content":  [                //类型：Array  必有字段  备注：无
        ]
    })
    }
}