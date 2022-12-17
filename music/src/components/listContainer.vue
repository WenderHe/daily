<template>
 <div id="l">
<lists v-for="(f,index) in songlist " :key="index" :sobj="f" :i="index" :topplefavorite="topplefavorite" :toppleplay="toppleplay"></lists>
     
 </div>
</template>

<script>

import lists from './lists.vue'
export default {
   name:"listcontainer",
   // el:"#l",
components:{
 lists
   
},
props:["songlist","topplefavorite","toppleplay"]



    
}
</script>

<style scoped>

#l{
width:398px;
height: 650px;

overflow: auto;
}
#l::-webkit-scrollbar {
     display: none;
 } 



</style>