var more_build_init = function () {

    // 将Vue 实例上面的方法的绑定到　Windows 对象上面
    ['handler_build_select', 'handler_date_select'].forEach(function (key) {

        window[key] = v.instance[key].bind(v.instance);
    })
}

var build_select_sel = function (item) {
    if (item.index == 1)
        v.initPage("subOption")
    else if(item.index == 0)
        console.log("预警、报警配置");
}