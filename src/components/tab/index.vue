<template>
  <div class="tab">
    <el-aside width="100%" style="background-color: rgb(238, 241, 246);height:100%;">
      <el-menu 
        :default-openeds="['1']" 
        :unique-opened="true"
        @select="handleSelect"
        default-active="1-1">


        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>切片管理</template>
          <el-menu-item-group>
          <el-submenu index="1-1">
            <template slot="title">队列状态</template>
            <el-menu-item index="1-1-1">完成列表</el-menu-item>
            <el-menu-item index="1-1-2">等待列表</el-menu-item>
            <el-menu-item index="1-1-3">失败列表</el-menu-item>

          </el-submenu>
          
            <el-menu-item index="1-2">显示状态</el-menu-item>
            <el-menu-item index="1-3">配置文件</el-menu-item>

          </el-menu-item-group>
          
        </el-submenu>
        


        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>摄像头管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">摄像头管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      "default-active": "1-1"
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      const self = this
      console.log(key, keyPath)
      let routerName = ""
      let params = {}
      switch (key) {
        case "1-1-1":
          routerName = "FinishQueue"
          break
        case "1-1-2":
          routerName = "WaitQueue"
          break
        case "1-1-3":
          routerName = "FailQueue"
          break
        case "1-2":
          routerName = "ShowStatus"
          break
        case "1-3":
          routerName = "ConfigFile"
          break
        case "1-1":
          routerName = "SliceControll"
          break
        case "2-1":
          routerName = "CameraList"
          break
      }

      console.log("routerName: ", routerName)
      self.$router.push({
        name: routerName,
        query: params
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  height: 100%;
  width: 240px;
}
</style>