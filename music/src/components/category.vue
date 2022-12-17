<template>
  <div class="d1">

<div :class="classobj2">
    <!-- 小弹窗 -->
<ul>
    <!-- <li>周杰伦</li>
    <li>毛不易</li> -->
    <li v-for="(s,index) in singer" :key="index" @click="search">{{s.name}}</li>

</ul>
<input class="input1" type="text" v-model="value" @keydown.enter="inputSearch()">
</div>
 <lists v-for="(f,index) in songlist " :key="f.id" :sobj="f" :i="index" :topplefavorite="topplefavorite" :toppleplay="toppleplay" v-show="vShow(f)"></lists>
 <img :class="classobj" src="../img/加号.png" @click="fun1" alt="">
  </div>
</template>

<script>

import lists from './lists.vue'
export default {
    components:{
        lists
    },
name:"category",
data(){
    return{
        singer:[
            {name:"周杰伦"},
            {name:"毛不易"},
             {name:"房东的猫"},
            {name:"林俊杰"},
             {name:"孙燕姿"},
            {name:"薛之谦"},
             {name:"周深"},
            {name:"付雪"},
             {name:"柳爽"},
            {name:"七叔"},
             {name:"时代少年团"},
            {name:"温奕心"},
        ],
        authorMessage:"",
        value:"",
        classobj:{
img1:true,

        },
        isShowing:false,
        classobj2:{
            d2:true,
           displ:true
        }
       
    }
},
methods:{

    search(e){
console.log(e.target.innerText)
this.authorMessage=e.target.innerText
 this.fun1()
    },
    vShow(f){
       

      
          if( this.authorMessage===""){
                return false
          }else if(this.authorMessage===f.author||this.authorMessage===f.songname){
              return true
          }else if(f.author.indexOf(this.authorMessage) !==-1||f.songname.indexOf(this.authorMessage) !== -1){
             
              return true
          }
        

         return false
    },inputSearch(){
        this.authorMessage=this.value
        this.value=""
        this.fun1()
    },
    fun1(){
        if(!this.isShowing){
            this.classobj={img1:true,show:true}
            this.isShowing=!this.isShowing
            this.classobj2={d2:true,d2showAnima:true}
        }else if(this.isShowing){
            this.classobj={
                img1:true,unshow:true
            }
            this.classobj2={d2:true,d2unshowAnima:true}
             this.isShowing=!this.isShowing
        }
    }
},props:["songlist","topplefavorite","toppleplay"],
    deactived(){
this.classobj={
img1:true,

        }
        
 this.classobj2={
            d2:true,
           displ:true
        }
       
    },
}
</script>

<style scoped>
.d1{
    position: relative;
    width: 400px;
    height: 650px;

}
.d2{
    width:300px;
    height: 300px;
    background-color: bisque;
    border: 1px solid red;
    position:absolute;
    border-radius: 15px;
text-align: center;
bottom: 50px;
left: 20px;

}
.d2showAnima{
    animation: show2 0.3s both;
}
.d2unshowAnima{
     animation: unshow2 0.3s both;
}
.d2 ul{
    display: flex;
    flex-wrap:wrap;
}
.d2 ul li{
    /* width: 80px; */
    padding: 0 10px;
    height: 30px;
    background-color: darkcyan;
    color: white;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    margin: 5px 5px;
    cursor: pointer;
    border-radius: 15px;
}
.input1{
    width: 200px;
    height: 30px;
margin-top: 10px;
    /* border-radius: 15px; */
}
.img1{
    position: absolute;
    width: 60px;
    bottom: 20px;
    right: 20px;
}
@keyframes show {
  from{
     transform: rotate(0); 
  }
  to{
      transform: rotate(180deg);
  }
}
@keyframes unshow {
  from{
     transform: rotate(0); 
  }
  to{
      transform: rotate(-180deg);
  }
}
@keyframes show2 {
  from{
      display: block;
    opacity: 0;
  }
  to{
       display: block;
    opacity: 1;
  }
}
@keyframes unshow2 {
  from{
   opacity: 1;
  }
  to{
     opacity: 0;
     display: none;
  }
}
.displ{
    display: none;
}
.show{
    animation: show 0.3s ;
}
.unshow{
     animation: unshow 0.3s ;
}
</style>