'use strict';

//  Math 求平均数
if (typeof Math.avg != 'function') {
    //  附件的Avg 求平均数属性
    Object.defineProperty(Math, 'avg', {
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
                    throw new Error('arguments Error');
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

    return key.reduce(function (con, k) {
        return con[k];
    }, obj);
}

// console.log(Math.avg(1, 2, 3, 4, -111111));

// console.log(Math.avg.apply(Math, [1, 2, 3, 4, 5, 6, 6]));

if (typeof Array.prototype.arrayAvg != 'function') {
    // 求某一项的平均值
    Array.prototype.arrayAvg = function (key) {

        var arr = void 0;

        arr = this.map(function (item) {

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

if (typeof Array.prototype.order != 'function') {
    // 求某一项的平均值

    /**
     * 
     * @param {String Array} key 用于比较属性 
     * @param {String} attribute 用于显示变化的状态的属性,默认 order
     */
    Array.prototype.order = function (key, attribute) {

        attribute = attribute || 'order';

        return this.sort(function (a, b) {

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


if (typeof Date.prototype.isThisMonth != 'function') {
    /**
     * 验证是否是本月的
     * -1 之前月份
     *  0 当前月份
     *  1 后面月份
     */
    Date.prototype.isThisMonth = function () {

        var time = +this,
            now = new Date(),
            year = now.format('yyyy'),
            month = now.format('MM'),
            start = +new Date(year + '/' + month + '/01'),
            end = +new Date((month == 12 ? year + 1 : year) + '/' + (month == 12 ? 1 : +month + 1) + '/01');

        if (time < start) return -1;
        if (time >= start && time < end) return 0;
        if (time >= end) return 1;
    };
}

//console.log(new Date().isToMonth());

//  转换成为地方特色的数字单位
// function toThousands(num) {

//     // 转换为数字
//     num = +num;
//     if (Object.prototype.toString.call(num).slice(8, -1) != 'Number') throw new TypeError('arguments must be Number');

//     // 转换为字符
//     num = num.toString();

//     // 正常函数直接返回本地的方法
//     if (!/\./.test(num)) return (+num).toLocaleString();

//     // 小数点分割
//     num = num.split(/\./);
//     return (+num[0]).toLocaleString() + '.' + num[1];
// }


// 转换成为百分比的内容
function convertPercentage(num) {

    return num * Math.pow(10, 2);
}

console.log(convertPercentage(11));

