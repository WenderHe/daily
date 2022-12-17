<template>
  <div id="#root">

      <ul class="u1">
    <li @click="button1"><img :src=src1></li>
    <li @click="button2"><img :src=src2 ></li>
    <li @click="button3"><img :src=src3></li>
      </ul>

  </div>
</template>

<script>
export default {

el:"#root",
data(){
  return{
    src1:require("../img/首页red.png"),
     src2:require("../img/分类.png"),
      src3:require("../img/收藏.png"),

  }
},
methods:{
  button1(){

 this.src1=require("../img/首页red.png");
     this.src2=require("../img/分类.png");
      this.src3=require("../img/收藏.png");
  },
  button2(){
     this.src1=require("../img/首页.png");
     this.src2=require("../img/分类 red.png");
      this.src3=require("../img/收藏.png");

  },
  button3(){
    this.src1=require("../img/首页.png");
     this.src2=require("../img/分类.png");
      this.src3=require("../img/收藏 red.png");
  }

}

}
</script>

<style scoped>


 .u1{
            display: flex;
            border: 1px solid red;
            width: 400px;
height: 50px;

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