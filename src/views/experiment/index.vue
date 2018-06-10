<template>
  <div class="app-container">
    <el-row>
      <span>选择模型：</span>
        <el-select v-model="experiment.modelId" placeholder="请选择网络模型">
          <el-option v-for="(model, index) in models" :key="index" :label="model.modelName" :value="model.id"></el-option>
        </el-select>
    </el-row>

    <el-row>
      <span>请添加性能记录：</span>
        <el-input
          class="fix"
          placeholder="迭代次数"
          suffix-icon="el-icon-date"
          v-model="experiment.epoch">
        </el-input> 

        <el-input
          class="fix"
          placeholder="测试性能"
          v-model="experiment.result">
        </el-input>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="10">
        <span>请上传权重文件：</span>
        <el-upload
          class="upload"
          drag
          :on-success="handleUploadPth"
          action="http://127.0.0.1:8080/upload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传PTH文件</div>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="primary" @click="onSubmit">提交实验</el-button>
    </el-row>
    

  </div>
</template>

<script>
import { getModels } from '@/api/model'
import { addExperiment } from '@/api/experiment'

export default {
  data() {
    return {
      experiment: {
        modelId: '',
        epoch: '',
        result: '',
        checkpoint: ''
      },
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
      })
      this.listLoading = false
    },
    handleUploadPth(response, file, fileList) {
      this.experiment.checkpoint = response.data
    },
    onSubmit() {
      addExperiment(this.experiment).then(response => {
        if (response.message === 'SUCCESS') {
          this.$router.push({ path: '/model/index' })
        }
      })
    }
  }
}
</script>

<style scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  span{
    font-size: 14px;
  }
  .upload {
    margin-top: 20px;
  }
  .fix {
    width: 180px;
  }
</style>