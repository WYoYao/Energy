


var subOption_controller = {
    // 获取项目的建筑-预算节点和计划节点
    NodeManagementService: function (argu) {

        console.log(argu);

        let index = _.random(1, 10);

        // 造假数据
        return new Promise(resolve => {

            setTimeout(function () {

                resolve({                //类型：Object  必有字段  备注：无
                    "budget": [                //类型：Array  必有字段  备注：无
                        {                //类型：Object  必有字段  备注：无
                            "name": mock.string('公区耗电', 3) + index,                //类型：String  必有字段  备注：无
                            "id": _.random(1, 100000000)                //类型：String  必有字段  备注：无
                        }
                    ],
                    "plan": _.range(_.random(1, 30)).map((item, index) => {
                        return {                //类型：Object  必有字段  备注：无
                            "name": mock.string('照明', 5) + index,                //类型：String  必有字段  备注：无
                            "id": _.random(1, 100000000)                 //类型：String  必有字段  备注：无
                        };
                    })
                });
            }, _.random(1, 1000));
        })
        // return mock((item, index) => {

        //     return {                //类型：Object  必有字段  备注：无
        //         "budget": [                //类型：Array  必有字段  备注：无
        //             {                //类型：Object  必有字段  备注：无
        //                 "name": mock.string('公区耗电', 3) + index,                //类型：String  必有字段  备注：无
        //                 "id": _.random(1, 100000000)                //类型：String  必有字段  备注：无
        //             }
        //         ],
        //         "plan": _.range(_.random(1, 30)).map((item, index) => {
        //             return {                //类型：Object  必有字段  备注：无
        //                 "name": mock.string('照明', 5) + index,                //类型：String  必有字段  备注：无
        //                 "id": _.random(1, 100000000)                 //类型：String  必有字段  备注：无
        //             };
        //         })
        //     };
        // })

        return new Promise(function (resolve) {

            pajax.post({
                url: 'FNPJ_NodeManagementService',
                data: argu,
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    console.error('NodeManagementService Error');
                },
                complete: function () {

                }
            });
        })

    }
}