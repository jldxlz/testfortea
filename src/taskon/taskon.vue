<template>
  <el-row>
    <el-col>
      <el-row v-for="step in steps">
        {{ step }}
      </el-row>
      <el-col>
        <el-input v-model="Authorization" placeholder="TaskOn 登陆认证Token（header中的Authorization）"></el-input>
      </el-col>
      <br>
      <el-row>
        <el-col :span="16">
          <el-input v-model="testCampignId" placeholder="活动ID"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button @click="getTestCampaign" type="primary">测试该活动所有任务</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="6">
          <el-button @click="getCampaignList" type="primary">运行所有的活动及任务</el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="campaignCurrentPage" placeholder="当前的页码"></el-input>
          <el-input v-model="campaignCurrentPageSize" placeholder="每页的数量"></el-input>
        </el-col>
      </el-row>
      <br>
      <el-row>
        所有的活动数量：{{ campaignTotal }}<br>
        <!-- <el-button @click="clickTtUrl" type="primary">打开</el-button> -->
        <!-- <el-button @click="clickWindows" type="primary">调用go服务</el-button> -->
        <!-- <el-button @click="getTestCampaign" type="primary">测试getTestCampaign</el-button> -->
        <!-- <el-button @click="handleTestTwitterQuoteTweetAndTag" type="primary">测试发twitter</el-button> -->
      </el-row>
    </el-col>
    <br>
    <br>
    <el-col>
      <el-button @click="OncekinzaFinance" type="primary">KinzaFinance--绑定okx账号</el-button>
      <el-button @click="batchKinzaFinance" type="primary">KinzaFinance--批量绑定okx账号</el-button>
      <el-button @click="shibaHourlyBonus" type="primary">shibaHourlyBonus 申请shiba </el-button>
      <el-button @click="intervalShiBaHourBonus" type="primary">定时申请shibaHourlyBonus</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'daishu',
  data() {
    return {
      campaignList: [],
      campaignTotal: 313,
      campaignCurrentPage: 0,
      campaignCurrentPageSize: 20,
      steps: [
        "登录taskon",
        "查询已经参与的任务列表",
        "查询列表",
        "查询详情",
        "分解任务，一个个执行",
        "根据任务类型, 分配到对应的处理接口",
        "验证任务处理完成",
        "重新请求已经参与的任务列表"
      ],
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaWQiOiJkaWQ6ZXRobzo2NTlkMzNlZDEwNzUyOGVlNzgxZDRiYWI1OGEzM2ZkMzdiNTc2NGNiIiwiZXhwIjoxNzA5MDQzMTc4LCJvcGVyYXRlZEJ5IjoiMCIsInVzZXJJZCI6IjE4OTIyOTMifQ.98MikTr5tikSX3X35pJhI3_dNyfxvkT23FOYopDqGrc',
      justSubmitTask: false,
      testCampignId: 0
    }
  },
  components: {
  },
  mounted() {
    // this.getInfo()
  },
  methods: {
    clickTtUrl() {
      const windowFeatures = "left=100,top=100,width=320,height=320,popup=yes";
      window.open("https://twitter.com/intent/follow?screen_name=OneAnalog", '_blank', windowFeatures)
    },
    async batchKinzaFinance() {
      window.open("https://app.kinza.finance/#/referral?referralCode=N3HLJM", '_blank')
      let waitMs = 4000;
      console.log("等待 " + waitMs + "ms")
      await this.sleep(waitMs); // 等待8秒
      for (let i = 70; i < 100; i++) {
        await this.kinzaFinance()
      }
    },
    intervalShiBaHourBonus() {
      //定时申请shiba
      var intervalId;
      let that = this
      intervalId = setInterval(function () {
        that.shibaHourlyBonus()
        // clearInterval(intervalId);	//清除定时器
      }, 360000 * 60);
    },
    shibaHourlyBonus() {
      this.$goService.request({
        method: 'POST',
        url: '/istackAgent/mouseClick',
        data: {
          points: [
            { x: 31, y: 1082, t: 'p' },//点击2次telegram图标，打开对话框
            { x: 31, y: 1082, t: 'p' },//点击2次telegram图标，打开对话框
            { x: 3000, y: 200, t: 's' },//等待3s
            { x: 2426, y: 1341, t: 'p' },//点击honuly bonus
          ]
        }
      }).then(res => {  //res是返回结果
        console.log(res)
        console.log("切换okx账号")
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
    },
    async OncekinzaFinance() {
      window.open("https://app.kinza.finance/#/referral?referralCode=N3HLJM", '_blank')
      let waitMs = 4000;
      console.log("等待 " + waitMs + "ms")
      await this.sleep(waitMs); // 等待8秒
      await this.kinzaFinance()
    },
    async kinzaFinance() {
      await this.$goService.request({
        method: 'POST',
        url: '/istackAgent/mouseClick',
        data: {
          points: [
            // { x: 1902, y: 203, t: 's' },//connect wallet 按钮
            // { x: 2000, y: 200, t: 's' },//等待3s
            { x: 1077, y: 647, t: 's' },//打开钱包选择框，连接okx钱包
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 1694, y: 77, t: 'p' },//打开okx账号
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 1454, y: 130, t: 'p' },//点击账户，打开下来框
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 1454, y: 130, t: 'p' },//点击账户，打开下来框
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 1454, y: 130, t: 'p' },//点击账户，打开下来框， 多次点击保证打开
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 1554, y: 305, t: 'p' },//点击要切换的账号
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 2201, y: 382, t: 'p' },//切换回平台，弹出连接
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 1694, y: 77, t: 'p' },//打开okx账号
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 1652, y: 382, t: 'p' },//点击连接
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 1574, y: 962, t: 'p' },//bind referrer 按钮
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 1273, y: 577, t: 'p' },//confirm按钮
            { x: 4000, y: 200, t: 's' },//等待3s
            { x: 2455, y: 634, t: 'p' },//okx 确认
            { x: 6000, y: 200, t: 's' },//等待3s
            { x: 1260, y: 523, t: 'p' },//ok close 按钮
            // { x: 1902, y: 203, t: 's' },//connect wallet 按钮
            // { x: 2000, y: 200, t: 's' },//等待3s
            // { x: 1077, y: 647, t: 's' },//打开钱包选择框，连接okx钱包
          ]
        }
      }).then(res => {  //res是返回结果
        console.log(res)
        console.log("切换okx账号")
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
    },
    async clickWindows() {
      this.clickTtUrl()
      await this.sleep(5000); // 等待5秒
      await this.$goService.request({
        method: 'POST',
        url: '/istackAgent/mouseClick',
        data: {
          points: [
            { x: 281, y: 370, t: 'p' },//点击关注
            { x: 2000, y: 200, t: 's' },//等待3s
            { x: 403, y: 119, t: 'p' },//点击关闭窗口
          ]
        }
      }).then(res => {  //res是返回结果
        console.log(res)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
    },
    getInfo() {
      // this.getCampaignList()
    },
    async handleTwitterFollow(task) {
      let left = 500
      let top = 500
      let params = JSON.parse(task.params)
      const windowFeatures = "left=" + left + ", top = " + top + ", width = 320, height = 320, popup = yes";
      window.open("https://twitter.com/intent/follow?screen_name=" + params.user_to_follow, '_blank', windowFeatures)
      let waitMs = 8000;
      console.log("等待 " + waitMs + "ms")
      await this.sleep(waitMs); // 等待8秒
      await this.$goService.request({
        method: 'POST',
        url: '/istackAgent/mouseClick',
        data: {
          points: [
            { x: left + 181, y: top + 270, t: 'p' },//点击关注
            { x: 4000, y: 200, t: 's' },//等待4s
            { x: left + 303, y: top + 20, t: 'p' },//点击关闭窗口
          ]
        }
      }).then(res => {  //res是返回结果
        console.log("handleTwitterFollow[完成]")
        this.submitTask(task)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log(err);
        console.log("handleTwitterFollow[报错]")
      })
    },
    submitTask(task) {
      let data = { "task_ids": [task.id], "value": "", "pre_submit": false }
      let headers = {
        "Authorization": this.Authorization
      }
      this.$http.request({
        method: 'POST',
        url: '/submitTask',
        data: data,
        headers: headers
      }).then(res => {  //res是返回结果
        console.log(res)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
    },
    async handleTwitterRetweet(task) {
      let left = 500
      let top = 500
      let params = JSON.parse(task.params)
      const windowFeatures = "left=" + left + ", top = " + top + ", width = 320, height = 320, popup = yes";
      window.open("https://twitter.com/intent/retweet?tweet_id=" + params.tweet_id, '_blank', windowFeatures)
      let waitMs = 8000;
      console.log("等待 " + waitMs + "ms")
      await this.sleep(waitMs); // 等待8秒
      await this.$goService.request({
        method: 'POST',
        url: '/istackAgent/mouseClick',
        data: {
          points: [
            { x: left + 181, y: top + 270, t: 'p' },//点击关注
            { x: 2000, y: 200, t: 's' },//等待4s
            { x: left + 303, y: top + 20, t: 'p' },//点击关闭窗口
          ]
        }
      }).then(res => {  //res是返回结果
        console.log("handleTwitterRetweet[完成]")
        this.submitTask(task)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log(err);
        console.log("handleTwitterRetweet[报错]")
      })
    },
    async handleTwitterLike(task) {
      let left = 500
      let top = 500
      let params = JSON.parse(task.params)
      const windowFeatures = "left=" + left + ", top = " + top + ", width = 320, height = 320, popup = yes";
      window.open("https://twitter.com/intent/like?tweet_id=" + params.tweet_id, '_blank', windowFeatures)
      let waitMs = 8000;
      console.log("等待 " + waitMs + "ms")
      await this.sleep(waitMs); // 等待8秒

      await this.$goService.request({
        method: 'POST',
        url: '/istackAgent/mouseClick',
        data: {
          points: [
            { x: left + 181, y: top + 270, t: 'p' },//点击关注
            { x: 2000, y: 200, t: 's' },//等待4s
            { x: left + 303, y: top + 20, t: 'p' },//点击关闭窗口
          ]
        }
      }).then(res => {  //res是返回结果
        console.log("handleTwitterLike[完成]")
        this.submitTask(task)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log(err);
        console.log("handleTwitterRetweet[报错]")
      })
    },
    handleTestTwitterQuoteTweetAndTag() {
      let left = 500
      let top = 500
      const windowFeatures = "left=" + left + ", top = " + top + ", width = 900, height = 340, popup = yes";
      window.open("https://twitter.com/intent/tweet?url=https://twitter.com/linity_com/status/1750533546563752186 @xiandou0001 @xiandou006 @xiandou0003 &text=@", '_blank', windowFeatures)
    },
    async handleTwitterQuoteTweetAndTag(task) {
      let left = 500
      let top = 500
      let params = JSON.parse(task.params)
      const windowFeatures = "left=" + left + ", top = " + top + ", width = 900, height = 340, popup = yes";
      window.open("https://twitter.com/intent/tweet?url=https://twitter.com/linity_com/status/" + params.tweet_id + " @xiandou001 @xiandou006 @xiandou003 &text=@", '_blank', windowFeatures)
      let waitMs = 8000;
      console.log("等待 " + waitMs + "ms")
      await this.sleep(waitMs); // 等待8秒

      await this.$goService.request({
        method: 'POST',
        url: '/istackAgent/mouseClick',
        data: {
          points: [
            { x: 1204, y: 838, t: 'p' },//点击关注
            { x: 2000, y: 200, t: 's' },//等待4s
            { x: 1389, y: 519, t: 'p' },//点击关闭窗口
          ]
        }
      }).then(res => {  //res是返回结果
        console.log("handleTwitterLike[完成]")
        this.submitTask(task)
      }).catch(err => { //请求失败就会捕获报错信息
        console.log(err);
        console.log("handleTwitterRetweet[报错]")
      })
    },
    async handlerTwitter(task) {
      switch (task.template_id) {
        case "FollowTwitter":
          await this.handleTwitterFollow(task)
          break;
        case "RetweetTwitter":
          await this.handleTwitterRetweet(task)
          break;
        case "LikeATweet":
          await this.handleTwitterLike(task)
          break;
        case "QuoteTweetAndTag":
          await this.handleTwitterQuoteTweetAndTag(task)
          break;
        default:
          console.log("handleTwitter", task);
          break;
      }
      await this.sleep(300000) //控制节奏 每个任务停止5分钟 5* 60 * 1000
    },
    handleTelgram(info) {

    },
    handlerVerify(info) {

    },
    handlerDiscord(info) {

    },
    handlerYoutube(info) {

    },
    handlerVisitWebsite(info) {
      this.submitTask(info)
    },
    handleCheckComplete() {

    },
    handleQA() {

    },
    APIVerifiedTask() {

    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async handleCampaignList() {
      for (let campaign of this.campaignList) {
        await this.getCampaignInfo(campaign.id)
        // await this.sleep(10000); // 等待2秒
      }
    },
    async handleTask(info) {
      try {
        switch (info.platform) {
          case "Twitter":
            if (!this.justSubmitTask) {
              await this.handlerTwitter(info)
            } else {
              this.submitTask(info)
            }
            break;
          case "Discord":
            this.handlerDiscord(info)
            break;
          case "Youtube":
            this.handlerYoutube(info)
            break;
          case "Telegram":
            this.handleTelgram(info)
            break;
          case "VisitWebsite":
            this.handlerVisitWebsite(info)
            break;
          case "Youtube":
            this.handlerYoutube(info)
            break;
          case "QA":
            this.handleQA(info)
            break;
          case "Wallet Balance":
            this.handleQA(info)
            break;
          case "APIVerifiedTask":
            this.handleQA(info)
            break;
          default:
            console.log("handleTask 未定义的platform ", info);
            // statements_def
            break;
        }
      } catch (error) {
        console.log("handleTask error")
        console.log(error)
      }
    },
    async handleCampaign(info) {
      try {
        for (let task of info.result.tasks) {
          await this.handleTask(task)
        }
      } catch (error) {
        console.log("handleCampaign error")
        console.log(error)
      }
    },
    getTestCampaign() {
      // this.getCampaignList()
      this.getCampaignInfo(this.testCampignId)
    },
    async getCampaignInfo(id) {
      let campaign = {}
      await this.$http.request({
        method: 'POST',
        url: '/getCampaignInfo',
        data: { "campaign_id": parseInt(id) }
      }).then(res => {  //res是返回结果
        // console.log(res)
        campaign = res
      }).catch(err => { //请求失败就会捕获报错信息
        console.log('服务器连接失败');
        console.log(err);
      })
      await this.handleCampaign(campaign);
    },
    async getCampaignList() {
      while (true) {
        await this.$http.request({
          method: 'POST',
          url: '/getCampaignList',
          data: { "page": { "page_no": parseInt(this.campaignCurrentPage), "size": parseInt(this.campaignCurrentPageSize) }, "options": { "name_like": "", "campaign_status": "OnGoing", "user_campaign_status": "All", "reward_type": ["All"], "verify_status": "Verified", "network": [], "project_category": ["All"], "campaign_type": "Campaign", "order_by": "Comprehensive", "include_private": false, "end_day": 0, "contain_task_type": ["AllOffChainOpt", "AllOnChainOpt"], "deposit_type": "All", "is_global_search": false } }
        }).then(res => {  //res是返回结果
          this.campaignList = res.result.data
          this.campaignTotal = res.result.total
        }).catch(err => { //请求失败就会捕获报错信息
          console.log('服务器连接失败');
          console.log(err);
        })
        if (this.campaignList.length == 0) {
          console.log("结束了，没有返回新的数据")
          return
        }
        await this.handleCampaignList()
        this.campaignCurrentPage = this.campaignCurrentPage + 1
      }
    },
    moniMouseClick() {
    }
  }
}
</script>
<style lang='scss'>
.trending-collections-row {
  .trending-collections-title {
    display: block;
    font-size: 36px;
    font-weight: 900;
    text-align: center;
    margin-bottom: 20px;
  }

  .trending-collections-content {
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

    .trending-collections-content-item {
      position: relative;
      width: 407px;
      height: 360px;
      border-radius: 20px;
      margin-bottom: 70px;
      color: rgb(34, 34, 34);
    }
  }
}

.recently-title {
  display: block;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}

.recently-content-item {
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
  margin-top: 10px;
}

.hidden-gems-row {
  margin-top: 40px;
}

.hidden-gems-title {
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
