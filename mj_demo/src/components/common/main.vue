<template>
    <div class="main">
        <el-container class="container">
            <el-header class='header' style="height:80px">
                <mj_header></mj_header>
            </el-header>
            <el-container>
                <el-aside width="200px" class="aside">
                    <mj_left></mj_left>
                </el-aside>
                <el-main class="content">
                    <router-view />
                </el-main> 
            </el-container>
            <el-footer class="footer">
                <mj_footer></mj_footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import mj_header from '@/components/common/header';
import mj_left from '@/components/common/left';
import mj_footer from '@/components/common/footer';

export default {
  name: "mj_main",
  data() {
    return {}
  },
  components:{
      mj_header: mj_header,
      mj_left: mj_left,
      mj_footer: mj_footer
  }
};
</script>

<style scoped>
    .main{
        margin: 0px;
        padding: 0px;
        height: 100%;
    }
    .container{
        height: 100%;
    }
    .header{
        border-bottom: 1px solid black;   
        background-color: #3a9fb6;     
    }
    .aside{
        border-right: 1px solid black;
        background: #4B5770; 
    }
    
    .footer{
        border-top: 1px solid black;  
        line-height: 60px;
        background-color: #3a9fb6;     
    }
    .el-main{
        padding: 10px;
    }
</style>
