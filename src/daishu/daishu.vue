<template>
  <el-row>
    <el-col>
      <!-- <el-col :span="12">
        2个轮播图片
      </el-col> -->
      <el-row class="trending-collections-row">
        <el-col>
          <el-row class="trending-collections-title">
            <el-button @click="getInfo">Trending Collections</el-button>
          </el-row>
          <el-row class="trending-collections-content">
            <el-col v-for="tc in trendingCollections" class="trending-collections-content-item">
              <el-image style="height: 100%; width: 100%" :src="tc.coverUrl" :fit="cover"></el-image>
              <el-image style="width: 100%; height: 100%" :src="tc.logoUrl" :fit="cover"></el-image>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-row class="recently-title">Recently Listed</el-row>
          <el-row class="recently-content">
            <el-row class="recently-content-item">
              Genesis #45445
            </el-row>
            <el-row class="recently-content-item">
              Genesis #45445
            </el-row>
            <el-row class="recently-content-item">
              Genesis #45445
            </el-row>
          </el-row>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-row class="recently-title">Recently Sold</el-row>
          <el-row class="recently-content">
            <el-row class="recently-content-item">
              Genesis #45445
            </el-row>
            <el-row class="recently-content-item">
              Genesis #45445
            </el-row>
            <el-row class="recently-content-item">
              Genesis #45445
            </el-row>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="hidden-gems-row">
        <el-col>
          <el-row class="hidden-gems-title">Hidden Gems</el-row>
        </el-col>
      </el-row>
      <el-row class="daily-data-container">
        NEW Collections
      </el-row>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'daishu',
  data () {
    return {
      trendingCollections: []
    }
  },
  components: {
  },
  mounted(){
    // this.getInfo()
  },
  methods: {
    getInfo(){
      this.getTrendingCollections()
      this.getCoinPrice()
      this.getHiddenGems()
      this.getRecentlyListNftItems()
      this.getRecentlySoldNftItems()
      this.getNewCollections()
    },
    getTrendingCollections(){
      this.$http.request({
        method: 'POST',
        url: '/graphql',
        data: {
          variables: {},
          query: "{trendingCollections {\n    id\n    name\n    logoUrl\n    keyword\n    coverUrl\n    tag\n    __typename\n  }}"
        },
      }).then(res => {  //res是返回结果
        this.trendingCollections = res.data.trendingCollections
        console.log("this.trendingCollections")
        console.log(this.trendingCollections)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
    },
    getCoinPrice(){
      this.$http.request({
        method: 'POST',
        url: '/graphql',
        data: {
          variables: {},
          query: "{getCoinPrice {currency    price    __typename}}"
        },
      }).then(res => {  //res是返回结果
        console.log(res)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
    },
    getHiddenGems(){
      this.$http.request({
        method: 'POST',
        url: '/graphql',
        data: {
          variables: {},
          query: "{hiddenGems {\n    tokenId\n    name\n    image\n    animation\n    cdnImage\n    cdnAnimation\n    ownerAddress\n    collection {\n      name\n      id\n      address\n      keyword\n      __typename\n    }\n    price\n    takeAddr\n    __typename\n  }\n}"
        },
      }).then(res => {  //res是返回结果
        console.log(res)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
    },
    getRecentlyListNftItems (){
      this.$http.request({
        method: 'POST',
        url: '/graphql',
        data: {
          variables: {},
          query: "{\n  recentlyListNftItems {\n    tokenId\n    name\n    image\n    animation\n    cdnImage\n    cdnAnimation\n    collection {\n      id\n      name\n      keyword\n      __typename\n    }\n    price\n    eventAt\n    takeAddr\n    __typename\n  }\n}"
        },
      }).then(res => {  //res是返回结果
        console.log(res)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
    },
    getRecentlySoldNftItems(){
      this.$http.request({
        method: 'POST',
        url: '/graphql',
        data: {
          variables: {},
          query: "{recentlySoldNftItems {\n    tokenId\n    name\n    image\n    animation\n    cdnImage\n    cdnAnimation\n    collection {\n      id\n      name\n      keyword\n      __typename\n    }\n    price\n    eventAt\n    saleData\n    __typename\n  }\n}"
        },
      }).then(res => {  //res是返回结果
        console.log(res)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
    },
    getNewCollections(){
      this.$http.request({
        method: 'POST',
        url: '/graphql',
        data: {
          variables: {},
          query: "{newCollections {\n    id\n    logoUrl\n    name\n    description\n    chain\n    keyword\n    coverUrl\n    ownerCount\n    floorPrice\n    totalVolume\n    collectionImages {\n      imageUrl\n      __typename\n    }\n    __typename\n  }\n}"
        },
      }).then(res => {  //res是返回结果
        console.log(res)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
    },
  }
}
</script>
<style lang='scss'>
.trending-collections-row{
  .trending-collections-title{
    display: block;
    font-size: 36px;
    font-weight: 900;
    text-align: center;
    margin-bottom: 20px;
  }
  .trending-collections-content{
    max-height: 430px;
    overflow: hidden;
    padding-bottom: 70px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(407px, max-content));
    -webkit-box-pack: center;
    justify-content: center;
    column-gap: 29px;
    width: 100%;
    max-width: 1280px;
    .trending-collections-content-item{
      position: relative;
      width: 407px;
      height: 360px;
      border-radius: 20px;
      margin-bottom: 70px;
      color: rgb(34, 34, 34);
    }
  }
}
.recently-title{
  display: block;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}
.recently-content-item{
  max-width: 625px;
  padding: 15.5px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  background: rgb(255, 255, 255);
  color: rgb(34, 34, 34);
  width: 100%;
  margin-top:10px;
}
.hidden-gems-row{
  margin-top: 40px;
}
.hidden-gems-title{
  font-family: Inter;
  font-size: 32px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: -0.5px;
  margin-bottom: 60px;
  display: block;
  text-align: center;
}
</style>
