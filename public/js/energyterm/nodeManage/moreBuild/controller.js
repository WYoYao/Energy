var more_build_controller = {
    //获取项目下建筑列表
    FNPJ_GetBuildingsOfProject(timeFrom, timeTo) {

        // 造假数据
        return mock((item, index) => {
            return {
                "buildingId": "Bd1101010003001",               //类型：String  必有字段  备注：建筑id
                "buildingName": mock.string('建筑名称', 3) + index,             //类型：String  必有字段  备注：建筑名称
                "isMain": +(index == 0)                        //类型：Number  必有字段  备注：是否主建筑1-主建筑，0-子建筑
            };
        })

        // 造假数据
        return mock((item, index) => {
            return {
                "buildingId": mock.string('建筑id', 3) + index,               //类型：String  必有字段  备注：建筑id
                "buildingName": mock.string('建筑名称', 3) + index,             //类型：String  必有字段  备注：建筑名称
                "isMain": +(index == 0)                        //类型：Number  必有字段  备注：是否主建筑1-主建筑，0-子建筑
            };
        })

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
    //获取建筑能耗及报警预警信息
    FNPJ_GetBuildingEnergyOutline() {

        // 造假数据
        return mock((item, index) => {
            return {                //类型：Object  必有字段  备注：无
                "buildingId": mock.string('buildingId', 3) + index,                //类型：String  必有字段  备注：建筑id
                "buildingName": mock.string('buildingName', 3) + index,                //类型：String  必有字段  备注：建筑名称
                "main": + index == 2,                //类型：Number  必有字段  备注：是否主建筑1-主建筑，0-子建筑
                "monthEnergyData": _.random(1, 1000),                //类型：Number  必有字段  备注：月能耗
                "monthBudgetData": _.random(1, 1000),                //类型：Number  必有字段  备注：月预算
                "buildingEnergyStatus": _.random(0, 2),                //类型：Number  必有字段  备注：能耗状态0-正常，1-预警，2-报警
                "warningRatio": +('0.' + _.random(1, 99)),                //类型：Number  必有字段  备注：预警风险率
                "alarmRatio": +('0.' + _.random(1, 99)),                //类型：Number  必有字段  备注：报警超标率
                "alarmOverdue": _.random(0, 1)                //类型：Number  必有字段  备注：报警是否过期0-未过期，1-已过期
            };
        })

        return new Promise(function (resolve) {

            pajax.post({
                url: 'FNPJ_GetBuildingsOfProject',
                data: {},
                success: function (res) {
                    resolve(res);
                },
                error: function (errObj) {
                    console.error('FNPJ_GetBuildingEnergyOutline Error');
                },
                complete: function () {

                }
            });
        })
    }

}