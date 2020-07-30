<template>
  <div id="app">
    <el-container class="container">
      <el-header>
        <m-header></m-header>
      </el-header>
      <el-container class="content">
        <el-aside style="width:240px;">
          <tab></tab>
        </el-aside>
        <el-container>
          <el-main>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
          <el-footer>
            <footer></footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/index'
import Tab from '@/components/tab/index'
import Footer from '@/components/footer/index'

export default {
  components: {
    MHeader,
    Tab,
    Footer
  }
}
</script>

<style lang="scss" scope>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .el-header {
    padding: 0;
  }

  .container {
    display: flex;
    height: 100%;
  }
}
</style>
