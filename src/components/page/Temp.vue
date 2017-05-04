<template>
  <el-button type="primary" class="laowu" size="large" @click="to_pay">上海蓉申建筑劳务有限公司</el-button>
</template>

<script>
export default {
  methods: {
    to_pay() {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user.role == 'finance') {
        this.$router.push("/pay")
      } else {
        this.$router.push("/encashs")
      }
    }
  }
}
</script>
<style scoped>
.laowu {
  margin: auto;
  width: 50%;
  height: 80px;
  position: absolute;
  top: 30%;
  left: 24%;
  font-size: 20px;
}
</style>
