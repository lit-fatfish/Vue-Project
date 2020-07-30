<template>
  <div class="home">
    <div v-if="todos">
    <template>
      <h3 style="text-align: center">视频源状态</h3>
      <el-table :data="todos" style="width: 100%" border>
        <el-table-column prop="num" label="视频序号" width="180"></el-table-column>
        <el-table-column prop="rtsp_url" label="视频源地址"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 'fail'">
              <el-tag type="danger">失败</el-tag>
            </div>
            <div v-if="scope.row.status === 'normal'">
              <el-tag type="success">正常</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fail_num" label="失败次数"></el-table-column>
      </el-table>
    </template>
    </div>
    <div v-else>
      暂无状态
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { fetch } from "@/api/fetch";

export default {
  name: "ShowStatus",
  data() {
    return {
      todos: [
        {
          fail_num: "",
          num: 0,
          rtsp_url: "",
          status: ""
        },
      ],
      baseURL:"http://127.0.0.1:5000" ,
    };
  },
  mounted() {
    const self = this;
    self.init();
  },

  methods: {
    async init() {
      const self = this;
      let list = await fetch(
        self.baseURL + "/status",
        "post"
      );
      console.log("list", list);
      if(list)
        self.todos = list;
      else
        self.todos = false;
    },
  },
};
</script>