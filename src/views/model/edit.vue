<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="模型名称">
        <el-input v-model="form.modelName"></el-input>
      </el-form-item>

      <el-form-item label="模型类型">
        <el-select v-model="form.modelRegion" placeholder="请选择模型类型">
          <el-option label="生成模型" value="generate"></el-option>
          <el-option label="分类模型" value="classfication"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="模型介绍">
        <el-input type="textarea" v-model="form.modelAbout"></el-input>
      </el-form-item>

     <el-form-item label="模型定义">
        <el-collapse>
          <el-collapse-item title="网络结构定义" name="1">
            <code-editor ref="modelEditor" v-model="form.modelCode"></code-editor>
          </el-collapse-item>
          <el-collapse-item title="数据结构定义" name="2">
            <code-editor ref="dataEditor" v-model="form.dataCode"></code-editor>
          </el-collapse-item>
        </el-collapse>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onUpdate" v-if="edit">立即更新</el-button>
        <el-button type="primary" @click="onSubmit" v-else>立即创建</el-button>
        <el-button type="danger" @click="onDelete" v-if="edit">删除</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
// import { addModel } from '@/api/model'
import CodeEditor from '@/components/CodeEditor'
import { getToken } from '@/utils/auth'
import { addModel, getModel, updateModel, removeModel } from '@/api/model'
export default {
  components: { CodeEditor },
  data() {
    return {
      edit: false,
      form: {
        modelName: '',
        modelAbout: '',
        modelRegion: '',
        modelCode: '',
        dataCode: ''
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.edit = true
      this.fetchData(this.$route.query.id)
    }
  },
  methods: {
    async fetchData(id) {
      const data = (await getModel(id)).data
      this.form = data
    },
    onSubmit() {
      this.form.author = getToken()
      addModel(this.form).then(response => {
        if (response.message === 'SUCCESS') {
          this.$router.push({ path: '/model/index' })
        }
      })
    },
    onUpdate() {
      this.form.lastModifyDate = (new Date()).toUTCString()
      updateModel(this.form).then(response => {
        if (response.message === 'SUCCESS') {
          this.$router.push({ path: '/model/index' })
        }
      })
    },
    onDelete() {
      removeModel(this.form.id).then(response => {
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
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
}
.full {
  width: 100%;
}
</style>

