v.pushComponent({
    name:"centerindex",
    el:"#index",
    data:{
        indexPage:{       //index页面切换控制
            energy:true,  //查看能耗或者单平米能耗
            downloadPDF : false,
            budgetCanSave : false
        },
        projectInfo:{},   //项目能耗数据
        projectSel:{                                                           //处理该项目预算
            projectHistoryBudget:[],                                           //项目历史预算
            projectInfoReady:{},
            projectInfo:{},                                                    //项目预算信息
            projectRemark:[],                                                  //项目预算修改记录
        },       
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
        },
        Iloading:null,
        indexBudgerWarn:{
            pizhu:false,
            total:false,
            square:false,
            pizhu2:false
        },
        noscW:'100%',
        ItabArr:[{name:"  能耗  "},{name:"单平米能耗"}]
    },
    methods:{
        IndexInit : function(){                                      //页面初次加载
            window.chart = new chartControl();
            this.selThisMonth('I_head_ptime');                      
            //获取项目筛选参数
            this.indexDataReady.projectSelReady ? void 0 : this.getProjectScreenInfo();
            //获取项目所有节点信息
            this.indexDataReady.itemDataReady ? void 0 : this.getAllItemInfo();
            //获取项目信息
            this.indexUserSelParam != null ? this.getList(this.indexUserSelParam) : void 0;
            this.$nextTick(function(){
                //如果是返回首页则调整时间控件时间
                this.indexInitChart();                              //初始化图表
                budgetFillInputBlur();                              //绑定输入框失去焦点自动计算
                this.indexDataReady.time != null ? $("#I_head_ptime").psel({startTime:this.indexDataReady.time},false) : void 0;
                this.indexDataReady.itemIndex != null ? $("#I_head_pcombo").psel(this.indexDataReady.itemIndex,false) : void 0;
                $("#I_head_ptab").psel(this.indexPage.energy ? 0 : 1,false);
            })
        },


        //后台交互
        //获取项目筛选参数
        getProjectScreenInfo : function(){                           
            var _this = this;
            indexController.getProjectScreenInfo("",function(data){
                data = JSON.parse(JSON.stringify(data));
                _this.projectSelectParam.projectClimate = data[0].climate.map(function(item,index){
                    item.id = index+1;
                    item.sel = false;
                    return item
                })
                _this.projectSelectParam.projectClimate.unshift({name:"不限",id:0,sel:true})

                _this.projectSelectParam.projectRegion = data[0].areaType.map(function(item,index){
                    item.id = index+1;
                    item.sel = false;
                    return item
                })
                _this.projectSelectParam.projectRegion.unshift({name:"不限",id:0,sel:true})

                _this.projectSelectParam.projectType = data[0].buildingType.map(function(item,index){
                    item.id = index+1;
                    item.sel = false;
                    return item
                })
                _this.projectSelectParam.projectType.unshift({name:"不限",id:0,sel:true});
                _this.indexDataReady.projectSelReady = true;
            },function(){
                $("#globalnotice").pshow({ text: "获取数据失败", state: "failure" })
            })
        },
        //获取所有项目分项列表
        getAllItemInfo : function(){                                 
            var _this = this;
            indexController.getAllItemInfo(function(data){
                data = JSON.parse(JSON.stringify(data));
                data.forEach(function(item,index){
                    if(item.isBudget==1){
                        item.id = 0;
                        _this.AllProjectItems.unshift(item)
                        _this.indexBudgetId = item.logicId;
                        _this.indexBudgetName = item.name;
                    }else{
                        item.id = index+1;
                        _this.AllProjectItems.push(item)
                    }
                })
                _this.indexDataReady.itemDataReady = true;
            },function(){
                $("#globalnotice").pshow({ text: "获取数据失败", state: "failure" })
            },function(){
               _this.getAllProjectInfo();
               $("#I_head_pcombo").psel(0,false);
            })
        },
        //获取所有项目信息
        getAllProjectInfo : function(){                              
            var paramObj = {
                budgetPlanStatus:null,                                                                      //类型：Number   可有字段  备注：0-有预算有计划 1-有预算无计划 2-无预算无计划
                energyItemCode:this.indexBudgetId,                                                          //类型：String   必有字段  备注：分项编码
                climateZone:null,                                                                           //类型：String   可有字段  备注：气候带编码
                region:null,                                                                                //类型：String   可有字段  备注：区域编码
                projectType:null,                                                                           //类型：String   可有字段  备注：建筑类型编码
                area:null,                                                                                  //类型：String   可有字段  备注：建筑面积
                startDate:this.getThisMonth().format('yyyy-M-d h:m:s'),                                     //类型：String   必有字段  备注：开始时间
                download:false,                                                                             //类型：Boolean  可有字段  备注：是否下载excel 选填 默认为false
                square:!this.indexPage.energy,
                userId: this.userId
            }
            this.getList(paramObj);
        },
        //获取项目信息，刷新图表数据
        getList : function(paramObj){     
            this.Iloading = this.Iloading == null ? 0 : 1;          
            var _this = this;
            indexController.getList(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                data[0].projectInfo.forEach(function(item){
                    //项目类型名称
                    _this.projectSelectParam.projectType.forEach(function(model){
                        if(model.code == item.projectType){
                            item.projectTypeName = model.name;
                            return 
                        }
                    })
                    //项目所属气候带名称
                    _this.projectSelectParam.projectClimate.forEach(function(model){
                        if(model.code == item.climate){
                            item.climateName = model.name;
                            return 
                        }
                    })
                    //项目能耗预算
                    item.budgetDataShow = item.budgetData == null ? _this.noData : toThousands(Math.floor(item.budgetData));
                    //项目是否拥有能耗预算
                    item.ifHasBudget = item.budgetData == null ? false : true;
                    //项目预算同比
                    item.budgetRatioSameShow = item.budgetRatioSame == null ? _this.noData : Math.toFixed({value:item.budgetRatioSame*100,isByInt:true})+"%";
                    //项目预算环比
                    item.budgetRatioCircleShow = item.budgetRatioCircle == null ? _this.noData : Math.toFixed({value:item.budgetRatioCircle*100,isByInt:true})+"%";
                    //项目实际能耗
                    item.energyDataShow = item.energyData == null ? _this.noData : toThousands(Math.toFixed({value:item.energyData,isByInt:true}));
                    //项目能耗预算占比
                    item.realBudgetRatioShow = item.realBudgetRatio == null ? _this.noData : Math.toFixed({value:item.realBudgetRatio*100,isByInt:true})+"%";

                })
                data[0].areaSumShow = data[0].areaSum == null ? _this.noData : toThousands(Math.toFixed({value:data[0].areaSum,fixedNum:1}));
                data[0].budgetDataSumShow = data[0].budgetDataSum == null ? _this.noData : toThousands(Math.floor(data[0].budgetDataSum));
                data[0].energyDataSumShow = data[0].energyDataSum == null ? _this.noData : toThousands(Math.toFixed({value:data[0].energyDataSum,isByInt:true}));
                data[0].realBudgetRatioShow = data[0].realBudgetRatioSum == null ? _this.noData : Math.toFixed({value:data[0].realBudgetRatioSum*100,isByInt:true})+"%";
                data[0].totalScreening = data[0].projectInfo.length;
                data[0].avgBudgetDataShow = data[0].avgBudgetData != null ? toThousands(Math.round(data[0].avgBudgetData)) : _this.noData;
                data[0].avgEnergyDataShow = data[0].avgEnergyData != null ? toThousands(FBI(data[0].avgEnergyData)) : _this.noData;
                _this.projectInfo = data[0];

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

                    //若是首次加载平均值虚线则不显示
                    if(_this.indexChartAvgLine.init){
                        _this.indexChartAvgLine.init = false;
                        _this.indexChartPlot(0);
                        _this.indexChartPlot(1);
                    }

                    $(".I_grid_pic").eq(7).find("i").eq(0).css("color","#C3CDD0");
                    $(".I_grid_pic").eq(7).find("i").eq(1).css("color","#7A94AD");

                    // 对数据进行一次排序，默认按实际能耗进行一次倒序排列，图表绘制函数在排序函数中
                    _this.indexProjectInfoSort(0,7);
                    _this.indexProjectInfoSort(1,7);
                })
            },function(){
                $("#globalnotice").pshow({ text: "获取项目信息失败，请刷新页面重试", state: "failure" })                
            },function(){
                _this.Iloading = 0;  
                $("#globaloadng").phide();
            })
        },
        getProjectInfo : function(){
            this.getList(this.createGetListParam());
        },
        //组装获取项目信息请求参数
        createGetListParam : function(){   
            var Time = new Date($("#I_head_ptime").psel().startTime);
            var Item = $("#I_head_pcombo").psel().id;
            Item = this.AllProjectItems.length == 0 ? this.indexBudgetId : Item == undefined ? this.AllProjectItems[0].logicId : Item;
            var SelItemG = {BudgetAndPlanIntegrity : "",projectArea : "",projectClimate : "",projectRegion : "",projectType : ""}
            var arr = this.projectSelCache == null ? Object.keys(this.projectSelectParam) : Object.keys(this.projectSelCache);
            var _psp = this.projectSelCache == null ? this.projectSelectParam : this.projectSelCache;
            arr.forEach(function(model){
                _psp[model].forEach(function(item,index){
                    if(index == 0){
                        SelItemG[model] = item.sel ? null : "";
                        return
                    }else{
                        if(model == "BudgetAndPlanIntegrity"){
                            item.sel ? SelItemG[model] += ","+(item.id-1) : void 0;
                        }else if(model == "projectArea"){
                            item.sel ? SelItemG[model] += ","+(item.name) : void 0;
                        }else{
                            item.sel ? SelItemG[model] += ","+(item.code) : void 0;
                        }
                    }
                })
                SelItemG[model] = SelItemG[model] == null ? null : SelItemG[model].slice(1);
            })
            return {
                budgetPlanStatus:SelItemG.BudgetAndPlanIntegrity,
                projectType:SelItemG.projectType,
                climateZone:SelItemG.projectClimate,
                region:SelItemG.projectRegion,
                area:SelItemG.projectArea,
                energyItemCode:Item,
                startDate:Time.format("yyyy-M-d h:m:s"),
                download:false,
                square:!this.indexPage.energy,
                userId: this.userId
            }
        },

        //项目筛选单多选统一控制
        projectSelectParamSel : function(model,type){  
            var data = this.projectSelectParam[type];
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
        //打开项目筛选窗口   
        projectFilter : function(){     
            if(this.projectSelCache != null){
                this.projectSelectParam = JSON.parse(JSON.stringify(this.projectSelCache));
            }else{
                var arr = Object.keys(this.projectSelectParam);
                arr.forEach(function(model){
                    v._instance.projectSelectParam[model].forEach(function(item){
                        item.sel = item.id == 0 ? true : false;
                    })
                })
            }
            $("#I_filterWindow").pshow();
        },
        indexPageChange : function(){
            this.indexPage.energy = !this.indexPage.energy;
            this.getProjectInfo();
        },
        //用户所选月份是过去还是未来
        indexIsThisMonth : function(){                                  
            $("#I_head_ptime").psel().startTime > this.getThisMonth().getTime() ? this.NotSelFutureMonth = false : this.NotSelFutureMonth = true;
            $("#I_head_ptime").psel().startTime < this.getThisMonth().getTime() ? this.NotSelHistoryMonth = false : this.NotSelHistoryMonth = true;
        },
        // 首页打开预算管理侧弹窗
        IndexBudgetWindowOpenReady : function(model){
            // 将当前项目信息存入projectSel.projectInfoReady,将时间信息存入projectUserSel
            this.projectSel.projectInfoReady = model;
            var time = new Date($("#I_head_ptime").psel().startTime);
            this.projectUserSel.timeDay = time.format("yyyy-M-d h:m:s");
            this.projectUserSel.timeDayShow = time.format("yyyy.M");
            this.projectUserSel.time = $("#I_head_ptime").psel();
            this.projectSel.projectInfoReady.timeFrom = time.format("yyyy-M-d h:m:s");
            this.projectSel.projectInfoReady.timeTo = this.getNextMonth(time).format("yyyy-M-d h:m:s");
            this.BudgetWindowOpen();
        },





        //首页表格
        //表头排序按钮被点击
        indexGridSord : function(index){                                
            indexGridSortClick(index);
        }, 
        //排序操作，type为1时进行从小到大排序，为1时颠倒数组顺序，index指排序依据的属性
        indexProjectInfoSort : function(type,index){                  
            var attrGather = ["projectName","projectTypeName","climateName","area","budgetData","budgetRatioSame","budgetRatioCircle","energyData","realBudgetRatio"]
            if(type == 1){
                this.projectInfo.projectInfo.reverse()
            }else{
                var data = this.projectInfo.projectInfo;
                if(index == 0 || index == 1 || index == 2){
                    var PA,PB;
                    data.sort(function(a,b){
                        cityGather.forEach(function(item){
                            var PA = PB = null;
                            a[attrGather[index]].indexOf(item.CityName) != -1 ? PA = item.CityJianPin : void 0;
                            b[attrGather[index]].indexOf(item.CityName) != -1 ? PB = item.CityJianPin : void 0;
                        })
                        return PA!=null&&PB!=null ? PA > PB ? 1 : -1 : a[attrGather[index]].localeCompare(b[attrGather[index]], 'zh-Hans-CN', {sensitivity: 'accent'})
                    })
                }else{
                    data.sort(function(a,b){
                        return a[attrGather[index]] > b[attrGather[index]] ? 1 : -1
                    })
                }
                //更新视图
                data.push({});                          
                data.pop({});
            } 
            // 排序完毕重新渲染图表
            this.indexChartDraw();
        },
        indexGridHover : function(index){
            chart.chart.xAxis[0].removePlotBand('thisProject');
            chart.chart.xAxis[0].addPlotBand({
                from: index-0.5,
                to: index+0.5,
                color: '#E6F5E6',
                id: 'thisProject'
            });
            if(this.NotSelFutureMonth){
                chart.chart.tooltip.refresh([chart.chart.series[0].points[index],chart.chart.series[1].points[index],chart.chart.series[2].points[index]]);
            }else{
                chart.chart.tooltip.refresh([chart.chart.series[0].points[index]]);
            }
        },
        indexGridLeave : function(){
            chart.chart.xAxis[0].removePlotBand('thisProject');
        },


       
        //首页图表
        //初始化图表，此时无数据
        indexInitChart : function(){                                 
            chart.options.xAxis.visible = false;
            chart.options.chart.plotBackgroundColor = "#F8F8F8";
            chart.options.yAxis[0].gridLineWidth = 0;
            chart.options.tooltip.formatter = function () {
                var index = this.points[0].point.index;
                var pro = v._instance.projectInfo.projectInfo[index];
                var tool = "<a style='color:#6D6D6D;font-size:14px;'>" + this.x + "</a><br/><a>能耗预算&nbsp;:&nbsp;&nbsp;"+ pro.budgetDataShow +"kWh</a><br/><a>实际能耗&nbsp;:&nbsp;&nbsp;"+ pro.energyDataShow +"kWh</a><br/><a>实际能耗占预算比&nbsp;:&nbsp;&nbsp;"+ pro.realBudgetRatioShow +"&nbsp;&nbsp;&nbsp;&nbsp;</a>"
                return tool;
            },

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
                pointPadding: 0.35,
                pointPlacement: -0.09,
                tooltip: {
                    valueSuffix: ' kWh'
                },
                events:{
                    click:function(event){
                        chartClick(event.point.index)
                    },
                },
                yAxis: 0
            }
            var chartEnergyReal = {
                name:"实际能耗",
                type :"column",
                id:"energyReal",
                keys:['y','id'],
                data: [],
                color:"#02A9D1",
                pointPadding: 0.35,
                pointPlacement: 0.09,
                tooltip: {
                    valueSuffix: ' kWh'
                },
                events:{
                    click:function(event){
                        chartClick(event.point.index)
                    },
                },
                yAxis: 0
            }
            var chartEnergyPercent = {
                name:"实际能耗占预算比",
                type :"line",
                id:"energyPercent",
                keys:['y','id'],
                data: [],
                color:"#637E99",
                tooltip: {
                    valueSuffix: '%'
                },
                events:{
                    click:function(event){
                        chartClick(event.point.index)
                    },
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
            chart.InitChart('I_chart');
        },

        //首页chart绘制 每次首先判断当前页面是否为单平米，重置chart的options并重新绘制图表
        indexChartDraw : function(){
            //根据当前页面是否为单平米决定图表后缀
            chart.options.tooltip.formatter = function () {
                var index = this.points[0].point.index;
                var pro = v._instance.projectInfo.projectInfo[index];
                if(v._instance.indexPage.energy){
                    var tool = "<a style='color:#6D6D6D;font-size:14px;'>" + this.x + "</a><br/><a>能耗预算&nbsp;:&nbsp;&nbsp;"+ pro.budgetDataShow + (pro.budgetData == null ? "" : "kWh")+ "</a><br/><a>实际能耗&nbsp;:&nbsp;&nbsp;"+ pro.energyDataShow + (pro.energyData == null ? "" : "kWh") + "</a><br/><a>实际能耗占预算比&nbsp;:&nbsp;&nbsp;"+ pro.realBudgetRatioShow + "&nbsp;&nbsp;&nbsp;&nbsp;</a>"
                }else{
                    var tool = "<a style='color:#6D6D6D;font-size:14px;'>" + this.x + "</a><br/><a>能耗预算&nbsp;:&nbsp;&nbsp;"+ pro.budgetDataShow + (pro.budgetData == null ? "" : "kWh/m²")+ "</a><br/><a>实际能耗&nbsp;:&nbsp;&nbsp;"+ pro.energyDataShow + (pro.energyData == null ? "" : "kWh/m²") + "</a><br/><a>实际能耗占预算比&nbsp;:&nbsp;&nbsp;"+ pro.realBudgetRatioShow  +"&nbsp;&nbsp;&nbsp;&nbsp;</a>"
                }
                // 根据是否选择未来月决定图表tooltip
                if(!v._instance.NotSelFutureMonth){
                    tool = tool.split("<br/><a>实际能耗")[0];
                }
                return tool;
            },
            // 重绘图表
            chart.InitChart('I_chart');
            //如果选择了未来月并且当前图表实例有3个数据列则删除两个数据列
            if(!this.NotSelFutureMonth&&chart.chart.series.length==3){
                //仅仅只是删除图表实例
                var series = chart.chart.series;
                for(var i=0;i<series.length;i++) {
                    var s = series[i];
                    s.name == "实际能耗" || s.name == "实际能耗占预算比" ? s.remove() : void 0;
                }
            }
            //填充图表数据
            var chartdata = this.indexGetChartData();
            if(this.onPage == 'centerindex'){
                chart.update('energyBudget',chartdata[0]); 
                chart.xAxisUpdate(chartdata[3]);
                if(this.NotSelFutureMonth){
                    chart.update('energyReal',chartdata[1]);
                    chart.update('energyPercent',chartdata[2]);
                }
            }
        },
        // 获取图表所需数据
        indexGetChartData : function(){
            var energyBudgetData = [],energyRealData = [],energyPercent = [],energyxAxis = [];
            this.projectInfo.projectInfo.forEach(function(item){
                energyBudgetData.push(item.budgetData == null ? [0,item.projectId+'Budget'] : [Math.floor(item.budgetData),item.projectId+'Budget']);
                energyxAxis.push(item.projectName);
                energyRealData.push(item.energyData == null ? [0,item.projectId+'Real'] : [Math.toFixed({value:item.energyData,isByInt:true}),item.projectId+'Real']);
                energyPercent.push(item.realBudgetRatio == null ? [null,item.projectId+'Percent'] : [FBI(item.realBudgetRatio*100),item.projectId+'Percent']);
            })
            return [energyBudgetData,energyRealData,energyPercent,energyxAxis]
        },
        //处理图表中平均值虚线
        indexChartPlot : function(index){                                    
            if(index == 0){
                this.indexChartAvgLine.energyBudget = !this.indexChartAvgLine.energyBudget;
                this.indexChartAvgLine.energyBudget ? 
                chart.chart.yAxis[0].addPlotLine({
                    value: this.projectInfo.avgBudgetData != null ? Math.round(this.projectInfo.avgBudgetData) : null,
                    color: '#8D8D8D',
                    width: 2,
                    id: 'energyBudgetAVG',
                    zIndex:5,
                    dashStyle:"Dash"
                }) : chart.chart.yAxis[0].removePlotLine('energyBudgetAVG');
            }else{
                this.indexChartAvgLine.energyReal = !this.indexChartAvgLine.energyReal;
                this.indexChartAvgLine.energyReal ? 
                chart.chart.yAxis[0].addPlotLine({
                    value: this.projectInfo.avgEnergyData != null ? FBI(this.projectInfo.avgEnergyData) : null,
                    color: '#00A8D3',
                    width: 2,
                    id: 'energyRealAVG',
                    zIndex:5,
                    dashStyle:"Dash"
                }) : chart.chart.yAxis[0].removePlotLine('energyRealAVG');
            }
        },




        //页面下载
        // 下载Excel
        indexDownloadExcel: function(){
            var d = this.projectInfo;
            var downloadContent = {
                title:["项目名称","项目类型","所属气候带","项目面积(m²)",this.indexPage.energy ? "预算能耗(kWh)" : "单平米预算能耗(kWh/m²)","预算同比","预算环比",this.indexPage.energy ? "实际能耗(kWh)" : "实际单平米能耗(kWh/m²)","能耗预算比"],
                sum:["项目总和",d.areaSumShow,d.budgetDataSumShow,d.energyDataSumShow,d.realBudgetRatioShow.split("%")[0]],
                dataList:[]
            }
            downloadContent.dataList = d.projectInfo.map(function(model){
                return item = {
                    noneDataType:model.noneDataType,
                    noneDataMark:model.noneDataType == 0 ? this.noData : model.noneDataType == -1 ? "项目该月未上线,无数据……" : "项目该月数据质量不合格",
                    projectName:model.projectName,
                    projectType:model.projectTypeName,
                    climate:model.climateName,
                    area:model.area,
                    budgetData:model.budgetDataShow,
                    budgetRatioSame:model.budgetRatioSameShow.split("%")[0],
                    budgetRatioCircle:model.budgetRatioCircleShow.split("%")[0],
                    energyData:model.energyDataShow,
                    realBudgetRatio:model.realBudgetRatioShow.split("%")[0]
                }
            })
            indexController.getList({download:true,downloadContent:downloadContent},function(data){ pajax.download(data[0],2) })
        },
        // 下载PDF
        indexDownloadPDF : function(){
            $("#I_shadow").show();
            var PDFChart = new chartControl();
            PDFChart.options = JSON.parse(JSON.stringify(chart.options))
            PDFChart.options.xAxis.visible = true;
            PDFChart.options.tooltip.enabled = false;
            PDFChart.InitChart('ChartF');
            var chartdata = this.indexGetChartData();
            if(this.onPage == 'centerindex'){
                PDFChart.update('energyBudget',chartdata[0]);
                PDFChart.xAxisUpdate(chartdata[3]);
                if(this.NotSelFutureMonth){
                    PDFChart.update('energyReal',chartdata[1]);
                    PDFChart.update('energyPercent',chartdata[2]);
                }
            }
            this.noscW = "100%";
            setTimeout(function(){
                var param = {
                    "htmlDOM":createHtml(),
                    "fileName":"能耗预算项目列表"
                }
                v._instance.noscW = $(".I_foot_ul_wrap")[0].clientWidth + 'px';
                $("#I_shadow").hide();
                pajax.post({
                    url: '/FNPJ_GetReportResource',
                    data:  param ,
                    success: function (res) { 
                        pajax.download(res[0]) 
                    },
                    complete : function(){
                    }
                })
            },1000)
        },






        //页面跳转
        //切换到项目能耗详情页面，将当前所选项目以及时间传递给index.js存储
        openEnergyByProject : function(model){
            this.projectUserSel = model;
            var time = new Date($("#I_head_ptime").psel().startTime);
            this.projectUserSel.timeDay = time.format("yyyy-M-d h:m:s");
            this.projectUserSel.timeDayShow = time.format("yyyy.M");
            this.projectUserSel.time = $("#I_head_ptime").psel();
            window.chart.chart.destroy();
            //跳到月能耗页面时将本页面筛选参数存到vue根实例中
            this.indexUserSelParam = this.createGetListParam();
            this.indexDataReady.energyPage = this.indexPage.energy;
            this.indexDataReady.time = time;
            this.indexDataReady.itemIndex = $("#I_head_pcombo").psel() == false ? 0 : $("#I_head_pcombo").psel().index;
            v.initPage('energybyproject');
        },
        // 打开项目计划页面
        EnergyPlanOpen : function(model){
            var paramObj = {
                buildingId:model.buildingId,
                download:false,
                projectName:model.projectName
            }
            if(this.onPage =="centerindex"){
                paramObj.startDate = new Date($("#I_head_ptime").psel().startTime).format("yyyy-M-d h:m:s");
            }else{
                paramObj.startDate = this.projectUserSel.timeDay;
            }
            var a = '/lookplan?query='+psecret.create(JSON.stringify(paramObj));
            window.open(a);
        },









        //项目预算管理模块
        //打开项目预算信息窗口
        BudgetWindowOpen : function(){
            this.projectSel.projectInfoState = false;      
            //清除上一次操作预算信息窗口缓存信息    
            this.clearAllBudgetData();      
            this.getProjectSelInfo();                    
            this.getProjectBudgetRemark();                           
            this.getProjectHistoryBudget(); 
            this.indexPage.budgetCanSave = false;
            $("#I_budgetWindow").pshow();
        },
        //获取项目信息
        getProjectSelInfo : function(){
            var _this = this;
            var paramObj = {
                buildingId:this.projectSel.projectInfoReady.buildingId,
                timeFrom:this.projectSel.projectInfoReady.timeFrom,
                timeTo:this.projectSel.projectInfoReady.timeTo,
            }
            indexController.getProjectSelInfo(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                data = data[0].budgetList[0];
                data.energyDataShow = data.energyDataReal == null ? _this.noData : toThousands(FON(data.energyDataReal));
                data.budgetDataShow = data.energyDataBudget == null ? _this.noData : toThousands(Math.ceil(data.energyDataBudget));
                data.realBudgetRatioShow = data.realOccupyBudgetRatio == null ? _this.noData : FBI(data.realOccupyBudgetRatio)+"%";
                _this.projectSel.projectInfo = data;
                _this.projectSel.projectInfoState = true;
                // here    预算弹窗是否添加Loading效果
                // $("#I_budgetWindow").pshow();
            },function(){
                $("#globalnotice").pshow({ text: "获取项目预算信息失败", state: "failure" });
            })
        },
        //获取项目预算批注信息
        getProjectBudgetRemark : function(){
            var _this = this;
            var paramObj = {
                buildingId:this.projectSel.projectInfoReady.buildingId,
                budgetItemId:this.projectSel.projectInfoReady.budgetItemId,
                planDate:this.projectUserSel.timeDay
            }
            indexController.getProjectBudgetRemark(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                _this.projectSel.projectRemark = data.map(function(item){
                    item.operateUserShow = item.operateUser == null ? _this.noData : item.operateUser;
                    item.energyDataBudgetShow = item.energyDataBudget == null ? _this.noData : toThousands(Math.ceil(item.energyDataBudget));
                    return item
                })
            },function(){
                $("#globalnotice").pshow({ text: "获取项目预算历史信息失败", state: "failure" });
            })
        },
        //获取并绘制预算历史信息
        getProjectHistoryBudget : function(){                        
            var date = new Date(TC(this.projectUserSel.timeDay));
            var _Month = date.format("M");
            var paramObj = {
                buildingId:this.projectSel.projectInfoReady.buildingId,
                startDate:(new Date(date.setFullYear(date.getFullYear() - 1))).format('yyyy-M-d h:m:s'),
                endDate:this.getThisMonth().format('yyyy-M-d h:m:s')
            }
            var _this = this;
            indexController.getProjectHistoryBudget(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                data[0].dataList.reverse();
                _this.projectSel.projectHistoryBudget = data[0].dataList.map(function(item){
                    var time = item.time.split("-");
                    item.timeUsed = time[0]+"."+time[1];
                    item.HN = time[1] == _Month ? true : false;                                     //HN 是否为历史月
                    item.hovered = time[1] == _Month ? true : false;
                    item.energyDataBudgetShow = item.energyDataBudget == null ? _this.noData : toThousands(Math.ceil(item.energyDataBudget));                           
                    item.energyDataRealShow = item.energyDataReal == null ? _this.noData : toThousands(FON(item.energyDataReal));
                    item.energyPercent = item.energyDataBudget != null && item.energyDataReal != null && item.energyDataBudget != 0 ? FBI(item.energyDataReal/item.energyDataBudget*100) : _this.noData;
                    return item;
                });
                // 若有历史数据则填充历史数据
                if(data[0].dataList.length){
                    var arr = _this.projectSel.projectHistoryBudget.map(function(item){
                        return Math.max(item.energyDataBudget,item.energyDataReal)  
                    })
                    var NumMax = arr.reduce(function(pre,cur,index,array){  
                        return Math.max(pre,cur);  
                    });  
                    //如果最大值不为0则计算横柱数据
                    if(NumMax != 0){
                        var energyDataBudgetWidth = [] , energyDataRealWidth = [];
                        _this.projectSel.projectHistoryBudget.forEach(function(item){
                            energyDataBudgetWidth.push(Math.floor(item.energyDataBudget/NumMax*100)+"%");
                            energyDataRealWidth.push(Math.floor(item.energyDataReal/NumMax*100)+"%");
                        })
                        _this.$nextTick(function(){
                            var el1 = window.document.getElementsByClassName("I_BW_H_bar1");
                            var el2 = window.document.getElementsByClassName("I_BW_H_bar2");
                            for(var i=0;i<el1.length;i++){
                                el1[i].style.width = energyDataBudgetWidth[i]
                                el2[i].style.width = energyDataRealWidth[i]
                            }
                        })
                    }
                }
            },function(){
                $("#globalnotice").pshow({ text: "获取数据失败！", state: "failure" });
            });
        },
        getProjectArea : function(){
            var paramObj = {
                buildingId:this.projectSel.projectInfoReady.buildingId,
                itemId:this.projectSel.projectInfoReady.budgetItemId
            };
            var _this = this;
            indexController.getProjectArea(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                _this.projectSel.projectInfo.area = data[0].area;
                _this.projectSel.projectInfo.ifHasArea = true;
            },function(){
                $("#globalnotice").pshow({ text: "获取数据失败！", state: "failure" });
            },function(){
                _this.indexBudget = true;
            })
        },
        //还原预算管理界面
        clearAllBudgetData : function(){                              
            this.clearAllBudgetCache();
            this.indexRecoverInput();
            this.clearBudgetWarn();
            this.projectSel.projectInfo = {};
            this.projectSel.projectHistoryBudget = [];
            this.projectSel.projectRemark = [];
        },
        clearBudgetWarn : function(){
            this.indexBudgerWarn = {
                pizhu:false,
                total:false,
                square:false,
                pizhu2:false,
            }
        },
        //清除预算管理缓存
        clearAllBudgetCache : function(){
            this.indexRecoverInput();
            this.indexRemark = false;
            this.indexBudget = false;                                  
            this.remarkCache = null,  
            this.projectBudgetEditCache = {                                     
                total:null,     
                square:null,
                remark:null
            }
        },
        //重置侧弹窗输入框
        indexRecoverInput : function(){
            $("#TotalBudgetFill").precover();
            $("#squareBudgetFill").precover();
            $("#indexBudgetRemark").precover();
            $("#indexBudgetEditRemark").precover();
        },
        //用户点击编辑预算时将其所选项目已有数据填充至缓存数据中
        BudgetEdit : function(){                                   
            this.indexRemark = false;
            this.projectBudgetEditCache.total = this.projectSel.projectInfo.energyDataBudget == null ? this.projectSel.projectInfo.energyDataBudgetPerSquare*this.projectSel.projectInfo.area : Math.floor(this.projectSel.projectInfo.energyDataBudget);
            this.projectBudgetEditCache.square = this.projectSel.projectInfo.energyDataBudgetPerSquare == null ?  Math.floor(this.projectSel.projectInfo.energyDataBudget/this.projectSel.projectInfo.area) : Math.floor(this.projectSel.projectInfo.energyDataBudgetPerSquare);
            this.projectBudgetEditCache.remark = null;
            this.indexPage.budgetCanSave = true;
            if(this.projectSel.projectInfo.ifHasArea){
                this.indexBudget = true; 
            }else{
                this.getProjectArea();
            }
        },
        //用户创建预算，打开预算创建界面并清空批注缓存
        createEnergyBudget : function(){                                
            this.indexRemark = false;                           
            this.remarkCache = null;
            if(this.projectSel.projectInfo.ifHasArea){
                this.indexBudget = true; 
            }else{
                this.getProjectArea();
            }
        },
        //锁定及解锁预算
        projectBudgetLock : function(type){
            var paramObj = {
                buildingId:this.projectSel.projectInfoReady.buildingId,
                budgetItemId:this.projectSel.projectInfo.budgetItemId,
                planDate:this.projectUserSel.timeDay,
                operate:type ? "锁定预算" : "解锁预算",
                operateUser: this.userId,
                state:type ? 0 : 1,
                remark:""
            }
            this.projectBudgetEdit(paramObj);
        },
        //鼠标移入历史能耗信息操作
        pmouseenterHistoryEnergy : function(model){
            this.projectSel.projectHistoryBudget.forEach(function(item){
                item.hovered = false;
            })
            model.hovered = true;
        },
        pmouseleaveHistoryEnergy : function(){
            this.projectSel.projectHistoryBudget.forEach(function(item){
                item.hovered = item.HN ? true : false;
            })
        },
        //预算信息更改上传
        projectBudgetEdit : function(paramObj){
            var _this = this;
            indexController.projectBudgetMessageEdit(paramObj,function(data){
                //弹出提示框提示成功
                $("#globalnotice").pshow({ text: "保存成功！", state: "success" });
                //如果该界面实在首页被唤出则如下，否则仅仅重置缓存数据 here
                //如果是批注操作，则关闭侧弹窗，若是预算操作，则刷新整体页面重新获取数据
                //重置所有缓存数据
                if(_this.onPage == "centerindex"){
                    if(_this.indexBudget || (paramObj.operate == "编辑预算" || paramObj.operate == "添加预算")){
                        _this.getProjectInfo();
                    }
                }else{
                    if(_this.indexBudget || (paramObj.operate == "编辑预算" || paramObj.operate == "添加预算")){
                        var objParam = {
                            NowModel:"center",
                            buildingId:_this.projectUserSel.buildingId,
                            timeFrom:_this.projectUserSel.timeDay,
                        }
                        //激活项目能耗详情页面
                        _this.energyByProjectActivate(objParam);
                    }
                }
            },function(){
                $("#globalnotice").pshow({ text: "保存失败", state: "failure" })
            },function(){ 
                _this.BudgetWindowOpen();
            })
        },
        //模态框二次确认
        BudgetWindowTSS : function(paramObj){
            $("#BudgetWindowTS").hide();     
            $("#I_shadow").hide();                
            //判断用户是批注还是编辑预算
            if(this.indexBudget){    
                //用户点击保存按钮后判断两个参数是否验证通过，否则无反应
                var paramObj = {
                    buildingId:this.projectSel.projectInfoReady.buildingId,
                    budgetItemId:this.projectSel.projectInfo.budgetItemId,
                    planDate:this.projectUserSel.timeDay,
                    energyDataBudget:this.projectBudgetEditCache.total,
                    energyDataBudgetPerSquare:this.projectBudgetEditCache.square,
                    operate:this.projectSel.projectInfo.ifHasBudget ? "编辑预算" : "添加预算",
                    operateUser: this.userId,
                    state:1,
                    remark:this.projectBudgetEditCache.remark || ""
                }
                this.projectBudgetEdit(paramObj);
            }

        },
        BudgetWindowTSN : function(){
            $("#BudgetWindowTS").hide(); 
            $("#I_shadow").hide();    
            //清除预算管理缓存                    
            // this.clearAllBudgetCache();           
        },
        //点击保存后打开二次确认弹窗
        SaveBudgetOrRemark : function(){    
            if(this.indexRemark){
                //若批注框验证通过则上传数据，否则无反应
                if($("#indexBudgetRemark").pverifi()){
                    var paramObj = {
                        buildingId:this.projectSel.projectInfoReady.buildingId,
                        budgetItemId:this.projectSel.projectInfo.budgetItemId,
                        planDate:this.projectUserSel.timeDay,
                        operate:"批注",
                        operateUser: this.userId,
                        state:1,
                        remark:this.remarkCache
                    }
                    this.projectBudgetEdit(paramObj);
                }               
            }else{
                //用户点击保存按钮后判断两个参数是否验证通过，否则无反应
                if($("#TotalBudgetFill").pverifi() && $("#squareBudgetFill").pverifi()){
                    $("#BudgetWindowTS").show();
                    $("#I_shadow").show();
                }
            }   
            
        },   
    },
    beforeMount:function(){
        $("#globaloadng").pshow();
        this.indexPage.energy = this.indexDataReady.energyPage;
        this.IndexInit();
        setTimeout(function(){
            v._instance.noscW = $(".I_foot_ul_wrap")[0].clientWidth + 'px';
        },0)
        window.addEventListener('resize',function(){
            if(v._instance.onPage == 'centerindex'){
                v._instance.noscW = $(".I_foot_ul_wrap")[0].clientWidth + 'px';
            }
        })
    },
    watch:{
        Iloading : function(N,O){
            if(this.onPage == 'centerindex'){
                if(N == 0){
                    $("#ICpartloading").phide();
                    $("#IGpartloading").phide();
                    $("#I_shadow").hide();
                }
                if(N == 1){
                    // $("#ICpartloading").pshow();
                    $("#IGpartloading").pshow();
                    $("#I_shadow").show();
                }
            }
        },
        indexRemark : function(N,O){
            this.clearBudgetWarn();
            this.indexPage.budgetCanSave = false;
        },
        indexBudget : function(N,O){
            this.clearBudgetWarn();
            this.indexPage.budgetCanSave = false;
        }
    }
})