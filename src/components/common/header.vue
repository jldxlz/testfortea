
<template>
  <el-row class="homeHref">
    <el-col :span="22" :offset="1">
      <!-- <a href="/"><img class="gezilogo" src="../../assets/logotitle_beijing.png" /><span class="font-logo"></span></a> -->
      <el-row>
        <el-col :span="8" :offset="2">
          <el-row>
            <el-col :span="5">
              <a href="/">HOME</a>
            </el-col>
            <el-col :span="5">
              <a href="/explore">Explore</a>
            </el-col>
            <el-col :span="5">
              <a href="/play">Play</a>
            </el-col>
            <el-col :span="5">
              <a href="/event">Event</a>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          查询
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>

import { mapMutations } from 'vuex';
import { checkLogin } from "../../jsutils/login.js"
export default {
  name: 'appHeader',
  data() {
    return {
      login: false,
      projectId: '76309913cb43460300fb21efb94a0c62',
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.login = false
    },
  },
  mounted() {
  },
  activated() {

    // this.login = checkLogin();
  }

}
</script>

<style scoped lang='scss'>
.gezilogo {
  width: 164px;
}

.el-menu--horizontal>.el-menu-item {
  font-size: 17px;
  color: #3a3a3a;
}

.el-menu--horizontal>.el-menu-item:hover {
  color: #3eb1ea;
}


.homeHref {
  height: 70px;
  line-height: 24px;
  color: rgb(149, 149, 149);
  font-size: 14px;
  font-family: __Orbitron_888b92, __Orbitron_Fallback_888b92;
  background-color: rgba(255, 255, 255, 0.5);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0em;
  padding: 20px 10px;
  margin-bottom: 40px;
}
</style>
