<template>
  <div id="app">
  
     <ul class="u1">
    <li @click="button1"><img :src=src1></li>
    <li @click="button2"><img :src=src2 ></li>
    <li @click="button3"><img :src=src3></li>
      </ul>
  <!-- <listContainer :songlist="songlist" :topplefavorite="topplefavorite" :toppleplay="toppleplay"></listContainer> -->
  
  <router-view></router-view>
  <audio class="audio" :src="currentsongSrc"></audio>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import favorite from './components/favorite.vue'
import listContainer from './components/listContainer.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld
   listContainer,favorite
  },
  data(){
    return{
 songlist:[
        {id:"1", songname:"富士山下",author:"陈奕迅",songsrc:require("./musics/陈奕迅 - 富士山下.mp3"),favorite:false,playing:false,position:false}
        ,{id:"2",songname:"New Boy",author:"房东的猫",songsrc:require("./musics/房东的猫 - New Boy .mp3"),favorite:false,playing:false,position:false}
        ,{id:"3",songname:"他说",author:"林俊杰",songsrc:require("./musics/林俊杰 - 她说.mp3"),favorite:false,playing:false,position:false}
        ,{id:"4",songname:"遇见",author:"孙燕姿",songsrc:require("./musics/孙燕姿 - 遇见.mp3"),favorite:false,playing:false,position:false}
        ,{id:"5",songname:"天外来吻",author:"薛之谦",songsrc:require("./musics/薛之谦 - 天外来物.mp3"),favorite:false,playing:false,position:false}
        ,{id:"6",songname:"花海",author:"周杰伦",songsrc:require("./musics/周杰伦 - 花海.mp3"),favorite:false,playing:false,position:false}
        ,{id:"7",songname:"起风了",author:"周深",songsrc:require("./musics/周深 - 起风了.mp3"),favorite:false,playing:false,position:false}
        ,{id:"8",songname:"金玉良缘",author:"付雪",songsrc:require("./musics/付雪 - 金玉良缘.mp3"),favorite:false,playing:false,position:false}
        ,{id:"9",songname:"漠河舞厅",author:"柳爽",songsrc:require("./musics/柳爽 - 漠河舞厅.mp3"),favorite:false,playing:false,position:false}
        ,{id:"10",songname:"踏山河",author:"七叔（叶泽浩）",songsrc:require("./musics/七叔（叶泽浩） - 踏山河.mp3"),favorite:false,playing:false,position:false}
      ,{id:"11",songname:"哪吒",author:"时代少年团",songsrc:require("./musics/时代少年团 - 哪吒.mp3"),favorite:false,playing:false,position:false}
       ,{id:"12",songname:"别再闹了",author:"毛不易",songsrc:require("./musics/毛不易 - 别再闹了.mp3"),favorite:false,playing:false,position:false}
        ,{id:"13",songname:"一路生花",author:"温奕心",songsrc:require("./musics/温奕心 - 一路生花.mp3"),favorite:false,playing:false,position:false}
    ],
    lastsongId:"",
    currentsongSrc:"",
    src1:require("./img/首页red.png"),
     src2:require("./img/分类.png"),
      src3:require("./img/收藏.png"),
      currentComponents:1
    }
  },methods:{
    reFresh(){
      if(this.currentComponents===1){
        this.button1()
      }else if(this.currentComponents===2){
        this.button2()
      }else if(this.currentComponents===3){
         this.button3()
      }
    },
    topplefavorite(i){
     
this.songlist.forEach(element => {
  if(element.id===i){
   element.favorite=!element.favorite
   console.log("aaaaaaa")
  }
});
this.reFresh()
    },
    toppleplay(i){
      //  var a=document.querySelector(".audio");
    
      
this.songlist.forEach(element => {
            if(element.id===i){
              if( this.currentsongSrc===element.songsrc&&!element.playing){
                 var a=document.querySelector(".audio");
               a.play();
               element.playing=!element.playing
               
              }else if(this.currentsongSrc===element.songsrc&&element.playing){
                 var a=document.querySelector(".audio");
                   element.playing=!element.playing
                    a.pause();
              }else if(this.currentsongSrc!==element.songsrc){
                // confirm("jian")
                 element.playing=!element.playing
                 element.position=true
                 setTimeout(function(){
             var a=document.querySelector(".audio");
                a.play();
                 })
              this.currentsongSrc =element.songsrc ;
             
this.songlist.forEach(e => {
  if(e.id===this.lastsongId){
    e.playing=false
  e.position=false
  }
});


             
    this.lastsongId=element.id
              }
         
         

            }
});
      //*************** */
      console.log(this.songlist)
      this.reFresh()
    },
    button1(s,f,p){

 this.src1=require("./img/首页red.png");
     this.src2=require("./img/分类.png");
      this.src3=require("./img/收藏.png");
      this.$router.push({
        name:'listcontainer',
        query:{
          songlist:this.songlist,
          topplefavorite:this.topplefavorite,
          toppleplay:this.toppleplay
        }
      })
      this.currentComponents=1
  },
  button2(){
     this.src1=require("./img/首页.png");
     this.src2=require("./img/分类 red.png");
      this.src3=require("./img/收藏.png");
this.$router.push({
        name:'category',
        query:{
          songlist:this.songlist,
          topplefavorite:this.topplefavorite,
          toppleplay:this.toppleplay
        }
      })
      this.currentComponents=2
  },
  button3(){
    this.src1=require("./img/首页.png");
     this.src2=require("./img/分类.png");
      this.src3=require("./img/收藏 red.png");
this.$router.push({
        name:'favorite',
         query:{
          songlist:this.songlist,
          topplefavorite:this.topplefavorite,
          toppleplay:this.toppleplay
        }
      })
      this.currentComponents=3
  }
  },
  mounted(){
    // this.button1()
   this.button1()

  }
}

</script>

<style scoped>
#app{
  margin: 0 auto;
width: 400px;
height: 700px;
border: 1px solid red;
position: relative;


}
.foot{
  position: absolute;
  bottom: 0;
}
.u1{
            display: flex;
            border: 1px solid red;
            width: 400px;
height: 50px;
 position: absolute;
  bottom: 0;

        }
        .u1 li{
            border: 1px solid red;
            flex-grow: 1;
            text-align: center;
            cursor: pointer;
        }
        .u1 li img{
            width: 50px;
        }
</style>
