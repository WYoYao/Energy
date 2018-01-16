














var more_build_init = function () {

    // 将Vue 实例上面的方法的绑定到　Windows 对象上面
    ['handler_build_select', 'handler_date_select'].forEach(function (key) {

        console.log(123);

        window[key] = v.instance[key].bind(v.instance);
    })
}