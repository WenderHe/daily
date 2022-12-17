//坦克类
function mytank(main){

this.life=2;
    this.x=350;
   this.y=600;
    this.width=40;
     this.height=40;
     this.speed=2;
   this.timer1=setInterval(function (){


       if(main.direction===1){
let temp=true;


           main.Mytank.style.transform="  rotate(0)"
          this.y-=this.speed;

           for (let i = 0; i < main.bricksCollation.length; i++) {
               let bri=main.bricksCollation[i];
               if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)&&bri.type!==3){
                   // this.y+=this.speed;
temp=false;
                   break;
               }

           }
           for (let i = 0; i < main.enemyCollection.length; i++) {
               let bri=main.enemyCollection[i];
               if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)){
                   // this.y+=this.speed;
                   temp=false;

                   break;
               }

           }

           if(this.y<0&&temp){
               this.y=0;
           }else if(!temp){
               this.y+=this.speed;
           }
           main.Mytank.style.top=this.y+"px";

       }else if(main.direction===2){
           let temp=true;
           main.Mytank.style.transform="  rotate(180deg)"

           this.y+=this.speed;
           for (let i = 0; i < main.bricksCollation.length; i++) {
               let bri=main.bricksCollation[i];
               if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)&&bri.type!==3){
                   // this.y-=this.speed;
temp=false;
                   break;
               }

           }
           for (let i = 0; i < main.enemyCollection.length; i++) {
               let bri=main.enemyCollection[i];
               if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)){
                   // this.y+=this.speed;
temp=false;
                   break;
               }

           }
           if(this.y>650-this.height){
               this.y=650-this.height;
           }else if(!temp){
               this.y-=this.speed;
           }
           main.Mytank.style.top=this.y+"px";



       }else if(main.direction===3){
           let temp=true;
           main.Mytank.style.transform="  rotate(-90deg)"
           this.x-=this.speed;
           for (let i = 0; i < main.bricksCollation.length; i++) {
               let bri=main.bricksCollation[i];
               if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)&&bri.type!==3){
                   // this. x+=this.speed;
temp=false;
                   break;
               }

           }
           for (let i = 0; i < main.enemyCollection.length; i++) {
               let bri=main.enemyCollection[i];
               if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)){
                   // this.y+=this.speed;

                   temp=false;
                   break;
               }

           }
           if(this.x<0&&temp){
               this.x=0;
           }else if(!temp){
               this.x+=this.speed;
           }
           main.Mytank.style.left=this.x+"px";


       }
       else if(main.direction===4){
           let temp=true;
           main.Mytank.style.transform="  rotate(90deg)"
           this.x+=this.speed;
           for (let i = 0; i < main.bricksCollation.length; i++) {
               let bri=main.bricksCollation[i];
               if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)&&bri.type!==3){
                   // this.x-=this.speed;
temp=false;
                   break;
               }

           }
           for (let i = 0; i < main.enemyCollection.length; i++) {
               let bri=main.enemyCollection[i];
               if(main.intersects(this.x,this.y,this.width,this.height,bri.x,bri.y,bri.width,bri.height)){
                   // this.y+=this.speed;

                   temp=false;
                   break;
               }

           }
           if(this.x>650-this.width&&temp){
               this.x=650-this.width;
           }else if(!temp){
               this.x-=this.speed;
           }
           main.Mytank.style.left=this.x+"px";
           // console.log(this.mytankspeed);
       }

    }.bind(this),10);


    mytank.prototype.shot=function (){
        var mybullet2=new mybullet(this.x+this.width/2-10,this.y+this.height/2-10,main.bulletdirection,main);
        main.mybulletCollection.push(mybullet2);
// console.log("shot")



    }


}