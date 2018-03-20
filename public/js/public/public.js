function FON(data) {
    return Math.toFixed({ value: data, fixNum: 1 });
    
}
function FBI(data) {
    // return Math.toFixed({ value: data, isByInt: true });
    return RD(data);
}
function ceil(data) {
    return Math.ceil(data);
}
function TC(date) {
    return (typeof date) == 'string' ? date.replace(new RegExp(/-/gm), "/") : date;
}

//get BudgetData and PlanData
function BD(data){
    return Math.floor(data);
}
//get RealDate
function RD(num){
    return _.isNumber(num)
      ? Math.abs(num) < 1 ? _.floor(num, 3) : _.floor(num, 1)
      : num;
}

var chartControl = function () {
    this.options = {
        chart: {
            zoomType: 'None',
        },
        title: {//标题
            text: ''
        },
        xAxis: {
            categories: [],
            visible: true,
        },
        plotOptions: {
            column: {
                grouping: true,
            }
        },
        yAxis: [{
            title: {
                text: ''
            },
            gridLineWidth: 1,
            gridLineDashStyle: "Dash",
        }],
        legend: {
            enabled: false,
        },
        tooltip: {
            shared: true,
            backgroundColor: '#ffffff',   // 背景颜色
            borderColor: '#ffffff',       // 边框颜色
            borderRadius: 10,             // 边框圆角
            borderWidth: 1,               // 边框宽度
            shadow: true,                 // 是否显示阴影
            animation: true,              // 是否启用动画效果
            useHTML: true,
            style: {                      // 文字内容相关样式
                fontSize: "14px",
                lineHeight: "28px",
                fontFamily: "MicrosoftYaHei",
                zIndex: 10,
                color:"#151515"
            },
        },
        labels: {
        },
        plotOptions: {
            column: {
                grouping: true,
                shadow: false,
                borderWidth: 0,
            },
            series: {
                animation: false
            }
        },
        series: [
        ],
        credits: {
            enabled: false
        },
        annotations: [{
            labels: [
            ],
            labelOptions: {
            }
        }],
        exporting: {
            enabled: false,
        }
    },
        this.circleOptions = {
            chart: {
                type: 'solidgauge',
                marginTop: 0
            },
            credits: {
                enabled: false,
            },
            title: {
                text: '',
            },
            // 中间文字
            tooltip: {
                enabled: false
            },
            pane: {
                startAngle: -103,
                endAngle: 103,
                size: 150,
                background: [{ // Track for Move
                    outerRadius: '105%',
                    innerRadius: '86%',
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    shape: "arc"
                }]
            },
            yAxis: {
                min: 0,
                max: 1,
                lineWidth: 0,
                tickPositions: []
            },
            plotOptions: {
                solidgauge: {
                    borderWidth: '12px',
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false
                }
            },
            series: [{
                name: 'background',
                borderColor: '#DBE6EA',
                data: [{
                    radius: '100%',
                    innerRadius: '100%',
                    y: 1
                }]
            },
            {
                name: 'data',
                borderColor: '#DBE6EA',
                data: [{
                    radius: '100%',
                    innerRadius: '100%',
                }]
            },
            {
                name: 'shadow',
                borderColor: '#DBE6EA',
                data: [{
                    radius: '101%',
                    innerRadius: '99%',
                }]
            }]
        }
    this.chart = null;
    this.circleChart = null
}

chartControl.prototype.InitChart = function (el) {
    if (this.chart == null) {
        this.chart = Highcharts.chart(el, this.options)
    } else {
        this.chart.destroy();
        this.chart = Highcharts.chart(el, this.options)
    }
    return this.chart;
}
chartControl.prototype.addSeries = function (paramObj) {
    this.options.series.push(paramObj);
}

chartControl.prototype.update = function (id, data) {
    this.chart.update({
        series: [{
            id: id,
            data: data
        }]
    })
}
chartControl.prototype.xAxisUpdate = function (data) {
    this.chart.xAxis[0].update({
        categories: data
    })
}
chartControl.prototype.circleDraw = function (r, type) {
    if (type) {
        this.circleOptions.series[1].data[0].y = 0.5;
        this.circleOptions.series[2].data[0].y = r;
        this.circleOptions.series[1].borderColor = "#02A9D1";
    } else {
        this.circleOptions.series[1].data[0].y = r;
        this.circleOptions.series[2].data[0].y = 0.5;
        this.circleOptions.series[1].borderColor = "#FF7B7B";
    }
    if (this.circleChart != undefined) {
        this.circleChart.destroy();
    }
    this.circleChart = Highcharts.chart('PB_LM_canvas', this.circleOptions);
}

var sectorChart = function () {
    this.options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: ''
        },
        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                size: 60,
                dataLabels: {
                    enabled: false
                },
                showInLegend: false
            }
        },
        series: [{
            type: 'pie',
            name: '',
            data: [],
            borderWidth: 0
        }]
    },
        this.chart = null
}



function getNextMonth(date) {
    date.getMonth() == 11 ? date.setFullYear(date.getFullYear() + 1) : void 0;
    date.getMonth() == 11 ? date.setMonth(0) : date.setMonth(date.getMonth() + 1);
    return date;
}
function getThisMonth() {
    var date = new Date;
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}
//将时间插件调整为当月
function selThisMonth(el) {
    $(el).psel({ timeType: "M", startTime: this.getThisMonth() }, false)
}
function getToday() {
    var date = new Date;
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}
function getMonthLastDay(date) {
    var Month = date.getMonth();
    if (Month == 11) {
        Month = 0;
        date.setFullYear(date.getFullYear() + 1)
    } else {
        Month++;
    }
    date.setMonth(Month);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    var d = new Date(new Date(date).getTime() - 1);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

function getTodayTime() {
    return getToday().getTime();
}



