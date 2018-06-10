<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6" v-for="(model, index) in models" :key="index" class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ model.modelName }}</span>
            <el-button style="float: right; padding: 3px 3px" type="text"><router-link :to="'/model/show/?id=' + model.id">查看</router-link></el-button>
            <el-button style="float: right; padding: 3px 3px" type="text"><router-link :to="'/model/edit/?id=' + model.id">编辑</router-link></el-button>
          </div>
          <div class="text item"><span>模型类别：{{ model.modelRegion }}</span></div>
          <div class="text item"><span>模型作者：{{ model.author.username }}</span></div>
          <div class="text item"><span>最近修改日期：{{ (new Date(model.lastModifyDate)).toLocaleDateString("en-US") }}</span></div>
      </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getModels } from '@/api/model'
import { getUsers } from '@/api/user'

export default {
  data() {
    return {
      models: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getModels().then(response => {
        this.models = response.data
        this.models.map(async(m) => {
          const author = (await getUsers(m.author)).data
          m.author = author
        })
      })
      this.listLoading = false
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.card {
  margin-right: 20px;
}
.text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
</style>

