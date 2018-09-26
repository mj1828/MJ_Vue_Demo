<template>
    <div class="left">
        <div v-for="(menu,index) in menus" :key="index" :class="leftPath==menu.path ? 'menuCurrent': 'menu'" @click="menuClick(menu.path)">
            <i class='el-icon-info'></i>
            {{menus[index].name}}
        </div>
    </div>
</template>

<<script>
import EventHandler from '../../utils/eventHandler';
export default {
  name:'mj_left',
  data(){
      return {
          menus:[],
          leftPath:"",
          leftId:0
      }
  },
  props:{

  },
  methods:{
    menuClick:function(path){
        this.leftPath = path;
        this.$router.push({path: path});
    }
  },
   mounted(){
    let _this = this;
    EventHandler.$on( "initMenus", function( data ){
        this.getRequest("/api/listSon/"+data).then(response => {
          if(response.status==200){
              var data = response.data;
              if(data.Result){
                _this.menus = data.Message;
                if(data.Message.length>0){
                    _this.leftPath = data.Message[0].path;
                    _this.$router.push({path: data.Message[0].path})
                }else{
                    _this.$router.push({path:"/"})
                }
              }else{
                _this.$message({message:data.Message,type:"error"})
              }
            }
      }).catch(e => {
          console.log(e)
      })
    });
  }
}
</script>
<<style scoped>
    .menu{
        margin:10px;
        cursor:pointer;
    }
    .menuCurrent{
        margin:10px;
        margin-left:15px;
        cursor:pointer;
        color:blue;
    }
    .menu:hover{
        margin-left:15px;
        cursor:pointer;
        color:yellow;
    }
</style>

