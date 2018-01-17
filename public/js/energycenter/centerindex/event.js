function budgetFillInputBlur(){
    $("#TotalBudgetFill input").blur(function(){
        $("#TotalBudgetFill").pverifi() ? v._instance.projectBudgetEditCache.square = Math.ceil(v._instance.projectBudgetEditCache.total/v._instance.projectSel.projectInfo.area) : void 0;
    })
    $("#squareBudgetFill input").blur(function(){
        $("#squareBudgetFill").pverifi() ? v._instance.projectBudgetEditCache.total = v._instance.projectBudgetEditCache.square*v._instance.projectSel.projectInfo.area : void 0;
    })
}
function indexTimeSel(){
    v._instance.createGetListParam();
    v._instance.indexIsThisMonth();
}
function projectFilterEnd(){
    $("#index_filterWindow").phide();
    v._instance.createGetListParam();
}
function chartClick(index){       //图表点击与表格联动
    $(".index_foot_li").css("background","#FFFFFF").eq(index).css("background","#F8F8F8")
    // 被选中表格行距离表头距离 = 被选中表格行距离页面头部距离 - 表格头部距离页面头部距离
    var liScrollTop = $(".index_foot_li")[index].offsetTop - $("#index_foot_ul")[0].offsetTop;
    var scrollMin = $("#index_foot_ul")[0].offsetHeight - 50;
    var scrollMax = $("#index_foot_ul")[0].scrollHeight - scrollMin;
    liScrollTop>scrollMin && liScrollTop<scrollMax ? $("#index_foot_ul").scrollTop(liScrollTop) : void 0;
    liScrollTop>scrollMax ? $("#index_foot_ul").scrollTop(scrollMax) : void 0;
    liScrollTop<scrollMin ? $("#index_foot_ul").scrollTop(0) : void 0;
    $("#index_foot_ul").mouseenter(function(){
        $(".index_foot_li").css("background","#FFFFFF");
    })
}
function indexItemSel(){            //首页选择项目分项
    v._instance.createGetListParam();
}
function RGBToHex(rgb){ 
    var regexp = /[0-9]{0,3}/g;  
    var re = rgb.match(regexp);//利用正则表达式去掉多余的部分，将rgb中的数字提取
    var hexColor = "#"; var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];  
    for (var i = 0; i < re.length; i++) {
         var r = null, c = re[i], l = c; 
         var hexAr = [];
         while (c > 16){  
               r = c % 16;  
               c = (c / 16) >> 0; 
               hexAr.push(hex[r]);  
          } hexAr.push(hex[c]);
          if(l < 16&&l != ""){        
              hexAr.push(0)
          }
        hexColor += hexAr.reverse().join(''); 
     }  
    //alert(hexColor)  
    return hexColor;  
 }  