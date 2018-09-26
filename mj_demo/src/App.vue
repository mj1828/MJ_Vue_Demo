<template>
  <div id="app">
    <mj_main v-if="this.$store.state.userName" ></mj_main>
    <mj_login v-else ></mj_login>
  </div>
</template>

<script>
import mj_main from '@/components/common/main';
import mj_login from '@/components/login';
export default {
  name: 'app',
  data() {
    return {}
  },
  components:{
    mj_login: mj_login,
    mj_main: mj_main
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
