$(function() {
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

  /**
   *
   * @param {每部分的外部距离} Margin
   * @param {单个实例的体积} Height
   * @param {每部分最大体积} Max
   * @param {第一个部分特殊的高度} Special
   */

  function createSkip(Margin, Height, Max, Special) {
    return function(arr) {
      // 每组数量
      var size = Math.floor((Max - Margin) / Height);

      // 第一组特别的个数
      var SpecialNum = Special
        ? _.floor((Max - Margin - Special) / Height)
        : size;

      // 重新分组
      var groups = [_.slice(arr, 0, SpecialNum)].concat(
        _.chunk(_.slice(arr, SpecialNum), size)
      );

      // 返回分组
      return groups;
    };
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
      buildingName: query.buildingName,
      buildingId: query.buildingId,
      timeFrom: query.timeFrom,
      energyItemId: query.energyItemId,
      isBudgetNode: 1,

      DayEnergyDataInfo: {}

      //  前台传入的参数 End

      // 日能耗分析
      // DayEnergyDataInfo: {},

      // // 能耗预算描述
      // MonthEnergyDataInfo: {},

      // // 逐日能耗统计 和 分项能耗统计
      // EnergyDataForDayAndItem: {},
    },
    methods: {
      sort: function(arr) {
        if (_.isArray(arr)) {
          var arr = JSON.parse(JSON.stringify(arr));

          var must =
            arr
              .map(function(item) {
                return item.energyData;
              })
              .sort(function(a, b) {
                return b - a;
              })[0] || 100;

          arr = arr.map(function(item) {
            item.width =
              _.floor(_.floor(item.energyData / must, 2) * 100) * 1.5 || 1;
            return item;
          });

          return arr.sort(function(a, b) {
            return a.energyItemId > b.energyItemId ? 1 : -1;
            //return item.energyItemId;
          });
        } else {
          return [];
        }
      },
      createSkip: createSkip,
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
                    plotBackgroundColor: "#ffffff",
                    backgroundColor: "#ffffff"
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
                    visible: true,
                    tickWidth: 0
                  },
                  yAxis: [
                    {
                      title: { text: "" },
                      gridLineWidth: 1,
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
                          y: item.energyData ? v3(+item.energyData) : 0,
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
      width: function(item) {
        return { width: item.width/1.5 + "px" };
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
      },
      rotated: function() {
        var _that = this;

        // 本分比数值
        var route = _that.convertPercentageFn(
          _that.MonthEnergyDataInfo.energyOccupyPlanRatio
        );

        route = Math.floor(route * 1.03) - 148;

        return {
          transform: "rotate(" + route + "deg)"
        };
      }
    },
    watch: {},
    filters: {
      x100: x100,
      floor: floor,
      v3: v3,
      //转换成为百分比的内容
      convertPercentage: function(num) {
        if (!_.isNumber(num)) return 0;
        return (num * Math.pow(10, 2)).toFixed(2);
      },
      // 千分位加点
      toThousands: toThousands
    }
  });

  app.init().then(function() {
    setTimeout(function() {
      // 修改时候注释的 20180328 leo
      // return;
      giveChartTopLine("tio");
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
            "日能耗分析报告" //类型：String  必有字段  备注：pdf文件名
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
