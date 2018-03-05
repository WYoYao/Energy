
function createRatioDiagram(el, top, left, bottom, height, color) {
    var cBox = document.getElementById(el);
    var ctx = cBox.getContext('2d');
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left - (bottom / 2), height);
    ctx.lineTo(left + (bottom / 2), height);
    ctx.lineTo(left, top);
    ctx.stroke();
    ctx.fill();
}

//输入要操作的dom，百分比数字
function getTimeUsedPercent(className, data) {
    var bak = Math.floor(data / 10);
    for (var i = 0; i < bak; i++) {
        document.getElementsByClassName(className)[i].style.width = "100%";
    }
    if(data != 100){
            var x = (data - bak * 10) * 10 + "%";
        document.getElementsByClassName(className)[bak].style.width = x;
        for (var a = 9; a > bak; a--) {
            document.getElementsByClassName(className)[a].style.width = "0%";
        }
    }

}

function ProjectDrawCircle(){
    var c = v._instance.PprojectInfo.energyOccupyPlanRatio;
    if (c > 1) {
        if (c > 1.5) {
            chart.circleDraw(1, false);
            $("#PB_pointer_wrap").css("transform", "rotate(103deg)");
        } else {
            chart.circleDraw((c - 0.5), false);
            var deg = (c - 1) * 2 * 103;
            $("#PB_pointer_wrap").css("transform", "rotate(" + deg + "deg)");
        }
        $("#PB_circle_wrap").css("transform", "rotate(2deg)");
        $("#PB_circle").css("background", "#FF7B7B");
    } else {
        if (c > 0.5) {
            chart.circleDraw((c - 0.5), true);
            var deg = (c - 0.5) / 0.5 * 103 - 102;
            var _deg = -(103 - (c - 0.5) * 103 * 2);
            $("#PB_pointer_wrap").css("transform", "rotate(" + _deg + "deg)");
            $("#PB_circle_wrap").css("transform", "rotate(" + deg + "deg)");
        } else {
            chart.circleDraw(0, true);
            $("#PB_pointer_wrap").css("transform", "rotate(-103deg)");
            $("#PB_circle_wrap").css("transform", "rotate(-102deg)");
        }
        $("#PB_circle").css("background", "#02A9D1");
    }
}