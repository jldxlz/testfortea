<template>
  <el-row>
    <el-col :span="12">
      一张大图片
    </el-col>
  </el-row>
  <el-row class="daily-data-container">
    3个图片列表
  </el-row>
  
</template>

<script>

export default {
  name: 'daishu',
  data () {
    return {
    pageNum: 1,
    pageTotal: 10,
    pageSize: 10,
    searchText: ""
    }
  },
  components: {
  },
  activated() {
  },
  methods: {
  }
}
</script>
<style lang='scss'>
.daily-data-container{
  // height: 100px;
  margin-top:30px;
}
.daily-data-header{
  height: 20px;
  color:rgb(128 128 128);
}
.daily-data-footer{
  height: 20px;
  color:rgb(128 128 128);
}
.daily-data-body{
  height: 60px;
  font-size: 36px;
}
.daily-data-col{
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);
  padding: 1.25rem;
  background-color: rgb(43, 36, 36);
  border-radius: 1rem;
}

.latest-transactions-container{
  margin-top: 30px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);
  padding: 1.25rem;
  background-color: rgb(43, 36, 36);
  border-radius: 1rem;
}
.latest-transactions-title{
  font-size: 20px;
  border-bottom: 0.1px solid rgb(61, 56, 57);
  padding-bottom: 20px;
}
.transaction-list-row .transaction-href{
  color: red;
}
.transaction-list-row{
  padding: 15px 5px;
}
.transaction-block-number{
  color: rgb(194 190 190);
  font-size: 14px;
}
.transaction-time{
  font-size: 10px;
  margin-left: 3px;
}
.transaction-rune {
  padding: 10px 10px;
  border: 0.1px solid rgb(106 162 83);
  border-radius: 0.3rem;
}
.transaction-limit{
  color:white;
}
.transaction-rune-end {
  margin-left: 5px;
  font-size: 10px;
}
.transaction-rune-container{
  text-align: right;
  margin-top: 5px;
}
.el-pagination {
  li, button {
    background-color: rgb(43, 36, 36) !important;  
    color: white;
  }
  .is-active{
    background-color: rgb(27, 19, 19) !important;  
    border: 0.8px solid rgb(241, 75, 75);
    border-radius: 0.3rem;
  }
}
.el-input__wrapper{
  background-color: rgb(27, 19, 19) !important;  
  padding: 6px 10px;
  .el-input__inner{
    color: white !important;  
  }
}
.search-text-row{
  margin-bottom: 10px;
}
</style>
