
<template>
  <div id="register" align="center">
    <app-logo></app-logo>
    <el-row :gutter="20">
      <el-col :span="12" :offset="3">
        <div class="grid-content bg-purple">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="手机号" prop="account">
              <el-input type="text" v-model="ruleForm2.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passRe">
              <el-input type="password" v-model="ruleForm2.passRe" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
              <el-button type="success" @click="register">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="注册成功" :visible.sync="dialogTableVisible" width="30%" :before-close="handleClose" :show-close="false">
      <span slot="title">
        <app-logo></app-logo>
      </span>
      <el-row>
        <a href="/userinfo/editUserInfo">
          <el-button type="primary" icon="el-icon-user">
            完善资料
          </el-button>
        </a>
        <a href="/activity/add">
          <el-button type="primary" icon="el-icon-plus">
            创建{{this.$constant.constant_activity}}
          </el-button>
        </a>
        <a href="/activity/list">
          <el-button type="primary" icon="el-icon-search">
            查看{{this.$constant.constant_activity}}
          </el-button>
        </a>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';
import logo from './logo'
import {checkTelephone} from '../../jsutils/login'

export default {
  name: 'register',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '' || value.length < 6) {
        callback(new Error('请输入6位以上的密码'))
      } else {
        /*if (this.ruleForm2.pass !== '') {
          this.$refs.ruleForm2.validateField('pass')
        }*/
        callback()
      }
    }
    var validateAccount = (rule, value, callback) => {
      if (value === '' || !checkTelephone(value)) {
        callback(new Error('请输入有效的手机号'))
      } else {
        /* if (this.ruleForm2.account !== '') {
           this.$refs.ruleForm2.validateField('account')
         }*/
        callback()
      }
    }
    var validatePassRe = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else {
        if (this.ruleForm2.passRe !== this.ruleForm2.pass) {
          callback(new Error('请确认密码'))
        }
        callback()
      }
    }
    return {
      userToken:"",
      ruleForm2: {
        pass: '',
        account: '',
        passRe: ''
      },
      rules2: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        passRe: [
          {validator: validatePassRe, trigger: 'blur'}
        ],
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ]
      },
      dialogTableVisible: false
    }
  },
  components: {
    'app-logo': logo
  },
  methods: {
    ...mapMutations(['changeLogin']),
    submitForm (formName) {
      let _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/user/register',
            params: {
              'telephone': this.ruleForm2.account,
              'password': this.ruleForm2.pass
            }
          }).then(res => {  //res是返回结果
            if (res.code !== '000000') {
              alert(res.msg)
              return;
            }
            _this.userToken = res.data.token;
            _this.changeLogin({ token: this.userToken, userId: res.data.userId});
            // this.$message({
            //   message: '注册成功, 10s后将跳转到首页',
            //   type: 'success'
            // });
            window.location.href='/'
            //window.setTimeout(function() {window.location.href='/'},10000)
            //this.dialogTableVisible = true
          }).catch(err => { //请求失败就会捕获报错信息
            console.log('服务器连接失败');
            console.log(err);
          })
        } else {
          return false
        }
      })
    },
    handleClose() {
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    register () {
      this.$router.push('/login')
    }
  },
  mounted () {
    this.$emit("header", false);
  },
  activated: function () {
    this.$emit("header", false);
  },
  deactivated: function () {
      this.$emit("header", true);
  }
}
</script>
