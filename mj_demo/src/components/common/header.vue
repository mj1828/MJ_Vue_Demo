<template>
    <div class="mj-header">
        <el-row>
            <el-col :span="6">
                <img class="logo" src="../../assets/banner-logo.png" />
            </el-col>
            <el-col :span="14">
                <div class="menus">

                    <div v-for="menu in menus" class="menu" :id="menu.path" @mouseenter="menuenter(menu.path)">
                        <img :src="require('../../assets/menu/'+menu.icon)" width="60px" height="60px" v-if="path!=menu.path" />
                        <div class="menutitle" v-if="path!=menu.path">{{menu.name}}</div>
                        <div class="menutitleshow" @mouseleave="menuleave()" @click="menuclick(menu.id,menu.path)" v-else>{{menu.name}}</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="caver" title="$store.state.userName">
                    <img src="../../assets/header.jpeg" :title="$store.state.userName">
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<<script>
import store from '../../utils/storeUtils'
import jquery from 'jquery'
import EventHandler from '../../utils/eventHandler';
import stringUtils from '../../utils/stringUtils';
export default {
  name:'mj-header',
  data(){
      return {
          menus:[],
          path:"",
          id:0
      }
  },
  methods:{
    menuenter: function(btn){
        var id = "#"+btn;
        if(this.path==btn){
            return;
        }
       this.path = btn;
    },
    menuleave: function(){
      this.path = localStorage.getItem('path');
    },
    menuclick: function(id,path){
        this.id = id;
        this.path = path;
        localStorage.setItem('path',path)
        localStorage.setItem('id',id)
        EventHandler.$emit( 'initMenus', id );
    }
  },
  created() {
      var _this = this;
      _this.getRequest("/api/listParent").then(response => {
          if(response.status==200){ 
              var data = response.data;
              if(data.Result){
                _this.menus = data.Message;
                if(stringUtils.isNotNull(localStorage.getItem('id')) && stringUtils.isNotNull(localStorage.getItem('path')) ){
                    _this.id = localStorage.getItem('id');
                    _this.path = localStorage.getItem('path');
                }else{
                    _this.id = data.Message[0].id;
                    _this.path = data.Message[0].path;
                }
                EventHandler.$emit('initMenus', _this.id );
              }else{
                _this.$message({message:data.Message,type:"error"})
              }
            }
      }).catch(e => {
          console.log(e)
      })
  }
}
</script>
<style scoped>
.mj-header .logo {
  height: 80px;
  float: left;
}
.caver img {
  border-radius: 50%;
  margin: 10px;
  height: 60px;
  float: right;
}
.mj-header .menus {
  margin-top: 10px;
}
.mj-header .menus .menu {
  float: left;
  margin-left: 30px;
  height: 60px;
  width: 60px;
}
.mj-header .menus .menu :hover {
  cursor: pointer;
}
.mj-header .menus .menu .menutitle {
  font-size: 20px;
  color: white !important;
  line-height: 25px;
  padding-left: 7px;
  margin-top: 5px;
  letter-spacing: 5px;
  display: none;
}
.mj-header .menus .menu .menutitleshow {
  font-size: 20px;
  color: white !important;
  line-height: 25px;
  padding-left: 7px;
  margin-top: 5px;
  letter-spacing: 5px;
}
</style>

