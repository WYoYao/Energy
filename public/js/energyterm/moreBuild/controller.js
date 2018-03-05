var more_build_controller = {
    //获取项目下建筑列表
    FNPJ_GetBuildingsOfProject: function (timeFrom, timeTo) {

        // 造假数据
        // return mock((item, index) => {
        //     return {
        //         "buildingId": "Bd1101010003001",               //类型：String  必有字段  备注：建筑id
        //         "buildingName": mock.string('建筑名称', 3) + index,             //类型：String  必有字段  备注：建筑名称
        //         "isMain": +(index == 0)                        //类型：Number  必有字段  备注：是否主建筑1-主建筑，0-子建筑
        //     };
        // })

        loadding.set('FNPJ_GetBuildingsOfProject');

        return new Promise(function (resolve) {

            pajax.post({
                url: 'FNPJ_GetBuildingsOfProject',
                data: {
                    timeFrom: timeFrom,
                    timeTo: timeTo,
                },
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    console.error('FNPJ_GetBuildingsOfProject Error');
                },
                complete: function () {

                }
            });
        })
    },
    //获取建筑能耗及信息
    FNPJ_GetBuildingEnergyOutline: function (argu) {

        // 造假数据
        // return mock((item, index) => {
        //     return {                //类型：Object  必有字段  备注：无
        //         "buildingId": mock.string('buildingId', 3) + index,                //类型：String  必有字段  备注：建筑id
        //         "buildingName": mock.string('buildingName', 3) + index,                //类型：String  必有字段  备注：建筑名称
        //         "main": + index == 2,                //类型：Number  必有字段  备注：是否主建筑1-主建筑，0-子建筑
        //         "monthEnergyData": _.random(1, 1000),                //类型：Number  必有字段  备注：月能耗
        //         "monthBudgetData": _.random(1, 1000),                //类型：Number  必有字段  备注：月预算
        //         "buildingEnergyStatus": _.random(0, 2),                //类型：Number  必有字段  备注：能耗状态0-正常，1-预警，2-报警
        //         "warningRatio": +('0.' + _.random(1, 99)),                //类型：Number  必有字段  备注：预警风险率
        //         "alarmRatio": +('0.' + _.random(1, 99)),                //类型：Number  必有字段  备注：报警超标率
        //         "alarmOverdue": _.random(0, 1)                //类型：Number  必有字段  备注：报警是否过期0-未过期，1-已过期
        //     };
        // })

        loadding.set('FNPJ_GetBuildingEnergyOutline');

        return new Promise(function (resolve) {

            pajax.post({
                url: 'FNPJ_GetBuildingEnergyOutline',
                data: argu,
                success: function (res) {
                    // resolve([
                    //     {
                    //         "buildingName": "研发商场",
                    //         "energyOccupyBudgetRatio": null,
                    //         "monthEnergyData": 1963,
                    //         "isMain": 1,
                    //         "alarmRatio": null,
                    //         "buildingEnergyStatus": 0,
                    //         "warningRatio": null,
                    //         "alarmOverdue": 1,
                    //         "monthBudgetData": 65465454,
                    //         "buildingId": "VOBd11010100050001"
                    //     },
                    //     {
                    //         "buildingName": "A楼",
                    //         "energyOccupyBudgetRatio": null,
                    //         "monthEnergyData": 1963000000,
                    //         "isMain": 0,
                    //         "alarmRatio": null,
                    //         "buildingEnergyStatus": 0,
                    //         "warningRatio": null,
                    //         "alarmOverdue": 1,
                    //         "monthBudgetData": 1111111111,
                    //         "buildingId": "Bd1101010005001"
                    //     },
                    //     {
                    //         "buildingName": "B楼",
                    //         "energyOccupyBudgetRatio": null,
                    //         "monthEnergyData": 0,
                    //         "isMain": 0,
                    //         "alarmRatio": null,
                    //         "buildingEnergyStatus": 0,
                    //         "warningRatio": null,
                    //         "alarmOverdue": 1,
                    //         "monthBudgetData": 77566756,
                    //         "buildingId": "Bd1101010005002"
                    //     }
                    // ]);
                    // return;

                    resolve(res);
                },
                error: function (errObj) {
                    console.error('FNPJ_GetBuildingEnergyOutline Error');
                },
                complete: function () {
                    loadding.remove('FNPJ_GetBuildingEnergyOutline');
                    loadding.remove('FNPJ_GetBuildingsOfProject');
                }
            });
        })
    },
    // 查询报警预警信息
    FNPJ_AlarmAndWarningQuery: function (argu) {


        // return new Promise(function (resolve) {

        //     setTimeout(() => {

        //         resolve([                //类型：Array  必有字段  备注：无
        //             {                //类型：Object  必有字段  备注：无
        //                 "warning": {                //类型：Object  必有字段  备注：无
        //                     "switch": 1,                //类型：Number  必有字段  备注：预警开关，0关闭，1打开
        //                     "sensitive": {                //类型：Object  必有字段  备注：敏感度,数值越大越不敏感
        //                         "1": 0.9,                //类型：Number  必有字段  备注：无
        //                         "2": 0.7,                //类型：Number  必有字段  备注：无
        //                         "3": 0.5,                //类型：Number  必有字段  备注：无
        //                         "4": 0.3,                //类型：Number  必有字段  备注：无
        //                         "5": 0.1,                //类型：Number  必有字段  备注：无
        //                         "SELECTED": "1"                //类型：String  必有字段  备注：当前选中选项 0未选中 1选中
        //                     }
        //                 },
        //                 "alarm": {                //类型：Object  必有字段  备注：无
        //                     "switch": 0,                //类型：Number  必有字段  备注：无
        //                     "sensitive": {                //类型：Object  必有字段  备注：无
        //                         "1": 0.9,                //类型：Number  必有字段  备注：无
        //                         "2": 0.7,                //类型：Number  必有字段  备注：无
        //                         "3": 0.5,                //类型：Number  必有字段  备注：无
        //                         "4": 0.3,                //类型：Number  必有字段  备注：无
        //                         "5": 0.1,                //类型：Number  必有字段  备注：无
        //                         "SELECTED": "1"                //类型：String  必有字段  备注：无
        //                     }
        //                 }
        //             }
        //         ]);

        //     }, _.random(500, 1000));

        // })

        return new Promise(function (resolve) {

            pajax.post({
                url: 'FNPJ_AlarmAndWarningQuery',
                data: argu,
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    console.error('FNPJ_AlarmAndWarningQuery Error');
                },
                complete: function () {

                }
            });
        })
    },
    // 保存报警预警信息
    AlarmAndWarningSave: function (argu) {

        argu.projectId = v.instance.projectId;

        // return new Promise(function (resolve) {

        //     console.log(argu);

        //     setTimeout(() => {

        //         resolve({})
        //     }, _.random(500, 1000));

        // })

        return new Promise(function (resolve) {

            pajax.post({
                url: 'FNPJ_AlarmAndWarningSave',
                data: argu,
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    console.error('FNPJ_AlarmAndWarningSave Error');
                },
                complete: function () {

                }
            });
        })
    }
}