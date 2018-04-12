v.pushComponent({
    name:"centerindex",
    el:"#index",
    data:{
        indexPage:{       //index页面切换控制
            energy:true,  //查看能耗或者单平米能耗
            downloadPDF : false,
            budgetCanSave : false
        },
        projectInfo:{
            projectInfo:[]
        },   //项目能耗数据
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
        noscWW:'calc(100% + 17px)',
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
            this.indexUserSelParam != null ? this.indexRenderControl(this.indexUserSelParam) : void 0;
            this.$nextTick(function(){
                //如果是返回首页则调整时间控件时间
                this.indexInitChart();                              //初始化图表
                budgetFillInputBlur();                              //绑定输入框失去焦点自动计算
                this.indexDataReady.time != null ? $("#I_head_ptime").psel({startTime:this.indexDataReady.time},false) : void 0;
                this.indexDataReady.itemIndex != null ? $("#I_head_pcombo").psel(this.indexDataReady.itemIndex,false) : void 0;
                $("#I_head_ptab").psel(this.indexPage.energy ? 0 : 1,false);
            })
        },
        // 首页渲染流程控制
        indexRenderControl : function(paramObj){
            var _this = this;
            // 清除排序状态
            allSortRecover();
            this.updateProjectInfo(paramObj).then(function(){
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
                    // 对数据进行一次排序,排序后会触发图表更新，所以不需要在此更新chart
                    _this.indexGridDefaultSort();
                })
                _this.Iloading = 0;  
                $("#globaloadng").phide();
            })
        },
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
               setTimeout(function(){
                    $("#I_head_pcombo").psel(0,false);
               },0)
               _this.getAllProjectInfo();
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
            this.indexRenderControl(paramObj);
        },

        //更新项目信息
        updateProjectInfo : function(paramObj){
            var _this = this;
            return new Promise(function(resolve,reject){
                indexController.getList(paramObj,function(data){
                    data = JSON.parse(JSON.stringify(data));
                    data[0].projectInfo.forEach(function(item){

                        // 清除Infinity，改为null
                        var itemArr = Object.keys(item);
                        itemArr.forEach(function(key){
                            item[key] == 'Infinity' ? item[key] = null : void 0;
                        })

                        //项目类型名称
                        _this.projectSelectParam.projectType.forEach(function(model){
                            model.code == item.projectType ? item.projectTypeName = model.name : void 0;
                        })
                        //项目所属气候带名称
                        _this.projectSelectParam.projectClimate.forEach(function(model){
                            model.code == item.climate ? item.climateName = model.name : void 0;
                        })

                        item.budgetDataShow = item.budgetData == null ? _this.noData : toThousands(BD(item.budgetData));
                        item.ifHasBudget = item.budgetData == null ? false : true;
                        item.budgetRatioSameShow = item.budgetRatioSame == null ? _this.noData : FBI(item.budgetRatioSame*100)+"%";
                        item.budgetRatioCircleShow = item.budgetRatioCircle == null ? _this.noData : FBI(item.budgetRatioCircle*100)+"%";
                        item.energyDataShow = item.energyData == null ? _this.noData : toThousands(RD(item.energyData));
                        item.realBudgetRatioShow = item.realBudgetRatio == null ? _this.noData : FBI(item.realBudgetRatio*100)+"%";
                    })

                    // 清除Infinity，改为null
                    var arr = Object.keys(data[0]);
                    arr.forEach(function(item){
                        if(item != 'projectInfo'){
                            data[0][item] == 'Infinity' ? data[0][item] = null : void 0;
                        }
                    })

                    // 数字转换
                    data[0].areaSumShow = data[0].areaSum == null ? _this.noData : toThousands(FON(data[0].areaSum));
                    data[0].budgetDataSumShow = data[0].budgetDataSum == null ? _this.noData : toThousands(BD(data[0].budgetDataSum));
                    data[0].energyDataSumShow = data[0].energyDataSum == null ? _this.noData : toThousands(RD(data[0].energyDataSum));
                    data[0].realBudgetRatioShow = data[0].realBudgetRatioSum == null ? _this.noData : FBI(data[0].realBudgetRatioSum*100)+"%";
                    data[0].avgBudgetDataShow = data[0].avgBudgetData != null ? toThousands(BD(data[0].avgBudgetData)) : _this.noData;
                    data[0].avgEnergyDataShow = data[0].avgEnergyData != null ? toThousands(RD(data[0].avgEnergyData)) : _this.noData;

                    data[0].totalScreening = data[0].projectInfo.length;

                    _this.projectInfo = data[0];

                },function(){
                    $("#globalnotice").pshow({ text: "获取数据失败", state: "failure" })  
                },function(){
                    resolve();
                })
            })
        },
        // 页面重新渲染
        indexRefreshRender : function(){
            this.Iloading = 1;  
            this.indexRenderControl(this.createGetListParam()); 
        },
        // 对表格数据依照实际能耗进行一次倒序排列   从大到小
        indexGridDefaultSort : function(){
            $(".I_grid_pic").eq(7).find("i").eq(0).css("color","#C3CDD0");
            $(".I_grid_pic").eq(7).find("i").eq(1).css("color","#7A94AD");
            this.indexProjectInfoSort(0,7);
            this.indexProjectInfoSort(1,7);
        },
        //组装获取项目信息请求参数
        createGetListParam : function(){   
            var Time = new Date($("#I_head_ptime").psel().startTime);
            var Item = $("#I_head_pcombo").psel().id;
            Item = this.AllProjectItems.length == 0 ? this.indexBudgetId : Item == undefined ? this.AllProjectItems[0].logicId : Item;
            var SelItemG = {BudgetAndPlanIntegrity : "",projectArea : "",projectClimate : "",projectRegion : "",projectType : ""}
            var arr = Object.keys(this.projectSelectParam);
            this.projectSelCache == null ? this.recoverProjectSelParam() : void 0;
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
            bodyClick();
            if(this.projectSelCache != null){
                this.projectSelectParam = JSON.parse(JSON.stringify(this.projectSelCache));
            }else{
                this.recoverProjectSelParam();
            }
            $("#I_filterWindow").pshow();
        },
        // 将项目筛选条件恢复默认
        recoverProjectSelParam : function(){
            var arr = Object.keys(this.projectSelectParam);
            arr.forEach(function(model){
                v._instance.projectSelectParam[model].forEach(function(item){
                    item.sel = item.id == 0 ? true : false;
                })
            })
        },
        // 首页tab切换
        indexPageChange : function(){
            this.indexPage.energy = !this.indexPage.energy;
            this.indexRefreshRender();
        },
        //用户所选月份是过去还是未来
        indexIsThisMonth : function(){                                  
            $("#I_head_ptime").psel().startTime > this.getThisMonth().getTime() ? this.NotSelFutureMonth = false : this.NotSelFutureMonth = true;
            $("#I_head_ptime").psel().startTime < this.getThisMonth().getTime() ? this.NotSelHistoryMonth = false : this.NotSelHistoryMonth = true;
        },
        // 首页打开预算管理侧弹窗
        IndexBudgetWindowOpenReady : function(model){
            // 将当前项目信息存入projectSel.projectInfoReady,将时间信息存入projectUserSel
            bodyClick();
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
                if(index == 0){
                    this.projectInfo.projectInfo = this.indexChineseSort(data);
                }else if(index == 1 || index == 2){
                    data.sort(function(a,b){
                        return a[attrGather[index]].localeCompare(b[attrGather[index]], 'zh-Hans-CN', {sensitivity: 'accent'});
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
        // 汉字城市拼音排序
        indexChineseSort : function(data){
            data.sort(function(a,b){
                var PA = a.projectName.split("")[0] == '长' ? '常' + a.projectName.split("")[1] : a.projectName;
                var PB = b.projectName.split("")[0] == '长' ? '常' + b.projectName.split("")[1] : b.projectName;
                return PA.localeCompare(PB, 'zh-Hans-CN', {sensitivity: 'accent'});
            })
            return data;
        },
        // indexChineseSort : function(data){
        //     var cacheHZ = [],cachePY = [];
        //     data.forEach(function(item){
        //         var a = 0;
        //         cityGather.forEach(function(model){
        //             if(item.projectName.indexOf(model.name) != -1){
        //                 item.PY = model.pinyin;
        //                 cachePY.push(item);
        //                 a++;
        //             }
        //         })
        //         a == 0 ? cacheHZ.push(item) : a = 0;
        //     })
        //     cachePY.sort(function(a,b){
        //         return a.PY > b.PY ? 1 : -1
        //     })
        //     cacheHZ.sort(function(a,b){
        //         return a.projectName.localeCompare(b.projectName, 'zh-Hans-CN', {sensitivity: 'accent'})
        //     })
        //     return cachePY.concat(cacheHZ);
        // },
        indexGridHover : function(index){
            this.indexGridClearHover();
            if(this.NotSelFutureMonth){
                chart.chart.tooltip.refresh([chart.chart.series[0].points[index],chart.chart.series[1].points[index],chart.chart.series[2].points[index]]);
            }else{
                chart.chart.tooltip.refresh([chart.chart.series[0].points[index]]);
            }
        },
        indexGridLeave : function(){

        },
        indexGridClearHover : function(){
            var a = this.projectInfo.projectInfo.length;
            for(var i=0;i<a;i++){
                chart.chart.series[0].points[i].setState("");
                if(this.NotSelFutureMonth){
                    chart.chart.series[1].points[i].setState("");
                    chart.chart.series[2].points[i].setState("");
                }
            }
        },
        //初始化图表，此时无数据
        indexInitChart : function(){                                 
            chart.options.xAxis.visible = false;
            chart.options.chart.plotBackgroundColor = "#F8F8F8";
            chart.options.chart.plotBorderColor = "#EEEEEE";
            chart.options.chart.plotBorderWidth = 1;
            chart.options.yAxis[0].gridLineWidth = 0;
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
                    },
                    style:{
                        "fontFamily":"Arial"
                    }
                },
                softMin:0,
                softMax:100,
                opposite: true, //第二根Y轴在页面右边
                showEmpty : true
            })
            var chartEnergyBudget = {
                name:"能耗预算",
                type :"column",
                id:"energyBudget",
                keys:['y','id'],
                data: [],
                color:"#C3CDD0",
                pointPadding: 0,
                // pointPlacement: -0.09,
                groupPadding:0.3125,
                tooltip: {
                    valueSuffix: ' kWh'
                },
                events:{
                    click:function(event){
                        chartClick(event.point.index)
                    },
                },
                yAxis: 0,
                states:{
                    select:{
                        color : "red"
                    }
                }
            }
            var chartEnergyReal = {
                name:"实际能耗",
                type :"column",
                id:"energyReal",
                keys:['y','id'],
                data: [],
                color:"#02A9D1",
                pointPadding: 0,
                // pointPlacement: 0.09,
                groupPadding:0.3125,
                tooltip: {
                    valueSuffix: ' kWh'
                },
                events:{
                    click:function(event){
                        chartClick(event.point.index)
                    },
                },
                yAxis: 0,
                states:{
                    select:{
                        color : "red"
                    }
                }
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
                lineWidth:1,
                marker:{//线上数据点  
                    symbol:'circle',//圆点显示  
                    radius:4,  
                    lineWidth:1,  
                    lineColor:'#637E99',  
                    fillColor:'#ffffff'
                },
                states:{
                    select:{
                        color : "red"
                    }
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
                var tool = "<div><a style='color:#6D6D6D;font-size:12px;'>" + this.x + "</a></div>";
                tool += "<div><a>实际能耗&nbsp;:&nbsp;&nbsp;<a style='font-family:Arial;font-size:14px;'>" + pro.energyDataShow + (pro.energyData == null ? "" : "  kWh") + "</a></a></div>";
                tool += "<div><a>能耗预算&nbsp;:&nbsp;&nbsp;<a style='font-family:Arial;font-size:14px;'>" + pro.budgetDataShow + (pro.budgetData == null ? "" : "  kWh")+ "</a></a></div>";
                tool += "<div><a>实际能耗占预算比&nbsp;:&nbsp;&nbsp;<a style='font-family:Arial;font-size:14px;'>"+ pro.realBudgetRatioShow + "</a>&nbsp;&nbsp;&nbsp;&nbsp;</a></div>"
                tool = v._instance.indexPage.energy ? tool : tool.replace(/kWh/g,"kWh/m²");
                // 根据是否选择未来月决定图表tooltip
                if(!v._instance.NotSelFutureMonth){
                    tool = tool.split("<div><a>实际能耗占预算比")[0];
                    tool = tool.split("<div><a>能耗预算")[1];
                    tool = "<div><a style='color:#6D6D6D;font-size:12px;'>" + this.x + "</a></div><div><a>能耗预算" + tool;
                }
                return tool;
            }
            // 填充数据
            var chartdata = this.indexGetChartData();
            chart.xAxisFill(chartdata[3]);
            chart.dataFill('energyReal',chartdata[1]);
            chart.dataFill('energyPercent',chartdata[2]);
            chart.dataFill('energyBudget',chartdata[0]); 
            if(!this.NotSelFutureMonth){
                chart.options.yAxis[1].min = 0;
                chart.options.yAxis[1].max = 100;
            }else{
                chart.options.yAxis[1].min = undefined;
                chart.options.yAxis[1].max = undefined;
            }
            // 重新构造图表
            chart.InitChart('I_chart');
            // 选择性删除图表数据实例
            if(!this.NotSelFutureMonth&&chart.chart.series.length==3){
                //仅仅只是删除图表实例
                var series = chart.chart.series;
                for(var i=0;i<series.length;i++) {
                    var s = series[i];
                    s.name == "实际能耗" || s.name == "实际能耗占预算比" ? s.remove() : void 0;
                }
            }
        },
        // 获取图表所需数据
        indexGetChartData : function(){
            var energyBudgetData = [],energyRealData = [],energyPercent = [],energyxAxis = [];
            this.projectInfo.projectInfo.forEach(function(item){
                energyBudgetData.push(item.budgetData == null ? [0,item.projectId+'Budget'] : [BD(item.budgetData),item.projectId+'Budget']);
                energyxAxis.push(item.projectName);
                energyRealData.push(item.energyData == null ? [0,item.projectId+'Real'] : [RD(item.energyData),item.projectId+'Real']);
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
                    value: this.projectInfo.avgBudgetData != null ? BD(this.projectInfo.avgBudgetData) : null,
                    color: '#8D8D8D',
                    width: 1,
                    id: 'energyBudgetAVG',
                    zIndex:5,
                    dashStyle:"Dash"
                }) : chart.chart.yAxis[0].removePlotLine('energyBudgetAVG');
            }else{
                this.indexChartAvgLine.energyReal = !this.indexChartAvgLine.energyReal;
                this.indexChartAvgLine.energyReal ? 
                chart.chart.yAxis[0].addPlotLine({
                    value: this.projectInfo.avgEnergyData != null ? RD(this.projectInfo.avgEnergyData) : null,
                    color: '#00A8D3',
                    width: 1,
                    id: 'energyRealAVG',
                    zIndex:5,
                    dashStyle:"Dash",
                    // dashStyle:"Solid"
                }) : chart.chart.yAxis[0].removePlotLine('energyRealAVG');
            }
        },
        // 下载Excel
        indexDownloadExcel: function(){
            var d = this.projectInfo;
            var downloadContent = {
                title:["项目名称","项目类型","所属气候带","项目面积(m²)",this.indexPage.energy ? "预算能耗(kWh)" : "单平米预算能耗(kWh/m²)","预算同比","预算环比",this.indexPage.energy ? "实际能耗(kWh)" : "实际单平米能耗(kWh/m²)","能耗预算比"],
                sum:["项目总和",d.areaSumShow,d.budgetDataSumShow,d.energyDataSumShow,d.realBudgetRatioShow],
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
            PDFChart.options = JSON.parse(JSON.stringify(chart.options));
            PDFChart.options.yAxis[1].labels.formatter = function(){
                return this.value +'%';
            }
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
            var DOM = $("#I_foot_ul")[0];
            DOM.style.overflowY = "hidden";
            this.noscW = "100%";
            setTimeout(function(){
                var param = {
                    "htmlDOM":createHtml(),
                    "fileName":"能耗预算项目列表"
                }
                v._instance.noscW = $(".I_foot_ul_wrap")[0].clientWidth + 'px';
                DOM.style.overflowY = "scroll";
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
        //切换到项目能耗详情页面，将当前所选项目以及时间传递给实例根组件存储
        openEnergyByProject : function(model){
            this.projectUserSel = model;
            var time = new Date($("#I_head_ptime").psel().startTime);
            this.projectUserSel.timeDay = time.format("yyyy-M-d h:m:s");
            this.projectUserSel.timeDayShow = time.format("yyyy.M");
            this.projectUserSel.time = $("#I_head_ptime").psel();
            // 销毁highchart图表
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
                data.energyDataShow = data.energyDataReal == null ? _this.noData : toThousands(RD(data.energyDataReal));
                data.budgetDataShow = data.energyDataBudget == null ? _this.noData : toThousands(BD(data.energyDataBudget));
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
            this.isEnergyRemarkLoading = true;
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
                    item.energyDataBudgetShow = item.energyDataBudget == null ? _this.noData : toThousands(BD(item.energyDataBudget));
                    return item
                })
            },function(){
                $("#globalnotice").pshow({ text: "获取项目预算批注信息失败", state: "failure" });
            },function(){
                _this.isEnergyRemarkLoading = false;
            })
        },
        //获取并绘制预算历史信息
        getProjectHistoryBudget : function(){    
            this.isEnergyHistoryLoading = true;                    
            var date = getThisMonth();
            var _Month = getThisMonth().format("M");
            var __Month = TC(this.projectSel.projectInfoReady.timeFrom);
            __Month = new Date(__Month).format("M");
            var paramObj = {
                buildingId:this.projectSel.projectInfoReady.buildingId,
                startDate:(new Date(date.setFullYear(date.getFullYear() - 1))).format('yyyy-M-d h:m:s'),
                endDate:getThisMonth().format('yyyy-M-d h:m:s')
            }
            var _this = this;
            indexController.getProjectHistoryBudget(paramObj,function(data){
                data = JSON.parse(JSON.stringify(data));
                data[0].dataList.reverse();
                _this.projectSel.projectHistoryBudget = data[0].dataList.map(function(item){
                    var time = item.time.split("-");
                    item.timeUsed = time[0]+"."+time[1];
                    item.HN = time[1] == __Month ? true : false;                                     //HN 是否为历史月
                    item.hovered = time[1] == __Month ? true : false;
                    item.energyDataBudgetShow = item.energyDataBudget == null ? _this.noData : toThousands(BD(item.energyDataBudget));                           
                    item.energyDataRealShow = item.energyDataReal == null ? _this.noData : toThousands(RD(item.energyDataReal));
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
            },function(){
                _this.isEnergyHistoryLoading = false;   
            });
        },
        getProjectArea : function(){
            var paramObj = {
                buildingId:this.projectSel.projectInfoReady.buildingId,
                itemId:this.projectSel.projectInfoReady.budgetItemId
            };
            var _this = this;
            return new Promise(function(resolve,reject){
                indexController.getProjectArea(paramObj,function(data){
                    data = JSON.parse(JSON.stringify(data));
                    _this.projectSel.projectInfo.area = data[0].area;
                    _this.projectSel.projectInfo.ifHasArea = true;
                },function(){
                    $("#globalnotice").pshow({ text: "获取数据失败！", state: "failure" });
                },function(){
                    resolve();
                })
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
            if(this.projectSel.projectInfo.ifHasArea){
                this.BudgerEditReady();
            }else{
                this.getProjectArea().then(function(){
                    v._instance.BudgerEditReady();
                });
            }
        },
        BudgerEditReady : function(){
            this.projectBudgetEditCache.total = this.projectSel.projectInfo.energyDataBudget == null ? this.projectSel.projectInfo.energyDataBudgetPerSquare*this.projectSel.projectInfo.area : Math.floor(this.projectSel.projectInfo.energyDataBudget);
            this.projectBudgetEditCache.square = this.projectSel.projectInfo.energyDataBudgetPerSquare == null ?  Math.floor(this.projectSel.projectInfo.energyDataBudget/this.projectSel.projectInfo.area) : Math.floor(this.projectSel.projectInfo.energyDataBudgetPerSquare);
            this.projectBudgetEditCache.remark = null;
            this.indexBudget = true; 
        },
        //用户创建预算，打开预算创建界面并清空批注缓存
        createEnergyBudget : function(){                                
            this.indexRemark = false;                           
            this.remarkCache = null;
            if(this.projectSel.projectInfo.ifHasArea){
                this.indexBudget = true; 
            }else{
                this.getProjectArea().then(function(){
                    v._instance.indexBudget = true; 
                });
            }
        },
        //锁定及解锁预算
        projectBudgetLock : function(type){
            var paramObj = {
                buildingId:this.projectSel.projectInfoReady.buildingId,
                budgetItemId:this.indexGetNowBudgetItemId(),
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
                //如果为预算操作则刷新页面数据
                if(_this.indexBudget || (paramObj.operate == "编辑预算" || paramObj.operate == "创建预算")){
                    if(_this.onPage == "centerindex"){
                        _this.indexRefreshRender();
                    }else{
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
                // 刷新侧弹窗数据
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
                    budgetItemId:this.indexGetNowBudgetItemId(),
                    planDate:this.projectUserSel.timeDay,
                    energyDataBudget:this.projectBudgetEditCache.total,
                    energyDataBudgetPerSquare:this.projectBudgetEditCache.square,
                    operate:this.projectSel.projectInfo.ifHasBudget ? "编辑预算" : "创建预算",
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
        indexGetNowBudgetItemId : function(){
            var budgetItemId="";
            // 若改月预算管理节点进行了更新
            if(this.projectSel.projectInfo.isBudgetUpdated){
                // 如果旧节点有预算就返回旧节点ID，否则返回新节点ID
                if(this.projectSel.projectInfo.ifHasBudget){
                    budgetItemId = this.projectSel.projectInfo.budgetItemId;
                }else{
                    budgetItemId = this.projectSel.projectInfo.newBudgetItemId;
                }
            }else{
                budgetItemId = this.projectSel.projectInfo.budgetItemId;
            }
            return budgetItemId
        },
        SaveBudgetOrRemark : function(){    
            if(this.indexRemark){
                //若批注框验证通过则上传数据，否则无反应
                if($("#indexBudgetRemark").pverifi()){
                    var paramObj = {
                        buildingId:this.projectSel.projectInfoReady.buildingId,
                        budgetItemId:this.indexGetNowBudgetItemId(),
                        planDate:this.projectUserSel.timeDay,
                        operate:"批注",
                        operateUser: this.userId,
                        state:this.projectSel.projectInfo.state,
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
                    $("#IGpartloading").phide();
                    // $("#ICpartloading").phide();
                    $("#I_shadow").hide();
                }
                if(N == 1){
                    $("#IGpartloading").pshow();
                    // $("#ICpartloading").pshow();
                    $("#I_shadow").show();
                }
            }
            setTimeout(function(){
                v._instance.noscW = $(".I_foot_ul_wrap")[0].clientWidth + 'px';
            },0)
        },
        indexRemark : function(N,O){
            this.clearBudgetWarn();
            this.indexPage.budgetCanSave = false;
        },
        indexBudget : function(N,O){
            this.clearBudgetWarn();
            this.indexPage.budgetCanSave = false;
        },
        noscW : function(N,O){
            this.noscWW = N.indexOf('px') != -1 ? Number(this.noscW.split('px')[0]) + 17 + 'px' : '100%';
        }
    }
})