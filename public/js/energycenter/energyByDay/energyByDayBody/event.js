function DAllLoadingHide(){
    $("#globaloadng").phide();
    $("#DLpartloading").phide();
    $("#DRpartloading").phide();
}
function GiveEnergyDataWidth(el,arr){
    var _el = window.document.getElementsByClassName(el);
    for(var i=0;i<_el.length;i++){
        _el[i].style.width = arr[i] + "%";
    }
}