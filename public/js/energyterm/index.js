"use strict";

// 不变常量说有提示框提示时后续操作的延长
var CONST_LADYTIME = 500,
  USER_ID = "pesagyAdmin";

/**
 * 依次执行多个会返回Promise的方法,串行执行
 * @param {一个数组 数组里面每一项都是一个方法,每个方法可以返回一个Promise 对象 } arr
 */
function PromiseFollow(arr) {
  var result = [];

  return new Promise(function(resolve) {
    arr.reduce(function(a, b, i) {
      return function(res) {
        return b()
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
 * 数组的类型转换为的树类型
 * @param {用于转换的数组} arr
 * @param {单个实例的id key名称} id
 * @param {单个实例的父级id key名称} parentId
 * @param {转换为子级的字段名称} childs
 */
function arr2tree(arr, id, parentId, childs) {
  // 父级ID 分类的数组
  var hash = arr.reduce(function(con, item) {
    item[childs] = [];
    con[item[id]] = item;
    return con;
  }, {});

  // 用于记录已经被添加归纳为子级的 energyItemId
  var record = [];

  arr.forEach(function(item) {
    if (hash.hasOwnProperty(item[parentId])) {
      record.push(item[id]);
      if (!_.isArray(hash[item[parentId]][childs]))
        hash[item[parentId]][childs] = [];

      hash[item[parentId]][childs].push(item);
    }
  });

  //console.log(arr.length, Object.keys(hash).length, record.length);

  var res = Object.keys(hash).reduce(function(con, energyItemId) {
    if (record.indexOf(energyItemId) == -1) con = hash[energyItemId];
    return con;
  }, {});

  return res;
}

//  Math 求平均数
if (typeof Math.avg != "function") {
  //  附件的Avg 求平均数属性
  Object.defineProperty(Math, "avg", {
    value: function value() {
      // 默认平均数的
      var total = 0,
        argu = Array.prototype.slice.call(arguments),
        len = argu.length,
        i = 0,
        num = void 0;

      //　循环传入的每个的值
      for (i; i < len; i++) {
        num = argu[i];

        // 判断每次的结果时候是NaN 如果是直接跳出
        if (isNaN(num)) {
          throw new Error("arguments Error");
          break;
        }
        total += num;
      }

      return total / len;
    },
    writable: true,
    configurable: true
  });
}

/**
 * @param {Object} obj 传入的Object 类型
 * @param {Array String} key 获取属性的key
 */
function getAttributes(obj, key) {
  // 防止出现多层的情况
  key = key instanceof Array ? key : [key];

  return key.reduce(function(con, k) {
    return con[k];
  }, obj);
}

// console.log(Math.avg(1, 2, 3, 4, -111111));

// console.log(Math.avg.apply(Math, [1, 2, 3, 4, 5, 6, 6]));

if (typeof Array.prototype.arrayAvg != "function") {
  // 求某一项的平均值
  Array.prototype.arrayAvg = function(key) {
    var arr = void 0;

    arr = this.map(function(item) {
      return getAttributes(item, key);
    });

    return Math.avg.apply(Math, arr);
  };
}

// console.log([{
//     name: 'leo', like: {
//         age: 1
//     }
// }, {
//     name: 'leo', like: {
//         age: 5
//     }
// }, {
//     name: 'leo', like: {
//         age: 9
//     }
// }].arrayAvg(['like', 'age']))

if (typeof Array.prototype.order != "function") {
  // 求某一项的平均值

  /**
   *
   * @param {String Array} key 用于比较属性
   * @param {String} attribute 用于显示变化的状态的属性,默认 order
   */
  Array.prototype.order = function(key, attribute) {
    attribute = attribute || "order";

    return this.sort(function(a, b) {
      var aattr = getAttributes(a, key),
        battr = getAttributes(b, key);

      // 根据比较属性的值
      a[attribute] = aattr > battr ? 1 : aattr == battr ? 0 : -1;

      return false;
    });
  };
}

// console.log([{
//     name: 'leo', like: {
//         age: 1
//     }
// }, {
//     name: 'leo', like: {
//         age: 5
//     }
// }, {
//     name: 'leo', like: {
//         age: 9
//     }
// }].order(['like', 'age']))

if (typeof Date.prototype.isToMonth != "function") {
  /**
   * 验证是否是本月的
   * -1 之前月份
   *  0 当前月份
   *  1 后面月份
   */
  Date.prototype.isToMonth = function() {
    var time = +this,
      now = new Date(),
      year = now.format("yyyy"),
      month = now.format("MM"),
      start = +new Date(year + "/" + month + "/01"),
      end = +new Date(
        (month == 12 ? year + 1 : year) +
          "/" +
          (month == 12 ? 1 : +month + 1) +
          "/01"
      );

    if (time < start) return -1;
    if (time >= start && time < end) return 0;
    if (time >= end) return 1;
  };
}

// 转换成为百分比的内容
function convertPercentage(num) {
  return num * Math.pow(10, 2);
}

//console.log(convertPercentage(11));

/**
 * loadding 弹窗状态控制
 */
// 加载状态的容器
function SetLoading(resolve, reject) {
  // 保存状态的容器
  this.keys = {};

  this.resolve = resolve;

  this.reject = reject;
}

SetLoading.prototype.set = function(name) {
  var _that = this;

  //  默认传入属性的名称
  name = name || +new Date() + _.random(1000, 9999);

  // 有相同的键值的时候的抛出错误
  if (_that.keys.hasOwnProperty(name))
    throw new Error("The property has already existed");
  else
    // 状态添加到的容器中  值为释放当前的状态的方法
    _that.keys[name] = function() {
      //删除那个对应的键值
      delete _that.keys[name];

      // 全部键值都被释放后则执行停止的方法
      if (!Object.keys(_that.keys).length) _that.reject();
    };

  // 添加状态后的执行的状态中的方法
  _that.resolve();

  //返回清除当前传入状态的方法
  return _that.keys[name];
};

// 释放某个状态
SetLoading.prototype.remove = function(name) {
  // 验证非空判断
  if (!name) throw new Error("Parameters can not be empty");

  // 释放对应的属性
  this.keys[name] && this.keys[name]();

  // 删除对应的属性
  delete this.keys[name];
};

var loadding = new SetLoading(
  function() {
    $("#globaloadng").pshow();
  },
  function() {
    $("#globaloadng").phide();
  }
);

/**
 * 合并Vue 使用
 */
(function() {
  var initPageNames = [];

  var _constAssignArr = [
    "beforeMount",
    "data",
    "methods",
    "computed",
    "watch",
    "filters"
  ];

  var VueReady = function(el) {
    // 挂载的DOM
    this.el = el;

    var _that = this;

    /**
     * 创建对应的存储集合
     */
    _constAssignArr.reduce(function(con, key) {
      con[key] = {};
      return con;
    }, _that);

    // 保存初始化使用的值
    this.init = {};

    // 控制显示隐藏的dom集合
    this.navigators = {};

    // 用于保存生成后面的Vue 实例
    this._instance = null;

    // 只读获取Vue
    Object.defineProperty(this, "instance", {
      get: function() {
        if (_that._instance) return _that._instance;

        _that._instance = new Vue({
          el: _that.el,
          data: _that.data,
          methods: _that.methods
        });

        return _that._instance;
      }
    });
  };

  // 创建Vue 实例
  VueReady.prototype.createVue = function() {
    this._instance = new Vue({
      el: this.el,
      data: JSON.parse(JSON.stringify(this.data)),
      methods: this.methods,
      computed: this.computed,
      watch: this.watch,
      filters: this.filters
    });

    return this._instance;
  };

  // 将需要添加的实例属性合并
  VueReady.prototype.pushComponent = function(option) {
    /**
     * name:'当前模块名称'
     * data:'当前模块需要绑定的状态树'
     * methods:'当前模块需要绑定的方法'
     */

    var _that = this,
      name,
      assignArr = _constAssignArr, // 需要验正重复合并内容
      el = option.el || void 0;

    name = option.name || void 0;

    // 挂载对应的 beforeMount 事件
    if (name && el) {
      // 綁定 方法中this 为 Vue 实例
      _that.navigators[name] = el;
    }

    // 挂载对应的 beforeMount 事件
    if (name && _.isFunction(option.beforeMount)) {
      // 綁定 方法中this 为 Vue 实例
      _that.beforeMount[name] = option.beforeMount;
    }

    // 循环执行两种类型的验证合并
    assignArr
      .map(function(key) {
        // 获对应的data methods 值
        return {
          key: key,
          value: _.isPlainObject(option[key]) ? option[key] : {}
        };
      })
      .forEach(function(item) {
        var key = item.key, // 区别   'data', 'methods'
          value = item.value, // 传入的 'data', 'methods' 对应的值
          keys = Object.keys(_that[key]), // 已有的值
          err; // 冲突的方法名称集合

        // 记录每个name 对应的初始化状态
        if (key == "data" && name != void 0) {
          if (Object.keys(_that.init).includes(name))
            throw new Error("当前namespace:" + name + "已经被使用");

          _that.init[name] = value;
        }

        // 记录冲突
        err = Object.keys(value).reduce(function(err, info) {
          // 冲突记录
          if (keys.includes(info)) err.push(info);
          return err;
        }, []);

        // 合并
        _that[key] = _.assign({}, _that[key], value);

        // 冲突的打印出来
        if (err.length)
          throw new Error(
            name + "下" + key + "中" + err.join(",") + "与已有内容发生冲突"
          );
      });
  };

  VueReady.prototype.goBack = function(name, bool) {
    if (bool) {
      this.beforeMount[name].call(this.instance);
    }

    this._instance.onPage = name;
  };

  // 初始化对应页面内容
  VueReady.prototype.initPage = function(name, argu) {
    // 保存除名称外的所有参数
    var argus = Array.prototype.slice.call(arguments, 1);

    initPageNames.push(name);

    // 获取对应的状态值
    var data = this.init[name],
      beforeMount = this.beforeMount[name] || function() {};

    if (argu) data = Object.assign(data, argu);

    // onPage 切换到当前页面
    data.onPage = name;

    // 循环修改Vue 实例中的内容
    Object.keys(data).reduce(function(con, key, index) {
      con[key] = JSON.parse(JSON.stringify(data[key]));
      return con;
    }, this._instance);

    // beforeMount 方法执行
    beforeMount.apply(this._instance, argus);
  };

  window.VueReady = VueReady;
})();

var v = new VueReady("#app");

//  全局全局公用的方法的和属性
v.pushComponent({
  name: "global",
  data: {
    isCenter: false,
    onPage: "",
    noData: "--",
    NodeManageModel: {}, // 编辑的预算节点 和计划管理节点时候需要查询的节点信息
    projectId: "",
    checkboxModel: window.localStorage.getItem("cooky") == "true"
  },
  methods: {
    bodyClick: bodyClick,
    toThousands: toThousands,
    convertPercentage: convertPercentage,
    arr2tree: arr2tree,
    getThisMonth: getThisMonth,
    getNextMonth: getNextMonth,
    selThisMonth: selThisMonth,
    getToday: getToday,
    getMonthLastDay: getMonthLastDay,
    x100: x100,
    v3: v3,
    floor: floor
  },
  filters: {
    x100: x100,
    v3: v3,
    floor: floor,
    toThousands: toThousands
  }
  // watch: {
  //     onPage: function () {
  //         try {
  //             chart && chart.chart && _.isFunction(chart.chart.destroy) && chart.chart.destroy();
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     }
  // }
});

/**
 * 创建Vue 组件
 */
$(function() {
  pajax.post({
    url: "/GetUserInfo",
    data: {
      functionType: 1, //类型：Number  必有字段  备注：功能类型0-中心版，1-项目版
      userId: "persagyAdmin" //类型：String  必有字段  备注：固定“persagyAdmin”
    },
    success: function(res) {
      var projectId = _.isArray(res) ? res[0] : "";

      v.createVue();

      v.instance.projectId = projectId;

      v.initPage("more_build");
    },
    error: function(res) {},
    complete: function() {}
  });
});

/**
 * 下载PDF
 */
function downLoadPdf(type, argu) {
  // 需要跳转的路径参数
  var url = "/" + type + "?query=" + psecret.create(JSON.stringify(argu));

  if ($("#iframeDownload").length) {
    // 有的情况直接的跳转链接
    $("#iframeDownload").attr("src", url);
  } else {
    $(
      '<iframe id="iframeDownload" src="' +
        url +
        '" style="position:fixed;width:100%;height:100%;opacity:0;" frameborder="0"></iframe>'
    ).appendTo("body");
  }
}

// 获取当天的时间
function getTodayTime() {
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date.setMilliseconds(0);
}

//  根据时间判断是否锁定按钮
function canNotSelectFutureDay(date, el, isMonth) {
  el = window.document.getElementById(el);
  var _el = $(el)
    .find(".per-squarebutton-grayBorder")
    .eq(1);

  if (isMonth)
    var toMonth = +new Date(new Date().format("yyyy/MM") + "/01 00:00:00");

  date == (isMonth ? toMonth : getTodayTime())
    ? _el.attr("pdisabled", "true")
    : _el.attr("pdisabled", "false");
}

/**

 */
