v.pushComponent({
    name:"energybydayBody",
    el:"energyByDayBody",
    data:{
        DbaseMessage:{},
        DType:true,//true更换建筑 false更换时间
        DSelBudgerItem:true,    //是否选择了预算管理节点
        DItemSel:{},            //用户所选节点
        DAllItems:[],           //所有节点数据
        DItemEnergyData:{}      //节点能耗数据
    },
    methods:{
        //接受头部传入数据，若只改变日期则只传timeFrom即可，否则传timeFrom，buildingId
        Dactivate : function(paramObj){  
            this.DbaseMessage.timeFrom = paramObj.timeFrom;
            //根据是否传入Buildingid判断页面刷新类型
            if(paramObj.buildingId != undefined){
                this.DType = true;
                this.DbaseMessage.buildingId = paramObj.buildingId;
            }else{
                this.DType = false;
            }
            this.getProjectAllItems();
        },
        //获取建筑所有节点数据并按节点ID进行排序
        getProjectAllItems : function(){            
            var paramObj = {
                buildingId:this.DbaseMessage.buildingId,
                timeFrom:this.DbaseMessage.timeFrom,
            }
            paramObj = JSON.stringify(paramObj);
            var _this = this;

            energyByDayBodyController.getManagementNodeList(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));

                //对节点进行排序
                for(var i=0;i<data.content.length;i++){
                    for(var x=0;x<data.content.length-1;x++){
                        if(data.content[x].energyItemId>data.content[x+1].energyItemId){
                            var cache = data.content[x+1];
                            data.content[x+1] = data.content[x];
                            data.content[x] = cache;
                        }
                    }
                }
                console.log("节点数据已更新")
                //若建筑更换，则获取所有节点数据并默认选择预算管理节点
                if(_this.DType){
                    _this.DAllItems = data.content;
                    _this.getBudgetEnergyByDay();
                
                //若仅仅是更换日期，则获取该日建筑所有节点并与已有数据对比，若一致则获取之前所选分项数据否则获取预算管理节点数据
                }else{
                    var newItems = data.content.map(function(item){
                        return JSON.stringify(item)
                    })
                    var oldItems = _this.DAllItems.map(function(item){
                        return JSON.stringify(item)
                    })
                    _this.DAllItems = data.content;
                    if(newItems.join(",") == oldItems.join(",")){
                        _this.getUserSelItemDataByDay();
                    }else{
                        _this.DAllItems = data.content;
                        _this.getBudgetEnergyByDay();
                    }
                }
            })
        },

        //获取用户所选节点日能耗信息
        getUserSelItemDataByDay : function(){
            var paramObj = {
                buildingId:this.DbaseMessage.buildingId,
                energyItemId:this.DItemSel.energyItemId,
                timeFrom:this.DbaseMessage.timeFrom,
                isBudgetNode:0
            }
            this.getItemEnergyByDay(paramObj);
        },
        //获取预算管理节点日能耗信息
        getBudgetEnergyByDay : function(){
            this.DSelBudgerItem = true;
            var _itemId = "";
            this.DAllItems.forEach(function(item){
                if(item.budgetNode == 1){_itemId = item.energyItemId;return;}
            })
            var paramObj = {
                buildingId:this.DbaseMessage.buildingId,
                energyItemId:_itemId,
                timeFrom:this.DbaseMessage.timeFrom,
                isBudgetNode:1
            }
            this.getItemEnergyByDay(paramObj);
        },

        //获取节点日能耗信息并更新图表
        getItemEnergyByDay : function(paramObj){
            paramObj = JSON.stringify(paramObj);
            var _this = this;
            energyByDayBodyController.getItemEnergyByDayData(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                _this.DItemEnergyData = data.content[0];
                //处理图表所用数据,更新图表
                var ChartEnergyData = data.content[0].hourData.map(function(item){
                    return item.energyData
                })
                var ChartxAxis = data.content[0].hourData.map(function(item){
                    var c = item.time.split(" ")[1];
                    return c.split(":00")[0]+":00"
                })
                console.log("数据已经更新")
                _this.$nextTick(function(){
                    _this.DChartInit();
                    chart.xAxisUpdate(ChartxAxis);
                    chart.update('energy',ChartEnergyData);
                })
            })
        },

        DChartInit : function(){                    //初始化图表
            window.chart = new chartControl();
            chart.options.xAxis.visible = true;
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });
            var chartEnergyByHour = {
                name:"实测能耗",
                type :"column",
                id:"energy",
                keys:['y','id'],
                data: [],
                color:"#02A9D1",
                tooltip: {
                    valueSuffix: 'kWh'
                },
            }
            chart.addSeries(chartEnergyByHour);
            chart.InitChart('energyByDayChart');
        },

        //用户选择节点
        DUserSelItem : function(model,index){
            this.DItemSel = model;
            console.log(model)
            this.DSelBudgerItem = model.DSelBudgerItem == 0 ? false : true;
            $(".energyByDayBody_items").css({"background":"white","color":"black","border-bottom":"1px solid #D9E2E8","height":"50px"});
            $(".energyByDayBody_items").eq(index).css({"background":"#02A9D1","color":"white"});
            if(index == 0){
                $(".energyByDayBody_items").eq(0).css({"border-bottom":"1px solid #02A9D1"});
                $(".energyByDayBody_items").eq(0).find("i").css("color","white")
            }else{
                $(".energyByDayBody_items").eq(index - 1 ).css({"border-bottom":"1px solid #02A9D1"});
                $(".energyByDayBody_items").eq(index).css({"border-bottom":"1px solid #02A9D1"});
                $(".energyByDayBody_items").eq(0).find("i").css("color","#151515");
            }
            if(model.budgetNode == 1){
                this.getUserSelItemDataByDay();
                this.DSelBudgerItem = true;
            }else{
                this.getBudgetEnergyByDay();
                this.DSelBudgerItem = false;
            }
        }
    }
})