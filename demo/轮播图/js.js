window.onload=function (){
    var array=[];
    for (let i = 0; i < 4; i++) {
        var l=document.querySelector(".l"+(i+1));
        array.push(l);


    }
function next(){
        var first=array.shift();
        // first.style.transitionDuration="unset"

  // first.style.transform= "perspective(1200px) translate3d(640px, 0, 0px)"

       array.push(first);
    for(var i=0 ;i<array.length;i++){
        // array[i].style.perspective="1200px"
        // array[i].style.transform=" translate3d(0, 0, 0px)"
        array[i].className=l+""+(i+1);
        array[i].style.zIndex=-1;
        array[i].style.transitionDuration="unset"
    }
    // array[0].style.transform= "perspective(1200px) translate3d(640px, 0, 0px)"


    array[0].style.zIndex=1;
    array[0].style.transitionDuration="300ms"
    array[0].style.transform= "perspective(1200px) translate3d(-384px, 0, 0px)"

    array[1].style.zIndex=1;
    array[1].style.transitionDuration="300ms"
    array[1].style.transform= "perspective(1200px) translate3d(-128px, 0, 0px)"
    array[1].style.filter="brightness(70%)"
    array[2].style.zIndex=2;
    array[2].style.transitionDuration="300ms"
    array[2].style.transform= "perspective(1200px) translate3d(128px, 0,100px)"
    array[2].style.filter="brightness(100%)"
    // array[3].style.zIndex=1;
    // array[3].style.transform= "perspective(1200px) translate3d(640px, 0, 0px)"
    //
    //
    // array[3].style.transform= "perspective(1200px) translate3d(384px, 0, 0px)"
    // // array[3].style.transitionDuration="300ms"
var l=array[3].className;
array[3].className=l+" lfirst";
    array[3].style.transform= "perspective(1200px) translate3d(384px, 0,0)"
array[3].style.filter="brightness(70%)"
}


    var b1=document.querySelector(".b1")
    var b2=document.querySelector(".b2")
    b2.addEventListener("click",function (){
        next();

    })

}