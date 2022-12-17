function enemy(main,x,y){

this.width=40;
this.height=40;
this.speed=2;
this.direction=0;
    this.x=x*50;
    this.y=y*50;

    this.e=document.createElement("div");
    this.e.className="Enemy";
    this.e.style.left=x*50+"px";
    this.e.style.top=y*50+"px";
this.isshot=-1;
main.mapwindow.appendChild(this.e);


    this.timer=setInterval(function (){
        this.direction=parseInt(Math.random()*4+"px",10)+1
    }.bind(this),500);

this.timer2=setInterval(function (){
    this.isshot=parseInt(Math.random()*4+"px",10);
}.bind(this),1000);




    enemy.prototype.move=function (){


    if(this.direction===1){

let temp=true;
       this.e.style.transform="  rotate(-90deg)"
        this.y-=this.speed;
        for (let i = 0; i < main.bricksCollation.length; i++) {
            let bri=main.bricksCollation[i];
            if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)&&bri.type!==3){
               temp=false;
                break;
            }

        }
        for (let i = 0; i < main.enemyCollection.length; i++) {
            let bri=main.enemyCollection[i];
            if(bri===this){
                continue
            }
            if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)){
               temp=false;

                break;
            }
        }
        if(typeof(main.my)!="undefined"&&main.intersects(this.x,this.y,this.width,this.height,main.my.x,main.my.y,main.my.width,main.my.height)){
            temp=false;


        }
        if(this.y<0&&temp){
            this.y=0;
        }else if(!temp){
            this.y+=this.speed;
        }

       this.e.style.top=this.y+"px";
// console.log(temp)
    }else if(this.direction===2){
let temp=true;
        this.e.style.transform="  rotate(90deg)"

       this.y+=this.speed;
        for (let i = 0; i < main.bricksCollation.length; i++) {
            let bri=main.bricksCollation[i];
            if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)&&bri.type!==3){
temp=false;

                break;
            }

        }
        for (let i = 0; i < main.enemyCollection.length; i++) {
            let bri=main.enemyCollection[i];
            if(bri===this){
                continue
            }
            if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)){
                temp=false;

                break;
            }

        }
        if(typeof(main.my)!="undefined"&&main.intersects(this.x,this.y,this.width,this.height,main.my.x,main.my.y,main.my.width,main.my.height)){
            temp=false;


        }
        if(this.y>650-this.height){
            this.y=650-this.height;
        }else if(!temp){
            this.y-=this.speed;
        }
       this.e.style.top=this.y+"px";



    }else if(this.direction===3){
       this.e.style.transform="  rotate(180deg)"
        this.x-=this.speed;
       let temp=true;
        for (let i = 0; i < main.bricksCollation.length; i++) {
            let bri=main.bricksCollation[i];
            if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)&&bri.type!==3){
temp=false;

                break;
            }

        }
        for (let i = 0; i < main.enemyCollection.length; i++) {
            let bri=main.enemyCollection[i];
            if(bri===this){
                continue
            }
            if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)){
                temp=false;

                break;
            }

        }
        if(typeof(main.my)!="undefined"&&main.intersects(this.x,this.y,this.width,this.height,main.my.x,main.my.y,main.my.width,main.my.height)){
            temp=false;


        }

        if(this.x<0&&temp){
            this.x=0;
        }else if(!temp){
            this.x+=this.speed;
        }
       this.e.style.left=this.x+"px";


    }
    else if(this.direction===4){
let temp=true;
        this.e.style.transform="  rotate(0)"
        this.x+=this.speed;
        for (let i = 0; i < main.bricksCollation.length; i++) {
            let bri=main.bricksCollation[i];
            if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)&&bri.type!==3){
temp=false;

                break;
            }

        }
        for (let i = 0; i < main.enemyCollection.length; i++) {
            let bri=main.enemyCollection[i];
            if(bri===this){
                continue
            }
            if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)){
                temp=false;

                break;
            }

        }
        if(typeof(main.my)!="undefined"&&main.intersects(this.x,this.y,this.width,this.height,main.my.x,main.my.y,main.my.width,main.my.height)){
            temp=false;


        }
        if(this.x>650-this.width&&temp){
            this.x=650-this.width;
        }else if(!temp){
            this.x-=this.speed;
        }
       this.e.style.left=this.x+"px";

    }



}


enemy.prototype.shot=function (){
        if(this.isshot===0){
let temp=new enemybullet(this.x+this.width/2,this.y+this.height/2,this.direction,main);
           main.enemyBulletCollection.push(temp);
this.isshot=-1;

        }

}


}