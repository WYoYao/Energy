v.pushComponent({
    name:"energybydayBody",
    el:"DB",
    data:{
        DbaseMessage:{},
        DType:true,//true更换建筑 false更换时间
        DSelBudgetItem:true,    //是否选择了预算管理节点
        DItemSel:{},            //用户所选节点
        DAllItems:[],           //所有节点数据
        DItemEnergyData:{},     //节点能耗数据
        DgridHeight:0,
        DFirstLoading:null,
        Dloading : null
    },
    methods:{
        //接受头部传入数据，若只改变日期则只传timeFrom即可，否则传timeFrom，buildingId
        Dactivate : function(paramObj){  
            this.DbaseMessage.timeFrom = paramObj.timeFrom;
            this.Dloading = null;
            //根据是否传入Buildingid判断页面刷新类型
            if(paramObj.buildingId != undefined){
                this.DType = true;
                this.DbaseMessage.buildingId = paramObj.buildingId;
                this.DFirstLoading = null;
            }else{
                this.DType = false;
            }
            this.Dloading = this.DFirstLoading == null ? null : 2;
            this.DChartInit();
            this.getProjectAllItems();
            this.DFirstLoading = this.DFirstLoading == null ? true : false;
        },
        //获取建筑所有节点数据并按节点ID进行排序
        getProjectAllItems : function(){      
            var paramObj = {
                buildingId:this.DbaseMessage.buildingId,
                timeFrom:this.DbaseMessage.timeFrom,
            }
            var _this = this;
            energyByDayBodyController.getManagementNodeList(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                var _budgetNode = {},_index = 0;
                data.forEach(function(item,index){
                    //处理节点显示数据
                    item.energyDataShow = item.energyData == null ? _this.noData : toThousands(RD(item.energyData));
                    item.clicked = false;
                    // 提取预算管理节点
                    if(item.budgetNode == 1){
                        _budgetNode = item;
                        _index = index;
                    }
                })
                data.splice(_index,1)
                // 分项排序
                data.sort(function(a,b){
                    return a.id > b.id ? 1 : -1
                })
                //将预算管理节点置于首位
                data.unshift(_budgetNode);
                //若建筑更换，则获取所有节点数据并选择节点，现在默认为预算管理节点
                if(_this.DType){
                    _this.DAllItems = data; 
                    //第一次进入本页面必然要传buildingid，则可以在此调用上一页面所选节点id进行节点选择操作，否则默认选择预算管理节点
                    if(_this.projectItemIdUserSel != undefined){
                        var a = 0;
                        _this.DAllItems.forEach(function(item,index){
                            //若能匹配到则a=1
                            if(item.id == _this.projectItemIdUserSel){
                                a = 1;
                                _this.DUserSelItem(_this.DAllItems[index]);
                                _this.DAllItems[index].clicked = true;
                                return false;
                            }
                        })
                        //若没有匹配到默认取预算管理节点
                        if(a == 0){
                            _this.DUserSelItem(_this.DAllItems[0]);   
                            _this.DAllItems[0].clicked = true;
                        }

                    }else{
                        _this.DUserSelItem(_this.DAllItems[0]);   
                        _this.DAllItems[0].clicked = true;
                    }
                //若仅仅是更换日期，则获取该日建筑所有节点并与已有数据对比，若一致则获取之前所选分项数据否则获取预算管理节点数据 here计划管理节点是否会随时间改变
                }else{
                    var newItems = data.map(function(item){
                        return JSON.stringify(item.id)
                    })
                    var oldItems = _this.DAllItems.map(function(item){
                        return JSON.stringify(item.id)
                    })
                    if(newItems.join(",") == oldItems.join(",")){
                        _this.getUserSelItemDataByDay();
                        data.forEach(function(item){
                            if(item.id == _this.DItemSel.id){
                                item.clicked = true;
                                return false
                            }
                        })
                        _this.DAllItems = data;
                    }else{
                        _this.DAllItems = data;
                        _this.DAllItems[0].clicked = true;
                        _this.DUserSelItem(data[0])
                    }
                }
            },function(){
                $("#globalnotice").pshow({ text: "无法连接服务器", state: "failure" });
                this.Dloading = 0;
                _this.DFirstLoading = false;
            },function(){   
            })
        },

        //获取用户所选节点日能耗信息
        getUserSelItemDataByDay : function(){
            var paramObj = {
                buildingId:this.DbaseMessage.buildingId,
                energyItemId:this.DItemSel.id,
                timeFrom:this.DbaseMessage.timeFrom,
                isBudgetNode:this.DItemSel.budgetNode == 1 ? 1 : 0
            }
            this.getItemEnergyByDay(paramObj);
        },
        //获取预算管理节点日能耗信息
        getBudgetEnergyByDay : function(){
            var _itemId = "";
            this.DAllItems.forEach(function(item){
                if(item.budgetNode == 1){
                    _itemId = item.id;
                    return;
                }
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
            $(".DB_right_bottom").scrollTop(0);
            // this.Dloading = this.Dloading == 0 ? 1 : 0;
            this.Dloading == 0 ? this.Dloading = 1 : void 0;
            var _this = this;
            energyByDayBodyController.getItemEnergyByDayData(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                data[0].sameRatio == null ? data[0].sameRatioData = null : void 0;
                data[0].circleRatio == null ? data[0].circleRatioData = null : void 0;
                // 若当前所选为预算管理节点，则返回数据有items字段
                if(_this.DSelBudgetItem){
                    // 生成实际能耗横柱宽度数组
                    var widthArr = [];
                    //处理分项能耗数据
                    if(data[0].items != undefined){
                        data[0].items.sort(function(a,b){
                            return a.energyItemId > b.energyItemId ? 1 : -1
                        })
                        var energyDataMax = 0;
                        data[0].items.forEach(function(item){
                            item.energyDataShow = item.energyData == null ? _this.noData : toThousands(RD(item.energyData));
                            item.energyPlanShow = item.energyPlan == null ? _this.noData : toThousands(BD(item.energyPlan));
                            item.planRatioShow = item.planRatio == null ? _this.noData : FBI(item.planRatio*100);
                            energyDataMax = item.energyData > energyDataMax ? item.energyData : energyDataMax;
                        })
                        if(energyDataMax != 0){
                            widthArr = data[0].items.map(function(item){
                                return item.energyData/energyDataMax*100
                            })
                        }else{
                            widthArr = data[0].items.map(function(item){
                                return 0
                            })
                        }
                    }
                }

                _this.DItemEnergyData = data[0];
                //处理图表所用数据,更新图表
                var ChartEnergyData = data[0].hourData.map(function(item){
                    return RD(item.energyData);
                })
                var ChartxAxis = data[0].hourData.map(function(item){
                    var c = item.time.split(" ")[1];    
                    return c.split(":00")[0]+":00"
                })
                setTimeout(function(){
                    //若此时还在此页则开始渲染
                    if(v._instance.onPage == 'energybyday' || v._instance.onBlock == 'detail'){
                        //给予图表wrapdiv高度并更新图表
                        if(v._instance.DSelBudgetItem){
                            var th = $(".DB_right_bottom").eq(0).height();
                            var hh = $(".DB_itemenergy").eq(0).height() + 55;
                            v._instance.DgridHeight = (th-hh)>200 ? (th-hh)+"px" : "200px";
                            //为实际能耗的横柱填充宽度
                            if(v._instance.DItemEnergyData.items.length){
                                GiveEnergyDataWidth("DB_li_bar",widthArr);
                            }
                        
                        }else{
                            v._instance.DgridHeight = "calc(100% - 50px)";
                        }
                        v._instance.$nextTick(function(){
                            // 3.26
                            // chart.InitChart('energyByDayChart');
                            // chart.xAxisUpdate(ChartxAxis);
                            // chart.update('energy',ChartEnergyData);
                            chart.xAxisFill(ChartxAxis);
                            chart.dataFill('energy',ChartEnergyData);
                            chart.InitChart('energyByDayChart');
                            giveChartTopLine("energyByDayChart");
                        })
                    }
                    
                },0)
            },function(){
                //接口调用失败
                $("#globalnotice").pshow({ text: "无法连接服务器", state: "failure" });
            },function(){
                _this.DFirstLoading = false;
                _this.Dloading = 0;
            })
        },
        DChartInit : function(){                    //初始化图表
            window.chart = new chartControl();
            chart.options.xAxis.visible = true;
            chart.options.xAxis.tickWidth = 0;
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });
            chart.options.tooltip.formatter = function () {
                var index = this.points[0].point.index;
                var data = toThousands(RD(v._instance.DItemEnergyData.hourData[index].energyData));
                var tool = "<a style='color:#6D6D6D;font-size:12px;'>" + this.x + "</a><br/>";
                tool += "<a>实际能耗&nbsp;:&nbsp;&nbsp;<a style='font-family:Arial;font-size:14px;'>" + data + (data == null ? "" : "  kWh") + "</a></a><br/>";
                return tool;
            }
            var chartEnergyByHour = {
                name:"实际能耗",
                type :"column",
                id:"energy",
                keys:['y','id'],
                data: [],
                color:"#02A9D1",
                tooltip: {
                    valueSuffix: 'kWh'
                },
                groupPadding:0.3
            }
            chart.addSeries(chartEnergyByHour);
        },

        // 用户选择节点
        DUserSelItem : function(model){
            this.DAllItems.forEach(function(item){
                item.clicked = false;
            })
            model.clicked = true;
            this.DItemSel = model;
            this.DSelBudgetItem = model.budgetNode == 0 ? false : true;
            model.budgetNode == 1 ? this.getBudgetEnergyByDay() :　this.getUserSelItemDataByDay();
        },
        DTloading : function(){
            if(this.onPage == 'energybyday' || this.onBlock == 'detail'){
                $("#DLpartloading").pshow();
                $("#DDR").phide();
            }
        },
        DOloading : function(){
            if(this.onPage == 'energybyday' || this.onBlock == 'detail'){
                $("#DLpartloading").phide();
                $("#DDR").pshow();
            }
        },
        DNloading : function(){
            if(this.onPage == 'energybyday' || this.onBlock == 'detail'){
                $("#DLpartloading").phide();
                $("#DDR").phide();
            }   
        }
    },
    watch : {
        DFirstLoading : function(N,O){
            this.onPage == 'energybyday' || this.onBlock == 'detail' ? N == true ? $("#globaloadng").pshow() : N == false ? $("#globaloadng").phide() : void 0 : void 0;
        },
        Dloading : function(N,O){
            this.onPage == 'energybyday' || this.onBlock == 'detail' ? N == 2 ? this.DTloading() : N == 1 ? this.DOloading() :  this.DNloading() : void 0;
        }
    }
})

