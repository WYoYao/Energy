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
        // this.POSTAJAX('FCT_ManagementNodeList',paramObj,success,err,complete);
        success({
            "content": [                //类型：Array  必有字段  备注：无
                {                //类型：Object  必有字段  备注：无
                   "energyItemId":"mock",                //类型：String  必有字段  备注：节点id
                   "budgetNode":1,                //类型：Number  必有字段  备注： 1-预算节点id，0-计划节点
                   "energyItemName":"mock",                //类型：String  必有字段  备注：节点名称
                   "monthEnergyData":12.6                //类型：Number  必有字段  备注：节点日累计能耗
               },
               {                //类型：Object  必有字段  备注：无
                "energyItemId":"sd1",                //类型：String  必有字段  备注：节点id
                "budgetNode":0,                //类型：Number  必有字段  备注： 1-预算节点id，0-计划节点
                "energyItemName":"mock1",                //类型：String  必有字段  备注：节点名称
                "monthEnergyData":12.6                //类型：Number  必有字段  备注：节点日累计能耗
                },
                 {                //类型：Object  必有字段  备注：无
                  "energyItemId":"sd3",                //类型：String  必有字段  备注：节点id
                  "budgetNode":0,                //类型：Number  必有字段  备注： 1-预算节点id，0-计划节点
                  "energyItemName":"mock3",                //类型：String  必有字段  备注：节点名称
                  "monthEnergyData":12.6                //类型：Number  必有字段  备注：节点日累计能耗
                  },
                {                //类型：Object  必有字段  备注：无
                 "energyItemId":"sd2",                //类型：String  必有字段  备注：节点id
                 "budgetNode":0,                //类型：Number  必有字段  备注： 1-预算节点id，0-计划节点
                 "energyItemName":"mock2",                //类型：String  必有字段  备注：节点名称
                 "monthEnergyData":12.6                //类型：Number  必有字段  备注：节点日累计能耗
                 }
            ]
        })
    },
    getItemEnergyByDayData : function(paramObj,success,err,complete){
        // this.POSTAJAX('FNCT_ManagementNodeList',paramObj,success,err,complete);
        success(
            {
                "version":"1.0",                //类型：String  必有字段  备注：无
                "result":"success",                //类型：String  必有字段  备注：无
                "reason":"mixed",                //类型：Mixed  必有字段  备注：无
                "content": [                //类型：Array  必有字段  备注：无
                     {                //类型：Object  必有字段  备注：无
                        "energyData":105.5,                //类型：Number  必有字段  备注：节点日累计能耗
                        "energyPlan":125.5,                //类型：Number  必有字段  备注：节点日计划能耗
                        "planRatio":0.85,                //类型：Number  必有字段  备注：日能耗占计划比
                        "sameRatio":0.85,                //类型：Number  必有字段  备注：同比
                        "sameRatioData":245.24154,                //类型：Number  必有字段  备注：同比能耗
                        "circleRatio":-0.85,                //类型：Number  必有字段  备注：环比
                        "circleRatioData":432.5484,                //类型：Number  必有字段  备注：环比能耗
                        "items": [                //类型：Array  必有字段  备注：预算节点下计划节点的能耗与计划信息
                            {                //类型：Object  必有字段  备注：无
                                "energyItemId":"mock",                //类型：String  必有字段  备注：分项id
                                "energyItemName":"mock",                //类型：String  必有字段  备注：分项名称
                                "energyData":10028.4,                //类型：Number  必有字段  备注：分项实际能耗
                                "energyPlan":129.5,                //类型：Number  必有字段  备注：分项计划能耗
                                "planRatio":0.85                //类型：Number  必有字段  备注：日能耗占计划比
                            }
                        ],
                        "hourData":  [                //类型：Array  必有字段  备注：逐时能耗
                             {                //类型：Object  必有字段  备注：无
                                "time":"2017-10-01 00:00:00",                //类型：String  必有字段  备注：无
                                "energyData":50.5                //类型：Number  必有字段  备注：无
                            },
                             {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                                "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                                "energyData":100                //类型：Number  必有字段  备注：无
                            },
                            {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                               "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                               "energyData":100                //类型：Number  必有字段  备注：无
                           },
                           {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                              "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                              "energyData":100                //类型：Number  必有字段  备注：无
                          },
                          {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                             "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                             "energyData":100                //类型：Number  必有字段  备注：无
                         },
                         {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                            "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                            "energyData":100                //类型：Number  必有字段  备注：无
                        },
                        {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                           "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                           "energyData":100                //类型：Number  必有字段  备注：无
                       },
                       {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                          "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                          "energyData":100                //类型：Number  必有字段  备注：无
                      },
                      {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                         "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                         "energyData":100                //类型：Number  必有字段  备注：无
                     },
                     {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                        "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                        "energyData":100                //类型：Number  必有字段  备注：无
                    },
                    {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                       "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                       "energyData":100                //类型：Number  必有字段  备注：无
                   },
                   {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                      "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                      "energyData":100                //类型：Number  必有字段  备注：无
                  },
                  {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                     "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                     "energyData":100                //类型：Number  必有字段  备注：无
                 },
                 {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                    "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                    "energyData":100                //类型：Number  必有字段  备注：无
                },
                {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                   "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                   "energyData":100                //类型：Number  必有字段  备注：无
               },
               {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                  "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                  "energyData":100                //类型：Number  必有字段  备注：无
              },
              {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                 "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                 "energyData":100                //类型：Number  必有字段  备注：无
             },
             {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
                "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
                "energyData":100                //类型：Number  必有字段  备注：无
            },
            {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
               "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
               "energyData":100                //类型：Number  必有字段  备注：无
           },
           {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
              "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
              "energyData":100                //类型：Number  必有字段  备注：无
          },
          {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
             "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
             "energyData":100                //类型：Number  必有字段  备注：无
         },
         {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
            "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
            "energyData":100                //类型：Number  必有字段  备注：无
        },
        {                //类型：Object  必有字段  备注：小时能耗逐时分布，返回完整24个小时能耗信息
           "time":"2017-10-01 23:00:00",                //类型：String  必有字段  备注：无
           "energyData":100                //类型：Number  必有字段  备注：无
       }
                        ]
                    }
                ]
            }
        )
    }
}


// 传了建筑ID则获取所有节点，默认获取预算管理节点数据，
// 只传时间则获取所有节点并与现有节点对照判断，若无变化则获取所选节点数据，否则获取预算管理节点数据