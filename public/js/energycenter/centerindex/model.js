v.pushComponent({
    name:"centerindex",
    el:"#index",
    data:{
        noData:"-",
        indexPage:{       //index页面切换控制
            energy:true,  //查看能耗或者单平米能耗
        },
        projectInfo:{},   //项目能耗数据
        projectSelectParam:{                                                   //项目筛选参数
            BudgetAndPlanIntegrity:ProjectSelectParam.BudgetAndPlanIntegrity,  //预算以及计划完整度
            projectType:[],                                                    //项目类型
            projectArea:ProjectSelectParam.projectArea,                        //项目占地面积
            projectClimate:[],                                                 //项目所属气候带
            projectRegion:[],                                                  //项目所在地区
        },
        AllProjectItems:[],                                                    //所有项目分项节点合集
        projectSel:{                                                           //处理该项目预算
            projectHistoryBudget:[],                                           //项目历史预算
            projectInfo:{},                                                    //项目信息
            projectRemark:[]                                                   //项目预算修改记录
        },       
        NotSelFutureMonth:true,                                                //用户没有选择未来月
        NotSelHistoryMonth:true,                                               //用户没有选择历史月
        indexDownloadSel:[{name:"下载pdf文件"},{name:"下载excel文件"}],
        indexRemark:false,                                                     //项目预算弹窗批注界面
        indexBudget:false,                                                     //项目预算弹窗预算编辑界面
        remarkCache:null,                                                      //用户所填批注
        projectBudgetEditCache:{                                               //用户编辑预算信息
            total:null,     
            square:null,
            remark:null
        },
        indexChartAvgLine:{                                                     //图表中是否显示平均值虚线
            energyBudget:true,
            energyReal:true,
            init:true
        }

    },
    methods:{
        IndexInit : function(){                                      //页面初次加载
            // setTimeout(function(){
            //     v._instance.indexDrawChart();                              //初始化图表
            //     budgetFillInputBlur();                              //绑定输入框失去焦点自动计算
            // },1)
            this.selThisMonth('index_head_ptime');                  //将时间插件时间选择为这个月
            this.getAllItemInfo();                                  //获取所有项目存在计划节点
            this.getProjectScreenInfo();                            //获取项目筛选参数
            this.getAllProjectInfo();                               //获取所有项目数据
            this.$nextTick(function(){
                this.indexDrawChart();                              //初始化图表
                budgetFillInputBlur();                              //绑定输入框失去焦点自动计算
            })
        },

        getAllItemInfo : function(){                                 //获取所有项目分项列表
            var _this = this;
            indexController.getAllItemInfo(function(data){
                console.log(data)
                data = JSON.parse(JSON.stringify(data));
                data.content.forEach(function(item,index){
                    if(item.isBudget==0){
                        item.id = 0;
                        _this.AllProjectItems.unshift(item)
                    }else{
                        item.id = index+1;
                        _this.AllProjectItems.push(item)
                    }
                })
                // _this.AllProjectItems.unshift({id:0,name:"总能耗"});
            })
        },

        getProjectScreenInfo : function(){                           //获取项目筛选参数
            var paramObj = {
                projectId:"pj1101010003"
            }
            paramObj = JSON.stringify(paramObj)
            var _this = this;
            indexController.getProjectScreenInfo(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                _this.projectSelectParam.projectClimate = data.content.climate.map(function(item,index){
                    item.id = index+1;
                    item.sel = false;
                    return item
                })
                _this.projectSelectParam.projectClimate.unshift({name:"不限",id:0,sel:true})

                _this.projectSelectParam.projectRegion = data.content.areaType.map(function(item,index){
                    item.id = index+1;
                    item.sel = false;
                    return item
                })
                _this.projectSelectParam.projectRegion.unshift({name:"不限",id:0,sel:true})

                _this.projectSelectParam.projectType = data.content.buildingType.map(function(item,index){
                    item.id = index+1;
                    item.sel = false;
                    return item
                })
                _this.projectSelectParam.projectType.unshift({name:"不限",id:0,sel:true})
            })
        },

        createGetListParam : function(){                             //组装获取项目信息请求参数
            var Time = new Date($("#index_head_ptime").psel().startTime);
            var Item = $("#index_head_pcombo").psel().id;
            Item == undefined ? Item =  this.AllProjectItems[0].logicId : void 0;
            var budgetPlanStatus = "",projectType = "",projectClimate = "",projectRegion = "",projectArea = "";

            if(this.projectSelectParam.BudgetAndPlanIntegrity[0].sel)
            {
                budgetPlanStatus = null
            }else{
                for(var i=1;i<this.projectSelectParam.BudgetAndPlanIntegrity.length;i++){
                    this.projectSelectParam.BudgetAndPlanIntegrity[i].sel ? budgetPlanStatus += ","+(this.projectSelectParam.BudgetAndPlanIntegrity[i].id-1) : void 0;
                }
                budgetPlanStatus = budgetPlanStatus.slice(1);}

            if(this.projectSelectParam.projectType[0].sel){
                projectType = null 
            }else{
                for(var i=1;i<this.projectSelectParam.projectType.length;i++){
                    this.projectSelectParam.projectType[i].sel ? projectType += (","+this.projectSelectParam.projectType[i].code) : void 0;
                }
                projectType = projectType.slice(1);
            }

            if(this.projectSelectParam.projectClimate[0].sel){
                projectClimate = null 
            }else{
                for(var i=1;i<this.projectSelectParam.projectClimate.length;i++){
                    this.projectSelectParam.projectClimate[i].sel ? projectClimate += (","+this.projectSelectParam.projectClimate[i].code) : void 0;
                }
                projectClimate = projectClimate.slice(1);
            }

            if(this.projectSelectParam.projectRegion[0].sel){
                projectRegion = null 
            }else{
                for(var i=1;i<this.projectSelectParam.projectRegion.length;i++){
                    this.projectSelectParam.projectRegion[i].sel ? projectRegion += (","+this.projectSelectParam.projectRegion[i].code) : void 0;
                }
                projectRegion = projectRegion.slice(1);
            }

            if(this.projectSelectParam.projectArea[0].sel){
                projectArea = null 
            }else{
                for(var i=1;i<this.projectSelectParam.projectArea.length;i++){
                    this.projectSelectParam.projectArea[i].sel ? projectArea += (","+this.projectSelectParam.projectArea[i].name) : void 0;
                }
                projectArea = projectArea.slice(1);
                projectArea = projectArea.replace(/~/g, "-");
                projectArea = projectArea.replace(/及以上/g, "");
            }
            
            // "budgetPlanStatus":0,                             //类型：Number  可有字段  备注：0-有预算有计划 1-有预算无计划 2-无预算无计划
            // "energyItemCode":"A1-1-001",                      //类型：String  必有字段  备注：分项编码
            // "climateZone":"10",                               //类型：String  可有字段  备注：气候带编码
            // "region":"23",                                    //类型：String  可有字段  备注：区域编码
            // "buildingType":"23",                              //类型：String  可有字段  备注：建筑类型编码
            // "area":""                                         //类型：String  可有字段  备注：建筑面积
            // "startDate":"2017-11-01 00:00:00",                //类型：String  必有字段  备注：开始时间
            // "endDate":"2017-12-01 00:00:00",                  //类型：String  必有字段  备注：截止时间
            // "isDownload":false                                //类型：Boolean  可有字段  备注：是否下载excel 选填 默认为false
            var paramObj = {
                budgetPlanStatus:budgetPlanStatus,
                buildingType:projectType,
                climateZone:projectClimate,
                region:projectRegion,
                area:projectArea,
                energyItemCode:Item,
                startDate:Time.format("yyyy-M-d h:m:s"),
                endDate:this.getNextMonth(Time).format("yyyy-M-d h:m:s"),
                isDownload:false
            }

            paramObj = JSON.stringify(paramObj);
            this.getList(paramObj);
        },

        getAllProjectInfo : function(){                              //获取所有项目信息
            var paramObj = {
                budgetPlanStatus:null,                                                                      //类型：Number  可有字段  备注：0-有预算有计划 1-有预算无计划 2-无预算无计划
                energyItemCode:"A1-1-001",                                                                  //类型：String  必有字段  备注：分项编码
                climateZone:null,                                                                           //类型：String  可有字段  备注：气候带编码
                region:null,                                                                                //类型：String  可有字段  备注：区域编码
                buildingType:null,                                                                          //类型：String  可有字段  备注：建筑类型编码
                area:null,                                                                                  //类型：String  可有字段  备注：建筑面积
                startDate:this.getThisMonth().format('yyyy-M-d h:m:s'),                                     //类型：String  必有字段  备注：开始时间
                endDate:this.getNextMonth(this.getThisMonth()).format('yyyy-M-d h:m:s'),                    //类型：String  必有字段  备注：截止时间
                isDownload:false                                                                            //类型：Boolean  可有字段  备注：是否下载excel 选填 默认为false
            }
            paramObj = JSON.stringify(paramObj);
            this.getList(paramObj);
        },

        getList : function(paramObj){                                //获取项目信息，刷新图表数据
            var _this = this;
            indexController.getList(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                var energyBudgetData = [],energyRealData = [],energyPercent = [],energyxAxis = [];
                data.content[0].projectInfo.forEach(function(item){
                    //可能为null的数据的展示用数据改为 '-'

                    item.energyBudgetShow = item.energyBudget == null ? _this.noData : toThousands(Math.ceil(item.energyBudget));
                    item.energyRealShow = item.energyReal == null ? _this.noData : toThousands(Math.toFixed({value:item.energyReal,isByInt:true}));
                    item.enengyBudegetPerSquareShow = item.enengyBudegetPerSquare == null ? _this.noData : toThousands(Math.ceil(item.enengyBudegetPerSquare));
                    item.energyRealPerSquareShow = item.energyRealPerSquare == null ? _this.noData : toThousands(Math.toFixed({value:item.energyRealPerSquare,isByInt:true}));
                    item.areaShow = toThousands(item.area)
                    item.enengyOccupyBudegetPercent != null ? item.enengyOccupyBudegetPercent = Math.toFixed({value:item.enengyOccupyBudegetPercent,isByInt:true}) : void 0;
                    //处理图表使用数据
                    // energyBudgetData.push([item.energyBudget,item.projectId+'Budget'])
                    energyBudgetData.push( item.energyBudget == null ? [0,item.projectId+'Budget'] : [Math.toFixed({value:item.energyBudget,fixedNum:1}),item.projectId+'Budget'])
                    // energyRealData.push([item.energyReal,item.projectId+'Real'])
                    energyRealData.push( item.energyReal == null ? [0,item.projectId+'Real'] : [Math.floor(item.energyReal),item.projectId+'Real'])
                    // energyPercent.push([item.enengyOccupyBudegetPercent,item.projectId+'Percent'])
                    energyPercent.push( item.enengyOccupyBudegetPercent == null ? [0,item.projectId+'Percent'] : [item.enengyOccupyBudegetPercent,item.projectId+'Percent'])
                    energyxAxis.push(item.projectName)
                })
                data.content[0].energyBudgetAvgShow = toThousands(Math.ceil(data.content[0].energyBudgetAvg));
                data.content[0].energyRealAvgShow = toThousands(Math.toFixed({value:data.content[0].energyRealAvg,isByInt:true}));
                data.content[0].totalAreaShow = toThousands(Math.toFixed({value:data.content[0].totalArea,fixedNum:1}));
                data.content[0].totalEnergyBudgetShow = toThousands(Math.ceil(data.content[0].totalEnergyBudget));
                data.content[0].totalEnergyRealShow = toThousands(Math.ceil(data.content[0].totalEnergyReal));
                _this.projectInfo = data.content[0];

                //除第一次加载页面外每次查询数据清除并重绘平均值虚线
                if( _this.indexChartAvgLine.init == false){
                    _this.indexChartAvgLine.energyBudget ?　_this.indexChartPlot(0) : void 0;
                    _this.indexChartAvgLine.energyReal ?　_this.indexChartPlot(1) : void 0;
                    _this.indexChartAvgLine = {
                        energyBudget:true,
                        energyReal:true,
                        init:true
                    };
                }

                //填充图表数据并对表格数据做一次正排序，排序依据实际能耗
                _this.$nextTick(function(){
                    chart.update('energyBudget',energyBudgetData);
                    chart.update('energyReal',energyRealData);
                    chart.update('energyPercent',energyPercent);
                    chart.xAxisUpdate(energyxAxis);
                    if(_this.indexChartAvgLine.init){
                        chart.chart.yAxis[0].addPlotLine({
                            value: this.projectInfo.energyBudgetAvg,
                            color: '#8D8D8D',
                            width: 2,
                            id: 'energyBudgetAVG',
                            zIndex:10,
                            dashStyle:"Dash"
                        })
                        chart.chart.yAxis[0].addPlotLine({
                            value: this.projectInfo.energyRealAvg,
                            color: '#00A8D3',
                            width: 2,
                            id: 'energyRealAVG',
                            zIndex:10,
                            dashStyle:"Dash"
                        })
                        _this.indexChartAvgLine.init = false;
                    }
                    $(".index_grid_pic").eq(7).find("i").eq(0).css("color","#C3CDD0");
                    $(".index_grid_pic").eq(7).find("i").eq(1).css("color","#7A94AD");
                    this.indexProjectInfoSort(0,7);
                    this.indexProjectInfoSort(1,7);
                })
                // console.log((new Date).getTime())
            })
        },

        getThisMonth : function(){
            var date = new Date;
            date.setDate(1);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        },
        getNextMonth : function(date){
            date.getMonth() == 11 ? date.setFullYear(date.getFullYear()+1) : void 0;
            date.getMonth() == 11 ? date.setMonth(1) : date.setMonth(date.getMonth()+1);
            return date;
        },

        selThisMonth : function(el){                                 //将时间插件调整为当月
            $(el).psel({timeType:"M",startTime:this.getThisMonth()})
        },

        projectSelectParamSel : function(model,type){                //项目筛选单多选统一控制
            var data;
            switch(type){
                case 'integrity':
                    data = this.projectSelectParam.BudgetAndPlanIntegrity;
                break;
                case 'climate':
                    data = this.projectSelectParam.projectClimate;
                break;
                case 'type':
                    data = this.projectSelectParam.projectType;
                break;
                case 'area':
                    data = this.projectSelectParam.projectArea;
                break;
                case 'region':
                    data = this.projectSelectParam.projectRegion;
                break;
            }
            if(model.id == 0){
                if(model.sel){
                    return
                }else{
                    model.sel = true;
                    data.forEach(function(item){
                        item.sel = false;
                    })
                }
            }{
                if(data[0].sel){
                    data[0].sel = false;
                    model.sel = !model.sel;
                }else{
                    model.sel = !model.sel;
                }
            }
            var a = 0;
            data.forEach(function(item){
                item.sel ? a = 1 : void 0;
            })
            a == 0 ? data[0].sel = true : void 0;
        },

        IndexBudgetWindowOpen : function(model){                     //打开项目预算信息窗口
            this.projectSel.projectInfo = model;
            this.getProjectBudgetRemark();                           //获取项目预算批注信息
            this.getProjectHistoryBudget();                          //获取项目预算历史月信息
            this.clearAllBudgetCache();                              //清除上一次操作预算信息窗口缓存信息
            $("#index_budgetWindow").pshow();
        },
            
        projectFilter : function(){                                  //打开项目筛选窗口
            $("#index_filterWindow").pshow();
        },

        getProjectBudgetRemark : function(){
            var _this = this;
            // "buildingId":"Bd1101010003001",                //类型：String  必有字段  备注：建筑id
            // "budgetItemId":"VOEi11010100020008",                //类型：String  必有字段  备注：预算管理节点
            // "planDate":"2017-10-01 00:00:00"                //类型：String  必有字段  备注：计划月份
            var paramObj = {
                buildingId:this.projectSel.projectInfo.buildingId,
                budgetItemId:this.projectSel.projectInfo.bugdgetItemId,
                planDate: new Date($("#index_head_ptime").psel().startTime).format('yyyy-M-d h:m:s')
            }
            paramObj = JSON.stringify(paramObj);
            indexController.getProjectBudgetRemark(paramObj,function(data){
                _this.projectSel.projectRemark = JSON.parse(JSON.stringify(data)).content;
            })
        },

        getProjectHistoryBudget : function(){                        //获取并绘制预算历史信息
            var date = new Date($("#index_head_ptime").psel().startTime);
            var _Month = date.format("M");
            var paramObj = {
                buildingId:this.projectSel.buildingId,
                startDate:date.format('yyyy-M-d h:m:s'),
                endDate:this.getNextMonth(date).format('yyyy-M-d h:m:s')
            }
            paramObj = JSON.stringify(paramObj);
            var _this = this;
            indexController.getProjectHistoryBudget(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                _this.projectSel.projectHistoryBudget = data.content.map(function(item){
                    var time = item.time.split("-");
                    item.timeUsed = time[0]+"."+time[1];
                    time[1] == _Month ? item.HN = true : item.HN = false;                                     //HN 是否为历史月
                    item.energyDataBudgetShow = toThousands(item.energyDataBudget);                           
                    item.energyDataRealShow = toThousands(item.energyDataReal);
                    var objParam = {
                        value:item.energyDataReal/item.energyDataBudget*100,
                        fixedNum:1
                    }
                    item.energyPercent = Math.toFixed(objParam)
                    return item;
                });
                var arr = _this.projectSel.projectHistoryBudget.map(function(item){
                    return Math.max(item.energyDataBudget,item.energyDataReal)
                })
                var NumMax = arr.reduce(function(pre,cur,index,array){  
                    return Math.max(pre,cur);  
                });  
                // var NumMax = _this.projectSel.projectHistoryBudget.reduce(function(pre,cur,index,array){
                //     return Math.max(pre,Math.max(cur.energyDataBudget,cur.energyDataReal));
                // })
                var energyDataBudgetWidth = [] , energyDataRealWidth = [];
                _this.projectSel.projectHistoryBudget.forEach(function(item){
                    energyDataBudgetWidth.push(Math.floor(item.energyDataBudget/NumMax*100)+"%");
                    energyDataRealWidth.push(Math.floor(item.energyDataReal/NumMax*100)+"%");
                })
                _this.$nextTick(function(){
                    var el1 = window.document.getElementsByClassName("index_budgetWindow_history_bar1");
                    var el2 = window.document.getElementsByClassName("index_budgetWindow_history_bar2");
                    for(var i=0;i<el1.length;i++){
                        el1[i].style.width = energyDataBudgetWidth[i]
                        el2[i].style.width = energyDataRealWidth[i]
                    }
                })
                
            });
        },
         
        indexDrawChart : function(){                                 //初始化图表，此时无数据
            window.chart = new chartControl();
            chart.options.xAxis.visible = false;
            chart.options.chart.plotBackgroundColor = "#F8F8F8";
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });
            chart.options.yAxis.push({
                title: {
                    text: ''
                },
                gridLineWidth:0,
                labels: {
                    formatter: function() {
                        return this.value +'%';
                    }
                },
                min:0,
                opposite: true //第二根Y轴在页面右边
                
            })
            var chartEnergyBudget = {
                name:"能耗预算",
                type :"column",
                id:"energyBudget",
                keys:['y','id'],
                data: [],
                color:"#C3CDD0",
                pointPadding: 0.2,
                pointPlacement: -0.18,
                tooltip: {
                    valueSuffix: ' kWh'
                },
                events:{
                    click:function(event){
                        // console.log(event.point.index)
                        chartClick(event.point.index)
                    }
                },
                // borderColor:"black",
                // borderWidth: 1,
                yAxis: 0
            }
            var chartEnergyReal = {
                name:"实际能耗",
                type :"column",
                id:"energyReal",
                keys:['y','id'],
                data: [],
                color:"#02A9D1",
                pointPadding: 0.2,
                pointPlacement: 0.18,
                tooltip: {
                    valueSuffix: ' kWh'
                },
                events:{
                    click:function(event){
                        // console.log(event.point.index)
                        chartClick(event.point.index)
                    }
                },
                // borderColor:"black",
                // borderWidth: 1,
                yAxis: 0
            }
            var chartEnergyPercent = {
                name:"实际能耗占预算比",
                type :"line",
                id:"energyPercent",
                keys:['y','id'],
                data: [],
                color:"#637E99",
                pointPadding: 0.2,
                pointPlacement: 0,
                // borderColor:"black",
                // borderWidth: 1,
                tooltip: {
                    valueSuffix: '%'
                },
                yAxis: 1,
                dashStyle:"Dash",
                marker:{//线上数据点  
                    symbol:'circle',//圆点显示  
                    radius:4,  
                    lineWidth:2,  
                    lineColor:'#637E99',  
                    fillColor:'#ffffff'
                } 
            }
            chart.addSeries(chartEnergyBudget);
            chart.addSeries(chartEnergyReal);
            chart.addSeries(chartEnergyPercent);
            chart.InitChart('index_chart');
        },
        
        indexGridSord : function(index){                                //表头排序按钮被点击
            var topcolor = RGBToHex($(".index_grid_pic").eq(index).find("i").eq(0).css("color"));
            var botcolor = RGBToHex($(".index_grid_pic").eq(index).find("i").eq(1).css("color"));
            if((topcolor=="#C3CDD0" && botcolor=="#C3CDD0")){
                this.indexProjectInfoSort(0,index)
                $(".index_foot_head").find("i").css("color","#C3CDD0");
                $(".index_grid_pic").eq(index).find("i").eq(0).css("color","#7A94AD");
                $(".index_grid_pic").eq(index).find("i").eq(1).css("color","#C3CDD0");}
            if(topcolor=="#7A94AD" && botcolor=="#C3CDD0"){
                this.indexProjectInfoSort(1,index);
                $(".index_foot_head").find("i").css("color","#C3CDD0");
                $(".index_grid_pic").eq(index).find("i").eq(0).css("color","#C3CDD0");
                $(".index_grid_pic").eq(index).find("i").eq(1).css("color","#7A94AD"); }
            if((topcolor=="#C3CDD0" && botcolor=="#7A94AD")){
                this.indexProjectInfoSort(1,index);
                $(".index_foot_head").find("i").css("color","#C3CDD0");
                $(".index_grid_pic").eq(index).find("i").eq(0).css("color","#7A94AD");
                $(".index_grid_pic").eq(index).find("i").eq(1).css("color","#C3CDD0"); }
            //rgb(195, 205, 208)#C3CDD0
            //rgb(122, 148, 173)#7A94AD
        },

        indexProjectInfoSort : function(type,index){                  //排序操作，type为1时进行从小到大排序，为1时颠倒数组顺序，index指排序依据的属性
            var attrGather = ["projectName","buildingTypeName","climateZoneName","area","energyBudget","sameRatio","circleRatio","energyReal","enengyOccupyBudegetPercent"]
            if(type == 1){
                this.projectInfo.projectInfo.reverse()
            }else{
                var data = this.projectInfo.projectInfo;
                for(var i=0;i<data.length-1;i++){  
                    for(var j=0;j<data.length-1;j++){  
                        if(data[j][attrGather[index]] > data[j+1][attrGather[index]]){
                            var cache=data[j];  
                            data[j]=data[j+1];  
                            data[j+1]=cache;  
                        }  
                    }  
                } 
                data.push({});                          //更新视图
                data.pop({});
            } 
        },

        indexIsThisMonth : function(){                                  //用户所选月份是过去还是未来
            $("#index_head_ptime").psel().startTime > this.getThisMonth().getTime() ? this.NotSelFutureMonth = false : this.NotSelFutureMonth = true;
            $("#index_head_ptime").psel().startTime < this.getThisMonth().getTime() ? this.NotSelHistoryMonth = false : this.NotSelHistoryMonth = true;
        },

        clearAllBudgetCache : function(){                               //还原预算管理界面
            this.indexRemark = false;
            this.indexBudget = false;                                  
            this.remarkCache = null,  
            this.projectBudgetEditCache = {                                     
                total:null,     
                square:null,
                remark:null
            }
        },

        indexBudgetEdit : function(){                                   //用户点击编辑预算时将其所选项目已有数据填充至缓存数据中
            this.indexRemark = false;
            this.indexBudget = true;
            this.projectBudgetEditCache = {                                     
                total:Math.ceil(this.projectSel.projectInfo.energyBudget),     
                square:Math.ceil(this.projectSel.projectInfo.enengyBudegetPerSquare),
                remark:null
            }
        },

        createEnergyBudget : function(){                                 //用户创建预算，打开预算创建界面并清空批注缓存
            this.indexRemark = false;
            this.indexBudget = true;                              
            this.remarkCache = null;
        },


        SaveBudgetOrRemark : function(){                                //判断用户是添加批注还是编辑或者创建预算      
          
            //判断用户是批注还是编辑预算
            if(this.indexRemark){
                //若批注框验证通过则上传数据，否则无反应
                if($("#indexBudgetRemark").pverifi()){
                    var paramObj = {
                        // "buildingId":"Bd1101010003001",                //类型：String  必有字段  备注：建筑id
                        // "budgetItemId":"VOEi11010100020008",                //类型：String  必有字段  备注：预算节点id
                        // "planDate":"2017-10-01 00:00:00",                //类型：String  必有字段  备注：定额预算设定月份
                        // "energyDataBudget":310000,                //类型：Number  可有字段  备注：能耗预算值
                        // "energyDataBudgetPerSquare":80,                //类型：Number  可有字段  备注：单平米能耗
                        // "operate":"操作",                //类型：String  可有字段  备注：操作
                        // "operateUser":"张三",                //类型：String  可有字段  备注：操作类型
                        // "state":0,                //类型：Number  可有字段  备注：状态 0-冻结 1-未冻结
                        // "remark":"填写的批注信息"                //类型：String  可有字段  备注：填写的批注信息
                        buildingId:this.projectSel.projectInfo.buildingId,
                        budgetItemId:this.projectSel.projectInfo.bugdgetItemId,
                        planDate:(new Date($("#index_head_ptime").psel().startTime)).format('yyyy-M-d h:m:s'),
                        energyDataBudget:this.projectSel.projectInfo.energyBudget,
                        energyDataBudgetPerSquare:this.projectSel.projectInfo.enengyBudegetPerSquare,
                        operate:"批注",
                        operateUser:"",
                        state:1,
                        remark:this.remarkCache
                    }
                    sendParamObj(paramObj);
                }               
            }else{
                //用户点击保存按钮后判断两个参数是否验证通过，否则无反应
                if($("#TotalBudgetFill").pverifi() && $("#squareBudgetFill").pverifi()){
                    var paramObj = {
                        buildingId:this.projectSel.projectInfo.buildingId,
                        budgetItemId:this.projectSel.projectInfo.bugdgetItemId,
                        planDate:(new Date($("#index_head_ptime").psel().startTime)).format('yyyy-M-d h:m:s'),
                        energyDataBudget:this.projectBudgetEditCache.total,
                        energyDataBudgetPerSquare:this.projectBudgetEditCache.square,
                        operate:this.projectSel.projectInfo.energyBudget == null ? "添加预算" : "编辑预算",
                        operateUser:"",
                        state:1,
                        remark:this.remarkCache
                    }
                    sendParamObj(paramObj);
                }
            }
            function sendParamObj(paramObj){
                paramObj = JSON.stringify(paramObj);
                console.log(paramObj)
                indexController.projectBudgetMessageEdit(paramObj,function(data){
                    $("#index_budgetWindow").phide();
                    //弹出提示框提示成功
                    JSON.parse(JSON.stringify(data)).result == "success" ? $("#index_message").pshow({ text: "添加成功！", state: "success" }) : void 0;
                    //如果是批注操作，则关闭侧弹窗，若是预算操作，则刷新整体页面重新获取数据
                    console.log(v._instance.indexBudget)
                    if(v._instance.indexBudget){
                        v._instance.createGetListParam()
                    }
                    //重置所有缓存数据
                    v._instance.clearAllBudgetCache();
                })
            }
        },

        indexChartPlot : function(index){                                    //处理图表中平均值虚线
            if(index == 0){
                this.indexChartAvgLine.energyBudget = !this.indexChartAvgLine.energyBudget;
                this.indexChartAvgLine.energyBudget ? 
                chart.chart.yAxis[0].addPlotLine({
                    value: this.projectInfo.energyBudgetAvg,
                    color: '#8D8D8D',
                    width: 2,
                    id: 'energyBudgetAVG',
                    zIndex:10,
                    dashStyle:"Dash"
                }) : chart.chart.yAxis[0].removePlotLine('energyBudgetAVG');
            }else{
                this.indexChartAvgLine.energyReal = !this.indexChartAvgLine.energyReal;
                this.indexChartAvgLine.energyReal ? 
                chart.chart.yAxis[0].addPlotLine({
                    value: this.projectInfo.energyRealAvg,
                    color: '#00A8D3',
                    width: 2,
                    id: 'energyRealAVG',
                    zIndex:10,
                    dashStyle:"Dash"
                }) : chart.chart.yAxis[0].removePlotLine('energyRealAVG');
            }
        },

        indexGridHover : function(index){
            console.log(index)
            // chart.chart.tooltip.refresh(chart.chart.series[0].data[index+1]);
        },

    },
    beforeMount:function(){
        this.IndexInit();
    }
})