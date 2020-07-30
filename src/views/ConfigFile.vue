<template>
  <div class="home">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="23">
        <div class="grid-content">
          <el-form ref="form" :model="form">
            <template>
              <el-table :data="RTSP_list" style="width: 100%" border>
                <el-table-column type="index" label="序号" width="180"></el-table-column>
                <el-table-column prop="rtsp_url" label="视频地址"></el-table-column>
                <el-table-column prop="cameracode" label="网点ID"></el-table-column>
                <el-table-column prop="url" label="上传地址"></el-table-column>
                <el-table-column prop="resultAddress" label="回调地址"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="medium"
                      @click="handleEdit(scope.$index, scope.row),  dialogFormVisible = true"
                      class="el-icon-edit"
                      circle
                    ></el-button>
                    <el-button
                      size="medium"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                      class="el-icon-delete"
                      circle
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <br />
              <el-button size="small" type="primary" @click="createRTML" style="float:right">新增</el-button>
            </template>

            <el-dialog
              title="修改视频源地址"
              :visible.sync="dialogFormVisible"
              :before-close="handleClose"
            >
              <el-form :model="form">
                <el-form-item label="视频源地址" :label-width="formLabelWidth">
                  <el-input v-model="form.form_RTSP_url" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="网点ID" :label-width="formLabelWidth">
                  <el-input v-model="form.form_cameracode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传地址" :label-width="formLabelWidth">
                  <el-input v-model="form.form_url" autocomplete="off"></el-input>
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
            <br />
            <div>
              <el-row :gutter="50">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="切片时间(s)">
                      <el-input v-model="cut_time" type="text" placeholder="每个视频的切片时间"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="切片总时间(min)">
                      <el-input v-model="times" type="text" placeholder="总路数切片需要的时间"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div>
              <el-row :gutter="50">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="过期时间(天)">
                      <el-input v-model="expire" type="text" placeholder="过期时间"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="清理间隔时间(天)">
                      <el-input v-model="timing" type="text" placeholder="每隔多长时间清理文件"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </div>

            <el-switch
              v-model="flag"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启动程序"
            ></el-switch>
            <el-button @click="submit_config" type="primary right" style="float: right;">修改配置</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { fetch } from "@/api/fetch";

export default {
  name: "ConfigFile",
  data() {
    return {
      cut_time: "",
      times: "",
      flag: true,
      expire: "",
      timing: "",
      RTSP_list: [
        {
          rtsp_url: "",
          cameracode: "",
          url: "",
          resultAddress: "",
        },
      ],
      dialogFormVisible: false,
      form: {
        form_index: 0,
        form_RTSP_url: "",
        form_cameracode: "",
        form_url: "",
        form_resultAddress: "",
      },
      formLabelWidth: "120px",
      baseURL:"http://127.0.0.1:5000"
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
        self.baseURL + "/config_file",
        "get"
      );
      console.log("config", list);
      if (list) {
        (self.cut_time = list["cut_time"]),
          (self.times = list["times"]),
          (self.expire = list["expire"]),
          (self.timing = list["timing"]),
          (self.RTSP_list = list["RTSP_list"]);
        self.flag = list["flag"];
      }
    },
    async config_file() {
      const self = this;
      let list = await fetch(
        self.baseURL + "/config_file",
        "get"
      );
      console.log("config", list);
      if (list) {
        (self.cut_time = list["cut_time"]),
          (self.times = list["times"]),
          (self.expire = list["expire"]),
          (self.timing = list["timing"]),
          (self.RTSP_list = list["RTSP_list"]);
        self.flag = list["flag"];
      }
    },
    async submit_config() {
      const self = this;
      let list = await fetch(
        self.baseURL + "/config_file",
        "post",
        {
          "cut_time": self.cut_time,
          "times": self.times,
          "RTSP_list": self.RTSP_list,
          "expire": self.expire,
          "timing": self.timing,
          "flag": self.flag,
        }
      );
      console.log("return list", list);
      if (list) {
        console.log("in list");
        self.cut_time = list["cut_time"];
        self.times = list["times"];
        self.expire = list["expire"];
        self.timing = list["timing"];
        self.RTSP_list = list["RTSP_list"];
        self.flag = list["flag"];
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
      const self = this;
      self.form.form_index = index;
      self.form.form_RTSP_url = row["rtsp_url"];
      self.form.form_cameracode = row["cameracode"];
      self.form.form_url = row["url"];
      self.form.form_resultAddress = row["resultAddress"];
    },
    handleDelete(index, row) {
      const self = this;
      console.log(index, row);
      self.RTSP_list.splice(index, 1);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    formSubmit: function () {
      //表单提交，修改RTSP列表里面的数组，然后上传
      const self = this;
      // 修改参数
      if (self.form.form_index < self.RTSP_list.length) {
        self.RTSP_list[self.form.form_index]["cameracode"] =
          self.form.form_cameracode;
        self.RTSP_list[self.form.form_index]["rtsp_url"] =
          self.form.form_RTSP_url;
        self.RTSP_list[self.form.form_index]["url"] = self.form.form_url;
        self.RTSP_list[self.form.form_index]["resultAddress"] =
          self.form.form_resultAddress;
      } else {
        // 新增参数
        let dic = {
          "cameracode": self.form.form_cameracode,
          "rtsp_url": self.form.form_RTSP_url,
          "url": self.form.form_url,
          "resultAddress": self.form.form_resultAddress,
        };
        self.RTSP_list.push(dic);
      }

      self.dialogFormVisible = false;
    },
    createRTML: function () {
      // 新增一行
      const self = this;
      self.dialogFormVisible = true;
      self.form.form_index = self.RTSP_list.length + 1;
      self.form.form_RTSP_url = "";
      self.form.form_cameracode = "";
      self.form.form_url = "";
      self.form.form_resultAddress = "";
    },
  },
};
</script>