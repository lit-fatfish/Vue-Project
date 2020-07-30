<template>
  <div class="camera-list">
    <el-row>
      <el-col :span="3"><div class="left"></div></el-col>
      <el-col :span="18">
        <el-button type="primary" @click="showModel">添加</el-button>
        <el-button type="success" @click="restart">重启</el-button>
        <el-dialog title="添加流" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="RTSP URL" :label-width="formLabelWidth">
              <el-input v-model="form.url" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="端口" :label-width="formLabelWidth">
              <el-input v-model="form.port" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="相机IP" :label-width="formLabelWidth">
              <el-input v-model="form.camera_ip" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="add(form.type)">确 定</el-button>
          </div>
        </el-dialog>

        <div class="content">
          
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="url"
              label="RTSP URL"
              width="180">
            </el-table-column>
            <el-table-column
              prop="port"
              label="端口"
              width="180">
            </el-table-column>
            <el-table-column
              prop="camera_ip"
              label="相机IP">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status === 1 ? 'success' : 'error'"
                  disable-transitions>{{scope.row.status === 1 ? '正常' : '停止'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>


        </div>
      </el-col>
      <el-col :span="3"><div class="right"></div></el-col>
    </el-row>
  </div>
</template>


<script>
import {fetch} from '@/api/fetch'

export default {
  name: "CameraList",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        status: 1,
        url: "",
        port: 0,
        camera_ip: "",
        camera_user: "",
        camera_pwd: "",
        docker_ip: "",
        type: 1, // 0 添加   1 修改
      },
      formLabelWidth: '120px',
      baseURL: "http://192.168.31.249:8050"
    }
  },

  mounted() {
    const self = this
    self.init()
  },

  methods: {
    async init() {
      const self = this
      let list = await fetch(self.baseURL + '/get_list', 'post')
      self.tableData = list.rtsp_list
    },

    async restart() {
      const self = this
      let restartData = await fetch(self.baseURL + '/restart', 'post')
      if (restartData.status == 'ok') {
        self.$message.success("重启中")
      } else {
        self.$message.error("重启失败")
      }
      self.dialogFormVisible = false
    },

    handleEdit(index, row) {
      const self = this
      self.dialogFormVisible = true
      console.log("index: ", index, row)
      row.type = 1
      self.form = row
    },

    async add() {
      const self = this
      let addData = await fetch(self.baseURL + '/add_rtsp', 'post', self.form)
      if (addData.status == 'ok') {
        self.$message.success("添加成功")
      } else {
        self.$message.error("添加失败")
      }
      self.dialogFormVisible = false
    },

    cancel() {
      const self = this
      self.dialogFormVisible = false
      self.resetForm()
    },

    showModel() {
      const self = this
      self.resetForm()
      self.dialogFormVisible = true
      self.form.type = 0
    },

    resetForm() {
      const self = this
      self.form = {
        status: 1,
        url: "",
        port: 0,
        camera_ip: "",
        camera_user: "",
        camera_pwd: "",
        docker_ip: "",
      }
    },

    async handleDelete(index, row) {
      const self = this
      let delData = await fetch(self.baseURL + '/del_rtsp', 'post', row)
      if (delData.status == 'ok') {
        self.$message.success("删除成功")
      } else {
        self.$message.error("删除失败")
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

