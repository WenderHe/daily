function enemybullet(x,y,direction,main){

    this.num=-1;
    this.x=x;
    this.y=y;
this.isalive=true;

    this.width=15;
    this.height=15;
    this. bulletSpeed=8;
    this.bullet=document.createElement("div");
    this.bullet.className="Bullet";
    this.bullet.style.left=x+"px";
    this.bullet.style.top=y+"px";
// this.bullet.bunum=main.bunum++;
    main.mapwindow.appendChild(this.bullet);
this.direction=direction;



   enemybullet.prototype.move=function (){
        if(this.direction===1){
            this.y-=this.bulletSpeed;

            this.bullet.style.top=this.y+"px";

        }else  if(this.direction===2){
            this.y+=this.bulletSpeed;

            this.bullet.style.top=this.y+"px";

        }else  if(this.direction===3){
            this. x-=this.bulletSpeed;

            this.bullet.style.left=this.x+"px";

        }
        else  if(this.direction===4){
            this.x+=this.bulletSpeed;

            this.bullet.style.left=this.x+"px";

        }

        //console.log(" mybullet.prototype.move")
    }



   enemybullet.prototype.hit2=function (){
       let bri
        for (let i=0;i < main.bricksCollation.length; i++) {
            bri=main.bricksCollation[i];
            // if(typeof(bri)=="undefined"){
            //     break;
            // }
            if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)){
                if(bri.type===1){

                    map[bri.y/50][bri.x/50]=0;

                    bri.isalive=false;
                       this.isalive=false;


                    break;
                }else if(bri.type===2){

                        this.isalive=false;
                    break;

                    }else if(bri.type===4){
                    this.isalive=false;
                    bri.life--;
                    if(bri.life===0){
                        main.bricksCollation.splice(this.num);
                        bri.remove();
                        new bomb(bri.x,bri.y,main);
                        main.defect.src="img/shibai1.gif";
                        clearInterval(main.timer1);
                        clearInterval(main.timer2);
                        clearInterval(main.my.timer1);
                        main.cover.style.display="block";

                        //game over
                    }else{
                        bri.className="Base"+(4-bri.life);


                    }

                    break;
                    }

                }

            }



       if(typeof(main.my)!="undefined"&&main.intersects(this.x,this.y,this.width,this.height,main.my.x,main.my.y,main.my.width,main.my.height)) {
           main.my.life--;
           if (main.my.life === 0) {

               main.Mytank.remove();
               new bomb(main.my.x,main.my.y,main);
               main.defect.src="img/shibai1.gif";
               this.bullet.remove();
               clearInterval(main.timer1);
               clearInterval(main.timer2);
               clearInterval(main.my.timer1);
               main.cover.style.display="block";
               main.lifebar.innerHTML="当前生命值:"+main.my.life;
               //game over
           }
       }



    }








}