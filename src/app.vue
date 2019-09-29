<template>
  <div>
    <email-input :suffixs="emails"></email-input>
  </div>
</template>


<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
 
  @Component({
    components:{
    }
  })
  export default class HomePage extends Vue {
    emails = ['@qq.com' ,'@126.com','@163.com']
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
  img{
    width: 200px;
  }
</style>