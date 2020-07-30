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
              <el-table
                ref="multipleTable" 
                :data="todos"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
              >
                <el-table-column prop="time_start" label="开始时间"></el-table-column>
                <el-table-column prop="filename" label="相对路径"></el-table-column>
                <el-table-column prop="url" label="上传地址" width="265"></el-table-column>
                <el-table-column prop="data_id" label="文件名"></el-table-column>
                <el-table-column prop="cameracode" label="网点ID"></el-table-column>
                <el-table-column prop="resultAddress" label="回调地址"></el-table-column>
                <el-table-column prop="fail_num" label="失败次数" width="100"></el-table-column>
                <el-table-column prop="error_code" label="错误码" width="75"></el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="medium"
                      type="warning"
                      @click="handleEdit(scope.$index, scope.row),  dialogFormVisible = true"
                      class="el-icon-edit"
                      circle
                    >编辑</el-button>
                    <el-button
                      size="medium"
                      class="el-icon-upload"
                      type="success"
                      circle
                      @click="upload(scope.row['data_id'])"
                    >上传</el-button>
                    
                  </template>
                </el-table-column>
                <el-table-column type="selection" label="全选" width="55"></el-table-column>
              </el-table>
            </template>
            <el-button
              type="primary"
              class="el-icon-upload"
              @click="upload_all"
              style="float: right; margin-top: 1em;"
            >一键上传</el-button>
            <el-dialog
              title="参数修改"
              :visible.sync="dialogFormVisible"
              :before-close="handleClose"
            >
              <el-form :model="form">
                <el-form-item label="上传地址" :label-width="formLabelWidth">
                  <el-input v-model="form.form_url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="网点ID" :label-width="formLabelWidth">
                  <el-input v-model="form.form_cameracode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="回调地址" :label-width="formLabelWidth">
                  <el-input v-model="form.form_resultAddress" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit ">保 存</el-button>
              </div>
            </el-dialog>
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
  name: "FailQueue",
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
          error_code: 0,
        },
      ],
      check_list: [],
      queue_num: [
        {
          finish_queue: 0,
          wait_queue: 0,
          fail_queue: 0,
        },
      ],
      dialogFormVisible: false,
      form: {
        form_index: 0,
        form_cameracode: "",
        form_url: "",
        form_resultAddress: "",
      },
      formLabelWidth: "120px",
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
      let list = await fetch(self.baseURL + "/fail_list", "post", {
        "current_page": self.current_page,
        "page_size": self.page_size,
      });
      console.log("list", list);

      //获取队列的数量
      self.todos = list;
      let queue_num = await fetch(
        "http://127.0.0.1:5000" + "/queue_num",
        "post"
      );
      self.queue_num = queue_num;
      self.total = queue_num["fail_queue"];
      // console.log("url--info",window.location.href);
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
    async handleCurrentChange(val) {
      //页面发生改变时，发送请求
      const self = this;
      self.current_page = val;
      let list = await fetch(self.baseURL + "/fail_list", "post", {
        "current_page": self.current_page,
        "page_size": self.page_size,
      });
      self.todos = list;

      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
      const self = this;
      self.form.form_index = index;
      self.form.form_cameracode = row["cameracode"];
      self.form.form_url = row["url"];
      self.form.form_resultAddress = row["resultAddress"];
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async formSubmit () {
      // 表单提交，上传数据到服务器
      const self = this;
      // 修改todos中的数据
      self.todos[self.form.form_index]["url"] = self.form.form_url
      self.todos[self.form.form_index]["cameracode"] = self.form.form_cameracode
      self.todos[self.form.form_index]["resultAddress"] = self.form.form_resultAddress
      
      // 上传数据到服务器
      let result = await fetch(
        self.baseURL + "/update_fail_data",
        "post",
        self.todos[self.form.form_index]
      );
      console.log(result)
      self.dialogFormVisible = false;
    },
    
    handleSelectionChange: function (val) {
      const self = this;
      self.check_list = [];
      for (var i = 0; i < val.length; i++) {
        self.check_list[i] = val[i]["data_id"];
      }
    },

    async upload(id) {
      const self = this;
      console.log(id);
      let result = await fetch(
        self.baseURL + "/upload",
        "post",
        {
          data_id: id,
        }
      );
      // console.log(result);
      if (result["success"] == 1) {
        self.$message.success("上传成功");
      } else {
        self.$message.error("上传失败");
      }
    },

    async upload_all() {
      const self = this;

      let result = await fetch(
        self.baseURL + "/upload_all",
        "post",
        {
          check_list: self.check_list,
        }
      );
      self.$message.success(
        "成功个数=" + result["success"] + "    失败个数=" + result["fail"]
      );
      // console.log(result);
    },
  },
};
</script>