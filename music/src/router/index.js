import VueRouter  from "vue-router";
import listcontainer from '../components/listContainer.vue'
import favorite from '../components/favorite.vue'
import category from '../components/category.vue'
export default new VueRouter({
routes:[
    {
   name:'listcontainer',
   path:'./listcontainer',
    component:listcontainer,
    props({query}){
return {songlist:query.songlist,topplefavorite:query.topplefavorite,toppleplay:query.toppleplay}
    }
    },
    {
   name:'favorite',
   path:"./favorite",
    component:favorite,
    props({query}){
        return {songlist:query.songlist,topplefavorite:query.topplefavorite,toppleplay:query.toppleplay}
            }
    },
    {
        name:"category",
        path:"category",
        component:category,
        props({query}){
            return {songlist:query.songlist,topplefavorite:query.topplefavorite,toppleplay:query.toppleplay}
                }
    }
    


]




})