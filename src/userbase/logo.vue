
<template>
  <div id="logo">
    <el-row :gutter="20">
      <el-col :span="12" :offset="4">
        <div class="logo-div"><a href="/"><img class="logo-img" src="../assets/logo.png" /></a></div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang='scss'>
  .logo-div{
    margin-top: 20%;
    margin-bottom: 20px;
  }
  .logo-img{
    width:200px;
  }
</style>
