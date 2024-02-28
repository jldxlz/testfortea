<template>
  <div class="home-body">
    <app-header></app-header>
      <el-row>
        <el-col :span="20" :offset="2">
          <router-view v-slot="{component}"/>
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </el-col>
      </el-row>
      <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from './components/common/header'
import appFooter from './components/common/footer'
import {  ref } from 'vue';
export default {
  name: 'App',
  data() {
    return {
      // collapsed: ref(false),
      // selectedKeys: ref(['1']),
    }
  },
  components: {
    'app-header': appHeader,
    'app-footer': appFooter
  }
}
</script>

<style lang='scss'>
@import './styles/reset.scss';
.home-body{
  background-color: rgb(242, 242, 242);
  min-height: 100vh;
  color: rgb(34, 34, 34);
}
</style>
