<template>
  <el-row>
    nonce: {{nonce}} 
  </el-row>
  <el-row>
    c: {{c}} 
  </el-row>

</template>

<script>
import localScript from './main.js';
export default {
  name: 'test',
  data () {
    return {
      nonce: "hello world",
      seqWitness: "",
      prevEventId: "000005aa98a972dbda3593bc7fd1cbbe634c66eafbaf2071222553a748dd735c",
      config: {
        "minterPubkey": "d9ab534a35c3223376940938ecae6288b5c3793b2b1aaeb21d1c51f432ca4921",
        "deployerPubkey": "9be107b0d7218c67b4954ee3e6bd9e4dba06ef937a93f684e42f730a0c3d053c",
        "deployEventId": "51ed7939a984edee863bfbb2e66fdc80436b000a8ddca442d83e6a2bf1636a95",
        "difficulty": 21,
        "amount": 10,
        "tick": "noss"
      },
      c: "",
      i: ["166944322","0xd6766fd2c862ea3f3fc7b09c3cc61ebcc6708b7479866337bd4c43b6297b2de7c"],
      RELAY_URL: "wss://relay.noscription.org/"
    }
  },
  components: {
  },
  mounted() {
    console.log("123123")
    this.initNonce()
  },
  methods: {
    initNonce() {
      let t = Date.now()
      let n = Math.random().toString(36).substring(2, 15)
      // this.nonce = n
      let i = this.i
      let o = this.prevEventId
      let c = this.mineWithNonce(n, i, o);
      this.c = c
    },
    mineWithNonce(e, t, n) {
      let r = Math.floor(new Date().getTime() / 1e3);
      this.nonce = e, 
      this.seqWitness = t, 
      this.prevEventId = n;
      let o = this.computeEventId(r);
      return o;
      // if (u.GB.getPow(o) >= this.config.difficulty) 
      //   return { timestamp: r, nonce: e, eventId: o}
    },
    getTags() {
        return [
            ["p", this.config.deployerPubkey],
            ["e", this.config.deployEventId, this.RELAY_URL, "root"],
            ["e", this.prevEventId, this.RELAY_URL, "reply"],
            ["seq_witness", ...this.seqWitness],
            ["nonce", this.nonce, this.config.difficulty.toString()]
        ]
    },
    computeEventId(e) {
      let t = {
          kind: 1,
          created_at: e,
          tags: this.getTags(),
          content: '{"p":"nrc-20","op":"mint","tick":"'.concat(this.config.tick, '","amt":"').concat(this.config.amount, '"}'),
          pubkey: this.config.minterPubkey
      };
      return (0, u.s_)(t)
    },
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
