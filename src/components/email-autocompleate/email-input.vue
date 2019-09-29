<template>
  <div class="email-input-box" :class="className">
    <input class="email-input" type="email" :placeholder="placeHolder" @input="checkInput" v-model="email">
    <ul class="email-lists" v-show="_showlists">
      <li v-for="(key,i) in _suffixs" @click="selectEmail(key)">{{key}}</li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    props:{
      className:{
        type: String,
        default: ''
      },
      placeHolder:{
        type: String,
        default: '请输入正确邮箱'
      },
      suffixs:{
        type:Array,
        default:() => ['@qq.com', '@126.com', '@163.com', '@aliyu.com', '@yahoo.com', '@gmail.com']
      }
    }
  })
  export default class PictureShow extends Vue {
    email = '';
    selected = false;
    get _showlists(){
      return this.email.length > 0 && !this.selected 
    }
    get _suffixs(){
      let i =  this.email.indexOf('@');
      if(this.email.indexOf('@') > -1){
        return this.suffixs.map(item => `${this.email.substr(0, i)}${item}`)
      }
      return this.suffixs.map(item => `${this.email}${item}`)
    }
    checkInput(e){
      this.selected = false;
    }
    selectEmail(v){
      this.email = v;
      this.selected = true
    }
    
    mounted(){
      
    }
  }
</script>
<style lang='less' scoped>
  @b_w: 200px;
  .email-input-box{
    position: relative;
    box-sizing: border-box;
  }
  .email-input{
    height: 36px;
    width: @b_w;
    padding: 0 10px;
    outline: none;
    box-sizing: border-box;
  }
  .email-lists{
    position: absolute;
    left: 0;
    padding:0;
    margin: 0;
    margin-top: 5px;
    box-sizing: border-box;
    border: 1px solid #f5f5f5;
    background: #e7e7e7;
    width: @b_w;
    border-radius: 5px;
    li{
      list-style: none;
      padding:0 8px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      border-bottom: 1px solid #f5f5f5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:last-child{
        border-bottom: none;
      }
    }
  }
</style>
