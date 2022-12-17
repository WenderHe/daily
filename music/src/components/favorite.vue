<template>
<div id="fav">

 
        <lists v-for="(f,index) in songlist " :key="index" :sobj="f" :i="index" :topplefavorite="topplefavorite" :toppleplay="toppleplay" v-show="f.favorite" ></lists>

    <!-- <lists v-for="(f,index) in songlist " :key="index" :sobj="f" :i="index" :topplefavorite="topplefavorite" :toppleplay="toppleplay" v-show="f.favorite"  ></lists> -->
        


</div>
   
</template>

<script>

import lists from './lists.vue'
export default {
// el:"#fav",
name:"favorite",
props:["songlist","topplefavorite","toppleplay"],
components:{
lists
},
data(){
    return{
        index:0
    }
}
}
</script>

<style scoped>


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
    display: inline-block;
font-size: 24px;
font-weight: bold;
margin-left: 6px;

}
.s2{
    font-size: 15px;
    display: inline-block;
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