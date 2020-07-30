<template>
  <div class="home">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="23">
        <div class="grid-content">
          <div style="margin-bottom: 10px;">
            <el-tag type="success" style="margin-right: 10px;">完成数量：{{queue_num.finish_queue}}</el-tag>
            <el-tag type="warning" style="margin-right: 10px;">等待数量：{{queue_num.wait_queue}}</el-tag>
            <el-tag type="danger" style="margin-right: 10px;">失败数量：{{queue_num.fail_queue}}</el-tag>
            <el-button style="float:right" @click="getQueueNum" size="small" type="primary" class="el-icon-refresh-left">实时数量</el-button>
          </div>

          <div v-if="todos">
            <template>
              <el-table ref="multipleTable" :data="todos" style="width: 100%" border>
                <!-- <el-table-column type="index" label="序号" width="55"></el-table-column> -->
                <el-table-column prop="time_start" label="开始时间" width="180"></el-table-column>
                <el-table-column prop="filename" label="相对路径"></el-table-column>
                <el-table-column prop="url" label="上传地址" width="265"></el-table-column>
                <el-table-column prop="data_id" label="文件名"></el-table-column>
                <el-table-column prop="cameracode" label="网点ID"></el-table-column>
                <el-table-column prop="resultAddress" label="回调地址"></el-table-column>
                <el-table-column prop="fail_num" label="失败次数" width="80"></el-table-column>
              </el-table>
            </template>
            <div style="text-align: center; margin-top: 30px;">
              <el-pagination
                background
                hide-on-single-page
                @current-change="handleCurrentChange"
                :page-size="page_size"
                :current-page.sync="current_page"
                :total="total"
                layout="prev, pager, next, jumper"
              ></el-pagination>
            </div>
          </div>
          <div v-else>暂无数据</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { fetch } from "@/api/fetch";

export default {
  name: "FinishQueue",
  data() {
    return {
      todos: [
        {
          data_id: "",
          fail_num: 0,
          filename: "",
          resultAddress: "",
          cameracode:"",
          time_start: "",
          url: "",
        },
      ],
      queue_num: [
        {
          finish_queue: 0,
          wait_queue: 0,
          fail_queue: 0,
        },
      ],
      total: 1,
      current_page: 1,
      page_size: 10,
      baseURL:"http://127.0.0.1:5000"
    };
  },
  created: function () {
    setInterval(this.getQueueNum, 60000);
  },
  mounted() {
    const self = this;
    self.init();
  },

  methods: {
    async init() {
      const self = this;
      // 获取队列
      let list = await fetch(self.baseURL + "/finish_list", "post", {
        "current_page": self.current_page,
        "page_size": self.page_size,
      });
      console.log("list", list);

      //获取队列的数量
      self.todos = list;
      let queue_num = await fetch(
        self.baseURL + "/queue_num",
        "post"
      );
      self.queue_num = queue_num;
      self.total = queue_num["finish_queue"];
    },
    async handleCurrentChange(val) {
      //页面发生改变时，发送请求
      const self = this;
      self.current_page = val;
      let list = await fetch(self.baseURL + "/finish_list", "post", {
        "current_page": self.current_page,
        "page_size": self.page_size,
      });
      self.todos = list;

      console.log(`当前页: ${val}`);
    },
    async getQueueNum() {
      const self = this
      let queue_num = await fetch(
        self.baseURL + "/queue_num",
        "post"
      );
      self.queue_num = queue_num;
      self.total = queue_num["finish_queue"];

      // 数量需要刷新，队列也是需要实时刷新的，
      let list = await fetch(self.baseURL + "/finish_list", "post", {
        "current_page": self.current_page,
        "page_size": self.page_size,
      });
      self.todos = list;
    },
  },
};
</script>