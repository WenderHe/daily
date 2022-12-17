function bomb(x,y,main){
this.bombdiv=document.createElement("div");
    this.bombdiv.style.left=x+"px";
    this.bombdiv.style.top=y+"px";
    this.bombdiv.className="Bomb";
    main.mapwindow.appendChild(this.bombdiv);

    setTimeout(function (){
     main.mapwindow.removeChild(this.bombdiv);


    }.bind(this),200);









}