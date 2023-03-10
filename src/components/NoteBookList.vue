<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i></a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :key="notebook.id" :to="`/note?notebookId=${notebook.id}`" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>{{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
import { friendlyDate } from '@/helpers/util'


export default {
  data() {
    return {
      notebooks: []
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({ path: '/login' })
        }
      })

    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  },
  methods: {
    onCreate() {
      this.$prompt('输入新笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({ value }) => {
        return Notebooks.addNotebook({ title: value })
      }).then(res => {
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        this.$message.success(res.msg)
      })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('修改笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: notebook.title,
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({ value }) => {
        title = value
        return Notebooks.updateNotebook(notebook.id, { title })
      }).then(res => {
        notebook.title = title
        this.$message.success(res.msg)
      })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗？', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebooks.deleteNotebook(notebook.id)
      }).then(res => {
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        this.$message.success(res.msg)
      })
    }
  }
}

</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>