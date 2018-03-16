$(function() {
  // 小于 1 显示三位小数
  var to3 = function(num) {
    // 验证对应的参数
    if (!_.isNumber(num)) num = 0;

    return num < 1 ? _.floor(num, 3) : _.floor(num, 1);
  }; //  转换成为地方特色的数字单位
  function toThousands(num) {
    if (!_.isNumber(num)) return 0;

    if (_.isNaN(num)) return 0;

    if (!num) return 0;

    num = num.toFixed(1);
    // 转换为数字
    num = +num;
    if (Object.prototype.toString.call(num).slice(8, -1) != "Number")
      throw new TypeError("arguments must be Number");

    // 转换为字符
    num = num.toString();

    // 正常函数直接返回本地的方法
    if (!/\./.test(num)) return (+num).toLocaleString();

    // 小数点分割
    num = num.split(/\./);
    return (+num[0]).toLocaleString() + "." + num[1];
  }

  /**
   * 依次执行多个会返回Promise的方法,并行执行
   * @param {一个数组 数组里面每一项都是一个方法,每个方法可以返回一个Promise 对象 } arr
   */
  function PromiseConcurrent(arr) {
    var result = [];

    return new Promise(function(resolve) {
      // 全部执行发送请求
      arr
        .map(function(item) {
          return item();
        })
        .reduce(function(a, b, i) {
          return function() {
            b
              .then(function(one) {
                result.push(one);

                return new Promise(function(re) {
                  re(i == 0 ? result.reverse() : one);
                });
              })
              .then(a);
          };
        }, resolve)();
    });
  }

  // 去掉这里的注释就是类似 Apple Watch 上的效果了
  if (!Highcharts.theme) {
    Highcharts.setOptions({
      chart: {
        backgroundColor: "#FFFFFF"
      },
      colors: ["#02A9D1"],
      title: {
        style: {
          color: "silver"
        }
      }
    });
  }

  var app = new Vue({
    el: "#monthtotal",
    data: {
      //  前台传入的参数 Start
      buildingName: query.buildingName,
      buildingId: query.buildingId,
      timeFrom: query.timeFrom,
      energyItemId: query.energyItemId,
      energyItemName: query.energyItemName ? query.energyItemName : "",
      isBudgetNode: 0,
      DayEnergyDataInfo: {}

      // 日能耗分析
      // DayEnergyDataInfo: {},

      // 能耗预算描述
      // MonthEnergyDataInfo: {},

      // // 逐日能耗统计 和 分项能耗统计
      // EnergyDataForDayAndItem: {},
    },
    methods: {
      init: function() {
        var _that = this;

        var DayEnergyDataInfo = monthtotal_controller
          .FNCT_DayEnergyDataInfo({
            buildingId: _that.buildingId,
            energyItemId: _that.energyItemId,
            isBudgetNode: _that.isBudgetNode,
            timeFrom: _that.timeFrom
          })
          .then(function(res) {
            _that.DayEnergyDataInfo = res[0];

            // ==============================  生成柱状图 Start =========================================
            return new Promise(function(resolve) {
              Highcharts.chart(
                "tio",
                {
                  chart: {
                    type: "column",
                    zoomType: "xy",
                    plotBackgroundColor: "#F8F8F8"
                  },
                  title: {
                    text: ""
                  },
                  xAxis: {
                    categories: _that.DayEnergyDataInfo.hourData.map(function(
                      item
                    ) {
                      return new Date(item.time).format("hh:mm");
                    }),
                    visible: true
                  },
                  yAxis: [
                    {
                      title: { text: "" },
                      gridLineWidth: 0,
                      gridLineDashStyle: "Dash"
                    },
                    {
                      title: { text: "" },
                      gridLineWidth: 0,
                      labels: {},
                      min: 0,
                      opposite: true
                    }
                  ],
                  legend: { enabled: false },
                  tooltip: {
                    enabled: false
                  },
                  labels: {},
                  plotOptions: {
                    column: {
                      grouping: false,
                      shadow: false,
                      borderWidth: 0
                    }
                  },
                  series: [
                    {
                      name: "实际能耗",
                      type: "column",
                      id: "energyReal",
                      keys: ["y", "color", "id"],
                      // "data": _.range(30).map((item, index) => {
                      //     return {
                      //         id: index,
                      //         y: (index + _.random(1, 30)) * 100,
                      //         color: index % 2 ? '#02A9D1' : '#F89054',
                      //     }
                      // }),
                      data: _that.DayEnergyDataInfo.hourData.map(function(
                        item,
                        index
                      ) {
                        return {
                          id: index,
                          y: item.energyData ? +item.energyData.toFixed(2) : 0,
                          color: "#02A9D1"
                        };
                      }),
                      color: "#02A9D1",
                      pointPadding: 0.2,
                      pointPlacement: 0.18,
                      tooltip: { valueSuffix: " kWh" },
                      events: {},
                      yAxis: 0
                    }
                  ],
                  credits: { enabled: false },
                  annotations: [{ labels: [], labelOptions: {} }],
                  exporting: { enabled: false }
                },
                resolve
              );
            });

            // ==============================  生成柱状图 End   =========================================
          });

        return PromiseConcurrent([
          function() {
            return DayEnergyDataInfo;
          }
        ]);
      },
      convertPercentageFn: function(num) {
        if (!_.isNumber(num)) return 0;
        return (num * Math.pow(10, 2)).toFixed(2);
      },
      src: function(path) {
        return window.location.origin + path;
      },
      width: function(energyData, monthEnergyPlan) {
        return { width: energyData / monthEnergyPlan * 100 + "px" };
      }
    },
    computed: {
      eDate: function() {
        var date = new Date(this.timeFrom);

        return {
          y: date.format("yyyy"),
          m: date.format("MM"),
          d: date.format("dd")
        };
      }
    },
    watch: {},
    filters: {
      to3: to3,
      //转换成为百分比的内容
      convertPercentage: function(num) {
        if (!_.isNumber(num)) return 0;
        return (num * Math.pow(10, 2)).toFixed(2);
      },
      // 千分位加点
      toThousands: function(num) {
        if (!_.isNumber(num)) return 0;

        if (_.isNaN(num)) return 0;

        if (!num) return 0;

        num = num.toFixed(1);
        // 转换为数字
        num = +num;
        if (Object.prototype.toString.call(num).slice(8, -1) != "Number")
          throw new TypeError("arguments must be Number");

        // 转换为字符
        num = num.toString();

        // 正常函数直接返回本地的方法
        if (!/\./.test(num)) return (+num).toLocaleString();

        // 小数点分割
        num = num.split(/\./);

        return (+num[0]).toLocaleString() + "." + num[1];
      }
    }
  });

  app.init().then(function() {
    setTimeout(function() {
      var arr = createHtml("#monthtotal");
  
      pajax.post({
        url: "/FNPJ_GetReportResource",
        data: {
          htmlDOM: arr, //类型：String  必有字段  备注：报告页面html dom源码
          fileName:
            app.buildingName +
            "建筑" +
            app.eDate.y +
            "年" +
            app.eDate.m +
            "月" +
            app.eDate.d +
            "日" +
            app.energyItemName +
            "能耗分析报告" //类型：String  必有字段  备注：pdf文件名
        },
        success: function(res) {
          pajax.download(res[0]);
        }
        // error: err,
        // complete: complete
      });
    }, !!window.ActiveXObject || "ActiveXObject" in window ? 3000 : 1000);
  });

  window.app = app;

  //  下载

  /**
   *
   * @param {* DOM内容的父级} el
   * @param {* 引用静态地址的链接} el
   */
  window.createHtml = function createHtml(body, link) {
    body = body || document.body;
    link = link || document;
    var origin = window.location.origin;

    var bodyHtml = $(body).prop("outerHTML") || "",
      linkHtml = Array.prototype.slice
        .call(link ? $(link).find("link") : $("link"))
        .reduce(function(con, item) {
          con += /http/.test(item.outerHTML)
            ? item.outerHTML
            : item.outerHTML.replace(/href\=\"/, 'href="' + origin);
          return con;
        }, "");

    return (
      '<!DOCTYPE html>\n    <html lang="en">\n    \n    <head>\n        <meta charset="UTF-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <meta http-equiv="X-UA-Compatible" content="ie=edge">\n        <title>Document</title>\n        ' +
      linkHtml +
      "\n    </head>\n    \n    <body>\n    " +
      bodyHtml +
      "\n    </body>\n    \n    </html>"
    );
  };


});
