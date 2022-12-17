<template>
  <div id="lists">
     
        <div class="d1" >
            <span class="s3">{{i+1}}</span>
        <span class="s1">{{sobj.songname}}</span>
        <span class="s2">{{sobj.author}}</span>

        <img class="img1" @click="topplefavorite(sobj.id)" :src="!sobj.favorite? require('../img/喜爱.png'):require('../img/喜爱-填充.png')" >
 
 <img @click="toppleplay(sobj.id)" class="img2"  :src="!sobj.playing? require('../img/播放.png'):require('../img/正在播放.png')">
<img class="img3" :src="fun1()"  alt="">
        </div>
   
     
  </div>
</template>

<script>
export default{
    // el:"#lists",
    props:["sobj","i","topplefavorite","toppleplay"],
    data(){
        return{
            favorite:require("../img/喜爱.png"),
            play:require("../img/播放.png"),
        }
    },
    methods:{
      fun1(){
          if(this.sobj.position===true&&this.sobj.playing){
              return require('../img/音乐律动.gif')
          }else if(this.sobj.position===true&&!this.sobj.playing){
               return require('../img/音乐律动static.png')
          }
      }
    }
}
</script>

<style scoped>

.img3{
    width: 30px;
   margin-left: 20px;
  /* display: inline-block; */
  

}
.d1{
width: 400px;
height: 50px;
font-size: 20px;
background-color: gainsboro;
border: 1px solid gray;
line-height: 50px;
    /* display: flex; */
}
.s1{
    /* display: inline-block; */
font-size: 24px;
font-weight: bold;
margin-left: 6px;
/* margin-top: -20px; */
}
.s2{
    font-size: 15px;
    /* display: inline-block; */
margin-left: 10px;
/* margin-top: 10px; */


}
.s3{
font-size: 25px;

}
.img1{
    width: 30px;
    float: right;
    margin: 5px 10px;
}
.img2{
    width: 30px;
    float: right;
     margin: 5px 10px;
}

</style>