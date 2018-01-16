
var chartControl = function(){
    this.options = {
        chart: {
            zoomType: 'xy'
        },
        title: {//标题
            text: ''
        },
        xAxis: {
            categories: [],
            visible:true,
        },
        yAxis: [{
            title: {
                text: ''
            },
            gridLineWidth:0,
        }],
        legend: {
            enabled:false,
        },
        tooltip: {
            shared: false,
            backgroundColor: '#ffffff',   // 背景颜色
            borderColor: '#ffffff',         // 边框颜色
            borderRadius: 10,             // 边框圆角
            borderWidth: 1,               // 边框宽度
            shadow: true,                 // 是否显示阴影
            animation: true,              // 是否启用动画效果
            style: {                      // 文字内容相关样式
                fontSize: "14px",
                fontWeight: "blod",
                fontFamily: "Courir new"
            }
        },
        labels:{
            // items:[
            //     {
            //         html:"qwedhfiosmanfpoidfoi",
            //         style:{
            //             'background':'blue',
            //             top:'10px',
            //             left:'10px',
            //             'font-size' : '30px',
            //             width:'30px',
            //             height:'400px',
            //             position:'absolute',
            //             display:'block'
            //         }
            //     }
            // ]
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 0,
                // dataLabels:{
                //     enabled:true, // dataLabels设为true
                //     style:{
                //         color:'#D7DEE9'
                //     }
                // }
            }
        },
        series: [
        ],
        credits:{
            enabled:false
        },
        annotations: [{
            labels: [
        ],
            labelOptions: {
            }
        }],
        exporting:{
            enabled:false,
        }
    },
    this.chart = null;
}

chartControl.prototype.InitChart = function(el){
    this.chart == null ? this.chart = Highcharts.chart(el,this.options) : void 0;
    return this.chart;
}

// var paramObj = {
//     name:"aaa", //数据名
//     type :"line", //数据图表类型
//     id:"realEC", //数据图表id
//     keys:['color','y','id'], //数据格式,color:颜色 y:大小 id
//     data: [],  //数据
//     pointPadding: 0.2,//柱padding值   pointPadding，pointPlacement在type为column时可填
//     pointPlacement: 0,//柱偏移值
//     // borderColor:"black",
//     // borderWidth: 1,
//     yAxis: 1, //数据列表对应的y轴id
//     dashStyle:"Dash",   //数据图表类型为line时可填
//     tooltip: {
//         valueSuffix: '%'     //数据悬浮窗后缀
//     },
//     marker:{//线上数据点  
//         symbol:'circle',//圆点显示  
//         radius:4,  
//         lineWidth:2,  
//         lineColor:'#38aaf3',  
//         fillColor:'#ffffff'
//     } 
// }
chartControl.prototype.addSeries = function(paramObj){
    this.options.series.push(paramObj);
}

chartControl.prototype.update = function(id,data){
    this.chart.update({
        series : [{
            id : id,
            data : data
        }]
    })
}
chartControl.prototype.xAxisUpdate = function(data){
    this.chart.xAxis[0].update({
        categories : data
    })
}




// ["00:00","","02:00","","04:00","","06:00","","08:00","","10:00","","12:00","","14:00","","16:00","","18:00","","20:00","","22:00","","24:00"]


// options:{
//     chart: {
//         zoomType: 'xy'
//     },
//     title: {//标题
//         text: ''
//     },
//     xAxis: {
//         categories: ["1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.9","1.10","1.11", "1.12", "1.13","1.14","1.15","1.16","1.17","1.18","1.19","1.20","1.21",]
//     },
//     yAxis: [{
//         title: {
//             text: ''
//         },
//         gridLineDashStyle: 'longdash', //横向网格线线条样式
//         gridLineColor:"#ffffff", //横向网格线颜色
//         gridLineWidth:0,
//         plotLines:[
//             {
//                 color:"red",
//                 dashStyle:"dash",
//                 width:2,
//                 value:55,
//                 zIndex: 5
//             },
//             {
//                 color:"blue",
//                 dashStyle:"dash",
//                 width:2,
//                 value:75,
//                 zIndex: 5
//             }
//         ]
//     },{
//         title: {
//             text: ''
//         },
//         gridLineDashStyle: 'longdash', //横向网格线线条样式
//         gridLineColor:"#ffffff", //横向网格线颜色
//         gridLineWidth:0,
//         labels: {
//             formatter: function() {
//                 return this.value +'%';
//             }
//         },
//         opposite: true //第二根Y轴在页面右边
//     }],
//     legend: {
//         enabled:false,
//         shadow: false,
//         align: 'right',
//         verticalAlign : 'top',
//         squareSymbol:false   //右上角颜色标示是否为圆形
//     },
//     tooltip: {
//         shared: true
//     },
//     labels:{

//     },
//     plotOptions: {
//         column: {
//             grouping: false,
//             shadow: false,
//             borderWidth: 0
//         }
//     },
//     series: [{
//         name: '计划能耗',
//         type: 'column',
//         id:"planEC",
//         color: '#D7D7D7',//该类型柱颜色
//         keys:['color','y','id'],
//         data: [],//柱数据
//         pointPadding: 0,//柱padding值
//         pointPlacement: 0,//柱偏移值
//         // borderColor:"black",
//         borderWidth: 1,
//         events:{
//             click:function(event){
//                 console.log(event.point.index)
//             }
//         }
//     }, {
//         name: '实际能耗',
//         color: '#02AAD1',
//         type: 'column',
//         id:"realEC",
//         keys:['color','y','id'],
//         data: [],//柱数据
//         pointPadding: 0.2,
//         pointPlacement: 0,
//         events:{
//             click:function(event){
//                 console.log(event.point.index)
//             }
//         }
//     },{
//         name: '能耗比',
//         type: 'line',
//         color: '#02AAD1',
//         id:"ECPercent",
//         keys:['y','id'],
//         data: [],
//         yAxis: 1,
//         dashStyle:"Dash",
//         tooltip: {
//             valueSuffix: '%'
//         },
//         marker:{//线上数据点  
//             symbol:'circle',//圆点显示  
//             radius:4,  
//             lineWidth:2,  
//             lineColor:'#38aaf3',  
//             fillColor:'#ffffff'
//         } 
//     }],
//     credits:{
//         enabled:false
//     },
//     annotations: [{
//         labels: [{
//             point: "205",
//             // format: '{y:.2f}%'
//         },{
//             point: "206",
//             // format: '{y:.2f}%'
//         },{
//             point: "207",
//             text:'2017年2月30日<br>计划能耗：16505464566456<br>实际能耗：465453416465465<br>能耗比：10%'
//         }],
//         labelOptions: {
//             formatter: function () {
//                 console.log(this)
//                 return this.y;
//             }
//         }
//     }]
// }