var planController = {
    getProjectDataByDay: function (argu) {
        return new Promise(function (resolve) {
            pajax.post({
                url: 'FNCT_EnergyPlanEntranceService',
                data: argu,

                success: function (res) {
                    resolve(res[0] || {});
                },
                error: function (errObj) {
                    console.error('FNCT_EnergyPlanEntranceService Error');
                },
                complete: function () {

                }
            });
        })
    }
}