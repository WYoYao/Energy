function PromiseFollow(arr) {

    var result = [];

    return new Promise(function (resolve) {

        arr.reduce(function (a, b, i) {

            return function () {

                return b().then(function (one) {

                    result.push(one);

                    return new Promise(function (re) {

                        re(i == 0 ? result.reverse() : one)
                    })
                }).then(a);
            }
        }, resolve)()
    })
}






var arr = [1, 2, 3, 4, 5].map(function (item, index) {

    return function () {

        return new Promise(function (resolve) {



            setTimeout(() => {

                resolve(item)
            }, 1000 + (index * 100));
        });
    }
});

function PromiseConcurrent(arr) {

    var result = [];

    return new Promise(function (resolve) {

        // 全部执行发送请求
        arr.map(function (item) {

            return item();
        }).reduce(function (a, b, i) {

            return function () {

                b.then(function (one) {

                    result.push(one);

                    return new Promise(function (re) {

                        re(i == 0 ? result.reverse() : one)
                    })

                }).then(a)
            }
        }, resolve)();
    })
}

PromiseConcurrent(arr).then(function (res) {

    console.log(res);
});