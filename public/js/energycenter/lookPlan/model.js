v.pushComponent({
    name:"lookplan",
    el:"#lookPlan",
    data:{
        planGridData:[]
    },
    methods:{
        //     "projectId":"Pj1101010003",                //类型：String  必有字段  备注：无
        //     "buildingId":"Bd1101010003001",                //类型：String  必有字段  备注：建筑id
        //     "budgetItemId":"VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
        //     "planItems": - [                //类型：Array  可有字段  备注：无
        //         "VOEi1101010003000S",                //类型：String  必有字段  备注：无
        //         "VOEi1101010003000T"                //类型：String  必有字段  备注：无
        //     ],
        //     "operateType":"query",                //类型：String  必有字段  备注：操作类型
        //     "planType":2,                //类型：Number  必有字段  备注：计划类型: 0-日总,1-月分项,2-日分项
        //     "startDate":"2017-10-01 00:00:00",                //类型：String  必有字段  备注：开始时间
        //     "endDate":"2017-11-01 00:00:00",                //类型：String  可有字段  备注：结束时间 当planType=1时不填写
        //     "isDownload":false                //类型：Boolean  可有字段  备注：是否下载excel 选填 默认为false
        InitPage : function(paramObj){
            paramObj = JSON.stringify(paramObj);
            var _this = this;
            planController.getProjectDataByDay(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                _this.planGridData = data.content;
                _this.$nextTick(function(){
                    // $(".lookPlan_grid .lookPlan_grid_head").eq(0).css("width",data.content.length*140+58)
                    $(".lookPlan_grid_body").css("width",data.content.length*140+58)
                })
            })
        }
    },
    beforeMount:function(){
        // this.InitPage(this.lookPlanParamObj);
        this.InitPage({});
    }
})