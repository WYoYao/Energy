
//画指针
function createRatioDiagram(el,top,left,height,color){
    var canvas=document.getElementById(el);
    var ctx=canvas.getContext('2d');
    ctx.fillStyle= color;
    ctx.strokeStyle= color;
    ctx.beginPath();
    ctx.moveTo(left,top);
    ctx.lineTo(left/2,height);
    ctx.lineTo(left*3/2,height);
    ctx.lineTo(left,top);
    ctx.stroke();
    ctx.fill();
}