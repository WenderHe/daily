// console.log(bricksCollation.length)

function mybullet(x,y,direction,main){
    this.num=-1;
    this.x=x;
    this.y=y;
    this.width=15;
    this.height=15;
    this. bulletSpeed=8;
    this. bullet=document.createElement("div");
    this.bullet.className="Bullet";
    this.bullet.style.left=x+"px";
    this.bullet.style.top=y+"px";
    main.mapwindow.appendChild(this.bullet);




    mybullet.prototype.move=function (){
        if(direction===1){
            this.y-=this.bulletSpeed;

            this.bullet.style.top=this.y+"px";

        }else  if(direction===2){
            this.y+=this.bulletSpeed;

            this.bullet.style.top=this.y+"px";

        }else  if(direction===3){
            this. x-=this.bulletSpeed;

            this.bullet.style.left=this.x+"px";

        }
        else  if(direction===4){
            this.x+=this.bulletSpeed;

            this.bullet.style.left=this.x+"px";

        }

        console.log(" mybullet.prototype.move")
    }



    mybullet.prototype.hit=function (){

        for (let i = 0; i < main.enemyCollection.length; i++) {
            let en=main.enemyCollection[i];
            if(main.intersects(this.x,this.y,this.width,this.height,en.x,en.y,en.width,en.height)){



                    clearInterval(en.timer);
                    clearInterval(en.timer2);
                    main.enemyCollection.splice(i,1);
                    let b=en.e;
                    main.mapwindow.removeChild(b);
main.mybulletCollection.splice(this.num,1);
main.mapwindow.removeChild(this.bullet);
main.enemyNum--;
new bomb(en.x,en.y,main);


                main.score++;
                main.scorebar.innerHTML="当前得分:"+main.score;
                if(main.score>=30){
                    main.victory.src="img/victory3.gif";
                    clearInterval(main.timer1);
                    clearInterval(main.timer2);
                    clearInterval(main.my.timer1);
// main.mapwindow.style.filter="brightness(50%)"
                    main.cover.style.display="block";
                    //游戏胜利
                }

            }
        }

        for (let i = 0; i < main.bricksCollation.length; i++) {
            let bri=main.bricksCollation[i];
            if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)){
                if(bri.type===1){
                    map[bri.y/50][bri.x/50]=0;
                    main.bricksCollation.splice(i,1);
                    main.mybulletCollection.splice(this.num,1);
                    main.mapwindow.removeChild(bri);
                    // main.mapwindow.removeChild(this.bullet);

                   this.bullet.remove();
                   break;
                }else if(bri.type===2){

                    main.mybulletCollection.splice(this.num,1);
                    // main.mapwindow.removeChild(this.bullet);
                    this.bullet.remove();
                    break;
                }else if(bri.type===4){
                    main.mybulletCollection.splice(this.num,1);
                    main.mapwindow.removeChild(this.bullet);
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





    }





}


