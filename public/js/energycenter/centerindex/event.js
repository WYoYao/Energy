function budgetFillInputBlur(){
    document.getElementById("TotalBudgetFill").getElementsByTagName('input')[0].addEventListener('input',function(){
        var t = v._instance, x = t.projectBudgetEditCache, y = t.indexBudgerWarn;
        var a = $("#TotalBudgetFill input").val() != "" ? Number($("#TotalBudgetFill input").val()) : NaN, b=x.square, c=x.remark;
        x.total = a != NaN && a > 0 ? ~~x.total : null;
        if(x.total === null){
            y.total = true;
            $("#IRW2").text("请输入正整数");
        }else{
            y.total = false;
            y.square = false;
            x.square =  a > 0 ? Math.ceil(x.total/t.projectSel.projectInfo.area) : 0;
        }
        iThreePve()
    })

    document.getElementById("squareBudgetFill").getElementsByTagName('input')[0].addEventListener('input',function(){
        var t = v._instance, x = t.projectBudgetEditCache, y = t.indexBudgerWarn;
        var a = $("#squareBudgetFill input").val() != "" ? Number($("#squareBudgetFill input").val()) : NaN, b=x.total, c=x.remark;
        x.square = a != NaN && a > 0 ? ~~x.square : null;
        if(x.square === null){
            y.square = true;
            $("#IRW3").text("请输入正整数");
        }else{
            y.total = false;
            y.square = false;
            x.total =  a > 0 ? t.projectBudgetEditCache.square*t.projectSel.projectInfo.area : 0;
        }
        iThreePve()
    })

    document.getElementById("indexBudgetEditRemark").getElementsByTagName('input')[0].addEventListener('input',function(){
        var a = $("#indexBudgetEditRemark input").val();
        v._instance.indexBudgerWarn.pizhu2 = a.toString().length < 101 ? false : true;
        iThreePve();
    })

    document.getElementById("indexBudgetRemark").getElementsByTagName('input')[0].addEventListener('input',function(){
        var a = $("#indexBudgetRemark input").val();
        if(a != ""){
            v._instance.indexPage.budgetCanSave = a.length < 101 ? true : false;
            $("#IRW1").text("不可超过100个字");
            v._instance.indexBudgerWarn.pizhu = a.length < 101 ?  false : true;
        }else{
            v._instance.indexPage.budgetCanSave = false;
            v._instance.indexBudgerWarn.pizhu = true;
            $("#IRW1").text("不能为空");
        } 
    })
}
function iThreePve(){
    var t = v._instance.projectBudgetEditCache;
    v._instance.indexPage.budgetCanSave =  t.total != null && t.square != null && (t.remark != null ? t.remark.toString().length < 101 ? true : false : true) ? true : false;
}
function indexTimeSel(){
    v._instance.indexIsThisMonth();
    v._instance.indexRefreshRender();
}
function projectFilterEnd(){
    $("#I_filterWindow").phide();
    v._instance.projectSelCache = JSON.parse(JSON.stringify(v._instance.projectSelectParam));
    v._instance.indexRefreshRender();    
}
function chartClick(index){       //图表点击与表格联动
    $(".I_foot_li").css("background","#FFFFFF").eq(index).css("background","#F8F8F8")
    // 被选中表格行距离表头距离 = 被选中表格行距离页面头部距离 - 表格头部距离页面头部距离
    var liScrollTop = $(".I_foot_li")[index].offsetTop - $("#I_foot_ul")[0].offsetTop;
    var scrollMin = $("#I_foot_ul")[0].offsetHeight - 50;
    var scrollMax = $("#I_foot_ul")[0].scrollHeight - scrollMin;
    liScrollTop>scrollMin && liScrollTop<scrollMax ? $("#I_foot_ul").scrollTop(liScrollTop) : void 0;
    liScrollTop>scrollMax ? $("#I_foot_ul").scrollTop(scrollMax) : void 0;
    liScrollTop<scrollMin ? $("#I_foot_ul").scrollTop(0) : void 0;
    $("#I_foot_ul").mouseenter(function(){
        $(".I_foot_li").css("background","#FFFFFF");
    })
}
function indexItemSel(){            //首页选择项目分项
    v._instance.indexRefreshRender();
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
    return hexColor;  
 }  
 function indexDownload(model){
     model.name == "下载excel文件" ? v._instance.indexDownloadExcel() :  v._instance.indexDownloadPDF();
 }
 function createHtml(link) {
    link = link || document;
    var origin = window.location.origin;
    var bodyHtml = "<div style=' margin: 0 auto 0;font-size:18px;line-height:20px;height:20px;width:300px;text-align:center;'>" + new Date($('#I_head_ptime').psel().startTime).format('yyyy年M月') + "项目预算能耗分析报告</div>" + document.getElementById('I_chart_Avg_F').outerHTML + document.getElementById('ChartF').outerHTML + document.getElementById('I_foot').outerHTML;
        linkHtml = Array.prototype.slice.call(link ? $(link).find("link") : $("link")).reduce(function (con, item) {
            con += /http/.test(item.outerHTML) ? item.outerHTML : (item.outerHTML.replace(/href\=\"/, 'href="' + origin));
            return con;
        }, '');
        linkHtml += '<link rel="stylesheet" href="'+ window.location.origin +'/css/energycenter/centerPDF.css">'
    return "<!DOCTYPE html>\n    <html lang=\"en\">\n    \n    <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n        <title>Document</title>\n        " + linkHtml + "\n    </head>\n    \n    <body >\n    " + bodyHtml + "\n    </body>\n    \n    </html>";
}
//表头排序按钮被点击
function indexGridSortClick(index){
    var topcolor = RGBToHex($(".I_grid_pic").eq(index).find("i").eq(0).css("color"));
    var botcolor = RGBToHex($(".I_grid_pic").eq(index).find("i").eq(1).css("color"));
    if((topcolor=="#C3CDD0" && botcolor=="#C3CDD0")){
        v._instance.indexProjectInfoSort(0,index)
        $(".I_foot_head").find("i").css("color","#C3CDD0");
        $(".I_grid_pic").eq(index).find("i").eq(0).css("color","#7A94AD");
        $(".I_grid_pic").eq(index).find("i").eq(1).css("color","#C3CDD0");}
    if(topcolor=="#7A94AD" && botcolor=="#C3CDD0"){
        v._instance.indexProjectInfoSort(1,index);
        $(".I_foot_head").find("i").css("color","#C3CDD0");
        $(".I_grid_pic").eq(index).find("i").eq(0).css("color","#C3CDD0");
        $(".I_grid_pic").eq(index).find("i").eq(1).css("color","#7A94AD"); }
    if((topcolor=="#C3CDD0" && botcolor=="#7A94AD")){
        v._instance.indexProjectInfoSort(1,index);
        $(".I_foot_head").find("i").css("color","#C3CDD0");
        $(".I_grid_pic").eq(index).find("i").eq(0).css("color","#7A94AD");
        $(".I_grid_pic").eq(index).find("i").eq(1).css("color","#C3CDD0"); }
}
function indexPageC(){
    v._instance.indexPageChange();
}
function allSortRecover(){
    var $elG = $(".I_grid_pic").find("i");
    for(var i=0;i<$elG.length;i++){
        $($elG[i]).css("color","#C3CDD0");
    }
}